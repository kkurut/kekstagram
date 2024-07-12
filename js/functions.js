/* eslint-disable*/
const stringCheck = (string, maxLenth) => {
  const check = string.length <= maxLenth;
  console.log(check);
};
stringCheck('skldlkasfdgfdsvgdfslkfldkglkf ,/.,,ll', 100);

const getPalindrome = (input) => {
  const normalizedStr = input.replaceAll(' ', '').toLowerCase();

  let reversedStroke = '';

  for (let i = normalizedStr.length - 1; i >= 0; --i) {
    reversedStroke += normalizedStr[i];
  }

  return normalizedStr === reversedStroke;
};

console.log(getPalindrome('топот'));
console.log(getPalindrome('ДовОд'));
console.log(getPalindrome('Кекс'));
console.log(getPalindrome('Лёша на полке клопа нашёл'));
