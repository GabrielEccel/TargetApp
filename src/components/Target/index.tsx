import { styles } from '@/components/Target/styles';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

export type TargetProps = {
    id?: string,
    name: string,
    percentage: string,
    current: string,
    target: string
}

type Props = TouchableOpacityProps & {
    data: TargetProps
}

export default function Target({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.content}>
                <Text style={styles.name} numberOfLines={1}>{data.name}</Text>
                <Text style={styles.status}>{data.percentage} • {data.current} de {data.target}</Text>
            </View>

            <MaterialIcons name='chevron-right' size={20} />
   </TouchableOpacity>
    );
}