import React, { useRef, useState } from 'react'
import { View, TextInput as RNTextInput } from 'react-native'

type DateInputProps = {
  onDateChange?: (date: string) => void
}

const DateInput: React.FC<DateInputProps> = ({ onDateChange }) => {
  const [dateValues, setDateValues] = useState(["", "", ""])
  const inputRefs = [
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
    useRef<RNTextInput>(null),
  ]
  const maxLengths = [2, 2, 4]

  const handleDateChange = (text: string, index: number) => {
    if (/^\d+$/.test(text) || text === "") {
      const newDate = [...dateValues]
      newDate[index] = text
      setDateValues(newDate)

      if (text.length === maxLengths[index] && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus()
      }

      const [day, month, year] = newDate
      if (day.length === 2 && month.length === 2 && year.length === 4) {
        const formatted = `${day}/${month}/${year}`
        onDateChange?.(formatted)
      }
    }
  }

  return (
    <View className="flex-row items-center justify-center space-x-4 mt-2 gap-3">
      {dateValues.map((value, index) => (
        <RNTextInput
          key={index}
          ref={inputRefs[index]}
          value={value}
          onChangeText={(text) => handleDateChange(text, index)}
          keyboardType="numeric"
          maxLength={maxLengths[index]}
          className={`h-20 text-center text-4xl border border-indigo-500 rounded-full bg-white ${
            index === 2 ? "w-24" : "w-20"
          }`}
        />
      ))}
    </View>
  )
}

export default DateInput
