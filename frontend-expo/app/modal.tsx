import BottomSheet, { BottomSheetView, } from '@gorhom/bottom-sheet'
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { useDealerStore } from '@/stores/use-dealer-store';
import { Octicons } from '@expo/vector-icons';
import { images } from '@/utils/images';

export default function Modal () {

    const router = useRouter();
    const { dealers } = useDealerStore();
    const snapPoint = ['45%']

    const handleModalChange = useCallback((index: number) => {
        if (index === -1) {
            router.back();
        }
    }, [router])
      
    return (

        <BottomSheet
            snapPoints={snapPoint}
            onChange={handleModalChange}
            enablePanDownToClose
            containerStyle={{ flex: 1, marginBottom: 80, marginHorizontal: 10, paddingHorizontal: 10 }}
        >
            <BottomSheetView style={{ flex: 1 }}>
                <View className='px-2'>
                    <Text variant='titleLarge' className='text-gray-600 font-bold text-left'>Repartidores cercanos</Text>
                    <View className='border-b my-4 w-full border-gray-300' />
                </View>
                <View className='gap-4'>
                    { dealers.map((dealer, index) => (
                        <View className='flex-row items-center justify-between py-2 px-4 w-full' key={index}>
                            <View className='flex-row items-center gap-4'>
                                <Image 
                                    source={images[dealer.image]} 
                                    style={{ width: 32, height: 32 }}
                                />
                            <Text className='text-base text-gray-800 font-normal'>{dealer.name}</Text>
                            </View>
                            <View className='flex-row items-center mr-4 py-2 gap-2'>
                                <Text className='text-base text-gray-800 font-normal'>8 Minutos</Text>
                                <Octicons name="chevron-right" size={20} color="black" />
                            </View>
                        </View>
                    ))}
                </View>
            </BottomSheetView>
        </BottomSheet>

    )
}