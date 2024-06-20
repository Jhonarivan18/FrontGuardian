import { StyleSheet } from "react-native";
import { ProfileInfoScreen } from './ProfileInfo';

const ProfileUpdateStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground:{
        width:'100%',
        height:'100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form:{
        width: '100%',
        height: '55%',
        backgroundColor: 'white',
        position:'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    formInfo:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    formImage: {
        width: 40,
        height: 40

    },
    formContent:{
        marginLeft: 15
    },
    formTextDescription: {
        fontSize: 12,
        color: 'gray'
    },
    logout: {
        position: 'absolute',
        top: 40,
        right: 10 
    },
    logoutImage: {
        width: 40,
        height: 40,   
    }


});

export default ProfileUpdateStyles;