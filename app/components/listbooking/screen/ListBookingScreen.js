import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import Getbooking from '../../../api/booking/Getbooking';
import BookingItem from '../item/BookingItem';
import { useSelector } from 'react-redux';
function callAPI(url, setData) {
    Getbooking(url, 'GET', null).then(res => {
        setData(res.data);
    })
}
export default function ListBookingScreen() {

    const url = useSelector(state => state?.numberReducer?.idaccount)
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState([]);
    console.log(data)
    useEffect(() => {
        callAPI(url, setData);
    },)
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={styles.header}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Lịch sử đặt chỗ</Text>
            </View>
            <View style={styles.listbook}>
                {
                    data == "" ?
                        <View style={{marginTop:200, alignItems: 'center' }}>
                            <Text style={{fontSize:20}}>Không có lịch đặt</Text>
                        </View>
                        :
                        <FlatList
                            contentContainerStyle={{ paddingBottom: 150 }}
                            refreshing={refresh}
                            onRefresh={() => {
                                callAPI(url, setData)
                            }}
                            data={data}
                            renderItem={({ item }) => {
                                return <BookingItem item={item} />
                            }
                            }
                        />
                }
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {

    },
    header: {
        height: 50,
        backgroundColor: '#FC6011',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listbook: {
        marginHorizontal: '3%',
        marginTop: 10,
    },
    book: {
        marginBottom: '3%',
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: '3%',
    },
    date: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    location: {
        justifyContent: 'center'
    },

})