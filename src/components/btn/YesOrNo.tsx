import { Text, TouchableOpacity, View } from "react-native";
import React from "react";

type SimNaoButtonProps = {
  value: 'sim' | 'nao'; 
  onPress: (value: 'sim' | 'nao') => void
  title: string;
  className?: string;
  containerClassName?: string;
  activeBgColor?: string; 
  shouldChangeColor?: boolean;
};

const SimNaoButton = ({ 
  value, 
  onPress, 
  title, 
  className = '', 
  containerClassName = '', 
  activeBgColor = 'bg-indigo-200', 
  shouldChangeColor = false 
}: SimNaoButtonProps) => {
  const [isActive, setIsActive] = React.useState(false);

  const handlePress = () => {
    onPress(value);
    if (shouldChangeColor) {
      setIsActive(!isActive);
    }
  };

  const getBackgroundColor = () => {
    let baseStyle = `rounded-full p-1 w-20 h-14 items-center justify-center ${containerClassName}`;
    
    if (shouldChangeColor && isActive) {
      return `${baseStyle} ${activeBgColor}`;
    }
    return `${baseStyle} border-[0.5px] rounded-[40px] border-indigo-500 bg-white`;
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={handlePress} 
        className={`${getBackgroundColor()} px-4 py-2 ${className}`} 
        activeOpacity={0.7}
      >
        <Text className="text-center text-slate-700 capitalize">{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SimNaoButton;
