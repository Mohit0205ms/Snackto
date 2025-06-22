import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native';
import { colors } from '../../theme/Colors';
import { getScreenWidth } from '../../utils/LayoutUtility';
import CustomButton from '../../components/customButton/CustomButton';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState(null);

  const handleMobileNoChange = (event) => {
    setPhoneNumber(event);
  }

  return (
    <KeyboardAvoidingView
      style={{flex:1, alignSelf: 'center'}}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Create your new{'\n'}account</Text>
          <Text style={styles.subtitle}>Welcome to the platform for food benefits</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mobile No.</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter 10-digit mobile number"
              keyboardType="numeric"
              maxLength={10}
              placeholderTextColor={colors.dark_grey}
              onChangeText={handleMobileNoChange}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <CustomButton
            primaryButtonText={'Register'}
            showPrimaryButton={true}
            primaryButtonStyle={styles.primaryButtonStyle}
          />
          <Text>
            Don't have an account?{' '} 
            <Text style={styles.signInHyperLink}>
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
    marginBottom: 8,
  },
  input: {
    width: getScreenWidth() - 48,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.black,
  },
  primaryButtonStyle: {
    width: getScreenWidth() - 48,
    height: 60,
    borderRadius: 40,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center'
  },
  bottomContainer: {
    width: getScreenWidth(),
    height: getScreenWidth() * 0.4,
    maxHeight: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signInHyperLink: {
    color: colors.primaryColor,
    fontWeight: '500'
  }
});

export default LoginScreen; 