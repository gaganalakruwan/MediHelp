import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');

const getScaleNumber = (size: number) => {
  // return the dpi
  const dimesion = Math.min(SCREEN_HEIGHT, SCREEN_WIDTH);
  const dpi = Math.round(dimesion / 375);
  if (dpi >= 2) {
    return (size * dpi) / 4 + size;
  }
  return size;
};

const widthBaseScale = SCREEN_WIDTH / 414;
const heightBaseScale = SCREEN_HEIGHT / 896;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

const widthPixel = (size: number) => {
  return normalize(size, 'width');
};
//for height  pixel
const heightPixel = (size: number) => {
  return normalize(size, 'height');
};
//for font  pixel
const fontPixel = (size: number) => {
  return heightPixel(size);
};
//for Margin and Padding vertical pixel
const pixelSizeVertical = (size: number) => {
  return heightPixel(size);
};
//for Margin and Padding horizontal pixel
const pixelSizeHorizontal = (size: number) => {
  return widthPixel(size);
};
//for Scene Builder flow layout
const screenDisplayRatio = (width: number, height: number) => {
  let r = 1;
  const w = SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  r = w / (height * 3.8);
  if (width * r > w * 0.45) {
    r = (w * 0.45) / width;
  }
  return r;
};

const panaromaDisplayClearence = (width: number, height: number) => {
  let r = 1;
  let d = 0;
  const w = SCREEN_WIDTH < SCREEN_HEIGHT ? SCREEN_WIDTH : SCREEN_HEIGHT;
  r = w / (height * 3.8);
  if (width * r > w * 0.45) {
    d = height * r - height * ((w * 0.45) / width);
  }
  return d;
};

export {
  widthPixel,
  heightPixel,
  fontPixel,
  pixelSizeVertical,
  pixelSizeHorizontal,
  getScaleNumber,
  screenDisplayRatio,
  panaromaDisplayClearence,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};
