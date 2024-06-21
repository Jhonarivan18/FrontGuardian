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

  */
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Platform, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as XLSX from "xlsx";
import { Registro } from "../../../../Domain/entities/Registro";
import { RegistroRepositoryImpl } from "../../../../Data/repositories/RegistroRepository";

export default function AdminScreenInformes() {
  const [descargaProgreso, setDescargaProgreso] = useState<number>(0);
  const [descarga, setDownload] = useState<FileSystem.DownloadResumable | undefined>(undefined);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [registros, setRegistros] = useState<Registro[]>([]);

  const callback = (progress: any) => {
    const percentProgress = (
      (progress.totalBytesWritten / progress.totalBytesExpectedToWrite) *
      100
    ).toFixed(2);
    setDescargaProgreso(Number(percentProgress));
  };

  useEffect(() => {
    const fetchRegistros = async () => {
      const registroRepository = new RegistroRepositoryImpl();
      const registros = await registroRepository.getAll();
      setRegistros(registros);
    };

    const getDownloadable = async () => {
      try {
        const savedDownloadJSON = await AsyncStorage.getItem("descarga");

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

    fetchRegistros();
    getDownloadable();

    return () => {
      if (isDownloading) {
        pauseDownload();
      }
    };
  }, []);

  const downloadFile = async () => {
    setIsDownloading(true);
    if (descarga) {
      const result = await descarga.downloadAsync();
      if (result) {
        AsyncStorage.removeItem("descarga");
        setIsDownloaded(true);
      }
    }
  };

  const pauseDownload = async () => {
    if (descarga) {
      setIsPaused(true);
      await descarga.pauseAsync();
      AsyncStorage.setItem("descarga", JSON.stringify(descarga.savable()));
      console.log("Paused descarga");
    }
  };

  const resumeDownload = async () => {
    if (descarga) {
      setIsPaused(false);
      const result = await descarga.resumeAsync();
      if (result) {
        AsyncStorage.removeItem("descarga");
        setIsDownloaded(true);
      }
    }
  };

  const resetDownload = async () => {
    setIsDownloaded(false);
    setIsDownloading(false);
    setIsPaused(false);
    setDescargaProgreso(0);

    AsyncStorage.removeItem("descarga");
    const downloadResumable = FileSystem.createDownloadResumable(
      "https://docs.google.com/spreadsheets/d/1YiPOVlcAZzUmIObubvGVsyty2QYIMnsD/edit?usp=sharing&ouid=112342324574499616111&rtpof=true&sd=true",
      FileSystem.documentDirectory + "prueba.xlsx",
      {},
      callback
    );
    setDownload(downloadResumable);
  };

  const exportDownload = async () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(registros);
    XLSX.utils.book_append_sheet(wb, ws, "Registros");

    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    const uri = FileSystem.documentDirectory + "registros.xlsx";
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });

    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "registros.xlsx",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });
          })
          .catch((e) => console.log(e));
      }
    } else {
      await Sharing.shareAsync(uri);
    }
  };

  return (
    <View style={styles.container}>
      {isDownloading && <Text>Progress: {descargaProgreso}%</Text>}
      {!isDownloading && !isPaused && (
        <Button title="Descargar Excel" onPress={downloadFile} />
      )}
      {isDownloading && !isPaused && (
        <Button title="Pausar Descarga" onPress={pauseDownload} />
      )}
      {isPaused && <Button title="Reanudar Descarga" onPress={resumeDownload} />}
      {(isDownloading || isDownloaded) && (
        <Button title="Reiniciar" onPress={resetDownload} />
      )}
      {isDownloaded && <Button title="Exportar Excel" onPress={exportDownload} />}
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
