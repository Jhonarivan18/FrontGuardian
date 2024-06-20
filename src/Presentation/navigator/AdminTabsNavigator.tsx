import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  AdminScreenInformes  from '../views/admin/Informes/PantallaInformes'; 
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { AdminScreenRegistroDispositivos } from '../views/admin/Dispositivos/RegistroDispositivos';
import { AdminScreenTablas } from '../views/admin/Tablas/tabla/Tablas';
import { Image } from 'react-native';


// Pantallas de navegacion del Administrador 
const Tab = createBottomTabNavigator();

export const AdminTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="AdminScreenInformes" 
      component={AdminScreenInformes}
      options={{
        title: "Informes",
        tabBarLabel: 'Informes',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/informes.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }} />


      <Tab.Screen 
      name="RegistroDispositivos" 
      component={AdminScreenRegistroDispositivos} 
      options={{
        title: "Registros Dispositivos",
        tabBarLabel: 'Registros',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/registro.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}/>


      <Tab.Screen 
      name="AdminScreenTablas" 
      component={AdminScreenTablas} 
      options={{
        title: "Tabla de Registros",
        tabBarLabel: 'Tablas',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/tablas.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}
      />


      <Tab.Screen 
      name="ProfileInfoScreen" 
      component={ProfileInfoScreen}
      options={{
        title: "Perfil",
        tabBarLabel: 'Perfil',
        headerShown: false,
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/perfil_administrador.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}
      />
    </Tab.Navigator>
  );
}