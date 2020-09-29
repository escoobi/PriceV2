import { KeyboardAvoidingView, StatusBar, FlatList, Text, StyleSheet, ImageBackground, View, Modal, Image, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'react-native-textinput-with-icons';
import React, { useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';


function Login() {
  const navigation = useNavigation();

  return (




    < View style={styles.container} >
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <Image source={require('./assets/logoAuth.png')}
          style={styles.logo} />
        <StatusBar barStyle='dark-content'></StatusBar>
        <TextInput textContentType='emailAddress' keyboardType='email-address'
          leftIcon="mail"
          leftIconSize={25}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"

          underlineColor="#222221"
          underlineActiveColor="#222221"
          labelActiveColor="#222221"
          labelColor="#222221"
          fontSize={16}
          fontWeight="bold" />

        <TextInput secureTextEntry={true} returnKey autoCorrect={false}
          leftIcon="key"
          leftIconSize={25}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"

          underlineColor="#222221"
          underlineActiveColor="#222221"
          labelActiveColor="#222221"
          labelColor="#222221"
          fontSize={16}
          fontWeight="bold"
        />
        <Text style={styles.avisoResitro}>Ainda não possui uma conta? Registre-se</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('principal')}>
          <Text style={styles.btnTexto}>Login</Text>
        </TouchableOpacity>

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
              // signed in
              console.log("foi");
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

      </KeyboardAvoidingView>
    </View>

  );
}



function Principal() {
  const navigation = useNavigation();
  const [empresas, setEmpresas] = useState([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);




  useEffect(() => {
    fetch('http://price.app.br:3000/empresa')
      .then((res) => res.json())
      .then((json) => {
        setEmpresas(json);
      })
      .catch((e) => {
        alert(e);
      });


  }, []);
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
  const [selectedDamodaran, setSelectedDamodaran] = useState(null);
  const [selectedDifPercIntrisseco, setSelectedDifPercIntrisseco] = useState(null);
  const [selectedDifPercDamodaran, setSelectedDifPercDamodaran] = useState(null);
  const [selectedMediaValution, setSelectedMediaValution] = useState(null);
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
    setSelectedDamodaran(item.damodaran);
    setSelectedDifPercIntrisseco(item.difpercintrisseco);
    setSelectedDifPercDamodaran(item.difpercdamodaran);
    setSelectedMediaValution(item.mediavalution);
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

          <View style={styles.containerPraRiba}>
            <View style={styles.containerLogo}>

              <Image style={styles.logoEmpResult} source={{ uri: selectedLogo !== null ? selectedLogo : './assets/icon.png' }} />
            </View>
            <Text style={styles.txtInfo}>Empresa: </Text>
            <Text style={styles.txtInfoDados}>{selectedEmp}</Text>
            <Text style={styles.txtInfo}>Código: </Text>
            <Text style={styles.txtInfoDados}>{selectedTik}</Text>
            <Text style={styles.txtInfo}>Segmento: </Text>
            <Text style={styles.txtInfoDados}>{selectedSeg}</Text>
            <Text style={styles.txtInfo}>Contação Intraday: </Text>
            <Text style={styles.txtInfoDados}>R$: {selectedCot}</Text>
            <Text style={styles.txtInfo}>Valor Intrínseco: </Text>
            <Text style={styles.txtInfoDados}>R$: {selectedIntrisseco}</Text>
            <Text style={styles.txtInfo}>Valor Fluxo de Caixa Descontado (FCD): </Text>
            <Text style={styles.txtInfoDados}>R$: {selectedDamodaran}</Text>
            <Text style={styles.txtInfo}>Cotação X Intrínseco: </Text>
            <Text style={styles.txtInfoDados}>{selectedDifPercIntrisseco} %</Text>
            <Text style={styles.txtInfo}>Cotação X FCD: </Text>
            <Text style={styles.txtInfoDados}>{selectedDifPercDamodaran} %</Text>
            <Text style={styles.txtInfo}>Média Intrínseco X FCD: </Text>
            <Text style={styles.txtInfoDados}>{selectedMediaValution} %</Text>
            <Text style={styles.txtInfo}>Cotação X Média: </Text>
            <Text style={styles.txtInfoDados}>{selectedRiscoMedia} %</Text>

          </View>
          <View style={styles.containerBtnFechar}>
            <TouchableOpacity style={styles.botaoModal} onPress={() => {
              setModalVisible(false);
            }}>
              <Text style={styles.btnTexto}>Fechar!</Text>
            </TouchableOpacity>
          </View>
        </View>

      </Modal>



      <View style={styles.containerPesquisaEmpresa}>
        <TextInput marginBottom={10} onChangeText={(text) => findEmpresa(text)}
          leftIcon="search"
          leftIconSize={30}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"
          underlineColor="#222221"
          underlineActiveColor="#222221"
          label="Código da empresa"
          labelActiveColor="#22221"
          labelColor="#222221"
          fontSize={16}
          fontWeight="bold" />
        <View style={styles.containerPesquisaEmpresaResultado}>
          <FlatList data={filteredEmpresas} renderItem={renderItem} onPress={() => obterItem(item)} keyExtractor={item => item.key} extraData={selectedTik} />
        </View>




        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('login')}>
          <Text style={styles.btnTexto}>Sair</Text>
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
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },

  avisoResitro: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
    color: "#222221"
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
    height: 38,

  },

  containerPesquisaEmpresaResultadoShow: {
    margin: 5,
    marginTop: 20,
    height: '100%',
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5

  },
  containerLogo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'flex-end'
  },

  logoEmpResult: {
    width: 86,
    height: 86,
    marginRight: 20


  },
  containerBtnFechar: {

    flex: 1,
    alignSelf: 'center',
    padding: 60



  },
  botaoModal: {
    width: 240,
    height: 42,
    backgroundColor: "#00913D",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 5

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


