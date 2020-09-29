import { KeyboardAvoidingView, StatusBar, FlatList, Text, StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import TextInput from 'react-native-textinput-with-icons';
import React, { useState, useEffect } from 'react';


function Login() {
  const navigation = useNavigation();

  return (

    < View style={styles.container} >

      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>

        <Image source={require('./assets/icon.png')}
          style={styles.logo} />
        <StatusBar barStyle='dark-content'></StatusBar>
        <TextInput textContentType='emailAddress' keyboardType='email-address' marginBottom={20}
          leftIcon="mail"
          leftIconSize={25}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"

          underlineColor="#222221"
          underlineActiveColor="#222221"
          label="E-mail"
          labelActiveColor="#222221"
          labelColor="#222221"
          fontSize={16}
          fontWeight="bold" />

        <TextInput secureTextEntry={true} returnKey autoCorrect={false}
          marginBottom={20}
          leftIcon="key"
          leftIconSize={25}
          leftIconColor="#222221"
          leftIconType="oct"
          rippleColor="#222221"

          underlineColor="#222221"
          underlineActiveColor="#222221"
          label="Senha"
          labelActiveColor="#222221"
          labelColor="#222221"
          fontSize={16}
          fontWeight="bold"
        />
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('principal')}>
          <Text style={styles.btnTexto}>Login</Text>
        </TouchableOpacity>

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
    setSelectedDifPercDamodaran(item.difpercdamoraran);
    setSelectedMediaValution(item.mediavalution);
    setSelectedRiscoMedia(item.riscomedia);
    console.log(item.logo);
    setFilteredEmpresas([]);

  };

  return (
    <View style={styles.containerPesquisa}>
      <StatusBar barStyle='dark-content'></StatusBar>
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
        <Image style={styles.logoEmp} source={{ uri: selectedLogo !== null ? selectedLogo : './assets/icon.png'}}/>
        <Text>{selectedLogo}</Text>
        <Text>{selectedEmp}</Text>
        <Text>{selectedTik}</Text>
        <Text>{selectedSeg}</Text>
        <Text>{selectedCot}</Text>
        <Text>{selectedIntrisseco}</Text>
        <Text>{selectedDamodaran}</Text>
        <Text>{selectedDifPercIntrisseco}</Text>
        <Text>{selectedDifPercDamodaran}</Text>
        <Text>{selectedMediaValution}</Text>
        <Text>{selectedRiscoMedia}</Text>


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
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 10
  },
  botao: {
    width: 300,
    height: 42,
    backgroundColor: "#00913D",
    marginTop: 10,
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

})


