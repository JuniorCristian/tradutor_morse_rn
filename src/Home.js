import React, { Component, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, Vibration } from 'react-native';
import { Camera } from 'expo-camera'

const timePonto = 400;
const timeTraco = timePonto * 2;
const timeEspaco = timeTraco;
const timeEspera = timePonto;
const [text, onChangeText] = useState("");
const [textMorse, onChangeTextMorse] = useState("");
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function traduzir(texto) {
    let textoMorse = "";
    let textExplode = texto.split("");
    for (let i = 0; i < textExplode.length; i++) {
        textoMorse += traduzirLetra(textExplode[i]);
    }
    return textoMorse;
}

function traduzirLetra(letra) {
    letra = letra.toLowerCase();
    switch (letra) {
        case "a":
            return ".- ";
        case "b":
            return "-... ";
        case "c":
            return "-.-. ";
        case "d":
            return "-.. ";
        case "e":
            return ". ";
        case "f":
            return "..-. ";
        case "g":
            return "--. ";
        case "h":
            return ".... ";
        case "i":
            return ".. ";
        case "j":
            return ".--- ";
        case "k":
            return "-.- ";
        case "l":
            return ".-.. ";
        case "m":
            return "-- ";
        case "n":
            return "-. ";
        case "o":
            return "--- ";
        case "p":
            return ".--. ";
        case "q":
            return "--.- ";
        case "r":
            return ".-. ";
        case "s":
            return "... ";
        case "t":
            return "- ";
        case "u":
            return "..- ";
        case "v":
            return "...- ";
        case "w":
            return ". -- ";
        case "x":
            return "-..- ";
        case "y":
            return "-.-- ";
        case "z":
            return "--.. ";
        case " ":
            return "\n";
        case ".":
            return ".-.-.- ";
        case ",":
            return "--..-- ";
        case ":":
            return "---... ";
        case ";":
            return "-.-.- ";
        case "?":
            return "..--.. ";
        case "!":
            return "..--.- ";
        case "-":
            return "-....- ";
        case "_":
            return "..--.- ";
        case "(":
            return "-.--. ";
        case ")":
            return "-.--.- ";
        case "=":
            return "-...- ";
        case "+":
            return ".-.-. ";
        case "*":
            return "..-.- ";
        case "/":
            return "-..-. ";
        case "#":
            return "..... ";
        case "0":
            return "----- ";
        case "1":
            return ".---- ";
        case "2":
            return "..--- ";
        case "3":
            return "...-- ";
        case "4":
            return "....- ";
        case "5":
            return "..... ";
        case "6":
            return "-.... ";
        case "7":
            return "--... ";
        case "8":
            return "---.. ";
        case "9":
            return "----. ";
        default:
            return "";
    }
}

function handlePress() {
    console.log(text);
    console.log(traduzir(text).split(""));
    geraMorse(traduzir(text).split(""));
    () => onChangeTextMorse(traduzir(text).split(""));
}

function geraMorse(morse, arrayPosition = 0) {
    Camera.Constants.FlashMode.off;
    if (arrayPosition < morse.length) {
        if (morse[arrayPosition] == ".") {
            ponto();
            sleep(timePonto + timeEspera).then(() => {
                geraMorse(morse, arrayPosition + 1);
            });
        } else if (morse[arrayPosition] == "-") {
            traco();
            sleep(timeTraco + timeEspera).then(() => {
                geraMorse(morse, arrayPosition + 1);
            });
        } else {
            sleep(timeEspaco + timeEspera).then(() => {
                geraMorse(morse, arrayPosition + 1);
            });
        }
    }
}

function ponto() {
    Vibration.vibrate(timePonto);
    Camera.Constants.FlashMode.on;
}

function traco() {
    Vibration.vibrate(timeTraco);
    Camera.Constants.FlashMode.on;
}

export default class Home extends Component {
    state = {
            morse: '',
            text: '',
        };

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ text: text})}
                    value={this.state.text}
                    multiline={true}
                    numberOfLines={15}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(textMorse) => this.setState({ morse: textMorse})}
                    value={this.state.morse}
                    multiline={true}
                    numberOfLines={15}
                />
                <StatusBar style="auto" />
                <TouchableOpacity style={styles.btn} onPress={handlePress}><Text>Translate</Text></TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        top: 30
    },
    input: {
        height: "35%",
        width: "90%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    btn: {
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 12,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center'
    },
});