import React, {useEffect} from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import useViewModel from './ViewModel'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { RoundedButton } from '../../../components/RoundedButton';


export const ProfileInfoScreen = () => {


  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { user, removeUserSession } = useViewModel();

  useEffect(() => {
    if (user.id === '') {
       navigation.replace('HomeScreen');
    }
  }, [user])
  

  return( 
      <View style ={styles.container}>
          <Image
            source={require('../../../../../assets/fondo.png')}
            style={styles.imageBackground}
          />
          <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            removeUserSession();
          }}>
                  <Image
                  source={require('../../../../../assets/logout.png')}
                  style={styles.logoutImage}
                  />
          </TouchableOpacity> 
          <View style={styles.form}>
            <View style={styles.formInfo}>
              <Image
              source={require('../../../../../assets/usuario.png')}
              style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.name} {user?.lastname}</Text>
                <Text style={styles.formTextDescription}>Nombre del Usuario</Text>
              </View>
            </View>


            <View style={{...styles.formInfo, marginTop: 15}}>
              <Image
              source={require('../../../../../assets/correo_electronico.png')}
              style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.email}</Text>
                <Text style={styles.formTextDescription}>Correo Electronico</Text>
              </View>
            </View>


            <View style={{...styles.formInfo, marginTop: 15, marginBottom: 40}}>
              <Image
              source={require('../../../../../assets/telefono.png')}
              style={styles.formImage}
              />
              <View style={styles.formContent}>
                <Text>{user?.phone}</Text>
                <Text style={styles.formTextDescription}>Telefono</Text>
              </View>
            </View>


            <RoundedButton
            onPress={() => {
              navigation.navigate('ProfileUpdateScreen', {user:user!})
            }}
            text='ACTUALIZAR INFORMACION'/>



          </View>
      </View>
  
  )
}


