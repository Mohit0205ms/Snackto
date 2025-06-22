import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import FastImageView from '../../../components/FastImageView';
import {assetsIcon, Images} from '../../../assets/Index';
import {getScreenWidth} from '../../../utils/LayoutUtility';
import {colors} from '../../../theme/Colors';
import {isAndroid} from '../../../utils/BooleanUtility';

const statusBarHeight = isAndroid() ? StatusBar.currentHeight : 44;

const Header = () => {
  return (
    <FastImageView source={Images.feed_header} style={style.container}>
      <View style={style.locationContainer}>
        <TouchableOpacity>
          <View style={style.locationTitle}>
            <Text style={style.locationHeader}>Your Location</Text>
            <Image source={assetsIcon.arrow_down} style={style.downArrow} />
          </View>
          <View style={style.selectedLocationContainer}>
            <Image source={assetsIcon.map_pointer} style={style.locationIcon} />
            <Text style={style.selectedLocation}>New York City</Text>
          </View>
        </TouchableOpacity>
        <View style={style.iconContainer}>
          <TouchableOpacity>
            <FastImageView
              source={assetsIcon.search_icon}
              style={style.actionIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FastImageView
              source={assetsIcon.bell_icon}
              style={style.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.headingContainer}>
        <Text style={style.heading}>Provide the best</Text>
        <Text style={style.heading}>food for you</Text>
      </View>
    </FastImageView>
  );
};

const style = StyleSheet.create({
  container: {
    width: getScreenWidth(),
    height: getScreenWidth() * 0.5 + statusBarHeight,
    maxHeight: 300,
    padding: 24,
    paddingTop: statusBarHeight + 20,
    marginTop: -(statusBarHeight + 20),
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationTitle: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  headingContainer: {
    marginTop: 10,
  },
  heading: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '500',
  },
  actionIcon: {
    width: 30,
    height: 30,
    tintColor: colors.white,
  },
  selectedLocation: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
    marginRight: 10,
  },
  locationHeader: {
    color: colors.white,
    marginRight: 10,
    fontSize: 16,
  },
  downArrow: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
});

export default Header;
