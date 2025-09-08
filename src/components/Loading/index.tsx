import { styles } from "@/components/Loading/styles";
import { colors } from "@/theme/colors";
import { ActivityIndicator } from "react-native";

export function Loading(){
    return <ActivityIndicator color={colors.blue[500]} style={styles.container} size={'large'}/>
}