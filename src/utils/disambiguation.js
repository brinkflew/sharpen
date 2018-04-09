const disambiguation = (items, label, property = 'name') => {
  const itemList = items.map((item) => `"${(property ? item[property] : item).replace(/ /g, '\xa0')}"`).join(',   ');
  return `Multiple ${label} found, please be more specific: ${itemList}`;
};

module.exports = disambiguation;
