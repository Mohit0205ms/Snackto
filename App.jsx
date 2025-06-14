import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Onboarding from './src/screens/onboarding/Onboarding';
import Login from './src/screens/auth/LoginScreen';
import {colors} from './src/theme/Colors';
import OTPVerificationScreen from './src/screens/auth/OTPVerificationScreen';
import AddressListScreen from './src/screens/address/AddressListScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import SelectDeliveryAddressScreen from './src/screens/address/SelectDeliveryAddressScreen';
import queryClient from './src/libraries/ReactNativeTanStackQueryClientProvider';
import {QueryClientProvider} from '@tanstack/react-query';

function App() {
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* <Onboarding/> */}
            {/* <Login/> */}
            {/* <OTPVerificationScreen/> */}
            <AddressListScreen/>
            {/* <SelectDeliveryAddressScreen /> */}
          </View>
        </SafeAreaView>
      </QueryClientProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
