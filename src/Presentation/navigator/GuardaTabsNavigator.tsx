import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GuardaScreenRegistroDispositivos } from '../views/guarda/DispositivosGuarda/DispositivosGuarda';
import { ProfileInfoScreen } from '../views/profile/info/ProfileInfo';
import { GuardaScreenBusqueda } from '../views/guarda/BusquedaGuarda/BusquedaGuarda';
import { GuardaScreenTablas } from '../views/guarda/TablasGuarda/TablasGuarda';
import { Image } from 'react-native';

//Pantallas del Guarda

const Tab = createBottomTabNavigator();

export const GuardaTabsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      name="GuardaScreenRegistroDispositivos" 
      component={GuardaScreenRegistroDispositivos}
      options={{
        title: "Registros",
        tabBarLabel: 'Registros',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/registro.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}/>

{/* -- Pantalla adicional--

      <Tab.Screen 
      name="GuardaBusqueda" 
      component={GuardaScreenBusqueda}
      options={{
        title: "Busqueda de Usuarios",
        tabBarLabel: 'Busqueda',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/buscar.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}/>
 */}

      <Tab.Screen 
      name="GuardaTablas" 
      component={GuardaScreenTablas}
      options={{
        title: "Tabla de Registros",
        tabBarLabel: 'Tablas',
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/buscar.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}/>


      <Tab.Screen 
      name="ProfileInfoScreen" 
      component={ProfileInfoScreen}
      options={{
        title: "Perfil",
        tabBarLabel: 'Perfil',
        headerShown: false,
        tabBarIcon:({color}) => (
          <Image
            source={require('../../../assets/guarda.png')}
            style= {{width: 25, height: 25}}
            />
        )
      }}/>


    </Tab.Navigator>
  );
}