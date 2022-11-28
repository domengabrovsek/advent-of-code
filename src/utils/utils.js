module.exports = {
  deepCopy: (obj) => obj && JSON.parse(JSON.stringify(obj))
};
