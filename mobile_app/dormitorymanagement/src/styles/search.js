import { StyleSheet } from 'react-native';

const styleSearch = StyleSheet.create({
  viewSearch: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
    marginBottom: 10,
  },
  inputTextSearch: {
    flex: 7,
    marginRight: 10,
    elevation: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  btnSearch: {
    padding: 10,
    elevation: 7,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  textBtnSearch: {
    color: 'white',
  },
});

export { styleSearch };
