import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, TextInput, FlatList } from 'react-native';
import ItemStore from '../item/itemStore';
import storeservice from '../../../api/store/storeservice'

const callAPI=(url,setData)=>{
    storeservice(url, 'GET', null).then(res => {
        setData(res.data);
    })
}

const ListStoreScreen = (props) => {
    const url = '/store/oneservice/' + props.route.params.type;
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        storeservice(url, 'GET', null).then(res => {
            setData(res.data);
        })
    }, [])
    const [text, onChangeText] = useState();
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <View style={styles.header}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Tìm kiếm"
                />
            </View>
            <FlatList
                refreshing={refresh}
                onRefresh={() => {
                    callAPI(url, setData)
                }}
                data={data}
                renderItem={({ item, index }) => <ItemStore item={item} navigation={props.navigation} />}
                keyExtractor={item => item?.id}
                contentContainerStyle={styles.list}
            />
        </View>
    )
};

export default ListStoreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        height: 70,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#ccc',
        borderRadius: 10
    },
    list: {
        paddingHorizontal: '3%',
        marginTop: '5%'
    },
})