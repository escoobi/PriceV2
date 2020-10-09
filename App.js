import { StatusBar, FlatList, Text, StyleSheet, View, Modal, Image, Button, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'react-native-textinput-with-icons';
import React, { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { ProgressCircle } from 'react-native-svg-charts';
import { AntDesign } from '@expo/vector-icons';

function Login() {
  const navigation = useNavigation();
  return (
    < View style={styles.container} >

      <Image source={require('./assets/logoAuth.png')}
        style={styles.logo} />
      <StatusBar barStyle='dark-content'></StatusBar>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ width: 200, height: 44 }}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            navigation.navigate('principal');
          } catch (e) {
            if (e.code === 'ERR_CANCELED') {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      />

    </View>

  );
}



function Principal() {
  const navigation = useNavigation();
  const [empresas, setEmpresas] = useState([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
/*
  useEffect(() => {
    //https://price.app.br/price/index.jsp?tik=caml3
    fetch('ibov.json')
      .then((res) => res.json())
      .then((json) => {
        setEmpresas(json);
      })
      .catch((e) => {
        alert(e);
      });


  }, []);*/

  const customData = require('./ibov.json.json');

  const findEmpresa = (query) => {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredEmpresas(empresas.filter((dados) => dados.tik.search(regex) >= 0));

    }
    else {
      setFilteredEmpresas([]);
    }

  };
  const Item = ({ logo, tik, onPress, style }) => (

    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image style={styles.logoEmp} source={{ uri: logo }} />
      <Text style={styles.title}>{tik}</Text>
    </TouchableOpacity>

  );
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [selectedTik, setSelectedTik] = useState(null);
  const [selectedSeg, setSelectedSeg] = useState(null);
  const [selectedCot, setSelectedCot] = useState(null);
  const [selectedIntrisseco, setSelectedIntrisseco] = useState(null);
  const [selectedRiscoMedia, setSelectedRiscoMedia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({ item }) => {
    const backgroundColor = item.tik === selectedTik ? '#FFF9' : '#FFF';
    return <Item tik={item.tik} logo={item.logo} onPress={() => getItem(item)} style={{ backgroundColor }} />;
  };
  const getItem = (item) => {
    setSelectedEmp(item.emp);
    setSelectedLogo(item.logo);
    setSelectedTik(item.tik);
    setSelectedSeg(item.seg);
    setSelectedCot(item.cot);
    setSelectedIntrisseco(item.intrisseco);
    setSelectedRiscoMedia(item.riscomedia);
    setModalVisible(!modalVisible);
    setFilteredEmpresas([]);


  };


  return (





    <View style={styles.containerPesquisa}>
      <StatusBar barStyle='dark-content'></StatusBar>

      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>

        <View style={styles.containerPesquisaEmpresaResultadoShow}>
          <View style={styles.logoDetalhe}>
            <Image style={styles.logoEmpResult} source={{ uri: selectedLogo !== null ? selectedLogo : './assets/icon.png' }} />
          </View>
          <AntDesign style={styles.imgFechar} name="closecircleo" size={24} color="black" onPress={() => {
            setModalVisible(false);
          }} />

          <Text style={styles.txtInfo}>Empresa: </Text>
          <Text style={styles.txtInfoDados}>{selectedEmp}</Text>
          <Text style={styles.txtInfo}>Código: </Text>
          <Text style={styles.txtInfoDados}>{selectedTik}</Text>
          <Text style={styles.txtInfo}>Segmento: </Text>
          <Text style={styles.txtInfoDados}>{selectedSeg}</Text>
          <Text style={styles.txtInfo}>Contação: </Text>
          <Text style={styles.txtInfoDados}>R$: {selectedCot}</Text>
          <Text style={styles.txtInfo}>Valor Intrínseco: </Text>
          <Text style={styles.txtInfoDados}>R$: {selectedIntrisseco}</Text>
          <Text style={styles.txtInfo}>Cotação X Intrínseco: </Text>
          <Text style={styles.txtInfoDados}>{selectedRiscoMedia} %</Text>
          <Text style={styles.txtInfo}>Risco: </Text>
          <ProgressCircle style={{ height: 100 }} progress={selectedRiscoMedia / 40} cornerRadius={45} progressColor={'#00913d'} fill={'#00913d'} />








        </View>

      </Modal>



      <View style={styles.containerPesquisaEmpresa}>
        <TextInput marginBottom={10} onChangeText={(text) => findEmpresa(text)} autoFocus={true}
          leftIcon="search"
          leftIconSize={30}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"
          underlineColor="#222221"
          underlineActiveColor="#222221"
          label="Código da empresa"
          labelActiveColor="#22221"
          fontSize={16}
          fontWeight="bold" />
        <View style={styles.containerPesquisaEmpresaResultado}>
          <FlatList data={filteredEmpresas} renderItem={renderItem} onPress={() => obterItem(item)} keyExtractor={item => item.key} extraData={selectedTik} />
        </View>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('login')}>
          <Text style={styles.btnTexto}>Fechar</Text>
        </TouchableOpacity>
      </View>

    </View >
  );
}

const Stack = createStackNavigator();
export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="principal" component={Principal} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },

  avisoResitro: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",

  },

  botao: {
    marginTop: 30,
    width: 300,
    height: 42,
    backgroundColor: "#00913D",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"

  },
  btnTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF"
  },

  containerPesquisa: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },

  containerPesquisaEmpresa: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    padding: 5
  },
  containerPesquisaEmpresaResultado: {
    flex: 1,
    width: '100%',
    padding: 5
  },
  item: {
    borderRadius: 5,
    padding: 5,
    marginVertical: 2,
    height: 50,
    width: '100%',
    borderColor: '#222221',
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    marginTop: -27,
    marginHorizontal: 50
  },

  logoEmp: {
    width: 46,
    resizeMode: "contain",
    height: 38,

  },

  containerPesquisaEmpresaResultadoShow: {
    margin: 5,
    marginTop: 180,
    height: '100%',
    backgroundColor: "#FFF",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    elevation: 5

  },

  logoDetalhe:{
    marginTop: -50,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff'
  },
  logoEmpResult: {
    width: 86,
    height: 86,
    resizeMode: "contain",
    borderRadius: 100,
   
  },

  imgFechar: {
    marginLeft: -260,
    marginTop: -20
  },

  txtInfo: {
    fontSize: 15,
    padding: 5,
    marginLeft: 5,
    fontWeight: 'bold'

  },
  txtInfoDados: {
    fontSize: 12,
    marginLeft: 20
  },

})


