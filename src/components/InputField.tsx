import { Text, KeyboardAvoidingView, Keyboard, View, TouchableWithoutFeedback,TextInput, TextInputProps } from "react-native";
import React from "react";

type InputFieldProps = TextInputProps & {
  label: string;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  className?: string;
  rightIcon?: React.ReactNode;
  numeric?: boolean;
};

const InputField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  className,
  rightIcon,
  numeric = false,
  ...props
}: InputFieldProps) => (
  <KeyboardAvoidingView className="w-full">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="my-2 w-full">
        <Text className={`text-3xl font-FlamanteBook mb-3 ${labelStyle}`}>{label}</Text>

        <View
          className={`flex flex-row items-center rounded-full border border-indigo-500 px-4 w-full ${containerStyle}`}
        >
          <TextInput
            className={`flex-1 py-text-[15px] text-left ${inputStyle}`}
            secureTextEntry={secureTextEntry}
            keyboardType={numeric ? "numeric" : "default"}
            {...props}
          />
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default InputField;
