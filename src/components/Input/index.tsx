import { styles } from '@/components/Input/styles';
import { colors } from '@/theme';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type Props = TextInputProps & {
    label: string
}

export default function Input({label, ...rest}: Props) {
 return (
   <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...rest} style={styles.input} placeholderTextColor={colors.gray[400]}/>
   </View>
  );
}