import React, {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Vibration
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
    faArrowsAltH,
    faVolumeUp,
    faVolumeMute
} from "@fortawesome/free-solid-svg-icons";
import Torch from 'react-native-torch';

const colors = {
    primary: '#28d4d4',
    secondary: '#f7f7f7',
    white: "#fff",
    black: "#000",
    red: "#f00",
    green: "#0f0",
    blue: "#00f",
    yellow: "#ff0",
    magenta: "#f0f",
    cyan: "#0ff",
    gray: "#808080",
    silver: "#c0c0c0",
    maroon: "#800000",
};

export default function App() {
    const timePonto = 250;
    const timeTraco = timePonto * 2;
    const timeEspaco = timeTraco;
    const timeEspera = timePonto;
    const [text, onChangeText] = useState("");
    const [textMorse, onChangeTextMorse] = useState("");
    const [textFrom, onChangeTextFrom] = useState("Texto");
    const [textTo, onChangeTextTo] = useState("Morse");
    const [isMute, onChangeIsMute] = useState(faVolumeUp);


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function turnTorch(status) {
        Torch.switchState(status);
    }

    function traduzir(texto) {
        let textoMorse = "";
        let textExplode;
        let traducao;
        if (textFrom === "Texto") {
            textExplode = texto.split("");
            for (let i = 0; i < textExplode.length; i++) {
                traducao = values.find(char => char.letra === textExplode[i].toLowerCase());
                if (traducao !== undefined) {
                    textoMorse += traducao.morse + " ";
                }
            }
        } else {
            textExplode = texto.trim().replace("\n", " \n").replace("\n ", "\n").replace("\n", "\n ").split(" ");
            for (let i = 0; i < textExplode.length; i++) {
                traducao = values.find(char => char.morse === textExplode[i].toLowerCase());
                if (traducao !== undefined) {
                    textoMorse += traducao.letra + " ";
                }
            }
        }
        return textoMorse;
    }


    const values = [
        {letra: 'a', morse: '.-'},
        {letra: 'á', morse: '.-'},
        {letra: 'ä', morse: '.-'},
        {letra: 'à', morse: '.-'},
        {letra: 'ã', morse: '.-'},
        {letra: 'â', morse: '.-'},
        {letra: 'b', morse: '-...'},
        {letra: 'c', morse: '-.-.'},
        {letra: 'ç', morse: '-.-.'},
        {letra: 'd', morse: '-..'},
        {letra: 'e', morse: '.'},
        {letra: 'é', morse: '.'},
        {letra: 'ë', morse: '.'},
        {letra: 'è', morse: '.'},
        {letra: 'ẽ', morse: '.'},
        {letra: 'ê', morse: '.'},
        {letra: 'f', morse: '..-.'},
        {letra: 'g', morse: '--.'},
        {letra: 'h', morse: '....'},
        {letra: 'i', morse: '..'},
        {letra: 'í', morse: '..'},
        {letra: 'ï', morse: '..'},
        {letra: 'î', morse: '..'},
        {letra: 'ì', morse: '..'},
        {letra: 'ĩ', morse: '..'},
        {letra: 'j', morse: '.---'},
        {letra: 'k', morse: '-.-'},
        {letra: 'l', morse: '.-..'},
        {letra: 'm', morse: '--'},
        {letra: 'n', morse: '-.'},
        {letra: 'o', morse: '---'},
        {letra: 'ó', morse: '---'},
        {letra: 'ö', morse: '---'},
        {letra: 'ô', morse: '---'},
        {letra: 'ò', morse: '---'},
        {letra: 'õ', morse: '---'},
        {letra: 'p', morse: '.--.'},
        {letra: 'q', morse: '--.-'},
        {letra: 'r', morse: '.-.'},
        {letra: 's', morse: '...'},
        {letra: 't', morse: '-'},
        {letra: 'u', morse: '..-'},
        {letra: 'ú', morse: '..-'},
        {letra: 'ü', morse: '..-'},
        {letra: 'û', morse: '..-'},
        {letra: 'ù', morse: '..-'},
        {letra: 'ũ', morse: '..-'},
        {letra: 'v', morse: '...-'},
        {letra: 'w', morse: '. --'},
        {letra: 'x', morse: '-..-'},
        {letra: 'y', morse: '-.--'},
        {letra: 'z', morse: '--..'},
        {letra: ' ', morse: '\n'},
        {letra: '.', morse: '.-.-.-'},
        {letra: ',', morse: '--..--'},
        {letra: ':', morse: '---...'},
        {letra: ';', morse: '-.-.-'},
        {letra: '?', morse: '..--..'},
        {letra: '!', morse: '..--.-'},
        {letra: '-', morse: '-....-'},
        {letra: '_', morse: '..--.-'},
        {letra: '(', morse: '-.--.'},
        {letra: ')', morse: '-.--.-'},
        {letra: '=', morse: '-...-'},
        {letra: '+', morse: '.-.-.'},
        {letra: '*', morse: '..-.-'},
        {letra: '/', morse: '-..-.'},
        {letra: '#', morse: '.....'},
        {letra: '?', morse: '..--..'},
        {letra: '!', morse: '-.-.--'},
        {letra: '@', morse: '.--.-.'},
        {letra: '$', morse: '...-..-'},
        {letra: '"', morse: '.-..-.'},
        {letra: '\'', morse: '.----.'},
        {letra: '0', morse: '-----'},
        {letra: '1', morse: '.----'},
        {letra: '2', morse: '..---'},
        {letra: '3', morse: '...--'},
        {letra: '4', morse: '....-'},
        {letra: '5', morse: '.....'},
        {letra: '6', morse: '-....'},
        {letra: '7', morse: '--...'},
        {letra: '8', morse: '---..'},
        {letra: '9', morse: '----'},
    ];

    function handlePress() {
        geraMorse(traduzir(text).split(""));
        onChangeTextMorse((traduzir(text).toString()));
    }

    function geraMorse(morse, arrayPosition = 0) {
        if (arrayPosition < morse.length) {
            if (morse[arrayPosition] === ".") {
                ponto();
                sleep(timePonto + timeEspera).then(() => {
                    turnTorch(false);
                    geraMorse(morse, arrayPosition + 1);
                });
            } else if (morse[arrayPosition] === "-") {
                traco();
                sleep(timeTraco + timeEspera).then(() => {
                    turnTorch(false);
                    geraMorse(morse, arrayPosition + 1);
                });
            } else {
                sleep(timeEspaco + timeEspera).then(() => {
                    turnTorch(false);
                    geraMorse(morse, arrayPosition + 1);
                });
            }
        }
    }

    function invertTranslate() {
        let aux = textFrom;
        onChangeTextFrom(textTo);
        onChangeTextTo(aux);
        onChangeText("");
        onChangeTextMorse("");
    }

    function ponto() {
        if (isMute === faVolumeUp) {
            Vibration.vibrate(timePonto);
        }
        turnTorch(true);
    }

    function traco() {
        if (isMute === faVolumeUp) {
            Vibration.vibrate(timeTraco);
        }
        turnTorch(true);
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.changeTranslate}>
                <Text style={styles.changeTextFrom}>{textFrom}</Text>
                <TouchableWithoutFeedback style={styles.changeBtn} onPress={invertTranslate}>
                    <FontAwesomeIcon style={styles.changeIcon} icon={faArrowsAltH}/>
                </TouchableWithoutFeedback>
                <Text style={styles.changeTextTo}>{textTo}</Text>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {
                    if (textFrom === "Morse" && !(['.', '-', ' ', '\n'].includes(text.substring(text.length - 1, text.length))))
                        text = text.substring(0, text.length - 1);
                    onChangeText(text);
                }}
                value={text}
                multiline={true}
                numberOfLines={15}
            />
            <Text>{textMorse}</Text>
            <StatusBar style="auto"/>
            <TouchableOpacity style={styles.btn} onPress={handlePress}><Text
                style={styles.btnText}>Translate</Text></TouchableOpacity>
            <View style={styles.options}>
                <TouchableWithoutFeedback onPress={() => {
                    onChangeIsMute(isMute === faVolumeUp ? faVolumeMute : faVolumeUp);
                }}>
                    <FontAwesomeIcon style={styles.optionIcon} icon={isMute} size={22}/>
                </TouchableWithoutFeedback>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    changeTranslate: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: colors.primary,
        width: "100%",
        padding: 10,
        paddingTop: 45,
    },
    changeTextFrom: {
        fontSize: 20,
        width: 70,
        alignContent: "flex-end",
        color: colors.white,
        textAlign: "right",
    },
    changeTextTo: {
        fontSize: 20,
        width: 70,
        color: colors.white,
    },
    changeBtn: {
        padding: 10,
    },
    changeIcon: {
        flex: 1,
        top: 8,
        marginHorizontal: 15,
        fontSize: 20,
        color: colors.white,
    },
    input: {
        height: "35%",
        width: "90%",
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        color: colors.black,
        borderColor: colors.gray,
    },
    btn: {
        padding: 10,
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        color: colors.gray,
        borderWidth: 1,
        borderRadius: 10,
        margin: 12,
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: colors.white,
    },
    optionIcon: {
        color: colors.primary,
        fontSize: 30,
        marginRight: 10,
    },
    options:{
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        padding: 10,
        paddingLeft: 30,
    },
});



