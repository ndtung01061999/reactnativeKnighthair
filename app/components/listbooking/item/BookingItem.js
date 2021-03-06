import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Onestore from '../../../api/store/Onestore';
import ServiceItem from './ServiceItem';
import Spinner from 'react-native-loading-spinner-overlay';
import navigationRef from '../../../navigations/navigationRef';
import Getbooking from '../../../api/booking/Getbooking';

const ButtonAlert = title =>
  Alert.alert('Thông báo', title, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
function callAPI(urlstore, setStore) {
  Onestore(urlstore, 'GET', null).then(res => {
    setStore(res.data);
  });
}
export default function BookingItem({item}) {
  const data = () => {
    let list = [];
    for (var i = 0; i < item.listdetail.length; i++) {
      list.push(item.listdetail[i]);
      if (item.listdetail[i].nameservice === 'Nhuộm tóc') {
        i++;
      }
    }
    return list;
  };
  const [modal, setModal] = useState(false);
  const [store, setStore] = useState();
  const urlstore = `store/${item.listdetail[0].idstore}`;
  const [isload, setIsload] = useState(false);
  useEffect(() => {
    callAPI(urlstore, setStore);
  }, []);
  if (store == null) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }
  return (
    <View>
      <Spinner
        visible={isload}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <TouchableOpacity
        onPress={() => {
          setModal(true);
          data();
        }}>
        <View style={styles.book}>
          <View style={styles.date}>
            <Text style={{fontSize: 20, color: '#FC6011'}}>
              {item.listdetail[0].timebooking}
            </Text>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#ccc',
                marginVertical: '3%',
              }}
            />
            <Text>{item.listdetail[0].date}</Text>
          </View>
          <View
            style={{
              width: 1,
              height: '80%',
              backgroundColor: '#ccc',
              marginVertical: '2%',
              marginHorizontal: '3%',
            }}
          />
          <View style={styles.location}>
            <Text style={{fontSize: 20}}>{item.listdetail[0].nameservice}</Text>
            <Text style={{color: '#FC6011'}}>
              {item.listdetail[0].price}.000
            </Text>
            <Text style={{fontSize: 15}}>{store.name}</Text>
            <Text
              style={{
                color:
                  item.status == 1
                    ? '#FF9100'
                    : item.status == 2
                    ? 'red'
                    : item.status == 3
                    ? 'green'
                    : 'blue',
              }}>
              {item.status == 1
                ? 'Chờ xác nhận'
                : item.status == 2
                ? 'Huỷ'
                : item.status == 3
                ? 'Đã xác nhận'
                : 'Hoàn thành'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <View style={{flexDirection: 'row', marginBottom: '3%'}}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18}}>
                    <Icon size={30} name="calendar" /> {item.listdetail[0].date}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                  }}>
                  <View>
                    <Icon size={30} name="close" />
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '3%',
                }}>
                <Icon size={30} name="clockcircleo" />
                <Text style={{fontSize: 18, marginLeft: '3%'}}>
                  {item.listdetail[0].timebooking}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '3%',
                }}>
                <Entypo size={30} name="location-pin" />
                <View style={{marginLeft: '3%'}}>
                  <Text style={{fontSize: 18}}>{store.name}</Text>
                  <Text style={{fontSize: 15, color: '#535353'}}>
                    {store.address}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: '3%',
                }}>
                <Icon size={30} name="star" />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: '3%',
                    color:
                      item.status == 1
                        ? '#FF9100'
                        : item.status == 2
                        ? 'red'
                        : item.status == 3
                        ? 'green'
                        : 'blue',
                  }}>
                  {item.status == 1
                    ? 'Chờ xác nhận'
                    : item.status == 2
                    ? 'Huỷ'
                    : item.status == 3
                    ? 'Đã xác nhận'
                    : 'Hoàn thành'}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#ccc',
              }}
            />
            <View style={{marginBottom: '3%'}}>
              <View style={styles.title}>
                <View style={{flex: 1}}>
                  <Text style={styles.texttitle}>Dịch vụ</Text>
                </View>
                <View>
                  <Text style={styles.texttitle}>Thành tiền</Text>
                </View>
              </View>
              <View>
                <FlatList
                  data={data()}
                  renderItem={({item}) => {
                    return <ServiceItem item={item} />;
                  }}
                />
              </View>
            </View>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#ccc',
              }}
            />
            <View>
              <View style={styles.price}>
                <View style={{flex: 1}}>
                  <Text style={{fontSize: 18, color: '#535353'}}>
                    Tổng tiền
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: 18, color: '#FC6011'}}>
                    {item.total}.000
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '3%',
              }}
              onPress={() => {
                if (item.status == 4) {
                  navigationRef.navigate('Comment', {item: item});
                  setModal(false);
                } else {
                  item.status = 2;
                  Getbooking(`${item.id}`, 'PUT', item).then(res => {
                    console.log(res);
                    if (res?.status == 200) {
                      alert('thanh cong');
                      setModal(false);
                    } else {
                      alert('khong thanh cong');
                      setModal(false);
                    }
                  });
                }
              }}>
              <View style={styles.button}>
                <Text style={{color: '#fff'}}>
                  {item.status == 4 ? 'ĐÁNH GIÁ' : 'HUỶ ĐẶT CHỖ'}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  book: {
    marginBottom: 10,
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: '3%',
  },
  date: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '5%',
  },
  modalView: {
    padding: '3%',
    marginHorizontal: '3%',
    height: 500,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    flexDirection: 'row',
    marginVertical: '3%',
  },
  texttitle: {
    fontSize: 18,
    color: '#535353',
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  price: {
    flexDirection: 'row',
    marginTop: '3%',
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: '#FC6011',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
