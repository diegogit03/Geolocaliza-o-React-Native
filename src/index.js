import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default props => {
    const [Latitude, setLatitude] = useState(37.78825);
    const [Longitude, setLongitude] = useState(-122.4324);
    const [inputText, setInputText] = useState('');

    function Submit(){
       axios.get(`https://nominatim.openstreetmap.org/search/q=${inputText}?format=json`).then(data => {
           setLongitude(parseInt(data.data[0].lon));
           setLatitude(parseInt(data.data[0].lat));
       }).catch(error => {
           console.error(error);
       }); 
    }

    return(
        <View style={styles.container}>
            <View styles={styles.form}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={Text => setInputText(Text)}
                    placeholder="Pesquise uma localização"
                />
                <TouchableOpacity onPress={Submit} style={styles.submit}>
                    <Text>Pesquisar</Text>
                </TouchableOpacity>
            </View>
            <MapView 
                style={styles.map}
                region={{
                    latitude: Latitude,
                    longitude: Longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                initialRegion={{
                    latitude: Latitude,
                    longitude: Longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker 
                    coordinate={{
                        latitude: Latitude,
                        longitude: Longitude,
                    }}
                    title="Local Procurado"
                    description="Este e o local que você esta procurando?"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        flex: 1,
        width: '100%'
    },
    map:{
        flex: 6,
        width: '100%'
    },
    form: {
        flexDirection: 'row',
        flex: 4,
    },
    input:{
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    submit: {
        borderWidth: 1,
        borderColor: '#ccc'
    }
});