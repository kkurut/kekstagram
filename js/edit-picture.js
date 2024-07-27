const scaleFieldseteElement = document.querySelector('.img-upload__scale');
const valueControlElement = scaleFieldseteElement.querySelector('.scale__control--value');
const biggerControlElement = scaleFieldseteElement.querySelector('.scale__control--bigger');
const smallerControlElement = scaleFieldseteElement.querySelector('.scale__control--smaller');
const previewImgContainerElement = document.querySelector('.img-upload__preview');
const previewImgElement = previewImgContainerElement.querySelector('img');

const MIN_SCALE = 25; // Минимальное значение
const MAX_SCALE = 100; // Максимальное значение
const STEP = 25; // Шаг изменения

const getScaleValue = () => parseInt(valueControlElement.value, 10);

const setScaleValue = (value) => valueControlElement.value = `${value}%`;

const getScaleStyle = (value) => {
  value = getScaleValue() / 100;
  previewImgElement.style.transform = `scale(${value})`;
};

const onclickBigger = () => {
  let currentValue = getScaleValue();
  if (currentValue < MAX_SCALE) {
    const value = setScaleValue(currentValue + STEP);
    getScaleStyle(value);
  };
}

const onclickSmaller = () => {
  let currentValue = getScaleValue();
  if (currentValue > MIN_SCALE) {
    const value = setScaleValue(currentValue - STEP);
    getScaleStyle(value);
  }
};

biggerControlElement.addEventListener('click', onclickBigger);
smallerControlElement.addEventListener('click',);
