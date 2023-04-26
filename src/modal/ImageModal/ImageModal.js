import React from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import colorConstant from '../../constant/colorConstant';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import fontConstant from '../../constant/fontConstant';

const ImageModal = props => {
  return (
    <View>
      <Modal
        visible={props.modalVisible}
        transparent={true}
        animationType={'slide'}
        onRequestClose={() => {
          props.setModalVisibility();
        }}>
        <View style={styles.flex}>
          <View style={styles.bottomSheetContainer}>
            <View>
              <View style={{backgroundColor: 'transparent'}}>
                <View
                  style={{
                    paddingVertical: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    marginHorizontal: Metrics.rfv(10),
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      width: '100%',
                      borderBottomColor: colorConstant.LIGHT_GREY,
                    }}>
                    <Text
                      style={{
                        fontSize: Metrics.rfv(13),
                        fontFamily: fontConstant.satoshi,
                        color: COLORS_NEW.black,
                        textAlign: 'center',
                        marginTop: Metrics.rfv(10),
                        paddingBottom: Metrics.rfv(15),
                        fontWeight: '400',
                      }}>
                      Choose an image
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => props.openGallery()}
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: colorConstant.LIGHT_GREY,
                      fontSize: 16,
                      width: '100%',
                      padding: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: Metrics.rfv(20),
                        textAlign: 'center',
                        color: colorConstant.BLUE_LIGHT,
                        fontFamily: fontConstant.satoshi,
                      }}>
                      Choose an image
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => props.openCamera()}
                    style={{
                      fontSize: 16,
                      width: '100%',
                      paddingTop: Metrics.rfv(15),
                    }}>
                    <Text
                      style={{
                        fontSize: Metrics.rfv(20),
                        textAlign: 'center',
                        color: colorConstant.BLUE_LIGHT,
                        fontFamily: fontConstant.satoshi,
                      }}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => props.cancelAction()}
                style={{
                  marginHorizontal: Metrics.rfv(10),
                  borderRadius: 10,
                  marginTop: Metrics.rfv(10),
                  backgroundColor: 'white',
                  marginBottom: Metrics.rfv(20),
                }}>
                <Text
                  style={{
                    fontSize: Metrics.rfv(20),
                    paddingVertical: Metrics.rfv(15),
                    textAlign: 'center',
                    color: colorConstant.BLUE_LIGHT,
                    fontFamily: fontConstant.gambetta,
                    fontWeight: '800',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageModal;
