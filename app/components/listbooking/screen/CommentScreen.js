import React, {useEffect, useState} from 'react';
import navigationRef from '../../../navigations/navigationRef';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PointItem from '../item/pointItem';
import Getbooking from '../../../api/booking/Getbooking';
const data = [5, 4, 3, 2, 1];
const CommentScreen = props => {
  const [pointactive, setPointactive] = useState();
  const [item, setItem] = useState(props.route.params.item);
  useEffect(() => {
    setItem(item => ({
      ...item,
      pointcomment: pointactive,
    }));
  }, [pointactive]);
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <Text style={{fontSize: 17}}>ĐÁNH GIÁ</Text>
        </View>
        <View style={styles.points}>
          <Text>Điểm đánh giá:</Text>
          <FlatList
            style={{marginTop: 20}}
            horizontal={true}
            data={data}
            renderItem={({item}) => {
              return (
                <PointItem
                  item={item}
                  pointactive={pointactive}
                  setPointactive={setPointactive}
                />
              );
            }}
            keyExtractor={index => index}
          />
        </View>
        <View style={styles.comment}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setItem(item => ({
                ...item,
                comment: text,
              }));
            }}
          />
        </View>
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              Getbooking(`${item.id}`, 'PUT', item).then(res => {
                console.log(res);
                if (res?.status == 200) {
                  alert('thanh cong');
                } else {
                  alert('khong thanh cong');
                }
              });
            }}
            style={[styles.button, {backgroundColor: '#FC6011'}]}>
            <Text style={{color: '#fff'}}>Đánh giá</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigationRef.popToTop();
            }}
            style={styles.button}>
            <Text>Thoát</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    paddingHorizontal: 10,
    marginHorizontal: 50,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  points: {
    marginTop: 20,
  },
  point: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  comment: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
    width: 100,
    height: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
