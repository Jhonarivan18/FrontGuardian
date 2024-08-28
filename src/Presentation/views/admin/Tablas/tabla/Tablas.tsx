import React, { useEffect, useState } from 'react';
import { FlatList, Image, ToastAndroid, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import useViewModel from './ViewModel';
import { AdminScreenTablasItem } from './Item';


export const AdminScreenTablas = () => {
  const { registros, responseMessage, getRegistros, deleteRegistro } = useViewModel();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(registros);
  const [refreshCount, setRefreshCount] = useState(0); // Estado para manejar el refresco

  useEffect(() => {
    getRegistros();
  }, [refreshCount]); // Llama a getRegistros cuando refreshCount cambia

  useEffect(() => {
    getRegistros();
  }, []);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    setFilteredData(registros);
  }, [registros]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = registros.filter(item => {
        const itemData = 
          item.name.toUpperCase() + ' ' + 
          item.serial.toUpperCase() + ' ' + 
          item.documento.toUpperCase() + ' ' + 
          item.lastname.toUpperCase() + ' ' + 
          (item.created_at ? new Date(item.created_at).toLocaleString().toUpperCase() : '');
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(registros);
    }
  };

  const handleRefresh = () => {
    setRefreshCount(refreshCount + 1); // Incrementa el contador de refresco
  };

  return (
    <View style={styles.handlesearch}>
      <Searchbar
        placeholder="Buscar . . ."
        onChangeText={handleSearch}
        value={search} 
      />
      <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Image
            style={styles.refreshImage}
            source={require('../../../../../../assets/recargar.png')} 
          />
        </TouchableOpacity>
        <View style={styles.lista}>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AdminScreenTablasItem registro={item} remove={deleteRegistro} />}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  handlesearch: {
    top: 10,
    margin: 5
  },
  lista:{
    marginBottom: 165, 
    zIndex: 1
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  refreshButton: {
    zIndex: 2,
    marginLeft: 300,
    top: '8%'
  },
  refreshImage: {
  
    width: 25,
    height: 25,
  },
});

/* 
import React, { useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import useViewModel from './ViewModel';
import { AdminScreenTablasItem } from './Item';

export const AdminScreenTablas = () => {
  const { registros, responseMessage, getRegistros, deleteRegistro,RegistroUpdate } = useViewModel();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(registros);

  useEffect(() => {
    getRegistros();
  }, []);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    handleSearch(search);
  }, [registros, search]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = registros.filter(item => {
        const itemData = 
          item.name.toUpperCase() + ' ' + 
          item.serial.toUpperCase() + ' ' + 
          item.documento.toUpperCase() + ' ' + 
          item.lastname.toUpperCase() + ' ' + 
          (item.created_at ? new Date(item.created_at).toLocaleString().toUpperCase() : '');
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(registros);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Searchbar
        placeholder="Buscar Documento, Serial, Fecha u Hora"
        onChangeText={handleSearch}
        value={search}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AdminScreenTablasItem registro={item} remove={deleteRegistro} RegistroUpdate={RegistroUpdate} />}
      />
    </View>
  );
} */

/* import React, { useEffect, useState } from 'react';
import { FlatList, Text, ToastAndroid, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import useViewModel from './ViewModel';
import { AdminScreenTablasItem } from './Item';

export const AdminScreenTablas = () => {
  const { registros, responseMessage, getRegistros, deleteRegistro } = useViewModel();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(registros);

  useEffect(() => {
    getRegistros();
  }, []);

  useEffect(() => {
    if (responseMessage !== '') {
      ToastAndroid.show(responseMessage, ToastAndroid.LONG);
    }
  }, [responseMessage]);

  useEffect(() => {
    setFilteredData(registros);
  }, [registros]);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const newData = registros.filter(item => {
        const itemData = 
          item.name.toUpperCase() + ' ' + 
          item.serial.toUpperCase() + ' ' + 
          item.documento.toUpperCase() + ' ' + 
          item.lastname.toUpperCase() + ' ' + 
          (item.created_at ? new Date(item.created_at).toLocaleString().toUpperCase() : '');
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(registros);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Searchbar
        placeholder="Buscar Documento, Serial, Fecha u Hora"
        onChangeText={handleSearch}
        value={search} 
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => <AdminScreenTablasItem registro={item} remove={deleteRegistro} />}
      />
    </View>
  );
}
 */