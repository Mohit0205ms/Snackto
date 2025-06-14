import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../../theme/Colors';

const StaticNavigationHeader = ({title, iconSrc, iconStyle = 40, buttonStyle = {}}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconContainer, buttonStyle]}>
        <Image source={iconSrc} style={iconStyle} />
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