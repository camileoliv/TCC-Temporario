import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F0F8',
        padding: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
   boxImagem: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    titulo: {
        color: '#1E293B',
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'Inter-Bold',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderColor: '#787ED8',
        borderWidth: 2,
        padding: 24,
        shadowColor: '#787ED8',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#475569',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: 'Inter-SemiBold',
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#1E293B',
    },
    contentInput: {
        height: 180,
        textAlignVertical: 'top',
    },
    separator: {
        height: 1,
        backgroundColor: '#787ED8',
        marginVertical: 16,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
    },
})