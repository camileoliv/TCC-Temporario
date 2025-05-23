import { Modal as RNModal, ModalProps, KeyboardAvoidingView, View } from 'react-native'

type PROPS = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

export const Modal = ({ isOpen, withInput, children, ...rest} : PROPS) => {
    const content = withInput ? (
        <KeyboardAvoidingView
        className='flex-1 items-center justify-center px-3 bg-zinc-900/40'>
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View className='flex-1 items-center justify-center px-3 bg-zinc-900/40'>
            {children}
        </View>

        )
    return(
        <RNModal
        visible={isOpen}
        transparent
        animationType='fade'
        statusBarTranslucent
        {...rest}
        >
            {content}
        </RNModal>
    )

}