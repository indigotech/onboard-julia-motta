import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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
