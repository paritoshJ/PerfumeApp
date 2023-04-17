/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Card} from 'react-native-paper';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import CustomSwitch from '../../Component/toggleFilter';
import MyStatusBar from '../../Component/MyStatusBar';
export default function Feed({navigation}) {
  const [feed, setFeed] = useState(true);
  const onSelectSwitch = index => {
  };
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      {feed && (
        <ImageBackground
          source={require('../../../assets/feed-back.png')}
          resizeMode="stretch"
          style={styles.img}>
          <View style={styles.navBarView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: Metrics.rfv(15),
                  height: Metrics.rfv(15),
                   resizeMode: 'contain',
                  transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
                }}
                source={require('../../../assets/Back-Arrow.png')}
              />
            </TouchableOpacity>

            <Text style={styles.navBarText}>Feeds</Text>
            <TouchableOpacity>
              <Image style={styles.navBarImage1} source={''} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: Metrics.rfv(20),
              alignItems: 'center',
              justifyContent: 'center',
              top: 20,
              left: 0,
              right: 0,
              bottom: 0,
            }}>
            <CustomSwitch
              selectionMode={2}
              roundCorner={true}
              option1={'Sort'}
              option2={'Filters'}
              onSelectSwitch={onSelectSwitch}
              selectionColor={COLORS_NEW.lightGray}
            />
          </View>
        </ImageBackground>
      )}

      {/* No Return View */}
      {!feed ? (
        <>
          <View style={styles.nullnavBarView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.navBarImage1}
                source={require('../../../assets/Back-Arrow.png')}
              />
            </TouchableOpacity>

            <Text style={styles.nullnavBarText}>Feed</Text>
            <TouchableOpacity>
              <Image style={styles.navBarImage1} source={''} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainView}>
            <Image
              style={styles.emptyCartImage}
              source={require('../../../assets/Feed.png')}
            />
            <Text style={styles.text1}>You don't have any notification</Text>
            <Text style={styles.text2}>
              Visit later to check your notification
            </Text>
          </View>
        </>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity style={styles.loginPageComponentView}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.feedDiscountImg}
                    source={require('../../../assets/feed-discount.png')}
                  />
                </View>
                <View>
                  <Text style={styles.loginPageComponentview2}>
                    Your personal discount
                  </Text>
                  <Text style={styles.dateText}>December 10, 2022</Text>
                </View>
              </View>
              <View style={styles.loginPageComponentText}>
                <Image
                  style={styles.CardPageArrow}
                  source={require('../../../assets/arrow.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginPageComponentView}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.feedDiscountImg}
                    source={require('../../../assets/feed-order-generated.png')}
                  />
                </View>
                <View>
                  <Text style={styles.loginPageComponentview2}>
                    Your order has been generated
                  </Text>
                  <Text style={styles.dateText}>December 10, 2022</Text>
                </View>
              </View>
              <View style={styles.loginPageComponentText}>
                <Image
                  style={styles.CardPageArrow}
                  source={require('../../../assets/arrow.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginPageComponentView}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.feedDiscountImg}
                    source={require('../../../assets/feed-order-sent.png')}
                  />
                </View>
                <View>
                  <Text style={styles.loginPageComponentview2}>
                    Your order has been sent
                  </Text>
                  <Text style={styles.dateText}>December 10, 2022</Text>
                </View>
              </View>
              <View style={styles.loginPageComponentText}>
                <Image
                  style={styles.CardPageArrow}
                  source={require('../../../assets/arrow.png')}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginPageComponentView}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.feedDiscountImg}
                    source={require('../../../assets/feed-delevered.png')}
                  />
                </View>
                <View>
                  <Text style={styles.loginPageComponentview2}>
                    Your order has been delivered
                  </Text>
                  <Text style={styles.dateText}>December 10, 2022</Text>
                </View>
              </View>
              <View style={styles.loginPageComponentText}>
                <Image
                  style={styles.CardPageArrow}
                  source={require('../../../assets/arrow.png')}
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    marginTop: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
  },
  nullnavBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS_NEW.gray,
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    color: COLORS_NEW.white,
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    marginTop: Metrics.rfv(20),
    fontSize: Metrics.rfv(25),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  nullnavBarText: {
    color: COLORS_NEW.black,
  },
  cartImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(150),
    backgroundColor: COLORS_NEW.beige,
    resizeMode: 'contain',
    borderRadius: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  upperBarMainView: {
    flexDirection: 'row',
    borderBottomColor: COLORS_NEW.gray,
    borderBottomWidth: 1,
    width: '100%',
  },
  shortView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Metrics.rfv(10),
    width: '50%',
  },
  filtersView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Metrics.rfv(5),
    marginVertical: Metrics.rfv(10),
    width: '50%',
    alignItems: 'center',
  },
  verticlLineView: {
    borderLeftColor: COLORS_NEW.gray,
    borderLeftWidth: 1,
  },
  card: {
    width: '49%',
    backgroundColor: '#F5FAFE',
  },
  discountTagView: {
    backgroundColor: COLORS_NEW.black,
    height: Metrics.rfv(30),
    width: Metrics.rfv(60),
    borderTopLeftRadius: Metrics.rfv(20),
    borderBottomRightRadius: Metrics.rfv(20),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  discountText: {
    color: COLORS_NEW.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 15,
    right: 0,
    bottom: 0,
  },
  favIcon: {
    height: Metrics.rfv(20),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 130,
    right: 0,
    bottom: 0,
  },
  img: {
    height: Metrics.rfv(110),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.rfv(15),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: Metrics.rfv(1),
    alignItems: 'center',
    paddingVertical: Metrics.rfv(15),
    padding: Metrics.rfv(5),
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
  },
  dateText: {
    fontSize: Metrics.rfv(12),
    color: COLORS_NEW.gray,
  },
  loginPageComponentview2: {
    color: COLORS_NEW.black,
  },
  feedDiscountImg: {
    height: Metrics.rfv(50),
    width: Metrics.rfv(50),
    resizeMode: 'contain',
    marginHorizontal: Metrics.rfv(10),
  },
  CardPageArrow: {
    width: Metrics.rfv(15),
    height: Metrics.rfv(15),
    marginTop: Metrics.rfv(5),
    resizeMode: 'contain',
    marginHorizontal: Metrics.rfv(10),
  },
});
