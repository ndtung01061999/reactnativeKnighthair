import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Comment({item}) {
  console.log(item);
  return (
    <View style={styles.itemcmt}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={{
              uri: item.comment,
            }}
            style={styles.avatar}
          />
          <View style={{justifyContent: 'center', marginLeft: '3%'}}>
            <Text>{item.avatar}</Text>
          </View>
        </View>
        <View style={styles.pointcmt}>
          <Text>{item.point}</Text>
        </View>
      </View>

      <View style={{marginTop: '3%'}}>
        <Text style={{color: '#535353'}}>{item.name}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  itemcmt: {
    marginHorizontal: '3%',
    marginTop: '3%',
    backgroundColor: '#fff',
    padding: '3%',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30,
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
});
