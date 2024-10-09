import {useState, useRef} from 'react'
import {View, StyleSheet, Text, Image, Button} from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'

export default function Camera() {
    const [permissao, pedirPermissao] = useCameraPermissions ()
    const [foto, setFoto] = useState(null)
    const cameraRef = useRef(null)
    const [Lado, setlado] = useState('back')


    if (!permissao){
        return <View></View>
    }
    if (!permissao.granted) {
        return (
            <View Style={styles.container}>
                <Text Style={styles.textoPermissao}>Voce precisa pedir a permissao para usar a camera</Text>
                    <Button title= 'pedir Permissao' onPress={pedirPermissao}/>
                
            </View>
        )
    }

    const tirarfoto = async () => {
        const foto_base64   = await cameraRef.current?.takePictureAsync({
            quality: 0.5,
            base64: true
        })
        setFoto (foto_base64)

        console.log(foto)   
    }

    const trocacamera = () => {
        setlado(Lado == 'back' ? 'front' : 'back' )
    }

    const salvarFoto = () => {
        MediaLibrary.saveToLibraryAsync(foto.uni);
        setFoto(null);
    };

    return (
        <View style={styles.container}>  
            {foto ?
                <View>
                    <Image source={{ uri: foto.uri}} style={styles.foto} />
                    <Button title='limpar foto' onPress={setFoto(null)}/>
                    <Button tittle='descartar foto' onPress={setFoto(null)}/>
                    <Button tittle='Salvar Foto' onPress={salvarFoto} />
                </View>:
                <CameraView facing={Lado} style={styles.camera} ref={cameraRef}>
                    <Button title="Tirar Foto" onPress={tirarfoto} />
                    <Button title='inverter camera' onPress={trocacamera} />
                </CameraView>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center'
    },  
    textoPermissao:{
        textAlign:'center',
    },
    camera:{
        flex:1
    },
    foto:{
        width:'100%',
        height:'100%'
    }

})