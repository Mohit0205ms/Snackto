import { useRef, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../theme/Colors";
import { getScreenWidth } from "../../utils/LayoutUtility";
import Timer from "../../components/timer/timer";
import CustomButton from "../../components/customButton/CustomButton";
import StaticNavigationHeader from "../../components/header/StaticNavigationHeader";
import { isIOS } from "../../utils/BooleanUtility";
import { assetsIcon } from "../../assets/Index";

const OTPVerificationScreen = () => {
  const isIosDevice = isIOS();
  const [otp, setOtp] = useState(["","","",""]);
  const otpInputRef = useRef([]);

  const handleOnChange = (index, value) => {
    if (isNaN(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      otpInputRef.current[index + 1].focus();
    }
  }

  const handleKeyPress = (Event, index) => {
    if (Event.nativeEvent.key === "Backspace" && index > 0) {
      otpInputRef.current[index - 1].focus();
      let newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  }

  return(
    <KeyboardAvoidingView
      behavior={isIosDevice ? 'padding' : 'height'}
      keyboardVerticalOffset={isIosDevice ? 64 : 0}
    >
      <StaticNavigationHeader title={'OTP'} iconSrc={assetsIcon.chevron_left} iconStyle={styles.iconStyle} buttonStyle={styles.buttonStyle} />
      <View style={styles.container}>
        {/* Title  */}
        <View style={styles.headerContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Mobile No. verification</Text>
            <Text style={styles.subtitle}>Enter 4-digit OTP we send you on:</Text>
            <Text style={styles.mobileNumber}>+91 - xxxxxxxxx</Text>
          </View>
          {/* OTP Holder */}
          <View style={styles.bottomContainer}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index)=>(
                <TextInput
                  key={index}
                  ref={(ref)=> (otpInputRef.current[index] = ref)}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  style={styles.otpInput}
                  onChangeText={(value) => handleOnChange(index, value)}
                  onKeyPress={(Event) => handleKeyPress(Event, index)}
                />
              ))}
            </View>
            <Text>
                Didn't receive code?{' '}
              <Text style={styles.resendInHyperLink}>
                Resend
              </Text>
            </Text>
            <Timer initialTime={120} containerStyle={styles.timerContainer}/>
          </View>
        </View>
        <CustomButton
          primaryButtonText={'Continue'}
          showPrimaryButton={true}
          primaryButtonStyle={styles.primaryButtonStyle}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: getScreenWidth() - 48,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
  },
  headerContainer: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    // 
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
  },
  mobileNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  bottomContainer: {
    width: getScreenWidth() - 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  otpInput: {
    width: 70,
    height: 80,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 25,
    backgroundColor: colors.white,
  },
  resendInHyperLink: {
    color: colors.primaryColor,
    fontWeight: '500'
  },
  primaryButtonStyle: {
    width: getScreenWidth() - 48,
    height: 60,
    borderRadius: 40,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center'
  },
  timerContainer: {
    marginTop: 10,
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
  iconStyle: {
  width: 25, 
  height: 25,
 },
})

export default OTPVerificationScreen;
