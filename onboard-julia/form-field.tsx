import React, {FC} from 'react';
import {TextInputProps, TextProps} from 'react-native';
import styled, {css} from 'styled-components/native';

export const FormField: FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  errorText,
  autoCapitalize = 'sentences',
  secureTextEntry = false,
}) => {
  return (
    <FormContainer>
      <FormLabel error={error}>{label}</FormLabel>
      <FormTextField
        value={value}
        onChangeText={onChangeText}
        error={error}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
      {error && <FormCaption error>{errorText}</FormCaption>}
    </FormContainer>
  );
};

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error: boolean;
  errorText: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
}

interface FormTextFieldProps extends TextInputProps {
  error?: boolean;
}

interface FormTextProps extends TextProps {
  error?: boolean;
}

const FormContainer = styled.View`
  height: auto;
  width: 300px;
`;

export const FormLabel = styled.Text<FormTextProps>`
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin-bottom: 4px;
  margin-top: 8px;

  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

const FormTextField = styled.TextInput<FormTextFieldProps>`
  border-width: 1px;
  border-color: #777777;
  padding: 8px;
  margin-bottom: 8px;
  width: 300px;
  ${props =>
    props.error &&
    css`
      border-color: red;
    `}
`;

const FormCaption = styled.Text<FormTextProps>`
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin-bottom: 8px;
  text-align: justify;
`;
