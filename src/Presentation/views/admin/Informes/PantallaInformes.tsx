/* import React, { useState } from 'react'
import { Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
/*  probar diferencias
import { StatusBar } from 'react-native';
 */ /*
export default function AdminScreenInformes() {

  const [descargaProgreso, setDescargaprogreso] = useState(0)
  const [descarga, setDescarga] = useState()

  return (
    <View>    
      {descarga}<Text> Progreso{descargaProgreso}%</Text>
      <StatusBar style="auto" />
    </View>
  )
}

///
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [download, setDownload] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const callback = (progress:any) => {
    const percentProgress = (
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
      100
    ).toFixed(2);
    setDownloadProgress(percentProgress);
  };

  useEffect(() => {
    const getDownloadable = async () => {
      try {
        const savedDownloadJSON = await AsyncStorage.getItem("download");

        if (savedDownloadJSON !== undefined && savedDownloadJSON !== null) {
          const savedDownload = JSON.parse(savedDownloadJSON);
          const downloadResumable = FileSystem.createDownloadResumable(
            savedDownload.url,
            savedDownload.fileUri,
            savedDownload.options,
            callback,
            savedDownload.resumeData
          );

          setDownload(downloadResumable);
          setIsPaused(true);
          setIsDownloading(true);
        } else {
          const downloadResumable = FileSystem.createDownloadResumable(
            "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            FileSystem.documentDirectory + "large.mp4",
            {},
            callback
          );
          setDownload(downloadResumable);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDownloadable();

    return async () => {
      if (isDownloading) {
        await pauseDownload();
      }
    };
  }, []);

  const downloadFile = async () => {
    setIsDownloading(true);
    const { uri } = await download.downloadAsync();
    AsyncStorage.removeItem("download");
    setIsDownloaded(true);
  };

  const pauseDownload = async () => {
    setIsPaused(true);
    await download.pauseAsync();
    AsyncStorage.setItem("download", JSON.stringify(download.savable()));
    console.log("Paused download");
  };

  const resumeDownload = async () => {
    setIsPaused(false);
    const { uri } = await download.resumeAsync();
    AsyncStorage.removeItem("download");
    setIsDownloaded(true);
  };

  const resetDownload = async () => {
    setIsDownloaded(false);
    setIsDownloading(false);
    setIsPaused(false);
    setDownloadProgress(0);

    AsyncStorage.removeItem("download");
    const downloadResumable = FileSystem.createDownloadResumable(
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      FileSystem.documentDirectory + "large.mp4",
      {},
      callback
    );
    setDownload(downloadResumable);
  };

  const exportDownload = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "large.mp4",
          { encoding: FileSystem.EncodingType.Base64 }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "large.mp4",
          "application/mp4"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.base64,
            });
          })
          .catch((e) => console.log(e));
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + "large.mp4");
    }
  };

  return (
    <View style={styles.container}>
      {isDownloading && <Text>Progress: {downloadProgress}%</Text>}
      {!isDownloading && !isPaused && (
        <Button title="Download" onPress={downloadFile} />
      )}
      {isDownloading && !isPaused && (
        <Button title="Pause" onPress={pauseDownload} />
      )}
      {isPaused && <Button title="Resume" onPress={resumeDownload} />}
      {(isDownloading || isDownloaded) && (
        <Button title="Reset" onPress={resetDownload} />
      )}

      {isDownloaded && <Button title="Export File" onPress={exportDownload} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});



///
 */


//////// inicio 
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [download, setDownload] = useState<FileSystem.DownloadResumable | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const callback = (progress: any) => {
    const percentProgress = (
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
      100
    ).toFixed(2);
    setDownloadProgress(Number(percentProgress));
  };

  useEffect(() => {
    const getDownloadable = async () => {
      try {
        const savedDownloadJSON = await AsyncStorage.getItem("download");

        if (savedDownloadJSON !== undefined && savedDownloadJSON !== null) {
          const savedDownload = JSON.parse(savedDownloadJSON);
          const downloadResumable = FileSystem.createDownloadResumable(
            savedDownload.url,
            savedDownload.fileUri,
            savedDownload.options,
            callback,
            savedDownload.resumeData
          );

          setDownload(downloadResumable);
          setIsPaused(true);
          setIsDownloading(true);
        } else {
          const downloadResumable = FileSystem.createDownloadResumable(
            "https://docs.google.com/spreadsheets/d/1YiPOVlcAZzUmIObubvGVsyty2QYIMnsD/edit?usp=sharing&ouid=112342324574499616111&rtpof=true&sd=true",
            FileSystem.documentDirectory + "prueba.xlsx",
            {},
            callback
          );
          setDownload(downloadResumable);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDownloadable();

    return () => {
      if (isDownloading) {
        pauseDownload();
      }
    };
  }, []);

  const downloadFile = async () => {
    setIsDownloading(true);
    if (download) {
      const { uri } = await download.downloadAsync();
      AsyncStorage.removeItem("download");
      setIsDownloaded(true);
    }
  };

  const pauseDownload = async () => {
    if (download) {
      setIsPaused(true);
      await download.pauseAsync();
      AsyncStorage.setItem("download", JSON.stringify(download.savable()));
      console.log("Paused download");
    }
  };

  const resumeDownload = async () => {
    if (download) {
      setIsPaused(false);
      const { uri } = await download.resumeAsync();
      AsyncStorage.removeItem("download");
      setIsDownloaded(true);
    }
  };

  const resetDownload = async () => {
    setIsDownloaded(false);
    setIsDownloading(false);
    setIsPaused(false);
    setDownloadProgress(0);

    AsyncStorage.removeItem("download");
    const downloadResumable = FileSystem.createDownloadResumable(
      "https://docs.google.com/spreadsheets/d/1YiPOVlcAZzUmIObubvGVsyty2QYIMnsD/edit?usp=sharing&ouid=112342324574499616111&rtpof=true&sd=true",
       FileSystem.documentDirectory + "prueba.xlsx",
      {},
      callback
    );
    setDownload(downloadResumable);
  };

  const exportDownload = async () => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(
          FileSystem.documentDirectory + "prueba.xlsx",
          { encoding: FileSystem.EncodingType.Base64 }
        );

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "prueba.xlsx",
          "application/mp4"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      }
    } else {
      await Sharing.shareAsync(FileSystem.documentDirectory + "prueba.xlsx");
    }
  };

  return (
    <View style={styles.container}>
      {isDownloading && <Text>Progress: {downloadProgress}%</Text>}
      {!isDownloading && !isPaused && (
        <Button title="Download" onPress={downloadFile} />
      )}
      {isDownloading && !isPaused && (
        <Button title="Pause" onPress={pauseDownload} />
      )}
      {isPaused && <Button title="Resume" onPress={resumeDownload} />}
      {(isDownloading || isDownloaded) && (
        <Button title="Reset" onPress={resetDownload} />
      )}

      {isDownloaded && <Button title="Export File" onPress={exportDownload} />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


///fin

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
 