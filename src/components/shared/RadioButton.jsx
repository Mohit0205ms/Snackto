import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RadioButton = ({ 
  isSelected, 
  onPress = () => {}, 
  value, 
  size = 25, 
  color = 'black', 
  disabled = false,
  style 
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      disabled={disabled}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Icon
        name={isSelected ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RadioButton;