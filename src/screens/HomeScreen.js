import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  NativeModules, // usar NativeModules
  ScrollView,
} from 'react-native';

const { ZyprotectabioModule } = NativeModules;

export default function HomeScreen() {
  /* =========================
   * STATE
   * ========================= */
  const [coError, setCoError] = useState('');
  const [deError, setDeError] = useState('');
  const [coErrorButton, setCoErrorButton] = useState('');
  const [deErrorButton, setDeErrorButton] = useState('');
  const [idSolicitud, setIdSolicitud] = useState('');

  const [tiDocumento, setTiDocumento] = useState('');
  const [nuDocumento, setNuDocumento] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [token, setToken] = useState('');
  const [manualToken, setManualToken] = useState('');

  /* =========================
   * componentDidMount
   * ========================= */
  useEffect(() => {
    setTiDocumento('1');

    const timer = setTimeout(() => {
      setToken('TOKEN_INICIAL_SIMULADO');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
   * ACTION
   * ========================= */
  const onTestPress = async () => {
    if (!ZyprotectabioModule) {
      Alert.alert(
        'Error',
        '❌ ZyprotectabioModule no está registrado\n(Dev Build incorrecto)'
      );
      return;
    }

    try {
      /* =========================
       * RESOLVER TOKEN POR AMBIENTE
       * ========================= */
      let resolvedToken = token;

      switch (ambiente) {
        case 'DEV2':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJKU0FFTloyQFpZVFJVU1QuQ09NIiwidXN1U3VjSWQiOjQ1NTEsInVzdUVtcHNJZCI6OTc4LCJ1c3VBcGxJZCI6MCwidXNlcl9uYW1lIjoiREVTQS1QVEEtU1EzLUFQSS1MTSIsInR1c3VJZCI6MSwidmVyc2lvbiI6IjIuMCIsInVzdUNvSW50ZXJubyI6IkRFU0EtUFRBLVNRMy1BUEktTE0iLCJhdXRob3JpdGllcyI6WyJ4MEY0TTI0eG9ZcXVYTkhlSFhMLzBCMDBDbnc9IiwiSmhQRXZuTmpGOGIwWDdtdjBNdjRVWWpVWGd3PSIsIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsIjZJb0ZHQU9SSDNHcGUxYmlqdlB4MDY1bVlZUT0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9Iiwick5ia3FvTDBSMlc4MysveDRaUUV4eUd1cXVBPSIsImFyclJjanorY3M1N3hNV1VLVndNN2lPayt5dz0iLCJ5NXQ5V0ZUaTcvUmFvK1lPTmI0YnJ4d0NhRWs9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjo2MTc4LCJ1c3VQZXJJZCI6MCwic2NvcGUiOlsidHJ1c3QiLCJyZWFkIiwid3JpdGUiXSwidGlEb2NVc3VhcmlvIjo2LCJudURvY1VzdWFyaW8iOiIwMDAwMDAwMDAwIiwic3VjdURlc2NyaXBjaW9uIjoiUFJJTkNJUEFMIiwiZXhwIjoxOTI2NTE1NTYzLCJzdWN1Q29kaWdvIjoiMSIsImp0aSI6Ik1SZEVYcHdfMGVybWNjYlQ5SzE5MjBrOENwWSJ9.MPysi1AoZvGafN4cPTPiLIaCRFLKWJAFUrgYL7OQ5Pzv-_kUhxnqIsDlgnbgOPdTmrAko1YWLHpceqVDuwWOIFGWDN-Fkowo0NPupOXDbbQslppoY0Svgnflzx_02pfRV9Zbtfwx_D6cdTSWeeEjIMO4IoTvjsXobsD2OLwla3tw6d7pxUIRvvJdu07das2GO95cnQVrR5TAA_YW_mPgGWmSrqGB8schJp2kjgOocTb7dZh7oguNDGl3J4u9TsdYcjb9iZWlrmolV2lWqmoisWInVP24P27A1Sc0o431FFJbxH3zltxG1aT3Ftu58LxEUwC7ruA7cqgKUs8ZYsEo7w';
          break;
        case 'DEVX':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJLWUFSUk9XQFpZVFJVU1QuQ09NIiwidXN1U3VjSWQiOjQ0NSwidXN1RW1wc0lkIjoxMSwidXN1QXBsSWQiOjEsInVzZXJfbmFtZSI6IkFQSS1CQU5CSUYtTU9WSUwtUE4iLCJ0dXN1SWQiOjEsInZlcnNpb24iOiIyLjAiLCJ1c3VDb0ludGVybm8iOiJBUEktQkFOQklGLU1PVklMLVBOIiwiYXV0aG9yaXRpZXMiOlsiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsImVzYlhlUU9qUko4WWZmNWkzL29yWEpCQ0xNRT0iLCJyNklGNXdRc2VmQVJFVXJqNkRjQVgwK1RJZzg9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSIsIjJvU2dyZnVPcG0wd0F6ajc4V2xwOXlqMkFCbz0iXSwiY2xpZW50X2lkIjoiMjAxMDEwMzY4MTMiLCJ1c3VJZCI6NTY2NywidXN1UGVySWQiOjE1NDY5LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJ0aURvY1VzdWFyaW8iOjEsIm51RG9jVXN1YXJpbyI6IjcwMzAzMDMwIiwic3VjdURlc2NyaXBjaW9uIjoiQkFOQklGLUJJTy1NT1ZJTC1QTiIsImV4cCI6MTg4NDI2Njk1Nywic3VjdUNvZGlnbyI6IjA4IiwianRpIjoib01YZUs4SkFpdG5TVUJOR05JbFhPOTY5dVVjIn0.iWEeW8FOfpEq6l2ARDb2THDr6AEzJYUVkZtg9-5ztvj3ynpq7LQXqXoJJmYl9WEIlHyxpYAW5AOpUp3aLVfCHND_-WvZ6D-5VSoWnXE00MUSyqMH3UqWkRY1Ra3hQdmJXzTXVpsbzCeb92GgOdDbIO93SFalMN9VgfN5ITUOB_GBfKv8P-3vcPItlERNm_YKNdIXSFbS7v2VEr-7yZIU5fDgaZun53cILL5Kd-irW3THMTmDYySOhMC0ZM8PUAIHUWjwLsrgz_ZWBnNALc9qrQHU2_AR-erN2B4Lw6uuCqvbVKjg6TPxW5K4HtgE4GUSZkIPTH3UfXP5lBPfq4dDSw';
          break;
        case 'SIGN':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJURVNUVEBaWVRSVVNULkNPTSIsInVzdVN1Y0lkIjozNzYsInVzdUVtcHNJZCI6MTEsInVzdUFwbElkIjoxLCJ1c2VyX25hbWUiOiJBUEktQkFOQklGLVRFU1RNVi1QTiIsInR1c3VJZCI6MSwidmVyc2lvbiI6IjIuMCIsInVzdUNvSW50ZXJubyI6IkFQSS1CQU5CSUYtVEVTVE1WLVBOIiwiYXV0aG9yaXRpZXMiOlsiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsImVzYlhlUU9qUko4WWZmNWkzL29yWEpCQ0xNRT0iLCJyNklGNXdRc2VmQVJFVXJqNkRjQVgwK1RJZzg9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSIsIjJvU2dyZnVPcG0wd0F6ajc4V2xwOXlqMkFCbz0iXSwiY2xpZW50X2lkIjoiMjAxMDEwMzY4MTMiLCJ1c3VJZCI6MTcwMzEsInVzdVBlcklkIjoyNzQxNiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwidGlEb2NVc3VhcmlvIjoxLCJudURvY1VzdWFyaW8iOiI3Njg3ODc2NSIsInN1Y3VEZXNjcmlwY2lvbiI6IkJBTkJJRi1CSU8tTU9WSUwtUE4iLCJleHAiOjE4OTI0MDc5NTksInN1Y3VDb2RpZ28iOiIwMTciLCJqdGkiOiJqaG5jOG1PUldvUm1adHg4Z2RKNkRROFRtVGMifQ.H4YCwWdWwSqYdN8-PYUzZSyv8YeXt02vLfGFG0C7i-z9pY7QL7kMchK--qsMvulN0PeD6HYQ32VUoV8N0cBSGgb5fLA3sy98T-juSna6UnAXUFlIu9wWYqqE0X_-qClK10cyLaiSUiWW9FJS7Vag24HHC1uHun5OYP-jOiqxIBXhtkOxtItmRPElu_AeJMG-YWj6ou7iGjGnUQwIPnLPWCNtsNjNcgfLCkYpecwdytQjvc1Z5f3rRnF9YhC2VS7sAVrG0ER77oN7LiOUgMsnlwax-cMetGmKDQYoY5u295E0EygVKWDogY9Txa9VejryYBdlf9T7ujRIksndFFy5mA';
          break;
        case 'POC':
        default:
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJTQURTQURTQURAWllUUlVTVC5DT00iLCJ1c3VTdWNJZCI6MTkyLCJ1c3VFbXBzSWQiOjc4LCJ1c3VBcGxJZCI6MSwidXNlcl9uYW1lIjoiUE9DLVBUQS1TUTMtQVBJLUxNIiwidHVzdUlkIjoxLCJ2ZXJzaW9uIjoiMi4wIiwidXN1Q29JbnRlcm5vIjoiUE9DLVBUQS1TUTMtQVBJLUxNIiwiYXV0aG9yaXRpZXMiOlsia2g4OU9kdW9PZHBINWNqVG9rb2JoQXQxVkVBPSIsIngwRjRNMjR4b1lxdVhOSGVIWEwvMEIwMENudz0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiSmhQRXZuTmpGOGIwWDdtdjBNdjRVWWpVWGd3PSIsIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsInk1dDlXRlRpNy9SYW8rWU9OYjRicnh3Q2FFaz0iLCJiWmg1SUY1d0crQTNDdnFzVmdPZVE3QVl3dTg9IiwiMm9TZ3JmdU9wbTB3QXpqNzhXbHA5eWoyQUJvPSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjoyMDQyLCJ1c3VQZXJJZCI6NzYzMSwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwidGlEb2NVc3VhcmlvIjoxLCJudURvY1VzdWFyaW8iOiI2NjE1NjE1MSIsInN1Y3VEZXNjcmlwY2lvbiI6IlBSSU5DSVBBTCIsImV4cCI6MTkyNjI1NDU1Nywic3VjdUNvZGlnbyI6IjEiLCJqdGkiOiJWQTV4RWh1UzY0R0FlZ2ZHRjBqNDJ6Ujc0X2cifQ.A8vk1SeQEnyXL2WHJaWJYItoxGI-Fw76HbkdNgqcvWxsazBeguH9drvhSnCiEID3vw0PeSplwXPdN4WhHIPWOqTRpovdmMS4pMmwTUEJA7BOIcg4my4HEO7g1BJLe1z2OCiek-xoLx-zoe5K5AlHeLyuAfguvkem2H4Cm_3dbu3zq3q1O2Qb76TthR6XBp3B0GD9JfrfLHUQA2_n3rJI3QOECcSbqmyfljRn3K3nl_RZQroPkv5QC75lI8LL-49ZX7Yv3pfLfhtBuZgzfFYX62cg5Tc0ioyddFN1PZ-Go8FwGifopl92pFSA1V5LO6iV4nGQyjaqF5WZVt72urYjTA';
          break;
      }

      if (manualToken) {
        resolvedToken = manualToken;
      }

      setToken(resolvedToken);

      /* =========================
       * OPCIONES
       * ========================= */
      const opciones = {
        tiDocumento,// tipo Documento : DNI
        nuDocumento,// Número de documento
        accessToken: resolvedToken, // Access token generado por ambiente
        bioPais: 'PE', //Pais de verificacion (siempre PE)
        tiOperacion: tipoOperacion, //Operacion
        urlSource: ambiente // Ambiente a la conexion DEV2 , POC , DEVX , SIGN (PRODUCCION)
      };

      const result =
        await ZyprotectabioModule.onZyBioCapture(opciones);

      /* =========================
       * RESULTADOS
       * ========================= */
      setCoError(result?.coError ?? ''); //Codigo de resultado de WS de zytrust
      setDeError(result?.deError ?? ''); //Descripcion de resultado de WS de zytrust
      setCoErrorButton(result?.coErrorButton ?? ''); //Codigo de Salida especial con selección de boton, ejemplo 9104
      setDeErrorButton(result?.deErrorButton ?? ''); //Descripcion de codigo de Salida especial con selección de boton, ejemplo 9104: El usuario canceló la operación
      setIdSolicitud(result?.idSolicitud ?? ''); //Id de la Solicitud

    } catch (e) {
      Alert.alert(
        'Error',
        `❌ Error validacionFacialOcr:\n${e?.message ?? String(e)}`
      );
    }
  };

  /* =========================
   * UI
   * ========================= */
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: 'https://www.zytrust.com/wp-content/uploads/2022/08/logotipo-footer-zytrust.webp',
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese número de documento"
        value={nuDocumento}
        onChangeText={setNuDocumento}
        keyboardType="numeric"
        maxLength={8}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo Operación (FLUJO_FACIAL_MANUAL)"
        value={tipoOperacion}
        onChangeText={(text) => setTipoOperacion(text.toUpperCase())}
        autoCapitalize="characters"
      />

      <TextInput
        style={styles.input}
        placeholder="Ambiente (DEV2, POC, DEVX, SIGN)"
        value={ambiente}
        onChangeText={(text) => setAmbiente(text.toUpperCase())}
        autoCapitalize="characters"
        maxLength={4}
      />

      <TextInput
        style={styles.input}
        placeholder="Token manual (opcional)"
        value={manualToken}
        onChangeText={setManualToken}
      />

      <TouchableOpacity style={styles.button} onPress={onTestPress}>
        <Text style={styles.buttonText}>Autenticar</Text>
      </TouchableOpacity>

      {/* RESULTADOS */}
      <Text>{'coError: ' + coError}</Text>
      <Text>{'deError: ' + deError}</Text>
      <Text>{'coErrorButton: ' + coErrorButton}</Text>
      <Text>{'deErrorButton: ' + deErrorButton}</Text>
      <Text>{'idSolicitud: ' + idSolicitud}</Text>

      <Text style={styles.footer}>
        ZyTrust SA - Copyright 2026
      </Text>
    </ScrollView>
  );
}

/* =========================
 * STYLES
 * ========================= */
const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 30,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    textAlign: 'center',
  },
});
