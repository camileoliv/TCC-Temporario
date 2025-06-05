import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F2F0F8'
    },
    postagem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#787ED8',
        padding: 16,
        paddingTop: 10,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 26,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#1E293B'
    },
    conteudo: {
        fontSize: 14,
        color: '#475569',
        marginBottom: 8
    },
    data: {
        fontSize: 12,
        color: '#64748B'
    },
    boxImagem: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
});