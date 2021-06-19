import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Image, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import allservice from '../../../../api/store/allservice';
import ItemService from '../../item/ItemService';
import CommentAPI from '../../../../api/store/CommentAPI';
import Comment from '../bookingScreen/item/Comment';
function descrip(props) {
    const des = props.split(" ");
    var res = "";
    for (let i = 0; i < 25; i++) {
        res += des[i].toString() + " ";
    }
    res += "....";
    return res;
}

export default function DetailStoreScreen({ route }) {
    const [total, setTotal] = useState(0);
    const [servicebooking, setServicebooking] = useState([]);
    const [service, setService] = useState([]);
    const [comment, setCommnet] = useState([]);
    const navigation = route.params.navigation;
    const data = route.params.item;
    const url = `store/service/${data.id}`;
    useEffect(() => {
        allservice(url, 'GET', null).then(res => {
            setService(res.data);
        })
        CommentAPI(data.id, 'GET', null).then(res => {
            setCommnet(res.data);
        })
    }, []);
    const [des, setDes] = useState(descrip(data.description));
    const [see, setSee] = useState('xem thêm');
    function desPress() {
        if (see === "xem thêm") {
            setDes(data.description);
            setSee('thu gon');
        }
        else {
            setDes(descrip(data.description));
            setSee('xem thêm');
        }
    }
    if (service == null && comment == null) return null;
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={styles.header}>
                <Text style={{ color: '#fff', fontSize: 18 }}>{data.name}</Text>
            </View>
            <View>
                <Image
                    source={{ uri: data.image }}
                    style={styles.img}
                />
            </View>
            <ScrollView >
                <View style={styles.address}>
                    <Text style={{ color: '#535353' }}>
                        {data.address}
                    </Text>
                </View>

                <View style={styles.des}>
                    <Text>
                        {des}
                        <TouchableOpacity
                            onPress={
                                desPress
                            }
                        >
                            <Text style={{ color: '#FC6011' }}>
                                {see}
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View style={styles.tabs}>
                    <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('ServiceNavi')}>
                        <View>
                            <Text>
                                DỊCH VỤ
                      </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tab}>
                        <View>
                            <Text>
                                ĐÁNH GIÁ
                      </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList

                    data={service}
                    renderItem={({ item, index }) =>
                        <ItemService serviceBooking={servicebooking} total={total} setTotal={setTotal} item={item} setServicebooking={setServicebooking} />}
                    keyExtractor={item => item?.id}
                />
                <View style={styles.comments}>
                    <View>
                        <Text>
                            ĐÁNH GIÁ
                    </Text>
                    </View>
                    <View style={styles.points}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.point}>
                                <Text style={{ fontSize: 15 }}>
                                    {comment.avgPoint}
                                </Text>
                            </View>
                            <View>
                                <Text>
                                    Điểm trung bình
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: 1, height: '100%', backgroundColor: '#ccc', marginHorizontal: '3%' }}>

                        </View>
                        <View style={styles.listpoint}>
                            <View style={styles.pointitem}>
                                <Text>
                                    5
                                </Text>
                            </View>
                            <View style={styles.pointitem}>
                                <Text>
                                    4
                                </Text>
                            </View>
                            <View style={styles.pointitem}>
                                <Text>
                                    3
                                </Text>
                            </View>
                            <View style={styles.pointitem}>
                                <Text>
                                    2
                                </Text>
                            </View>
                            <View style={styles.pointitem}>
                                <Text>
                                    1
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={comment.listcomment}
                    renderItem={({ item }) => 
                        <Comment item={item} />}
                    keyExtractor={item => item?.id}
                />
            </ScrollView>
            <View style={[styles.price, { display: (total === 0 ? 'none' : 'flex') }]} >
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>
                        {total}.000
                    </Text>
                </View>
                <View style={{ marginVertical: '3%' }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            navigation.navigate('BookingScreen', {
                                navigation: navigation,
                                id: data.id,
                                service: servicebooking,
                                total: total,
                            })
                        }}
                    >
                        <View >
                            <Text style={{ fontSize: 15 }}>
                                Chọn thời gian
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10
    },
    header: {
        height: 50,
        backgroundColor: '#FC6011',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 270,
        width: '100%',
    },
    address: {
        paddingTop: '3%',
        paddingHorizontal: '3%',
        backgroundColor: '#fff',
    },
    des: {
        paddingTop: '3%',
        paddingHorizontal: '3%',
        backgroundColor: '#fff',
    },
    tabs: {
        marginTop: '3%',
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: 100
    },
    comments: {
        marginHorizontal: '3%',
        marginTop: '3%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        padding: '3%'

    },
    points: {
        flexDirection: 'row',
    },
    point: {
        marginTop: '3%',
        width: 45,
        height: 45,
        borderColor: '#FC6011',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listpoint: {
        flexDirection: 'row'
    },
    pointitem: {
        marginRight: '2%',
        marginTop: '3%',
        width: 45,
        height: 45,
        borderColor: '#FC6011',
        borderWidth: 1,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',

    },
    listcmt: {
    },
    itemcmt: {
        marginHorizontal: '3%',
        marginTop: '3%',
        backgroundColor: '#fff',
        padding: '3%'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    pointcmt: {
        width: 35,
        height: 35,
        borderColor: '#FC6011',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    price: {
        paddingLeft: '3%',
        height: 60,
        backgroundColor: '#FC6011',
        flexDirection: 'row',
    },
    button: {
        height: '100%',
        width: 150,
        backgroundColor: '#fff',
        marginRight: '3%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    }
})