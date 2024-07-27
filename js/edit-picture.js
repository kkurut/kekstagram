//редактирование масштаба изображения
const imgUploadFormElement = document.querySelector('.img-upload')
const valueControlElement = imgUploadFormElement.querySelector('.scale__control--value');
const biggerControlElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const smallerControlElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const previewImgElement = imgUploadFormElement.querySelector('.img-upload__preview img');

//редактирование эффектов
const fieldsetSliderElement = imgUploadFormElement.querySelector('.img-upload__effect-level')
const valueSliderElement = imgUploadFormElement.querySelector('.effect-level__value');
const sliderFilterElement = imgUploadFormElement.querySelector('.effect-level__slider');
const noneEffectInputElement = imgUploadFormElement.querySelector('#effect-none');
const chromeEffectInputElement = imgUploadFormElement.querySelector('#effect-chrome');
const sepiaEffectInputElement = imgUploadFormElement.querySelector('#effect-sepia');
const marvinEffectInputElement = imgUploadFormElement.querySelector('#effect-marvin');
const phobosEffectInputElement = imgUploadFormElement.querySelector('#effect-phobos');
const heatEffectInputElement = imgUploadFormElement.querySelector('#effect-heat');
const chromeEffectElement = imgUploadFormElement.querySelector('.effects__preview--chrome')

noUiSlider.create(sliderFilterElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 1,
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

// sliderFilterElement.noUiSlider.on('update', () => {
//   valueSliderElement.value = sliderFilterElement.noUiSlider.get();
//   console.log(sliderFilterElement.noUiSlider.get());
// });

const getSlider = (slider, min, max, step, effect, unit = '') => {
  slider.addEventListener('click', (evt) => {
    fieldsetSliderElement.classList.remove('hidden')
    if (evt.target.checked) {
      sliderFilterElement.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        step: step,
        start: 0,
      });
      sliderFilterElement.noUiSlider.on('update', () => {
        let effectValue = sliderFilterElement.noUiSlider.get();
        valueSliderElement.value = effectValue;
        previewImgElement.style.filter = `${effect}(${effectValue}${unit})`;
        console.log(effectValue);
      });
    };
  });
}

noneEffectInputElement.addEventListener('click', (evt) => {
  if (evt.target.checked) {
    fieldsetSliderElement.classList.add('hidden');
  }
});

getSlider(chromeEffectInputElement, 0, 1, 0.1, 'grayscale');
getSlider(sepiaEffectInputElement, 0, 1, 0.1, 'sepia');
getSlider(marvinEffectInputElement, 0, 100, 1, 'invert', '%');
getSlider(phobosEffectInputElement, 0, 3, 0.1, 'blur', 'px');
getSlider(heatEffectInputElement, 0, 3, 0.1, 'brightness');

const MIN_SCALE = 25;
const MAX_SCALE = 100; 
const STEP = 25; 

const getScaleValue = () => parseInt(valueControlElement.value, 10);

const setScaleValue = (value) => valueControlElement.value = `${value}%`;

const getScaleStyle = (value) => {
  value = getScaleValue() / 100;
  previewImgElement.style.transform = `scale(${value})`;
  previewImgElement.style.sepia = '(0.6)';
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
smallerControlElement.addEventListener('click', onclickSmaller);
