import React from 'react';
import { Registro } from '../../../../../Domain/entities/Registro';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';

interface Props {
    registro: Registro;
    remove: (id: string) => void;
   /*  RegistroUpdate: (registro: Registro) => void; */
}

export const AdminScreenTablasItem = ({ registro, remove }: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    

    return (
        <View >
            <View style={styles.container}>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Nombre:</Text>
                <Text style={styles.texto}>{registro.name} {registro.lastname}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Teléfono:</Text>
                <Text style={styles.texto}>{registro.telefono}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Tipo de Documento:</Text>
                <Text style={styles.texto}>{registro.tipoDocumento}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>N.Documento:</Text>
                <Text style={styles.texto}>{registro.documento}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Dispositivo:</Text>
                <Text style={styles.texto}>{registro.dispositivo}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Marca:</Text>
                <Text style={styles.texto}>{registro.marca}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Color:</Text>
                <Text style={styles.texto}>{registro.color}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Serial:</Text>
                <Text style={styles.texto}>{registro.serial}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Observación:</Text>
                <Text style={[styles.texto, styles.descripcion]}>{registro.descripcion}</Text>
            </View>
            <View style={styles.columna}>
                <Text style={styles.titulo}>Fecha y Hora Creación:</Text>
                <Text style={styles.texto}>{formatDate(registro.created_at)}</Text>
            </View>

                <View style={styles.actionContainer}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('TablaUpdateScreen',{registro:registro!}) }>
                        <Image
                            style={styles.actionImage}
                            source={require('../../../../../../assets/editar.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => remove(registro.id!)}>
                        <Image
                            style={styles.actionImage}
                            source={require('../../../../../../assets/eliminar.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View ></View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    columna: {
        width: '50%',
        paddingHorizontal: 5,
        marginBottom: 10,
    },
    titulo: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    texto: {
        fontSize: 16,
        marginBottom: 5,
    },
    descripcion: {
        fontStyle: 'italic',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionImage: {
        width: 30,
        height: 30,
        marginHorizontal: 10,
    },
});


/* const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    nombres: {
        fontSize: 19,
    },
    info: {
        color: 'black',
        margin: 15,
        flex: 1,
    },
    text: {
        color: 'gray',
        fontSize: 15,
    },
    actionImage: {
        width: 35,
        height: 35,
        marginVertical: 15,
    },
    actionContainer: {
        marginRight: 20
    },
    divider: {
        height: 1,
        backgroundColor: '#F23469',
        marginHorizontal: 30,
        flex: 1,
    },
});
 */


/* import React from 'react'
import { Registro } from '../../../../../Domain/entities/Registro';
import { View, StyleSheet, Text, Image, TouchableOpacity  } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../../App';
import { useNavigation } from '@react-navigation/native';

interface Props {
    registro: Registro;
    remove:(id: string) => void;
}

export const AdminScreenTablasItem  = ({registro, remove}: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    ///funcion formatDate permite visualizar la fecha de creacion del registro... LINEA 37
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString(); 
    };
    
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.nombres}>{registro.name} {registro.lastname}</Text>
                <Text style={styles.text}>Telefono: {registro.telefono}</Text>
                <Text style={styles.text}>Tipo de Documento: {registro.tipoDocumento}</Text>
                <Text style={styles.text}>N.Documento: {registro.documento} </Text>
                <Text style={styles.text}>Dispositivo: {registro.dispositivo}</Text>
                <Text style={styles.text}>Marca: {registro.marca}</Text>
                <Text style={styles.text}>Color: {registro.color}</Text>
                <Text style={styles.text}>Serial: {registro.serial}</Text>
                <Text style={styles.text}>Observación: {registro.descripcion}</Text>
                <Text style={styles.text}>Fecha y Hora Creacion: {formatDate(registro.created_at)}</Text>
            </View>

        <View style={styles.actionContainer}>
             <TouchableOpacity
                onPress={() =>{
                    navigation.navigate('TablaUpdateScreen', {registro:registro!})
                    }}>
                <Image
                    style={styles.actionImage}
                    source={require('../../../../../../assets/editar.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                    onPress={() => remove(registro.id!)}>
                    <Image
                        style={styles.actionImage}
                        source={require('../../../../../../assets/eliminar.png')}
                    />
              </TouchableOpacity>
        </View>
        </View>
        
         <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
    },
    nombres:{
        fontSize: 19
    },
    info: {
        color: 'black',
        margin: 15,
        flex: 1
    },
    text: {
        color: 'gray',
        fontSize: 15
    },
    actionImage: {
        width: 35,
        height: 35,
        marginVertical: 15
    },
    actionContainer:{
        marginRight: 20
    },
    divider:{
        height: 1,
        backgroundColor: '#F23469',
        marginHorizontal: 30,
        flex: 1
    }
});
 */