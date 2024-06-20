import React from 'react'
import { Text, View} from 'react-native';

export const AdminScreenInformes = () => {

  return (
    <View>

      
      <Text> Pantalla Admin de informes</Text>
    </View>
  )
}


/* import React from 'react';
import { Button, View } from 'react-native';
import ExcelJS from 'exceljs';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Platform } from 'react-native';

const GenerateExcel = () => {
  const generateExcel = async () => {
    // Crear un nuevo libro de trabajo y una hoja
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Añadir datos de ejemplo
    worksheet.columns = [
      { header: 'Nombre', key: 'name', width: 20 },
      { header: 'Edad', key: 'age', width: 10 },
    ];

    worksheet.addRows([
      { name: 'Juan', age: 28 },
      { name: 'Ana', age: 22 },
      { name: 'Luis', age: 32 },
    ]);

    // Escribir el archivo a un buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Convertir el buffer a base64
    const base64 = buffer.toString('base64');

    // Definir la ruta y el nombre del archivo
    const path = `${RNFS.DocumentDirectoryPath}/example.xlsx`;

    // Guardar el archivo usando RNFS
    await RNFS.writeFile(path, base64, 'base64');

    // Compartir el archivo
    const shareOptions = {
      url: Platform.OS === 'ios' ? path : `file://${path}`,
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      title: 'Compartir archivo Excel',
    };

    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error al compartir el archivo', error);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Generar Excel" onPress={generateExcel} />
    </View>
  );
};

export default GenerateExcel;


 */
 