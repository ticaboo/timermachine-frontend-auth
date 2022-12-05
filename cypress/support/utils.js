export const d = {
  //syntactic sugaring for convenience & readability ie can: d.t`foo` instead of '[data-test-foo]'
  t: (dataTestIdentifier) => {
    return `[data-test-${dataTestIdentifier}]`;
  },
  //inspiration, unused, working? template literal magic
  x: (strings, ...values) => {
    const id = strings
      .map((str, index) => str + (values[index] || ''))
      .join('');
    return `[data-testid="${id}"]`;
  }
};
