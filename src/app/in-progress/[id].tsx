import { Button } from '@/components/Button';
import { List } from '@/components/List';
import PageHeader from '@/components/PageHeader';
import Progress from '@/components/Progress';
import { Transaction } from '@/components/Transaction';
import { TransactionTypes } from '@/utils/TransactionTypes';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

const details = {
   current: "580",
   target: "1790",
   percentage: 50
}

const trasactions = [
   {
      id: '1',
      value: '300',
      date: '14/04/2025',
      description: 'Teste',
      type: TransactionTypes.Input
   },
   {
      id: '2',
      value: '20',
      date: '14/04/2025',
      type: TransactionTypes.Output
   }
]

export default function InProgress() {
   const params = useLocalSearchParams<{ id: string }>();
   return (
      <View style={{ flex: 1, padding: 24, gap: 32 }}>

         <PageHeader title='Apple Watch' rightButton={{ icon: 'edit', onPress: () => { } }} />

         <Progress data={details} />

         <List 
            title='Transações'
            data={trasactions}
            renderItem={({item}) => <Transaction data={item} onRemove={() => {}}/>}
            emptyMessage='Nenhuma Transação. Toque em nova transação para guardar seu primeiro dinheiro aqui'
         />

         <Button title='Nova Transação' onPress={() => router.navigate(`/transaction/${params.id}`)}/>
      </View>
   );
}