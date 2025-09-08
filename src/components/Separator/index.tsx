import { styles } from "@/components/Separator/styles";
import { ColorValue, View } from "react-native";

export function Separator({color}: {color: ColorValue}){
    return(
        <View style={[styles.container, {backgroundColor: color}]}/>
    )
}