import React, { useCallback, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from 'react-native';
import { colors } from '../../styles';

interface FormFieldProps extends TextInputProps {
  label?: string;
  type?: 'alphanumeric' | 'numeric';
  style?: any;
}

export const FormField = ({ label, ...rest }: FormFieldProps) => {
  const InputField = useMemo(() => {
    switch (rest.type) {
      case 'numeric':
        return NumericFormField;
      default:
        return TextFormField;
    }
  }, [rest.type]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <InputField {...rest} />
    </View>
  );
};

const TextFormField = ({ style, ...rest }: Omit<FormFieldProps, 'label'>) => {
  return (
    <TextInput
      autoComplete="off"
      autoCorrect={true}
      style={[
        styles.input,
        ...(Array.isArray(style) ? [...style] : [style] ? [style] : [])
      ]}
      {...rest}
    />
  );
};

const NumericFormField = ({ style, ...rest }: FormFieldProps) => {
  return (
    <TextInput
      autoComplete="off"
      autoCorrect={false}
      keyboardType="numeric"
      style={[
        styles.input,
        ...(Array.isArray(style) ? [...style] : [style] ? [style] : [])
      ]}
      maxLength={3}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  input: {
    color: colors.text,
    fontSize: 25,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: colors.inactive
  },
  label: {
    fontSize: 15,
    fontWeight: '400'
  }
});

export default FormField;
