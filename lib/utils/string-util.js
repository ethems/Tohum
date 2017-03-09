const capitalize = (val) => {
  if (!val) {
    return '';
  }
  return val.replace(/\w\S*/g, txt => (txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
};

module.exports = {
  capitalize
};
