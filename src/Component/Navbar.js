import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Constants from '../Comman/Constants';
// import Metrics from '../../Helper/metrics';
export default function Navbar({Name}) {
  return (
    <>
      <View style={styles.navBarView}>
        <Image style={styles.button} source={''} />
        <Text>{Constants.Laungagues.login == null ? 'Login' : Constants.Laungagues.login}</Text>
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
