import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from './src/Presentation/views/home/Home';
import { RegisterScreen } from './src/Presentation/views/register/Register';
import { RolesScreen } from './src/Presentation/views/roles/Roles';
import { AdminTabsNavigator } from './src/Presentation/navigator/AdminTabsNavigator';
import { GuardaTabsNavigator } from './src/Presentation/navigator/GuardaTabsNavigator';
import { ProfileUpdateScreen } from './src/Presentation/views/profile/update/ProfileUpdate';
import { User } from './src/Domain/entities/User';
import { UserProvider } from './src/Presentation/context/UserContext';
import { Registro } from './src/Domain/entities/Registro';
import { TablaUpdateScreen } from './src/Presentation/views/admin/Tablas/update/TablaUpdate';

export type RootStackParamList = {
  HomeScreen: undefined,
  RegisterScreen: undefined,
  RolesScreen: undefined,
  AdminTabsNavigator: undefined,
  GuardaTabsNavigator: undefined,
  ProfileUpdateScreen: {user: User},
  TablaUpdateScreen: {registro: Registro},
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <UserState>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}/>

        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{
            headerShown: true,
            title: 'Nuevo usuario'}}/>

        <Stack.Screen 
          name="RolesScreen" 
          component={RolesScreen} 
          options={{
            headerShown: true,
            title: 'SELECCIONA UN ROL'}}/>

        <Stack.Screen
          name="AdminTabsNavigator"
          component={AdminTabsNavigator}/>

        <Stack.Screen
          name="GuardaTabsNavigator"
          component={GuardaTabsNavigator}/>

        <Stack.Screen
          name="ProfileUpdateScreen"
          component={ProfileUpdateScreen}
          options={{
            headerShown: true,
            title: 'ACTUALIZAR USUARIO'}}/>

        <Stack.Screen
          name="TablaUpdateScreen"
          component={TablaUpdateScreen}
          options={{
            headerShown: true,
            title: 'ACTUALIZAR REGISTRO'}}/>
            
      </Stack.Navigator>
      </UserState>
    </NavigationContainer>
  );
};

const UserState = ({children}: any) => {
  return (
    <UserProvider>
      { children }
    </UserProvider>
  )
}

export default App;