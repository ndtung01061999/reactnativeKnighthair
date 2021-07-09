import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Getuser from '../../api/user/User';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
export default function LoginScreen({navigation}) {
  const [isload, setIsload] = useState(false);
  const dispatch = useDispatch();
  const login = useSelector(state => state.loginReducer);
  const Login = body => {
    dispatch({
      type: 'HANDLE_LOGIN',
      payload: body,
    });
  };
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const check = async (name, password) => {
    // setIsload(true);
    if (name == undefined || password == undefined) {
      setIsload(false);
      alert('Tên hoặc mật khẩu chưa nhập');
    } else {
      await Login({
        name: name,
        password: password,
        type: 2,
      });
      // if (login.id !== 0) {
      // } else {
      //   alert('sai ten hoac mat khau');
      // }
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: '#FC6011'}} />
      <Spinner
        visible={login.isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={styles.background}
          source={require('../../img/logo.jpg')}
        />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          placeholder=" Tên tài khoản"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholder=" Mật khẩu"
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => check(name, password)}>
          <View>
            <Text style={styles.text}>ĐĂNG NHẬP</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: '#ccc', borderColor: '#ccc'},
          ]}
          onPress={() => {
            navigation.navigate('Createlogin');
          }}>
          <View>
            <Text style={styles.text}>ĐĂNG KÍ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {},
  spinnerTextStyle: {
    color: '#FFF',
  },
  background: {
    width: 600,
    height: 300,
    marginBottom: 50,
  },
  input: {
    marginBottom: 5,
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FC6011',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    height: 40,
    width: 300,
    borderWidth: 1,
    borderColor: '#FC6011',
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: '#fff',
  },
});
