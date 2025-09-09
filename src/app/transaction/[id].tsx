import { Button } from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Input from "@/components/Input";
import PageHeader from "@/components/PageHeader";
import TransactionType from "@/components/TransactionType";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";

import { useTargetDatabase } from "@/database/useTargetDatabase";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase";

export default function Index() {
    const [amount, setAmount] = useState(0);
    const [observation, setObservation] = useState('');
    const params = useLocalSearchParams<{ id: string }>();
    const [type, setType] = useState(TransactionTypes.Input);
    const [isCreating, setIsCreating] = useState(false)
    const [current, setCurrent] = useState<number>();
    const targetDatabase = useTargetDatabase();

    const transactionsDatabase = useTransactionsDatabase()

    useEffect(() => {
        getCurrent()
    }, [])

    async function getCurrent() {
        const response = await targetDatabase.show(Number(params.id))

        setCurrent(response.current)
    }

    async function handleCreate() {
        try {
            if (amount <= 0) {
                Alert.alert('Atenção', 'Preencha o valor')
            }

            else if (current < amount) {
                Alert.alert('Saldo insuficiente', 'Não é possível resgatar um valor maior que o saldo disponível')
            }

            else {
                create()
            }

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível salvar a transação')
            console.log(error)
        } finally {
            setIsCreating(false)
        }
    }

    async function create() {
        setIsCreating(true)

        await transactionsDatabase.create({
            target_id: Number(params.id),
            amount: type === TransactionTypes.Output ? amount * -1 : amount,
            observation
        })

        Alert.alert('Sucesso', 'Transação salva com sucesso!', [
            {
                text: 'Ok',
                onPress: () => router.back()
            }
        ])
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>

            <PageHeader title="Nova Transação" subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e evitar retirar." />

            <View style={{ marginTop: 32, gap: 24 }}>
                <TransactionType selected={type} onChange={setType} />

                <CurrencyInput value={amount} label="Valor (R$)" onChangeValue={setAmount} />

                <Input label="Motivo (opcional)" placeholder="Ex: Investir em CDB de 110%" onChangeText={setObservation} />

                <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating} />
            </View>
        </View>
    )
}