import { StyleSheet } from "react-native";

const Homestyles = StyleSheet.create({
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
        height: '50%',
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
    formRegister:{
        flexDirection: 'row',
        justifyContent:'center',
        marginTop: 15
    },
    formRegisterText:{
        fontStyle: 'italic',
        fontWeight: 'bold', 
        marginLeft: 10,
        color:'#F23469',
        borderBottomWidth: 1,
        borderBottomColor: '#F23469'
    },
    logoContainer:{
        position: 'absolute',
        alignSelf: 'center',
        top: '10%'   
    },
    logoImage: {
        width: 115,
        height: 150,
    },
    logoText:{
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0
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

export default Homestyles;