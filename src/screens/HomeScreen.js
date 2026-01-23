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
          resolvedToken = '';
          break;
        case 'DEVX':
          resolvedToken = '';
          break;
        case 'SIGN':
          resolvedToken = '';
          break;
        case 'POC':
        default:
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJBTUVORE9aQUBaWVRSVVNULkNPTSIsInVzdVN1Y0lkIjoxOTIsInVzdUVtcHNJZCI6NzgsInVzdUFwbElkIjoxLCJ1c2VyX25hbWUiOiJQT0MtUFRBLUNMLUFQSS1MTSIsInR1c3VJZCI6MSwidmVyc2lvbiI6IjIuMCIsInVzdUNvSW50ZXJubyI6IlBPQy1QVEEtQ0wtQVBJLUxNIiwiYXV0aG9yaXRpZXMiOlsia2g4OU9kdW9PZHBINWNqVG9rb2JoQXQxVkVBPSIsIngwRjRNMjR4b1lxdVhOSGVIWEwvMEIwMENudz0iLCJRNCtKUExnblJTRkVSZjJaN0cvdUdmYVlIcHc9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiSmhQRXZuTmpGOGIwWDdtdjBNdjRVWWpVWGd3PSIsIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsInk1dDlXRlRpNy9SYW8rWU9OYjRicnh3Q2FFaz0iLCJiWmg1SUY1d0crQTNDdnFzVmdPZVE3QVl3dTg9IiwiMm9TZ3JmdU9wbTB3QXpqNzhXbHA5eWoyQUJvPSJdLCJjbGllbnRfaWQiOiIyMDUxNzIwNzMzMSIsInVzdUlkIjoyMDQzLCJ1c3VQZXJJZCI6NzYzMiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwidGlEb2NVc3VhcmlvIjoxLCJudURvY1VzdWFyaW8iOiI4NDU2MTE1NiIsInN1Y3VEZXNjcmlwY2lvbiI6IlBSSU5DSVBBTCIsImV4cCI6MTkyNjg1NTU4Niwic3VjdUNvZGlnbyI6IjEiLCJqdGkiOiJ0LV9mR0ZiQ3BjcllpSkNMOGtlZC1FcmVCZ1kifQ.HmAu4oK7pj4FK18i65uF3pL_N_Wh9hqmt-BmjnUWZyaF0Cb9Erkak7-BtIkaHjp4ZXs2pRB5Dj3C8qSdD22f9oZS6tiEe7G8DlUnvotRsGoyGskEPtZSNBNndeEDnvbIWwlG7XZ-6JFVYpeym5T14AMQKSBszkXkgTg03dGdXnA6-aLgK-LXkFAbYyPz6yWSHdVNYOPkhTi39CGIH1DO0ZTpNzUfQ-5RoFqP6wSPAXVA-0aaSGHjVyIb_N8HPbdisOrsf7NTxJPbfvbDwI6dNw0zP_LNvDkWStb-NUGiOGjK0mglFs6u1fXYEsea8IqLR1FcvDEjYtaFz9Y26cgorg';
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
        placeholder="Ambiente (DEFAULT POC) (DEV2, POC, DEVX, SIGN)"
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
