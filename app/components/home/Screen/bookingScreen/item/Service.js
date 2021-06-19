import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Service(props) {
    return (
        <View style={styles.service}>
            <View style={styles.nameService}>
                <Text style={{ fontSize: 18 }}>
                    {props.item.nameservice}
                </Text>
                <Text >
                    30 Phut
                </Text>
            </View>
            <View style={styles.costService}>
                <Text style={{ fontSize: 18, color: '#FC6011' }}>
                    {props.item.price}.000
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    service: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        paddingHorizontal: '3%',
        marginBottom: '3%'
    },
    nameService: {
        flex: 1,
    },
    costService: {
        flex: 1,
        alignItems: 'flex-end',
    },
})