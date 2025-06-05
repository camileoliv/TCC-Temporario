import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 10,
        backgroundColor: "white",
        fontFamily: "Inter",
        padding: 5,
    },
    boxImagem: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    titulo: {
        color: 'black',
        fontSize: 24,
        fontWeight: "bold",
        textAlign: 'center',
        marginVertical: 10,
    },
    texto1: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 24,
        color: 'black',
    },
    central: {
        backgroundColor: "#FFFFFF",
        borderColor: '#787ED8',
        borderWidth: 2,
        width: 293,
        height: 354,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    line: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: '#787ED8',
        marginVertical: 20,
    },
    botao: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#735573',
    },
    textoBotao: {
        color: 'black',
        fontSize: 16,
    },
    planoContainer: {
        width: '100%',
        alignItems: 'center',
    },
    preco: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    tituloPlano: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center'
    },
    descricaoContainer: {
        width: '100%',
        marginVertical: 8,
    },
    itemDescricao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        textAlign: 'justify',
    },
    bolinha: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'black',
        marginRight: 8,
    },
    textoJustificado: {
        flex: 1,
        textAlign: 'left', 
        fontSize: 14,
        lineHeight: 20,
    },
    centralizado: {
        textAlign: 'center',
    },
    indicadorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    indicador: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    indicadorAtivo: {
        backgroundColor: 'black',
        width: 12,
        height: 12,
    },
    indicadorInativo: {
        backgroundColor: 'white',
    },
});