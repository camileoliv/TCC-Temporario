import { Text, TouchableOpacity, View } from "react-native"
import React from "react";

type CustomButtonProps = {
  value: 'sim' | 'nao' | 'nao sei';
  onPress: (value: 'sim' | 'nao' | 'nao sei') => void;
  bgVariant?: string;
  title: string;
  textVariant?: string;
  className?: string;
  containerClassName?: string;
  activeBgColor?: string; 
  shouldChangeColor?: boolean; 
}

const CustomButton = ({ 
  value,
  onPress,
  title= '',
  textVariant = '', 
  className = '',
  containerClassName = '',
  activeBgColor = 'bg-indigo-200', 
  shouldChangeColor = false 
}: CustomButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);

  const handlePress = () => {
    onPress(value);
    if (shouldChangeColor) {
      setIsActive(!isActive);
    }
  };

  const getBackgroundColor = () => {
    let baseStyle = `rounded-full p-1 w-28 h-14 items-center justify-center ${containerClassName}`;
    
    if (shouldChangeColor && isActive) {
      return `${baseStyle} ${activeBgColor}`;
    }
    return `${baseStyle} border-[2.1px] rounded-[40px] border-['#735573'] bg-white`;
  };

  return (
    <View >
      <TouchableOpacity 
        onPress={handlePress} 
        className={`${getBackgroundColor()} px-4 py-2 ${className}`}
        activeOpacity={0.7}
      >
        <Text className={`${textVariant} text-center font-Varela text-slate-700 capitalize`}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton