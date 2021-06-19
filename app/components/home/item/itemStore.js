import * as React from 'react';
import { View, StyleSheet,Text,Image,TouchableWithoutFeedback} from 'react-native';

export default function ItemStore(props){
    return(
        <TouchableWithoutFeedback onPress={()=>{
            props.navigation.navigate('DetailStoreScreen',{
                item: props.item,
                navigation:props.navigation
            })
        }}>
        <View style={styles.container}>
        <Image
            style={styles.img}
            source={{ uri: props.item.image }}
        />
        <View style={styles.text}>
            <Text style={{ fontSize: 18, color: 'red' }}>{props.item.name}</Text>
            <Text style={{ fontSize: 12, color: '#535353' }}>{props.item.address}</Text>
        </View>
        <View style={styles.br}></View>
        <View style={styles.service}>
            <View style={styles.nameService}>
                <Text style={{fontSize:18}}>
                    {props.item.listservice[0].nameservice}
                </Text>
            </View>
            <View style={styles.costService}>
                <Text style={{fontSize:18,color:'red'}}>
                {props.item.listservice[0].price}.000
                </Text>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        // borderTopStartRadius: 10,
        // borderTopRightRadius: 10,
        height: 400,
        marginBottom:'7%'
    },
    img: {
        height: 270,
        width: "100%",
        // borderTopStartRadius: 10,
        // borderTopRightRadius: 10
    },
    text: {
        height: 50,
        paddingHorizontal: '3%',
        marginTop: '3%',
    },
    br: {
        marginTop: '3%',
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    },
    service: {
        paddingHorizontal: '3%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameService: {
        flex:1,
    },
    costService: {
        flex:1,
        alignItems:'flex-end',
    }
})