const ProductCategory = require('../models/product-category');
const logger = require('../lib/logger');

// highly inspired from  MongoDB applied design patterns  page:88

async function buildSubgraph(root) {
  let nodesByParent = new Map();
  const nodes = await ProductCategory.find({
    ancestors: root._id
  });
  for (let i = 0, len = nodes.length; i < len; i++) {
    const parentNodeValue = nodesByParent.get(nodes[i].parent);
    if (!parentNodeValue) {
      nodesByParent.set(nodes[i].parent, [nodes[i]]);
    } else {
      nodesByParent.set(nodes[i].parent, [
        ...parentNodeValue,
        nodes[i]
      ]);
    }
  }
  return nodesByParent;
}
async function updateNodeAndDescendents(nodesByParent, node, parent) {
  const parentAncestors = parent ?
    parent.ancestors : [];
  const parentId = parent ? parent.id : null;
  await ProductCategory.update({
    _id: node._id
  }, {
    $set: {
      ancestors: [
        ...parentAncestors,
        parentId
      ],
      parent: parentId
    }
  }).exec();
  const parentNodeValue = nodesByParent.get(node._id) || [];
  for (let i = 0, len = parentNodeValue.length; i < len; i++) {
    await updateNodeAndDescendents(nodesByParent, parentNodeValue[i], node);
  }
}
module.exports = {
  removeParentCategory: async function(id) {
    const category = await ProductCategory.findById(id).exec();
    const flattenCategoriesByParent = await buildSubgraph(category);
    await updateNodeAndDescendents(flattenCategoriesByParent, category, null);
  },
  addCategory: async function(id, parentId) {
    // Use when category dont have any children categories
    // It is ideal when first initialization of the category
    if (!id || !parentId) {
      logger.error('There is null paramaters when called addCategory');
      throw new TypeError('There is null paramaters when called addCategory');
    }
    const parent = await ProductCategory.findById(parentId).exec();
    if (!parent) {
      logger.error('There is no parent category to add new category');
      throw new Error('There is no parent category to add new category');
    }
    const parentAncestors = parent ?
      parent.ancestors : [];
    await ProductCategory.update({
      _id: id
    }, {
      $set: {
        ancestors: [
          ...parentAncestors,
          parentId
        ],
        parent: parentId
      }
    }).exec();
  },
  updateCategory: async function(id, parentId) {
    // Use when there is already category and there are nested cateories under itself.
    // It is ideal when modify category position
    if (!id || !parentId) {
      logger.error('There is null paramaters when called updateCategory');
      throw new TypeError('There is null paramaters when called updateCategory');
    }
    const category = await ProductCategory.findById(id).exec();
    const parentCategory = await ProductCategory.findById(parentId).exec();
    if (!category || !parentCategory) {
      logger.error('There is unfound categies when updateCategory');
      throw new Error('There is unfound categies when updateCategory');
    }
    const flattenCategoriesByParent = await buildSubgraph(category);
    await updateNodeAndDescendents(flattenCategoriesByParent, category, parentCategory);
  }
};
