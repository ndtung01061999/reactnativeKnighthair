import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Timelineservice from '../../../../api/store/Timelineservice';
import Createbooking from '../../../../api/booking/Createbooking';
import Timeline from './item/Timeline';
import Service from './item/Service';
import {useSelector} from 'react-redux';
function createdetail(timeone, timetwo, date, services) {
  const listdetail = [];
  if (timeone == null) {
    let detail = {
      idstore_service: services[0].id,
      time: timetwo,
      date: date,
    };
    listdetail.push(detail);
  } else if (timetwo == null) {
    for (let i = 0; i < services.length; i++) {
      let detail = {
        idstore_service: services[i].id,
        time: timeone,
        date: date,
      };
      listdetail.push(detail);
    }
  } else {
    for (let i = 0; i < services.length; i++) {
      if (services[i].nameservice == 'Gội đầu') {
        let detail = {
          idstore_service: services[i].id,
          time: timetwo,
          date: date,
        };
        listdetail.push(detail);
      } else {
        let detail = {
          idstore_service: services[i].id,
          time: timeone,
          date: date,
        };
        listdetail.push(detail);
      }
    }
  }
  return listdetail;
}
function checkwashhair(services) {
  let kt = 0;
  for (let i = 0; i < services.length; i++) {
    if (services[i].nameservice == 'Gội đầu') {
      kt = 1;
      break;
    }
  }
  return kt;
}
function checkcuthair(services) {
  let kt = 0;
  for (let i = 0; i < services.length; i++) {
    if (
      services[i].nameservice == 'Cắt tóc' ||
      services[i].nameservice == 'Nhuộm tóc'
    ) {
      kt = 1;
      break;
    }
  }
  return kt;
}
export default function BookingScreen({route}) {
  const id = useSelector(state => state.loginReducer.id);
  const [date, setDate] = useState(
    `${new Date().getFullYear()}-${
      new Date().getMonth() + 1 > 10
        ? new Date().getMonth() + 1
        : `0${new Date().getMonth() + 1}`
    }-${
      new Date().getDate() > 10
        ? new Date().getDate()
        : `0${new Date().getDate()}`
    }`,
  );
  const url = `store/equipment/${route.params.id}`;
  const [itemActiveone, setItemActiveone] = useState(null);
  const [itemActivetwo, setItemActivetwo] = useState(null);
  const [timelineone, setTimelineone] = useState([]);
  const [timelinetwo, setTimelinetwo] = useState([]);
  useEffect(() => {
    Timelineservice(`${url}/1/${date}`, 'GET', null).then(res => {
      setTimelineone(res.data);
    });
    Timelineservice(`${url}/2/${date}`, 'GET', null).then(res => {
      setTimelinetwo(res.data);
    });
  }, [date]);
  const createTwoButtonAlert = () => {
    Alert.alert('Xác nhận', 'Xác nhận đặt lịch', [
      {
        text: 'Huỷ',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Đồng ý',
        onPress: async () => {
          let list = await createdetail(
            itemActiveone?.id,
            itemActivetwo?.id,
            date,
            route.params.service,
          );
          console.log(list);
          await Createbooking('POST', {
            idaccount: id,
            listdetail: list,
          }).then(res => {
            if (res?.status == 200) {
              Alert.alert('Thanh cong');
              route.params.navigation.popToTop();
            } else {
              Alert.alert('that bai');
            }
          });
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: '#FC6011'}} />
      <View style={styles.header}>
        <Text style={{color: '#fff', fontSize: 18}}>Đặt lịch</Text>
      </View>
      <ScrollView>
        <View style={styles.date}>
          <View>
            <Text style={{fontSize: 15, marginBottom: '3%'}}>Chọn ngày</Text>
          </View>
          <View style={styles.calendar}>
            <CalendarPicker
              onDateChange={day => {
                let month = '01',
                  day1 = '01';
                if (day._i.month > 8) {
                  month = day._i.month + 1;
                } else {
                  month = `0${day._i.month + 1}`;
                }
                if (day._i.day > 9) {
                  day1 = day._i.day;
                } else {
                  day1 = `0${day._i.day}`;
                }
                setDate(`${day._i.year}-${month}-${day1}`);
              }}
              todayBackgroundColor="#FC6011"
              selectedDayColor="#ccc"
              selectedDayTextColor="#fff"
              weekdays={['t2', 't3', 't4', 't5', 't6', 't7', 'cn']}
              months={[
                'tháng 1',
                'tháng 2',
                'tháng 3',
                'tháng 4',
                'tháng 5',
                'tháng 6',
                'tháng 7',
                'tháng 8',
                'tháng 9',
                'tháng 10',
                'tháng 11',
                'tháng 12',
              ]}
            />
          </View>
        </View>
        <View style={styles.times}>
          <View>
            <Text style={{fontSize: 15, marginBottom: '3%'}}>Chọn giờ</Text>
          </View>
          <View style={styles.time}>
            <View style={styles.morning}>
              <View>
                <Text style={{color: '#535353'}}>Cắt tóc/ nhuộm tóc</Text>
              </View>
              {checkcuthair(route.params.service) == 0 ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 15}}>
                    Không chọn dịch vụ cắt tóc/ gội đầu
                  </Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal={true}
                    data={timelineone}
                    renderItem={({item}) => {
                      return (
                        <Timeline
                          itemActive={itemActiveone}
                          setItemActive={setItemActiveone}
                          item={item}
                          itemcheck={null}
                        />
                      );
                    }}
                    keyExtractor={item => item?.id}
                  />
                </View>
              )}
            </View>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#ccc',
              }}
            />
            <View style={styles.noon}>
              <View>
                <Text style={{color: '#535353'}}>Gội đầu</Text>
              </View>
              {checkwashhair(route.params.service) == 0 ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 15}}>Không chọn dịch vụ gội đầu</Text>
                </View>
              ) : itemActiveone <= 0 ? (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize: 15}}>Chọn dịch vụ cắt tóc/nhuộm tóc trước</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <FlatList
                    horizontal={true}
                    data={timelinetwo}
                    renderItem={({item}) => {
                      return (
                        <Timeline
                          itemActive={itemActivetwo}
                          item={item}
                          setItemActive={setItemActivetwo}
                          itemcheck={itemActiveone}
                        />
                      );
                    }}
                    keyExtractor={item => item?.id}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={styles.services}>
          <View>
            <Text style={{fontSize: 15, marginBottom: '3%'}}>Dịch vụ</Text>
          </View>

          <FlatList
            data={route.params.service}
            renderItem={({item}) => {
              return <Service item={item} />;
            }}
          />
        </View>
        <View style={styles.price}>
          <View style={{flexDirection: 'row', marginTop: '3%'}}>
            <View style={{flex: 1}}>
              <Text>Tổng giá tiền</Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: '#FC6011'}}>
                {route.params.total}.000
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={createTwoButtonAlert}>
            <View style={styles.button}>
              <Text style={{fontSize: 18, color: '#fff'}}>Đặt lịch</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    height: 50,
    backgroundColor: '#FC6011',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginTop: '3%',
    marginHorizontal: '3%',
    borderRadius: 10,
  },
  calendar: {
    backgroundColor: '#fff',
  },
  times: {
    marginTop: '3%',
    marginHorizontal: '3%',
  },
  time: {
    width: '100%',
    height: 210,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  morning: {
    margin: '3%',
  },
  noon: {
    margin: '3%',
  },

  services: {
    marginTop: '3%',
    marginHorizontal: '3%',
  },

  price: {
    paddingHorizontal: '3%',
    marginBottom: 100,
    backgroundColor: '#fff',
  },
  button: {
    height: 40,
    backgroundColor: '#FC6011',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemtime: {
    marginTop: '3%',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#535353',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 50,
    borderRadius: 5,
  },
});
