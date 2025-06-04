import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Images } from '../../assets/Index';
import { getScreenHeight, getScreenWidth } from '../../utils/LayoutUtility';
import { colors } from '../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Onboarding = () => {
  return (
    <ImageBackground
      source={Images.onboarding}
      style={styles.background}
      resizeMode='contain'
    >
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>We serve </Text>
          <Text style={styles.title}>incomparable</Text>
          <Text style={styles.title}>delicacies</Text>
        </View>
        <Text style={styles.subtitle}>All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRing}>
            <TouchableOpacity style={styles.button}>
              <Icon name="arrow-forward" size={30} color={colors.primaryColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'column',
    width: getScreenWidth(),
    height: getScreenHeight(),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.primaryColor,
    borderRadius: 60,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
    width: getScreenWidth() * 0.85,
    height: getScreenWidth(),
    marginBottom: 40,
    maxHeight: 400,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: colors.white,
    marginTop: -10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
    color: colors.white,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonRing: {
    width: 80,
    height: 80,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Onboarding; 
