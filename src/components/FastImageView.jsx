import React, { memo, useState } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import FastImage from '../libraries/ReactNativeFastImage';
import ShimmerPlaceHolder from '../libraries/ReactNativeShimmerPlaceholder';
import { isPresent } from '../utils/BooleanUtility';

const FastImageView = ({ source, style, showLoader = false, children }) => {
  const [isLoading, setIsLoading] = useState(showLoader);

  const onLoadEnd = () => setIsLoading(false);
  const onError = () => setIsLoading(false);

  const isGif = source?.uri?.toLowerCase().includes('.gif');
  let ImageComponent = isGif ? Image : FastImage;
  if (isPresent(children)) {
    ImageComponent = ImageBackground;
  }
  return (
    <>
      <ImageComponent
        source={source}
        style={style}
        onLoadEnd={onLoadEnd}
        onError={onError}
        resizeMode='cover'
      >
        {children}
      </ImageComponent>
      {isLoading && (
        <ShimmerPlaceHolder
          style={[style, styles.shimmer]}
          autoRun
          colorShimmer={['#f0f0f0', '#e0e0e0', '#f0f0f0']}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default memo(FastImageView);
