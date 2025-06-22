import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getScreenHeight, getScreenWidth } from '../../utils/LayoutUtility';
import StaticNavigationHeader from '../../components/header/StaticNavigationHeader';
import { assetsIcon } from '../../assets/Index';
import { colors } from '../../theme/Colors';
import { FilterPills } from './AddressListScreen';
import { isIOS } from '../../utils/BooleanUtility';
import CustomButton from '../../components/customButton/CustomButton';
import { useAddressFromCoordinates } from '../../queries/mapQueries';

const SelectDeliveryAddressScreen = () => {
  const scrollViewRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState('Home');
  const [latitude, setLatitude] = useState(28.638863627859873);
  const [longitude, setLongitude] = useState(77.23187091336312);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { data, isLoading, error } = useAddressFromCoordinates(
    latitude,
    longitude,
  );

  const changeRegion = Region => {
    const { latitude, longitude } = Region;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        scrollViewRef.current?.scrollTo({y: 0, animated: true})
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, alignSelf: 'center' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 30, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <StaticNavigationHeader
          iconSrc={assetsIcon.arrow_left}
          title={'Editing Location'}
          iconStyle={styles.iconStyle}
          buttonStyle={styles.buttonStyle}
        />
        <View style={styles.mapContainer}>
          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChange={changeRegion}
            onRegionChangeComplete={changeRegion}
          >
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
              image={assetsIcon.marker_pin}
              title="Location"
              description="Please select location"
            />
          </MapView>
          <View style={styles.currentLocationContainer}>
            <Image
              source={assetsIcon.current_location}
              style={{ width: 25, height: 25 }}
            />
          </View>
        </View>
        <Text style={styles.locationHeader}>Location</Text>
        <FilterPills
          filters={['Home', 'Office', 'Others']}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />
        <View>
          <View style={styles.addressFeild}>
            <TextInput
              style={styles.landMark}
              placeholder="Enter 10-digit mobile number"
              placeholderTextColor={colors.black}
            />
            <Image
              source={assetsIcon.map_pointer}
              style={{ width: 25, height: 25 }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="House No*"
            placeholderTextColor={colors.black}
          />
          <TextInput
            style={styles.input}
            placeholder="Floor/Nearby Landrmark"
            placeholderTextColor={colors.black}
          />
          <CustomButton
            primaryButtonText={'Save'}
            primaryButtonStyle={styles.primaryButtonStyle}
            showPrimaryButton={true}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  buttonStyle: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapContainer: {
    width: getScreenWidth() - 24,
    height: getScreenHeight() * 0.45,
    maxHeight: isIOS() ? 300 : 450,
    backgroundColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  currentLocationContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    position: 'absolute',
    right: 10,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  input: {
    width: getScreenWidth() - 24,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
    marginTop: 15,
    backgroundColor: colors.light_grey,
  },
  addressFeild: {
    width: getScreenWidth() - 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light_grey,
    paddingVertical: 15,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    borderRadius: 12,
    marginTop: 15,
  },
  primaryButtonStyle: {
    width: getScreenWidth() - 24,
    height: 60,
    borderRadius: 40,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
  },
  locationHeader: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: '500',
    marginVertical: 5,
  },
  landMark: {
    width: getScreenWidth() - 100,
    maxWidth: 500,
    fontSize: 16,
  },
});

export default SelectDeliveryAddressScreen;
