import { Platform } from 'react-native';
import {
  isEmpty,
  isNull,
  isUndefined,
  isNumber,
  isDate,
  isNaN,
  isBoolean,
} from 'lodash';

export const isAppLaunchedFromDeeplink = {
  product: false,
};

export const updateIsAppLaunchedFromDeeplink = (metaData) => {
  isAppLaunchedFromDeeplink.product = metaData.product;
};

export const isBlank = (value) =>
  ((isEmpty(value) ||
    (typeof value === 'string' && isEmpty(value.trim())) ||
    isNull(value) ||
    isUndefined(value) ||
    value === 'null' ||
    value === 'undefined') &&
    !isNumber(value) &&
    !isDate(value) &&
    !isBoolean(value)) ||
  isNaN(value);

export const isPresent = (value) => !isBlank(value);

export const isIOS = () => Platform.OS === 'ios';

export const isAndroid = () => Platform.OS === 'android';

export const isNative = () =>
  Platform.OS === 'android' || Platform.OS === 'ios';

export const stringToBoolean = (val) => {
  if (typeof val === 'boolean') {
    return val;
  }
  if (typeof val === 'string') {
    return val.toLowerCase() === 'true';
  }
  return false;
};
