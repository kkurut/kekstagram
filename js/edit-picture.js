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

const getScaleStyle = (value) => {
  value = getScaleValue()/100;
  previewImgElement.style.transform = `scale(${value})`;
};

const setScaleValue = (value) => valueControlElement.value = `${value}%`;


biggerControlElement.addEventListener('click', () => {
    let currentValue = getScaleValue();
    if (currentValue < MAX_SCALE) {
        const value = setScaleValue(currentValue + STEP);
        getScaleStyle(value);
    }
});

smallerControlElement.addEventListener('click', () => {
    let currentValue = getScaleValue();
    if (currentValue > MIN_SCALE) {
        const value = setScaleValue(currentValue - STEP);
        getScaleStyle(value);
    }
});
