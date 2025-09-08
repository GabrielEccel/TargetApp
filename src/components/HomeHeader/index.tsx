import { styles } from '@/components/HomeHeader/styles';
import { Separator } from '@/components/Separator';
import { Summary, SummaryProps } from '@/components/Summary';
import { colors } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export type HomeHeaderProps = {
    total: string,
    input: SummaryProps,
    output: SummaryProps

}

type Props = {
    data: HomeHeaderProps,

}

export function HomeHeader({ data }: Props) {
    return (
        <LinearGradient colors={[colors.blue[500], colors.blue[800]]} style={styles.container}>
            <Text style={styles.label}>Total que você possuiu: </Text>
            <Text style={styles.total}>{data.total}</Text>
            <Separator color={colors.blue[400]} />

            <View style={styles.summary}>
                <Summary
                    data={data.input}
                    icon={{ name: 'arrow-upward', color: colors.green[500] }}
                />
                <Summary
                    data={data.output}
                    icon={{ name: 'arrow-downward', color: colors.red[400] }}
                    isRight
                />
            </View>

        </LinearGradient>
    );
}