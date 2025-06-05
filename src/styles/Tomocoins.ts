import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 10,
        backgroundColor: " ",
        fontFamily: "Inter",
        padding: 5,
    },
    quantidadeMoeda: {
        alignSelf: 'flex-end',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        height: 45,
        width: 106,
        borderWidth: 1,
        borderColor: '#F2F0F8',
        marginBottom: 40,
    },
    boxPrecos: {
        alignItems: "center",
        justifyContent: "center",
        gap: 40
    },
    preco: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 120,
        backgroundColor: "#FFFFFF",
        borderRadius: 50,
        height: 80,
        width: 341,
        borderColor: "#6366F1",
        borderWidth: 1 // Adicionado esta linha
    },
    temocoQuantidade: {
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    textoPrecos: {
        color: "#666666",
        width: 96,
        height: 24,
        fontWeight: "bold",
        fontSize: 20
    },
    textoQuantidade: {
        color: "#666666", 
        fontWeight: "bold",
        width: 35,
        height: 17
    },
    titulo: {
        color: 'black',
        fontSize: 24,
        fontWeight: "bold",
    },
    boxImagem: {
        alignSelf: 'flex-end',
    }
});