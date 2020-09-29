import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';



function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Selecionar Ticket</Text>
      <Button title="Pesquisar" onPress={() => navigation.navigate('Resultado da consulta')}/>
    </View>
  );
}

function DetailsScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Resultado da consulta</Text>
      <Button title="Nova pesquisa" onPress={() => navigation.navigate('Consulta Ticket')}/>
    </View>
  );
}


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Consulta Ticket" component={HomeScreen} />
        <Stack.Screen name="Resultado da consulta" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}