import { Option } from '@/components/TransactionType/option';
import { styles } from '@/components/TransactionType/styles';
import { colors } from '@/theme';
import { TransactionTypes } from '@/utils/TransactionTypes';
import { View } from 'react-native';

type Props = {
    selected: TransactionTypes
    onChange: (type: TransactionTypes) => void
}

export default function TransactionType({onChange, selected}: Props) {
 return (
   <View style={styles.container}>
        <Option 
            icon='arrow-upward'
            title='Guardar'
            isSelected= {selected === TransactionTypes.Input}
            selectedColor={colors.blue[500]}
            onPress={() => onChange(TransactionTypes.Input)}
        />
        <Option 
            icon='arrow-downward'
            title='Resgatar'
            isSelected= {selected === TransactionTypes.Output}
            selectedColor={colors.red[400]}
            onPress={() => onChange(TransactionTypes.Output)}
        />
   </View>
  );
}