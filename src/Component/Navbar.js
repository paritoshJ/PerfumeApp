import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
// import Metrics from '../../Helper/metrics';
export default function Navbar({Name}) {
  return (
    <>
      <View style={styles.navBarView}>
        <Image style={styles.button} source={''} />
        <Text>Login</Text>
        <Image
          style={styles.button}
          source={require('../../../assets/Bell-Icon.png')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navBarView: {
    flexDirection: 'row',
  },
});
