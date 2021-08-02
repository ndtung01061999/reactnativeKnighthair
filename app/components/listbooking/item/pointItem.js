import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function PointItem(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.setPointactive(props.item);
        }}
        style={[
          styles.point,
          props.item == props.pointactive
            ? {backgroundColor: '#FC6011'}
            : {backgroundColor: '#ccc'},
        ]}>
        <Text style={props.item == props.pointactive ? {color: '#fff'} : null}>
          {props.item}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  point: {
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
