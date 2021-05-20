import { StyleSheet } from 'react-native';

const styleItemSvNv = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
  },
  viewData: {
    flexDirection: 'row',
    height: 30,
  },
  data: {
    fontSize: 15,
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
  },
  opacity: {
    backgroundColor: 'gray',
    opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    elevation: 5
  },
  rowItem: {
    flexDirection: 'row',
  },
  title: {
    width: '30%',
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 5,
  },
  buttonOpen: {
    width: '80%',
    height: '90%',
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
  }
});

export { styleItemSvNv };
