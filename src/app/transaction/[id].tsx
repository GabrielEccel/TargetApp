import { Button } from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Input from "@/components/Input";
import PageHeader from "@/components/PageHeader";
import TransactionType from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Index(){
    const params = useLocalSearchParams<{id: string}>();
    const [type, setType] = useState(TransactionTypes.Input);

    return (
        <View style={{flex: 1, padding: 24}}>
            <PageHeader title="Nova Transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />

            <View style={{marginTop: 32, gap: 24}}>
                <TransactionType selected={type} onChange={setType}/>

                <CurrencyInput value={0} label="Valor (R$)"/>

                <Input label="Motivo (opcional)" placeholder="Ex: Investir em CDB de 110%"/>

                <Button title="Salvar"/>
            </View>
        </View>
    )
}