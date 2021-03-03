import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    AsyncStorage.setItem(key, value);
}

const getData = async () => {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
        return value;
    }
}

export {storeData, getData};