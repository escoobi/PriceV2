import * as React from 'react';
import { Alert, KeyboardAvoidingView, Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
export default class App extends React.Component {

  clicou = () => {
    Alert.alert("Chama bulança", "Você clicou em min!");

  }
  render() {
    return (
      < View style={styles.container} >
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Image source={require('./assets/splash.png')}
            style={styles.logo} />

          <TextInput placeholder='Digite seu e-mail' style={styles.txtEntrada} />
          <TextInput secureTextEntry={true} placeholder='Digite sua senha' style={styles.txtEntrada} />
          <TouchableOpacity style={styles.botao} onPress={() => { this.clicou() }}>
            <Text style={styles.btnTexto}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#222221",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 200

  },
  txtEntrada: {
    marginTop: 10,
    padding: 15,
    width: 300,
    backgroundColor: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 3

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
  }
})