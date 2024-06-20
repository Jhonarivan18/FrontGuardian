import {StyleSheet} from "react-native";

const RegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageBackground: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
        bottom: '0%'
    },
    form:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position:'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        padding: 30
    },
    formText:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    formInput:{
        flexDirection: "row",
        marginTop: 20
    },
    formTextInput:{
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#F23469',
        marginLeft: 15
    },
    formIcon:{
        width: 45,
        height: 45
    },
    loading: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        right: 0,
        left: 0
    }
});

export default RegisterStyles;
