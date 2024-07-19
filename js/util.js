const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const stringCheck = (string, maxLenth) => {
  const check = string.length <= maxLenth;
  // eslint-disable-next-line
  console.log(check);
};

const getPalindrome = (input) => {
  const normalizedStr = input.replaceAll(' ', '').toLowerCase();

  let reversedStroke = '';

  for (let i = normalizedStr.length - 1; i >= 0; --i) {
    reversedStroke += normalizedStr[i];
  }

  return normalizedStr === reversedStroke;
};

export {getRandom, stringCheck, getPalindrome};
