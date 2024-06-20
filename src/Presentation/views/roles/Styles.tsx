import { StyleSheet} from 'react-native';

const ItemStyles = StyleSheet.create({
    container: {
        alignSelf:'center',
        paddingBottom: 20,
        paddingHorizontal: 7

    },

    imageContainer:{
        flex: 1,
        backgroundColor:'white',
        borderRadius: 20
    },

    image: {
        flex: 1,
        resizeMode: 'contain'
    },

    titleContainer: {
        height: 50,
        backgroundColor: 'orange',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        color: 'white',

    }
    
});

export default ItemStyles;