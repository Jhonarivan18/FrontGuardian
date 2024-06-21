import React, { useEffect, useState } from 'react';
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
