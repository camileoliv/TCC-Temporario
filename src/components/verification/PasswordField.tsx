import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

interface PinInputProps {
  length?: number
  onChange: (pin: string[]) => void;
  inputStyle?: string; 
  containerStyle?: string; 
}

const PinInput: React.FC<PinInputProps> = ({
  length = 3,
  onChange,
  inputStyle = 'w-12 h-12', 
  containerStyle = 'flex-row items-start justify-start space-x-4',
}) => {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>(Array(length).fill(null));

  const handleChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);
      onChange(newPin);
      if (text && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <View className={containerStyle}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
          secureTextEntry
          className={`text-center text-2xl border border-indigo-500 rounded-full bg-white ${inputStyle}`}
        />
      ))}
    </View>
  );
};

export default PinInput;
