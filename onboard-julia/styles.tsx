import {StyleSheet, TextInputProps, TextProps} from 'react-native';
import styled, {css} from 'styled-components/native';

interface FormTextFieldProps extends TextInputProps {
  error?: boolean;
}

interface FormTextProps extends TextProps {
  error?: boolean;
}

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    width: '80%',
  },
  usersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 10,
    color: '#555',
  },
  listContainer: {
    justifyContent: 'center',
  },
  usersTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '5%',
    marginBottom: '5%',
  },
  addButton: {
    marginRight: 16,
    padding: 10,
  },
  addButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#BC8F8F',
    marginRight: 8,
    marginLeft: '5%',
  },
  radioButtonChecked: {
    backgroundColor: '#BC8F8F',
  },
  detailsContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const MyButton = styled.TouchableOpacity`
  height: 44px;
  background-color: #bc8f8f;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 80%;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
`;

export const FormLabel = styled.Text<FormTextProps>`
  font-size: 12px;
  font-weight: normal;
  color: #777777;
  margin-bottom: 12px;

  ${props =>
    props.error &&
    css`
      color: red;
    `}
`;

export const FormTextField = styled.TextInput<FormTextFieldProps>`
  border-width: 1px;
  border-color: #777777;
  padding: 8px;
  width: 80%;
  margin-bottom: 12px;
  ${props =>
    props.error &&
    css`
      border-color: red;
    `}
`;

export const FormCaption = styled.Text<FormTextProps>`
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin-top: 4px;
  margin-bottom: 4px;
  ${props =>
    !props.error &&
    css`
      display: none;
    `}
`;
