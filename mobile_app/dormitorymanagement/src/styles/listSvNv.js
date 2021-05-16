import { StyleSheet } from 'react-native';

const styleListNvSv = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  appBar: {
    flex: 1,
  },
  container_child: {
    flex: 9,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    elevation: 7,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    marginBottom: '2%',
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
  }
});

export { styleListNvSv };
