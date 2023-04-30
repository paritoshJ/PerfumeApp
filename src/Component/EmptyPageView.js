import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import { COLORS_NEW } from '../Helper/colors.new';
import Metrics from '../Helper/metrics';
import { AppButton } from './button/app-button';

const EmptyPageView = props => {
  // console.log(props)
  // return null;
  const Icon = props?.icon?.type;
  const hideAddButton =
    props?.hideAddButton != undefined ? props?.hideAddButton : false;
  return (
    <ScrollView contentContainerStyle={styles.mainView}>
      
      <View style={styles.mainView}>
       <Icon/>
        <Text style={[styles.titleStyle, props.titleStyle]}>{props.title}</Text>
        <Text style={[styles.msgStyle, props.msgStyle]}>{props.message}</Text>
        {!hideAddButton && (
          <AppButton
            preset="primary"
            text="Go Shopping"
            style={{marginTop:32, paddingHorizontal:36}}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EmptyPageView;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleStyle: {
    borderRadius: 90,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityStyle: {
    backgroundColor: COLORS_NEW.black,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginTop: 24,
    borderColor: COLORS_NEW.black,
    borderWidth: 1,
  },
  textStyle: {
    color: COLORS_NEW.black,
    fontSize: 12,
    marginTop: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  titleStyle: {
    color: COLORS_NEW.black,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginHorizontal:16,
    textAlign: 'center',
  },
  msgStyle: {
    color: COLORS_NEW.black,
    fontSize: 14,
    marginTop: 8,
    marginHorizontal:16,
    opacity: 0.5,
    fontWeight: '500',
    textAlign: 'center',
  },
});
