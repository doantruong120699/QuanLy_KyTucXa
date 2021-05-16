import { StyleSheet } from 'react-native';

const stylePages = StyleSheet.create({
  container: {
    width: '90%',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    elevation: 7,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  viewPage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputPage: {
    width: 50,
    height: 30,
    marginLeft: 5,
    marginRight: 5,
    color: 'black',
    padding: 5,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  btnOperation: {
    width: 30,
    height: 30,
    backgroundColor: 'gray',
  }
})

export { stylePages };
