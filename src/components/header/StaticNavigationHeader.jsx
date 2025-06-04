import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../theme/Colors';

const StaticNavigationHeader = ({title, iconName = 'chevron-left', iconSize = 40, iconStyle = {}}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, iconStyle]}>
        <Icon name={iconName} size={iconSize} color='black'/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    left:0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: colors.white,
    borderWidth: 0.2,
    borderRadius: 20,
    borderColor: colors.dark_grey,
  },
  titleContainer: {
    backgroundColor: 'green',
  },  
  title: {
    fontSize: 20,
    color: colors.black,
    alignSelf: 'center',
    fontWeight: '500',
  },
});

export default StaticNavigationHeader;