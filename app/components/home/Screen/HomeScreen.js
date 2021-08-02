import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableHighlight,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Blog from '../item/blog';
import dbblog from '../../../api/blog';
import Onestore from '../../../api/store/Onestore';
import {useSelector} from 'react-redux';
function callAPI(setStoreHn, setStoreHCM) {
  Onestore('store/city/1', 'GET', null).then(res => {
    setStoreHn(res.data);
  });
  Onestore('store/city/79', 'GET', null).then(res => {
    setStoreHCM(res.data);
  });
}
export default function HomeScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [storehn, setStoreHn] = useState([]);
  const [storehcm, setStoreHCM] = useState([]);
  const customer = useSelector(state => state.userReducer.users);
  useEffect(() => {
    Onestore('store/city/1', 'GET', null).then(res => {
      setStoreHn(res.data);
    });
    Onestore('store/city/79', 'GET', null).then(res => {
      setStoreHCM(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: '#FC6011'}} />
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
          }}>
          KnightBooking
        </Text>
      </View>
      <ScrollView vertical={true}>
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            callAPI(setStoreHn, setStoreHCM);
          }}
        />
        <View style={styles.avatar}>
          <Image
            style={styles.img}
            source={{
              uri: customer?.image,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              fontWeight: 'bold',
              marginLeft: '2%',
            }}>
            {customer.name}
          </Text>
        </View>
        <View style={styles.search}>
          <TouchableHighlight
            style={styles.button_search}
            activeOpacity={0.6}
            underlayColor="#fff"
            onPress={() =>
              navigation.navigate('ListStoreScreen', {
                type: 1,
              })
            }>
            <View style={styles.detail_button_search}>
              <View style={[styles.icon, {backgroundColor: '#FF9931'}]}>
                <Icon name={'cut'} size={20} color={'#fff'} />
              </View>
              <Text>cắt tóc</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button_search}
            activeOpacity={0.6}
            underlayColor="#fff"
            onPress={() =>
              navigation.navigate('ListStoreScreen', {
                type: 2,
              })
            }>
            <View style={styles.detail_button_search}>
              <View style={[styles.icon, {backgroundColor: '#30FFF2'}]}>
                <Icon name={'shower'} size={20} color={'#fff'} />
              </View>
              <Text>gội đầu</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button_search}
            activeOpacity={0.6}
            underlayColor="#fff"
            onPress={() =>
              navigation.navigate('ListStoreScreen', {
                type: 3,
              })
            }>
            <View style={styles.detail_button_search}>
              <View style={[styles.icon, {backgroundColor: '#FF30BB'}]}>
                <Ionicons
                  name={'color-palette-outline'}
                  size={20}
                  color={'#fff'}
                />
              </View>
              <Text>nhuộm tóc</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.blog}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
            Blog
          </Text>
          <FlatList
            horizontal={true}
            data={dbblog}
            renderItem={({item}) => {
              return <Blog item={item} navigation={navigation} type={1} />;
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
        <View style={styles.blog}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
            Cửa hàng địa điểm Hà Nội
          </Text>
          <FlatList
            horizontal={true}
            data={storehn}
            renderItem={({item}) => {
              return <Blog item={item} navigation={navigation} type={2} />;
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
        <View style={styles.blog}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 10}}>
            Cửa hàng địa điểm TP.HCM
          </Text>
          <FlatList
            horizontal={true}
            data={storehcm}
            renderItem={({item}) => {
              return <Blog item={item} navigation={navigation} type={2} />;
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: '#FC6011',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 100,
    backgroundColor: '#FC6011',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    paddingTop: '3%',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  search: {
    marginTop: -30,
    backgroundColor: '#fff',
    marginHorizontal: '3%',
    flexDirection: 'row',
    borderRadius: 15,
    borderColor: '#ccc',
  },
  button_search: {
    width: '33.34%',
    height: 80,
    borderColor: '#ccc',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail_button_search: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#FF9931',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blog: {
    marginHorizontal: '3%',
    marginVertical: '5%',
  },
  list: {
    flexDirection: 'row',
  },
});
