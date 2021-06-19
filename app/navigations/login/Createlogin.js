import React, { useState ,useEffect} from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Text ,Image} from 'react-native';
import Getuser from '../../api/user/User';
import { useDispatch } from 'react-redux';
function check(account,navigation) {
    if (account.password == account.passwordTry) {
        const accountNew = {
            name:account.name,
            password: account.password,
        }
        navigation.navigate('Createuser',accountNew)
    }
    else {
        alert("Nhập lại mật khẩu sai")
    }
}
export default function Createlogin(props) {
    const [account, setAccount] = useState({
        name:'',
        password:'',
        passwordTry:''
    })
    const [data,setData]=useState([]);
    useEffect(()=>{
        Getuser('','GET',null).then(res=>{
            setData(res.data)
        })
    },[])
    return (
        <View style={styles.containr}>
             <SafeAreaView style={{ backgroundColor: '#FC6011' }} />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    style={styles.background}
                    source={require('../../img/logo.jpg')}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setAccount(item => ({
                            ...item,
                            name: text.trim()
                        }))
                    }}
                    placeholder=" Tên đăng nhập"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setAccount(item => ({
                            ...item,
                            password: text.trim()
                        }))
                    }}
                    placeholder=" Mật khẩu"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        setAccount(item => ({
                            ...item,
                            passwordTry:text.trim()
                        }))
                    }}
                    placeholder=" Nhập lại mật khẩu"
                />
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                      if(data.filter(item=>item.name==account.name).length==0){
                            check(account,props.navigation)
                      }
                      else{
                          alert("tên tài khoản đã tồn tại")
                      }
                    }}
                >
                    <Text>
                        Đăng kí
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containr: {

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
        backgroundColor: '#ccc'
    },
    button: {
        marginTop: 10,
        width: 100,
        height: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})