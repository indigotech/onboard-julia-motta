import {StyleSheet} from 'react-native';

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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '10%',
    marginBottom: '20%',
  },
  button: {
    width: '80%',
    backgroundColor: '#BC8F8F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  loadMoreContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  loadMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  loadMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
