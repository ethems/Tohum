const ProductCategory = require('../models/product-category');
const logger = require('../lib/logger');

// highly inspired from  MongoDB applied design patterns  page:88

async function buildSubgraph(root) {
  let nodesByParent = new Map();
  const nodes = await ProductCategory.find({
    ancestorIDs: root._id
  }).exec();
  for (let i = 0, len = nodes.length; i < len; i++) {
    const parentNodeValue = nodesByParent.get(String(nodes[i].parentID));
    if (!parentNodeValue) {
      nodesByParent.set(String(nodes[i].parentID), [nodes[i]]);
    } else {
      nodesByParent.set(String(nodes[i].parentID), [
        ...parentNodeValue,
        nodes[i]
      ]);
    }
  }
  return nodesByParent;
}
async function updateNodeAndDescendents(nodesByParent, node, parent) {


  const parentAncestorIDs = parent ?
    parent.ancestorIDs : [];
  const parentID = parent ? parent._id : null;
  const updatedNode=await ProductCategory.findOneAndUpdate({
    _id: node._id
  }, {
    $set: {
      ancestorIDs: [
        ...parentAncestorIDs,
        parentID
      ],
      parentID
    }
  }, {
    new: true,
    upsert: false
  }).exec();
  const parentNodeValue = nodesByParent.get(String(updatedNode.id)) || [];
  for (let i = 0, len = parentNodeValue.length; i < len; i++) {
    await updateNodeAndDescendents(nodesByParent, parentNodeValue[i], updatedNode);
  }
}
module.exports = {
  removeParentCategory: async function(id) {
    const category = await ProductCategory.findById(id).exec();
    const flattenCategoriesByParent = await buildSubgraph(category);
    await updateNodeAndDescendents(flattenCategoriesByParent, category, null);
  },
  addCategory: async function(id, parentID) {
    // Use when category dont have any children categories
    // It is ideal when first initialization of the category
    if (!id || !parentID) {
      logger.error('There is null paramaters when called addCategory');
      throw new TypeError('There is null paramaters when called addCategory');
    }
    const parent = await ProductCategory.findById(parentID).exec();
    if (!parent) {
      logger.error('There is no parent category to add new category');
      throw new Error('There is no parent category to add new category');
    }
    const parentAncestorIDs = parent.ancestorIDs;
    await ProductCategory.update({
      _id: id
    }, {
      $set: {
        ancestorIDs: [
          ...parentAncestorIDs,
          parentID
        ],
        parentID
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