import { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from "react-native";
import { colors } from "../../theme/Colors";
import { getScreenWidth } from "../../utils/LayoutUtility";
import StaticNavigationHeader from "../../components/header/StaticNavigationHeader";
import { address } from '../../dummyData/DummyData';
import { assetsIcon } from '../../assets/Index';

const filterList = ['All','Home','Work', 'other'];

const AddressCard = memo(({location, address = '', id = '', isSelectedAddressId = '', onSelect = () => {}}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopOverPosition] = useState({top: 40, right: 20});

  const textConvertor = (text) => {
    const updatedText = text.length > 80 ? text.substr(0,80) + "..." : text;
    return updatedText;
  }

  const PopOver = () => {
    const handleEditButtonPress = () => {
      console.log('handleEditButtonPress');
    }
    const handleDeleteButtonPress = () => {
      console.log('handleDeleteButtonPress');
    }
    return (
      <Modal transparent visible={showPopover} onRequestClose={()=> setShowPopover(false)}>
        <TouchableOpacity style={{...StyleSheet.absoluteFill}} onPress={()=>setShowPopover(false)}/>
        <View style={[styles.popoverContainer,{top: popoverPosition.top, right: popoverPosition.right}]}>
          <TouchableOpacity style={styles.popoverItem} onPress={handleEditButtonPress}>
            <Image source={assetsIcon.edit_address} style={styles.popoverIcon} />
            <Text style={styles.popoverText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popoverItem} onPress={handleDeleteButtonPress}>
            <Image source={assetsIcon.delete_address} style={styles.popoverIcon} />
            <Text style={styles.popoverText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const handleMenuButtonClick = (event) => {
    const {pageY, pageX} = event.nativeEvent;  
    setPopOverPosition({
      top: pageY + 30,
      right: getScreenWidth() - pageX - 20
    })
    setShowPopover(!showPopover)
  }
  
  return (
    <TouchableOpacity 
      style={styles.actionCardContainer}
      onPress={() => onSelect(id)}
    >
      <View style={styles.addressContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.addressTitle}>Pg 1511, House no</Text>
          <View style={{ flexDirection: 'row', width: 55, justifyContent: 'space-between' }}>
            {/* share button */}
            <TouchableOpacity>
              <Image source={assetsIcon.share_address} style={{width: 20, height: 20}} />
            </TouchableOpacity>
            {/* additional button */}
            <TouchableOpacity onPress={handleMenuButtonClick}>
              <Image source={assetsIcon.menu} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.addressSubtitle}>{textConvertor(address)}</Text>
      </View>
      {/* edit and delete address option */}
      <PopOver/>
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

export const FilterPills = ({ filters, selectedFilter, onFilterSelect }) => {
  return (
    <View style={styles.filterContainer}>
      {filters.map((filter, index) => {
        const isSelected = selectedFilter === filter;
        return (
          <TouchableOpacity
            key={index}
            style={isSelected ? styles.selectedFilterPill : styles.filterPill}
            onPress={() => onFilterSelect(filter)}
          >
            <Text style={isSelected ? styles.selectedFilterText : styles.filterText}>
              {filter}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const AddressListScreen = () => {
  const [isSelectedAddressId, setIsSelectedAddressId] = useState('1');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleAddAddress = () => {
    // Add address logic
  };

  const handleUseLocation = () => {
    // Use location logic
  };

  const handleAddressSelect = (id) => {
    setIsSelectedAddressId(id);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
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

  const ActionButton = ({
    iconSrc = '',
    label,
    onPress,
    style = {},
  }) => {
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Image source={iconSrc} style={styles.actionButtonIconStyle} />
        <Text style={styles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <StaticNavigationHeader
        iconSrc={assetsIcon.arrow_left}
        iconStyle={styles.iconStyle}
        title={'My Locations'}
        buttonStyle={styles.buttonStyle}
      />
      <View>
        <ActionButton
          iconSrc={assetsIcon.add_icon}
          label="Add New Address"
          onPress={handleAddAddress}
          style={styles.addAddressButtonStyle}
        />
        <ActionButton
          iconSrc={assetsIcon.current_location}
          label="Use Your Current Location"
          onPress={handleUseLocation}
          style={styles.currentLocationButtonStyle}
          buttonTextStyle={styles.currentLocationText}
        />
      </View>
      <DividerWithText text='SAVED'/>
      <FilterPills 
        filters={filterList}
        selectedFilter={selectedFilter}
        onFilterSelect={handleFilterSelect}
      />
      <FlatList
        data={address}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  addressTitle: {
    fontWeight: '700',
  },
  addressSubtitle: {
    fontWeight: '500'
  },
  buttonStyle: {
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
    width: '100%',
    paddingVertical: 10,
    position: 'relative',
  },
  locationContainer: {
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10,
    justifyContent: 'space-between',
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
  actionButtonIconStyle: {
    width: 25,
    height: 25,
    tintColor: '#F14141'
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginTop: 10,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  selectedFilterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.secondaryColor,
    // borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  selectedFilterText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
  popoverContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  popoverItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  popoverIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  popoverText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '500',
  },
});

export default AddressListScreen;