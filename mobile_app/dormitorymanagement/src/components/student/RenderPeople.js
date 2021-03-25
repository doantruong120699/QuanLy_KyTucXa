import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RenderPeople = (number) => {
    for (i = 0; i < number; i++) {
        return (

            <FontAwesome5 style={styles.iconPeople} name="male" />
        )
    }
}
export default RenderPeople;