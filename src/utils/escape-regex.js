const escapeRegex = (re) => re.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

module.exports = escapeRegex;
