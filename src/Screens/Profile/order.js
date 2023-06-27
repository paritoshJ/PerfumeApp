/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  FlatList,
  Alert,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Badge} from 'react-native-paper';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';
import {GET_ORERS_API} from '../../api/Orders';
import Loader from '../../Component/Loader';
import AddressBookSVG from '../../assets/svg/CartBag';
import EmptyPageView from '../../Component/EmptyPageView';
import {horizontal} from 'react-native-swiper-flatlist/src/themes';
import Moment from 'moment';
import {EMPTY_CART} from '../../api/getEmptyCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../Comman/Constants';

export default function Order({navigation}) {
  const [orderClick, setOrderClick] = useState(false);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [getOrders, setOrders] = useState([]);
  const [getPosition, setPosiont] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      Moment.locale('en');

      setLoading(true);
      getOrderList();

      return () => {};
    }, []),
  );
  const getOrderList = () => {
    GET_ORERS_API()
      .then(Response => {
        console.log('get response', Response.salesOrder.salesData);
        setLoading(false);
        setOrders(Response.salesOrder.salesData);
      })
      .catch(error => {
        console.log('get error', error);
        setOrders([]);

        setLoading(false);
        if (error == 'ApolloError: Internal server error') {
          Alert.alert(
            'Session Expired',
            'Your session has expired. Please login again to continue working.',
            [
              {
                text: 'OK',
                onPress: async () => {
                  try {
                    DeviceEventEmitter.emit('event.logout', {});
                    await AsyncStorage.setItem('token', '');
                    createEmptyCartForLogout();
                  } catch (error) {
                    console.log(error);
                  }
                  setTimeout(() => {
                    navigation.replace('LoadingPage');
                  }, 500);
                },
              },
            ],
          );
        }
      });
  };
  const createEmptyCartForLogout = async () => {
    let res = await EMPTY_CART();
    console.log(res);
    if (res && res?.createEmptyCart) {
      try {
        await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const renderItem = ({item}) => {
    console.log(item);
    return <Image style={styles.productView} source={{uri: item.image_url}} />;
  };
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={styles.navBarView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: Metrics.rfv(15),
              height: Metrics.rfv(15),
              resizeMode: 'contain',
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>

        <Text style={styles.navBarText}>{Constants.Laungagues.orders == null ? 'orders' : Constants.Laungagues.orders}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage2} source={''} />
        </TouchableOpacity>
      </View>
      {getOrders == '' ? (
        <EmptyPageView
          icon={<AddressBookSVG />}
          title={Constants.Laungagues.you_dont_have_any_orders_yet == null ? "You don't have any orders yet" : Constants.Laungagues.you_dont_have_any_orders_yet}
          message={Constants.Laungagues.you_dont_have_orders_explore_our_perfume_collections == null ? 'You don`t have orders, explore our perfume collections' : Constants.Laungagues.you_dont_have_orders_explore_our_perfume_collections}
          hideAddButton={false}
          onButtonPress={() => {}}
          buttonTitle={Constants.Laungagues.go_shopping == null ? 'Go shopping' : Constants.Laungagues.go_shopping}
        />
      ) : (
        <ScrollView style={styles.mainView}>
          {getOrders.map((item, index) => {
            return (
              <View>
                <View
                  style={{
                    borderBottomColor: COLORS_NEW.lightGray,
                    borderBottomWidth: 1,
                  }}>
                  {/* Order Number View */}
                  <View style={styles.orderView}>
                    <TouchableOpacity
                      style={styles.orderView}
                      onPress={() => {
                        if (getPosition == index) {
                          setOrderClick(!orderClick);
                        } else {
                          setOrderClick(true);
                        }
                        setPosiont(index);
                      }}>
                      <Text style={styles.orderNumberText}>
                        {item.customer_name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.orderView}
                      onPress={() =>
                        navigation.navigate('OrderDetails', {
                          page: 'order',
                          items: item,
                        })
                      }>
                      <Image
                        style={{resizeMode: 'contain'}}
                        source={require('../../../assets/More-button.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  {console.log(Moment(item.created_at).format('MMM d, yyyy'))}
                  {orderClick == true && getPosition == index ? (
                    <>
                      <View style={styles.sampleOrderView}>
                        <Badge style={styles.badge}>
                          {item.is_guest_customer == true
                            ? 'Courier accepted'
                            : 'Courier processing'}
                        </Badge>
                        <View style={styles.dateAndPriceView}>
                          <Text style={styles.textDate}>
                            {Moment(item.created_at).format('MMM d, yyyy')}
                          </Text>
                          <Text style={styles.textPrice}>
                            {item.increment_id}
                          </Text>
                        </View>
                      </View>
                      {/* Image View */}
                      <View style={styles.imageView}>
                        <FlatList
                          horizontal={true}
                          data={item.items}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                        />
                        {/* {ImageData.map(item => {
                      return (
                        <ScrollView style={{ flex: 1 }} onScroll={horizontal}>
                          <View>
                            <Image style={styles.productView} source={item.image} />
                          </View>
                        </ScrollView>
                      );
                    })} */}
                      </View>
                    </>
                  ) : (
                    <View />
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
      <Loader loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: COLORS_NEW.white,
    padding: Metrics.rfv(10),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: 1,
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
  // Main Style
  orderView: {
    paddingVertical: Metrics.rfv(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(20),
    fontWeight: '500',
    color: COLORS_NEW.black,
  },
  badge: {
    backgroundColor: '#FCF9E8',
    color: '#E0BC00',
    height: Metrics.rfv(25),
    width: Metrics.rfv(150),
    fontSize: Metrics.rfv(14),
    marginTop: 10,
    position: 'absolute',
    left: 0,
  },
  dateAndPriceView: {
    marginTop: Metrics.rfv(40),
  },
  textPrice: {
    fontSize: Metrics.rfv(18),
    margin: 2,
    color: COLORS_NEW.black,
  },
  textDate: {
    margin: 2,
    fontSize: Metrics.rfv(18),
    color: COLORS_NEW.black,
  },
  imageView: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  productView: {
    margin: 5,
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
    resizeMode: 'contain',
  },
});
