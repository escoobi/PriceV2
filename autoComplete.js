//Example of React Native AutoComplete Input
//https://aboutreact.com/example-of-react-native-autocomplete-input/

//import React in our code
import React, {useState, useEffect} from 'react';

//import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//import Autocomplete component
import Autocomplete from 'react-native-autocomplete-input';

const App = () => {
  const [films, setFilms] = useState([]);  // For the main data
  const [filteredFilms, setFilteredFilms] = useState([]); // Filtered data
  const [selectedValue, setSelectedValue] = useState({}); // selected data

  useEffect(() => {
    fetch('https://aboutreact.herokuapp.com/getpost.php?offset=1')
      .then((res) => res.json())
      .then((json) => {
        const {results: films} = json;
        setFilms(films);
        //setting the data in the films state
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const findFilm = (query) => {
    //method called everytime when we change the value of the input
    if (query) {
      //making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      //setting the filtered film array according the query
      setFilteredFilms(
          films.filter((film) => film.emp.search(regex) >= 0)
      );
    } else {
      //if the query is null then return blank
      setFilteredFilms([]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
          //data to show in suggestion
          data={filteredFilms}
          //default value if you want to set something in input
          defaultValue={
            JSON.stringify(selectedValue) === '{}' ?
            '' :
            selectedValue.title
          }
          // onchange of the text changing the state of the query
          // which will trigger the findFilm method
          // to show the suggestions
          onChangeText={(text) => findFilm(text)}
          placeholder="Enter the film title"
          renderItem={({item}) => (
            //you can change the view you want to show in suggestions
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item);
                setFilteredFilms([]);
              }}>
              <Text style={styles.itemText}>
                  {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
        <View style={styles.descriptionContainer}>
          {films.length > 0 ? (
            <>
              <Text style={styles.infoText}>
                   Selected Data
              </Text>
              <Text style={styles.infoText}>
                {JSON.stringify(selectedValue)}
              </Text>
            </>
          ) : (
            <Text style={styles.infoText}>
                Enter The Film Title
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});


export default App;