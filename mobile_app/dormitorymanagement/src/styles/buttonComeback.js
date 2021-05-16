import { StyleSheet } from 'react-native';

const styleBtnComeBack = StyleSheet.create({
  comeBack: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttonComback: {
    position: 'absolute',
    left: '5%',
  },
  iconUndo: {
    fontSize: 20,
  },
});

export { styleBtnComeBack };
