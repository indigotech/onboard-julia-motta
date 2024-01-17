import React from 'react';
import {FC} from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

interface MyButtonProps extends TouchableOpacityProps {
  disabled?: boolean;
}

const MyButtonWrapper = styled.TouchableOpacity`
  height: 44px;
  background-color: #bc8f8f;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`;

export const MyButton: FC<MyButtonProps> = ({children, onPress, disabled}) => {
  return (
    <MyButtonWrapper onPress={onPress} disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </MyButtonWrapper>
  );
};
