import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {styles} from './styles';

interface CustomRadioButtonProps {
  label: string;
  checked: boolean;
  onPress: () => void;
}

export const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  label,
  checked,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
      <Text>{label}</Text>
      <View
        style={[styles.radioButton, checked && styles.radioButtonChecked]}
      />
    </TouchableOpacity>
  );
};
