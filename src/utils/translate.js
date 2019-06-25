const translate = (str, ...values) => {

  // Handle template litterals
  if (typeof str !== 'string') {
    let string = '';
    for (const [ ind, s ] in str) string += s + (values[ind] || '');
    str = string;
  }

  return `Translated: ${str}`;
};

module.exports = translate;
