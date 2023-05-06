import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Metrics from '../Helper/metrics';
import colorConstant from '../constant/colorConstant';

export default function Loader(props) {
  const {loading} = props;

  return (
    <>
      {loading && (
        <View
          style={{
            flex: 1,
            backgroundColor: colorConstant.DARK_PEACH_TRANS,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}>
          <ActivityIndicator size="small" color={colorConstant.DARK_PRIMARY} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: 'white',
    height: Metrics.rfv(45),
    width: '100%',
    borderRadius: Metrics.rfv(100),
    borderColor: '#EEEDE7',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: 'black',
    paddingHorizontal: Metrics.rfv(15),
  },
  TextInputWithIcon: {
    backgroundColor: 'white',
    height: Metrics.rfv(45),
    width: '100%',
    borderRadius: Metrics.rfv(100),
    borderColor: '#EEEDE7',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: 'black',
    paddingLeft: Metrics.rfv(15),
    paddingRight: Metrics.rfv(45),
  },
});
