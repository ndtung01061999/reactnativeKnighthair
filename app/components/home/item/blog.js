import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
const OpenURLButton = async ({item}) => {
  console.log(item);
  await Linking.openURL(item.url);
};
export default function Blog({item,navigation,type}) {
  return (
    <TouchableOpacity onPress={()=>{
      if(type==1){
        OpenURLButton({item})
      }
      else
      navigation.navigate('DetailStoreScreen',{
        item:item,
        navigation:navigation
      })
    }}>
      <View style={styles.item}>
        <Image
          source={{uri:item.image}}
          style={{height: 150, width: 250}}
        />
        <View>
          <Text style={{fontSize: 17, color: 'black'}}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: 200,
    width: 250,
    alignItems: 'center',
    marginRight: 10,
  },
});
