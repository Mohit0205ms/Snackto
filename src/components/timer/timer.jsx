import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { isPresent } from '../../utils/BooleanUtility';

const Timer = ({ initialTime = 60, onTimeEnd, containerStyle }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const timeLeftRef = useRef(initialTime);
  const container = isPresent(containerStyle) ? {...containerStyle, ...styles.container} : styles.container;
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    startTimeRef.current = Date.now();
    timeLeftRef.current = initialTime;
    setTimeLeft(initialTime);

    timerRef.current = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const newTimeLeft = Math.max(0, initialTime - elapsedTime);
      
      timeLeftRef.current = newTimeLeft;
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        clearInterval(timerRef.current);
        onTimeEnd?.();
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [initialTime, onTimeEnd]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={container}>
      <Icon name='schedule' size={30} color={colors.dark_grey}/>
      <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    maxWidth: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.dark_grey,
  },
});

export default Timer;
