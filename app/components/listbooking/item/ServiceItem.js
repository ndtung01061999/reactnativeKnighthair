import React from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ServiceItem({item}) {
  return (
    <View>
      <View style={{marginTop:5}}>
        <Text style={{fontSize: 18}}>Giờ: {item.timebooking}</Text>
      </View>
      <View style={styles.detail}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18}}>{item.nameservice}</Text>
        </View>
        <View>
          <Text style={{fontSize: 18, color: '#FC6011'}}>{item.price}.000</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
