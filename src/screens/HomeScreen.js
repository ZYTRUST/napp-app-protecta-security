import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  NativeModules,
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

  const [tiDocumento, setTiDocumento] = useState('1');
  const [nuDocumento, setNuDocumento] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('FLUJO_FACIAL_MANUAL');
  const [ambiente, setAmbiente] = useState('DEV2');
  const [token, setToken] = useState('');
  const [manualToken, setManualToken] = useState('');
  const [nuPasos, setNuPasos] = useState(3);
  const [pasoActual, setPasoActual] = useState(2);
  const [flujoExterno, setFlujoExterno] = useState('');

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
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiIwRUROMDc4OEJMQE1LWkFTTy5DT00iLCJ1c3VTdWNJZCI6MjI3MSwidXN1RW1wc0lkIjo0NiwidXN1QXBsSWQiOjEsInVzZXJfbmFtZSI6IkFQSS1CQU5CSUYtTU9WSUwtUE4iLCJ0dXN1SWQiOjEsInZlcnNpb24iOiIyLjAiLCJ1c3VDb0ludGVybm8iOiJBUEktQkFOQklGLU1PVklMLVBOIiwiYXV0aG9yaXRpZXMiOlsiTC8xZmx6cFI3ZUdvOUhISjJmNitmWkIwVW1NPSIsIngwRjRNMjR4b1lxdVhOSGVIWEwvMEIwMENudz0iLCJKaFBFdm5OakY4YjBYN212ME12NFVZalVYZ3c9IiwiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsImVzYlhlUU9qUko4WWZmNWkzL29yWEpCQ0xNRT0iLCJyNklGNXdRc2VmQVJFVXJqNkRjQVgwK1RJZzg9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsIlE0K0pQTGduUlNGRVJmMlo3Ry91R2ZhWUhwdz0iLCJyTmJrcW9MMFIyVzgzKy94NFpRRXh5R3VxdUE9IiwiYXJyUmNqeitjczU3eE1XVUtWd003aU9rK3l3PSIsInk1dDlXRlRpNy9SYW8rWU9OYjRicnh3Q2FFaz0iLCJiWmg1SUY1d0crQTNDdnFzVmdPZVE3QVl3dTg9Il0sImNsaWVudF9pZCI6IjIwMTAxMDM2ODEzIiwidXN1SWQiOjM2MDAsInVzdVBlcklkIjoxNDQ1OCwic2NvcGUiOlsidHJ1c3QiLCJyZWFkIiwid3JpdGUiXSwidGlEb2NVc3VhcmlvIjoyLCJudURvY1VzdWFyaW8iOiIwMDExMjIzMzQ0NTUiLCJzdWN1RGVzY3JpcGNpb24iOiJCQU5CSUYtQklPLU1PVklMLVBOIiwiZXhwIjoxOTE0MDEzNzkxLCJzdWN1Q29kaWdvIjoiMDAzIiwianRpIjoiTFFIdmZ2WlR3Z0tUamp5eEdrR2hJdENob0hjIn0.MtuOOSBszcFWQ5wKYAQ13MgA5-9A-WFHgeTUdFwkuQwxm0fWdafvnonbRWJBl4WiuAyhRH07CPOQBqypiwo7P-P58U3yUszTXUBBOIqwB_KDtHzBlLLD7zKdF0isxq23eUCLcIqvsg2kRbJbpKbAFsFZfTbJa4uK8vZrRgdE8qMTojy5QYJ8WwaMNCtg3rfT22B26VD_asiPET46NTO3y6jWWtCTpuJfbAplDOS8wR575HVbs13k3hhBmLC2F8esqMMRErxa2khOmgIBSn8MWekW64q3yeiqxy4-A7x61PYGp62e1EHWdDKz64wThTTbKJ8fnHBow58aJvuNtH6eIA';
          break;
        case 'DEVX':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJLWUFSUk9XQFpZVFJVU1QuQ09NIiwidXN1U3VjSWQiOjQ0NSwidXN1RW1wc0lkIjoxMSwidXN1QXBsSWQiOjEsInVzZXJfbmFtZSI6IkFQSS1CQU5CSUYtTU9WSUwtUE4iLCJ0dXN1SWQiOjEsInZlcnNpb24iOiIyLjAiLCJ1c3VDb0ludGVybm8iOiJBUEktQkFOQklGLU1PVklMLVBOIiwiYXV0aG9yaXRpZXMiOlsiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsImVzYlhlUU9qUko4WWZmNWkzL29yWEpCQ0xNRT0iLCJyNklGNXdRc2VmQVJFVXJqNkRjQVgwK1RJZzg9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSIsIjJvU2dyZnVPcG0wd0F6ajc4V2xwOXlqMkFCbz0iXSwiY2xpZW50X2lkIjoiMjAxMDEwMzY4MTMiLCJ1c3VJZCI6NTY2NywidXN1UGVySWQiOjE1NDY5LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJ0aURvY1VzdWFyaW8iOjEsIm51RG9jVXN1YXJpbyI6IjcwMzAzMDMwIiwic3VjdURlc2NyaXBjaW9uIjoiQkFOQklGLUJJTy1NT1ZJTC1QTiIsImV4cCI6MTg4NDI2Njk1Nywic3VjdUNvZGlnbyI6IjA4IiwianRpIjoib01YZUs4SkFpdG5TVUJOR05JbFhPOTY5dVVjIn0.iWEeW8FOfpEq6l2ARDb2THDr6AEzJYUVkZtg9-5ztvj3ynpq7LQXqXoJJmYl9WEIlHyxpYAW5AOpUp3aLVfCHND_-WvZ6D-5VSoWnXE00MUSyqMH3UqWkRY1Ra3hQdmJXzTXVpsbzCeb92GgOdDbIO93SFalMN9VgfN5ITUOB_GBfKv8P-3vcPItlERNm_YKNdIXSFbS7v2VEr-7yZIU5fDgaZun53cILL5Kd-irW3THMTmDYySOhMC0ZM8PUAIHUWjwLsrgz_ZWBnNALc9qrQHU2_AR-erN2B4Lw6uuCqvbVKjg6TPxW5K4HtgE4GUSZkIPTH3UfXP5lBPfq4dDSw';
          break;
        case 'SIGN':
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJURVNUVEBaWVRSVVNULkNPTSIsInVzdVN1Y0lkIjozNzYsInVzdUVtcHNJZCI6MTEsInVzdUFwbElkIjoxLCJ1c2VyX25hbWUiOiJBUEktQkFOQklGLVRFU1RNVi1QTiIsInR1c3VJZCI6MSwidmVyc2lvbiI6IjIuMCIsInVzdUNvSW50ZXJubyI6IkFQSS1CQU5CSUYtVEVTVE1WLVBOIiwiYXV0aG9yaXRpZXMiOlsiU0ttYkJPZC9lY2hLc1k4a3hwY3h5dklkb1hFPSIsImVzYlhlUU9qUko4WWZmNWkzL29yWEpCQ0xNRT0iLCJyNklGNXdRc2VmQVJFVXJqNkRjQVgwK1RJZzg9IiwiNklvRkdBT1JIM0dwZTFiaWp2UHgwNjVtWVlRPSIsInJOYmtxb0wwUjJXODMrL3g0WlFFeHlHdXF1QT0iLCJhcnJSY2p6K2NzNTd4TVdVS1Z3TTdpT2sreXc9IiwiYlpoNUlGNXdHK0EzQ3Zxc1ZnT2VRN0FZd3U4PSIsIjJvU2dyZnVPcG0wd0F6ajc4V2xwOXlqMkFCbz0iXSwiY2xpZW50X2lkIjoiMjAxMDEwMzY4MTMiLCJ1c3VJZCI6MTcwMzEsInVzdVBlcklkIjoyNzQxNiwic2NvcGUiOlsicmVhZCIsIndyaXRlIiwidHJ1c3QiXSwidGlEb2NVc3VhcmlvIjoxLCJudURvY1VzdWFyaW8iOiI3Njg3ODc2NSIsInN1Y3VEZXNjcmlwY2lvbiI6IkJBTkJJRi1CSU8tTU9WSUwtUE4iLCJleHAiOjE4OTI0MDc5NTksInN1Y3VDb2RpZ28iOiIwMTciLCJqdGkiOiJqaG5jOG1PUldvUm1adHg4Z2RKNkRROFRtVGMifQ.H4YCwWdWwSqYdN8-PYUzZSyv8YeXt02vLfGFG0C7i-z9pY7QL7kMchK--qsMvulN0PeD6HYQ32VUoV8N0cBSGgb5fLA3sy98T-juSna6UnAXUFlIu9wWYqqE0X_-qClK10cyLaiSUiWW9FJS7Vag24HHC1uHun5OYP-jOiqxIBXhtkOxtItmRPElu_AeJMG-YWj6ou7iGjGnUQwIPnLPWCNtsNjNcgfLCkYpecwdytQjvc1Z5f3rRnF9YhC2VS7sAVrG0ER77oN7LiOUgMsnlwax-cMetGmKDQYoY5u295E0EygVKWDogY9Txa9VejryYBdlf9T7ujRIksndFFy5mA';
          break;
        default:
          resolvedToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VDb3JyZW8iOiJYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWEBaWVRSVVNULkNPTSIsInVzdVN1Y0lkIjoxNDYsInVzdUVtcHNJZCI6MTQsInVzdUFwbElkIjoxLCJ1c2VyX25hbWUiOiJBUEktQkFOQklGLU1PVklMLVBOIiwidHVzdUlkIjoxLCJ2ZXJzaW9uIjoiMi4wIiwidXN1Q29JbnRlcm5vIjoiQVBJLUJBTkJJRi1NT1ZJTC1QTiIsImF1dGhvcml0aWVzIjpbIlNLbWJCT2QvZWNoS3NZOGt4cGN4eXZJZG9YRT0iLCJlc2JYZVFPalJKOFlmZjVpMy9vclhKQkNMTUU9IiwicjZJRjV3UXNlZkFSRVVyajZEY0FYMCtUSWc4PSIsIjZJb0ZHQU9SSDNHcGUxYmlqdlB4MDY1bVlZUT0iLCJyTmJrcW9MMFIyVzgzKy94NFpRRXh5R3VxdUE9IiwiYXJyUmNqeitjczU3eE1XVUtWd003aU9rK3l3PSIsImJaaDVJRjV3RytBM0N2cXNWZ09lUTdBWXd1OD0iLCIyb1NncmZ1T3BtMHdBemo3OFdscDl5ajJBQm89Il0sImNsaWVudF9pZCI6IjIwMTAxMDM2ODEzIiwidXN1SWQiOjE0OTAsInVzdVBlcklkIjo1NDc3LCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdLCJ0aURvY1VzdWFyaW8iOjIsIm51RG9jVXN1YXJpbyI6IjE0NzI1ODM2OSIsInN1Y3VEZXNjcmlwY2lvbiI6IkJBTkJJRi1CSU8tTU9WSUwtUE4iLCJleHAiOjE5MDkyNjQzNDksInN1Y3VDb2RpZ28iOiIwMDIiLCJqdGkiOiJINnloa3QzM0pHVGtxMm43ZVVMb2E5Tmw2UWsifQ.Cuz5tWZRVR9Zm9Io1KsmCRdQIHtxZQLVvlGK_iAGvR6zw4tK6KfRdCZuYWDcIha0AYsKLGhohT84dYdEw1X2zUTkxHoEFn_hrnn-be53w6dO7pibki2cmx2V2pSGtq-efYk9UxCdschhrtC5GV6oGciOqXGJuONSVJAOmg-l6Mda9a489d-xtMs0kBfNUzYR5ZX2qTbfoM5k9bxz-JM6oUz2YPvKTF_CXNMekIJustVRrijK8JiqFfZwPQW-ebaXuTtsrRSnK40kWkDbgb0NlzZpxO9244FbkWyr842uSnig19eFptTjVShvOHpO2wO0A_wV4cQUXzOSq8OJCQXDXQ';
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
        tiDocumento,
        nuDocumento,
        accessToken: resolvedToken,
        bioPais: 'PE',
        tiOperacion: tipoOperacion,
        urlSource: ambiente,
        flujoExterno,
        stepper: {
          nuPasos,
          pasoActual,
        },
        errores: {
          reintentar: {
            titulo: 'Reintentar',
            descripcion:
              'Ha ocurrido un error. Puedes intentar nuevamente presionando el botón a continuación.',
            textoBoton: 'Reintentar',
          },
          limite_tiempo_alcanzado: {
            titulo: 'Límite de tiempo alcanzado',
            descripcion:
              'El tiempo máximo para realizar esta operación ha expirado.',
            textoBoton: 'Entendido',
          },
          limite_intentos_alcanzado: {
            titulo: 'Límite de intentos alcanzado',
            descripcion:
              'Has alcanzado el número máximo de intentos permitidos.',
            textoBoton: 'Entendido',
          },
        },
      };

      const result =
        await ZyprotectabioModule.validacionFacialOcr(opciones);

      /* =========================
       * RESULTADOS
       * ========================= */
      setCoError(result?.coError ?? '');
      setDeError(result?.deError ?? '');
      setCoErrorButton(result?.coErrorButton ?? '');
      setDeErrorButton(result?.deErrorButton ?? '');
      setIdSolicitud(result?.idSolicitud ?? '');

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
        placeholder="Ambiente (DEV2, DEVX, SIGN)"
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

      <TextInput
        style={styles.input}
        placeholder="Paso actual"
        value={String(pasoActual)}
        onChangeText={(t) => setPasoActual(Number(t))}
        keyboardType="numeric"
        maxLength={1}
      />

      <TextInput
        style={styles.input}
        placeholder="Flujo externo"
        value={flujoExterno}
        onChangeText={setFlujoExterno}
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
