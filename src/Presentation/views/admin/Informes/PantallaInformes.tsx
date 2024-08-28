import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as XLSX from "xlsx";
import { Registro } from "../../../../Domain/entities/Registro";
import { RegistroRepositoryImpl } from "../../../../Data/repositories/RegistroRepository";

export const AdminScreenInformes = () => {
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
      try {
        const registroRepository = new RegistroRepositoryImpl();
        const registros = await registroRepository.getAll();
        setRegistros(registros);
      } catch (error) {
        console.error("Error fetching registros:", error);
      }
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

  const exportGeneralExcel = async () => {
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

  const exportPortatilesExcel = async () => {
    const marcas: { [marca: string]: number } = {};

    registros.forEach((registro) => {
      if (registro.dispositivo === 'Portatil') {
        if (marcas[registro.marca]) {
          marcas[registro.marca]++;
        } else {
          marcas[registro.marca] = 1;
        }
      }
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['Marca', 'Cantidad']]);
    
    Object.keys(marcas).forEach((marca) => {
      XLSX.utils.sheet_add_aoa(ws, [[marca, marcas[marca]]], { origin: -1 });
    });

    XLSX.utils.book_append_sheet(wb, ws, "Portatiles");

    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });

    const uri = FileSystem.documentDirectory + "portatiles.xlsx";
    await FileSystem.writeAsStringAsync(uri, wbout, { encoding: FileSystem.EncodingType.Base64 });

    if (Platform.OS === "android") {
      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          "portatiles.xlsx",
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
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.welcomeText}>¡Bienvenido a Guardián!</Text>
      <Text style={styles.descriptionText}>
        Aquí puedes generar informes en formato Excel.
        {"\n\n"}
        Utiliza los botones a continuación para descargar y exportar los archivos Excel.
      </Text>

      {isDownloading && <Text style={styles.progressText}>Progreso: {descargaProgreso}%</Text>}
      {!isDownloading && !isPaused && (
        <View style={styles.boton1}>
                  <Button title="Descargar Excel" onPress={downloadFile} />
        </View>
      )}
      {isDownloading && !isPaused && (
        <View style={styles.boton2}>
                  <Button title="Pausar Descarga" onPress={pauseDownload} />
        </View>
      )}
      <View style={styles.boton3}>
      {isPaused && <Button title="Reanudar Descarga" onPress={resumeDownload} />}
      </View>

      {(isDownloading || isDownloaded) && (
        <View style={styles.boton4}>
          <Button title="Reiniciar" onPress={resetDownload} />
        </View>
      )}
      {isDownloaded && (
        <>
        <View style={styles.boton5}>
          <Button title="Exportar Informe General" onPress={exportGeneralExcel} />
          <View style={styles.boton6}>
          <Button title="Exportar Informe de Portátiles" onPress={exportPortatilesExcel} />
          </View>
        </View>
        </>
      )}
      
      

{isDownloaded && (
        <Text style={styles.instructionsText}>
          Descarga los archivos Excel para acceder a la información de los registros.
          {"\n\n"}
          <Text style={styles.infoGeneral}>Informe General:</Text> Contiene todos los registros.
          {"\n\n"}
          <Text style={styles.infoPortatil}>Informe de Portátiles:</Text> Contiene la cantidad de portátiles por marca.
        </Text>
      )}

      <StatusBar style="auto" />
    </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical:20
  },
  progressText: {
    fontSize: 18,
    marginBottom: 10,
  },
  boton1: {
    margin: 10,
  },
  boton2: {
    margin: 10
  },
  boton3: {
    margin: 10
  },
  boton4: {
    margin: 10
  },
  boton5: {
    margin: 10,
  },
  boton6: {
    marginTop: 30
  },
  instructionsText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 90
  },
  infoGeneral:{
    fontWeight: 'bold',
    marginBottom: 150 
  },
  infoPortatil:{
    fontWeight: 'bold',
  }
}
); 
