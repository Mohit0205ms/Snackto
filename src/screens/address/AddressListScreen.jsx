import { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { colors } from "../../theme/Colors";
import { getScreenWidth } from "../../utils/LayoutUtility";
import Icon from 'react-native-vector-icons/MaterialIcons';
import StaticNavigationHeader from "../../components/header/StaticNavigationHeader";
import RadioButton from '../../components/shared/RadioButton';
import { address } from '../../dummyData/DummyData';

const ActionButton = ({
  iconName,
  label,
  onPress,
  style = {},
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={iconName} size={25} color={'#F14141'} />
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const AddressCard = memo(({location, address = '', id = '', isSelectedAddressId = '', onSelect = () => {}}) => {

  const textConvertor = (text) => {
    const updatedText = text.length > 80 ? text.substr(0,80) + "..." : text;
    return updatedText;
  }
  
  return (
    <TouchableOpacity 
      style={styles.actionCardContainer}
      onPress={() => onSelect(id)}
    >
      <View style={styles.addressContainer}>
        <View style={styles.locationContainer}>
          <Icon name="home" size={25} color="black" />
          <Text>{location}</Text>
        </View>
        <Text>{textConvertor(address)}</Text>
      </View>
      <RadioButton
        isSelected={isSelectedAddressId === id}
        size={25}
        color={colors.primaryColor}
        disabled={false}
      />
    </TouchableOpacity>
  );
});

const DividerWithText = ({ text = 'OR' }) => {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  );
};

const AddressListScreen = () => {
  const [isSelectedAddressId, setIsSelectedAddressId] = useState('1');

  const handleAddAddress = () => {
    // Add address logic
  };

  const handleUseLocation = () => {
    // Use location logic
  };

  const handleAddressSelect = (id) => {
    setIsSelectedAddressId(id);
  };

  const renderItem = useCallback(({item}) => {
    const {location, address, id} = item;
    return (
      <AddressCard
        location={location}
        address={address}
        id={id}
        isSelectedAddressId={isSelectedAddressId}
        onSelect={handleAddressSelect}
      />
    );
  });

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <StaticNavigationHeader
        iconName={'west'}
        iconSize={25}
        title={'My Locations'}
        iconStyle={styles.iconStyle}
      />
      <View>
        <ActionButton
          iconName="add"
          label="Add New Address"
          onPress={handleAddAddress}
          style={styles.addAddressButtonStyle}
        />
        <ActionButton
          iconName="my-location"
          label="Use Your Current Location"
          onPress={handleUseLocation}
          style={styles.currentLocationButtonStyle}
          buttonTextStyle={styles.currentLocationText}
        />
      </View>
      <DividerWithText text='SAVED'/>
      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
     // iOS shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
  addAddressButtonStyle: {
    width: getScreenWidth() - 24,
    height: 50,
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
    backgroundColor: colors.secondaryColor,
    marginBottom: 10,
  },
  currentLocationButtonStyle: {
    width: getScreenWidth() - 24,
    height: 50,
    borderRadius: 10,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 5,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primaryColor,
    marginBottom: 10,
  },
  buttonText: {
    color: '#F14141',
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 10,
  },
  radioButtonContainer: {
    width: getScreenWidth() - 24,
    height: 'auto',
    minHeight: 50,
    maxHeight: 100,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'column',
    backgroundColor: colors.dark_grey,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionCardContainer: {
    flexDirection: 'row', 
    width: getScreenWidth() - 24,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: colors.dark_grey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
    // ✅ iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    // ✅ Android Shadow
    elevation: 5,
    backgroundColor: '#fff',
  },
  addressContainer: {
    width: (getScreenWidth() - 24) * 0.9,
    maxWidth: 300,
  },
  locationContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 2
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#999',
    backgroundColor: colors.primaryColor,
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#333',
    fontWeight: '500',
    color: colors.primaryColor,
  },
});

export default AddressListScreen;