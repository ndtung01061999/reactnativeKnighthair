import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Customer} from '../../../api/customer/Customer';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';
export default function UserScreen({navigation}) {
  const dispatch = useDispatch();
  const choosePhoto = async () => {
    await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      var filename = image.sourceURL.split('/');
      var date = new Date();
      const reference = storage().ref(
        `${date}-${filename[filename.length - 1]}`,
      );
      const task = await reference.putFile(image.sourceURL);
      if (task?.state == 'success') {
        const url = await storage()
          .ref(`${date}-${filename[filename.length - 1]}`)
          .getDownloadURL();
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: {
            idaccount: data?.idaccount,
            users: {
              ...data,
              image: url,
            },
          },
        });
      }
    });
  };

  const account = useSelector(state => state.loginReducer);
  const data = useSelector(state => state.userReducer.users);
  const isloading = useSelector(state => state.imageReducer?.isLoading);
  // useEffect(() => {
  //   Customer(2, 'GET', null).then(res => {
  //     setData(res.data);
  //   });
  // },[]);
  if (data == null) {
    return null;
  }
  return (
    <View>
      <SafeAreaView style={{backgroundColor: '#FC6011'}} />
      <Spinner
        visible={isloading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.header} />
      <View style={styles.avatars}>
        <Image
          style={styles.image}
          source={
            data?.image == null
              ? require('../../../img/nobody.jpg')
              : {uri: data.image}
          }
        />
        <TouchableOpacity onPress={choosePhoto}>
          <Text>Ch???nh s???a ???nh</Text>
        </TouchableOpacity>
        <Text style={styles.textavtar}>
          {data?.name == null ? 'Chua co ten' : data?.name}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateUserScreen', data);
        }}>
        <View style={styles.applicationcreate}>
          <Text style={{fontSize: 15}}>Ch???nh s???a th??ng tin</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.information}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '3%',
          }}>
          <Text style={styles.text}>Th??ng tin t??i kho???n</Text>
        </View>
        <View style={styles.br} />
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>Lo???i t??i kho???n :</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.text}>Ng?????i d??ng</Text>
          </View>
        </View>
        <View style={styles.br} />
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>T??n t??i kho???n :</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.text}>{account.name}</Text>
          </View>
        </View>
        <View style={styles.br} />
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>T??n :</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.text}>{data?.name}</Text>
          </View>
        </View>
        <View style={styles.br} />
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>M???t kh???u:</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={styles.buttonPassword}
              onPress={() => {
                navigation.navigate('UpdatepassScreen', {
                  account,
                });
              }}>
              <Text>?????i m???t kh???u</Text>
            </TouchableOpacity>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.text}>*********</Text>
          </View>
        </View>
        <View style={styles.br} />
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => {
            dispatch({
              type: 'HANDLE_LOGOUT',
            });
          }}>
          <View style={styles.button}>
            <Text>????NG XU???T</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FC6011',
    height: 100,
  },
  avatars: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -50,
  },
  textavtar: {
    fontSize: 25,
    marginTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  applicationcreate: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 100,
    backgroundColor: '#ccc',
    height: 40,
    borderRadius: 5,
  },
  information: {
    marginTop: 5,
  },
  text: {
    fontSize: 20,
  },
  br: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: '3%',
    height: 50,
  },
  buttonPassword: {
    backgroundColor: '#ccc',
    marginRight: 5,
    width: 100,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    width: 100,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
