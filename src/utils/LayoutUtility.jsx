import { Dimensions } from 'react-native';
import { max } from 'lodash';
import { isWeb } from './BooleanUtility';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const spacingBetweenItems = 4;

export const getScreenWidth = () => {
  return Dimensions.get('window').width;
};

export const getWindowWidth = () => {
  return Dimensions.get('window').width;
};

export const getScreenHeight = () => {
  return max([Dimensions.get('screen').width, Dimensions.get('screen').height]);
};

export const CART_LEFT_CONTAINER_WIDTH_FOR_DESKTOP = 636;

export const getRealScreenHeight = () => (isWeb() ? window.innerHeight : Dimensions.get('screen').height);
