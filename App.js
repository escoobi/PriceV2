import { StatusBar, FlatList, Text, StyleSheet, View, Modal, Image, Button, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Assets, createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'react-native-textinput-with-icons';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import { AntDesign } from '@expo/vector-icons';
import ProgressCircle from 'react-native-progress-circle';
import numeral from 'numeral';
import "numeral/locales/pt-br";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder'








function Detalhe({ route, navigation }) {



  const { itemId } = route.params;
  const [data, setData] = useState([]);
  const getMoviesFromApiAsync = async () => {
    try {
      let response = await fetch('https://price.app.br/price/empresa.jsp?tik=' + itemId, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' } });

      setData(await response.json());



    } catch (error) {
      console.error(error);
    }
  };


  getMoviesFromApiAsync();



  numeral.locale('pt-br');


  return (




    < View style={styles.container} >


      <ShimmerPlaceHolder />
      <ShimmerPlaceHolder visible={isFetched}>
        <Text>
          Wow, awesome here.
  </Text>
      </ShimmerPlaceHolder>





      <StatusBar barStyle='dark-content'></StatusBar>
      <View style={styles.logoDetalhe}>
        <Image style={styles.logoEmpResult} source={{ uri: data.logo !== null ? data.logo : './assets/icon.png' }} />
      </View>
      <AntDesign style={styles.imgFechar} name="closecircleo" size={24} color="black" onPress={() => navigation.navigate('principal')} />

      <Text style={styles.txtInfo}>Contação:</Text>
      <Text style={styles.txtInfoDados}>{numeral(data.cot).format("$0.00")}</Text>
      <Text style={styles.txtInfo}>Valor Intrínseco: </Text>
      <Text style={styles.txtInfoDados}>{numeral(data.intrinseco).format("$0.00")}</Text>
      <Text style={styles.txtInfo}>Código: </Text>
      <Text style={styles.txtInfoDados}>{data.tik}</Text>
      <Text style={styles.txtInfo}>Segmento: </Text>
      <Text style={styles.txtInfoDados}>{data.segmento}</Text>

      <Text style={styles.txtInfo}>Desconto: </Text>
      <ProgressCircle
        percent={(((numeral(data.cot).format("00") - numeral(data.intrinseco).format("00")) / numeral(data.cot).format("00")) * 100) * -1}
        radius={50}
        borderWidth={8}
        color="#00913D"
        shadowColor="#999"
        bgColor="#fff"
      >
        <Text style={{ fontSize: 18 }}>{numeral((((numeral(data.cot).format("00") - numeral(data.intrinseco).format("00")) / numeral(data.cot).format("00")) * 100) * -1).format("00") + "%"}</Text>
      </ProgressCircle>



    </View>
    

  );
}


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
  useEffect(() => {
    fetch('https://price.app.br/ibov.json')
      .then((res) => res.json())
      .then((json) => {
        setEmpresas(json);
        console.log(json);
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


  const [selectedTik, setSelectedTik] = useState(null);
  const renderItem = ({ item }) => {

    const backgroundColor = item.tik === selectedTik ? '#FFF9' : '#FFF';
    return <Item tik={item.tik} logo={item.logo} onPress={() => getItem(item)} style={{ backgroundColor }} />;

  };
  const getItem = (item) => {
    navigation.navigate('detalhe', { itemId: item.tik });
  };


  return (
    <View style={styles.containerPesquisa}>
      <StatusBar barStyle='dark-content'></StatusBar>
      <View style={styles.containerPesquisaEmpresa}>
        <TextInput marginBottom={10} onChangeText={(text) => findEmpresa(text)} autoFocus={true}
          leftIcon="search"
          leftIconSize={30}
          leftIconColor="#000"
          leftIconType="oct"
          rippleColor="#000"
          underlineColor="#000"
          underlineActiveColor="#000"
          label="Código da empresa"
          labelActiveColor="#000"
          fontSize={16}
          fontWeight="bold" />
        <View style={styles.containerPesquisaEmpresaResultado}>
          <FlatList data={filteredEmpresas} renderItem={renderItem} keyExtractor={item => item.key} extraData={selectedTik} />
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
          <Stack.Screen name="detalhe" component={Detalhe} />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: "#fff",
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

  logoDetalhe: {
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


  circleeeee: {
    height: "56px",
    width: "56px",
    backgroundColor: 'red',

  },
  lineeeeee: {
    width: "96px",
    height: "8px",
    backgroundColor: 'red',
    alignSelf: "center",
    marginLeft: "16px",

  }



})



