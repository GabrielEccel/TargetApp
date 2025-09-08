import { Button } from "@/components/Button";
import { HomeHeader } from "@/components/HomeHeader";
import { List } from "@/components/List";
import Target, { TargetProps } from "@/components/Target";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StatusBar, View } from "react-native";

import { Loading } from "@/components/Loading";
import { useTargetDatabase } from "@/database/useTargetDatabase";

const summary = {
    total: 'R$ 2.680,00',
    input: { label: 'Entradas', value: 'R$ 6,184.90' },
    output: { label: 'Saídas', value: 'R$ 6,184.90' }
}


export default function Index() {
    const [isFetching, setisFetching] = useState(true);
    const targetDatabase = useTargetDatabase()
    const [targets, setTargets] = useState<TargetProps[]>([])

    async function fetchTargets(): Promise<TargetProps[]> {
        try {
            const response = await targetDatabase.listBySavedValue()
            return response.map((item) => ({
                id: String(item.id),
                name: item.name,
                current: String(item.current),
                percentage: item.percentage.toFixed(0) + "%",
                target: String(item.amount)
            }))

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as metas.')
            console.log(error)
        }
    }

    async function FetchData(){
        const targetDataPromise = fetchTargets()

        const [targetData] = await Promise.all([targetDataPromise])
        setTargets(targetData)
        setisFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            FetchData()
        }, [])
    )

    if(isFetching){
        return <Loading />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <HomeHeader data={summary} />

            <List
                data={targets}
                renderItem={({ item }) => <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />}
                title='Metas'
                keyExtractor={(item) => item.id}
                emptyMessage="Nenhuma meta. Toque em nova meta para criar."
                containerStyle={{ paddingHorizontal: 24 }}
            />

            <View style={{ padding: 24, paddingBottom: 32 }}>
                <Button title="Nova Meta" onPress={() => router.navigate('/target')} />
            </View>

        </View>
    )
}