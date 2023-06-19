import React, { useEffect, useReducer, useRef } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabs } from 'rn-animated-tabbar';
import { BottomFabBar } from 'rn-wave-bottom-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native'
import { Image, DeviceEventEmitter } from 'react-native';
import {
  Search_ic,
  Search_ic_active,
  Wishlist_ic,
  Wishlist_ic_active,
  Home_ic,
  Home_ic_active,
  Cart_ic,
  Cart_ic_active,
  Profile_ic,
  Profile_ic_active,
} from '../../assets/core';

const Stack = createStackNavigator();
const TabsNavigator = createBottomTabNavigator();

import LoadingPage from '../Screens/Profile/LoadingPage';
import LoginPage from '../Screens/Profile/LoginPage';
import EnterYourDetails from '../Screens/Profile/enterYouDetails';
import createAccount from '../Screens/Profile/createAccount';
import enterTheCode from '../Screens/Profile/enterTheCode';
import order from '../Screens/Profile/order';
import Country from '../Screens/Profile/country';
import Notification from '../Screens/Profile/notification';
import Profile from '../Screens/Profile/profilePage';
import CatalogScreen from '../Screens/Catalog/Catalog';
import WishlistScreen from '../Screens/Wishlist/Wishlist';
import MainScreen from '../Screens/Main/Main';
import MyCartScreen from '../Screens/MyCart/MyCart';
import OrderDetails from '../Screens/Profile/orderDetails';
import { useNavigation } from '@react-navigation/native';
import NoCredirCard from '../Screens/Profile/NoCreditCard';
import AddCreditCard from '../Screens/Profile/Creditcard';
import Returns from '../Screens/Profile/NoReturns';
import PersonalInfo from '../Screens/Profile/personalInfo';
import ChangePassword from '../Screens/Profile/changePassword';
import ResetPassword from '../Screens/Profile/resetPassword';
import ReferFriend from '../Screens/Profile/referFriend';
import ContactUs from '../Screens/Profile/ContactUs';
import WriteUs from '../Screens/Profile/writeUs';
import FAQ from '../Screens/Profile/FAQ';
import ProductPage from '../Screens/ProductPage/ProductPage';
import Collection from '../Screens/Collections';
import CollectionDetails from '../Screens/collectiondetails';
import Feed from '../Screens/Profile/feed';
import FeeGiftCard from '../Screens/Profile/gift-card';
import Wallet from '../Screens/Profile/wallet';
import LoyaltyPoint from '../Screens/Profile/loyaltyPoint';
import WishList from '../Screens/Profile/wishlist';
import TermsAndCondition from '../Screens/Profile/terms&condition';
import PrivacyPolicy from '../Screens/Profile/PrivacyPolicy';
import OnlineOrder from '../Screens/Profile/onlineOrder';
import AddressBook from '../Screens/Profile/addressBook';
import OurStores from '../Screens/Profile/ourStore';
import Catlog from '../Screens/Catlog';
import SelectCollection from '../Screens/SelectCollection';
import FiltersScreen from '../Screens/filters';
import Search from '../Screens/Search/Search';
import SearchScreen from '../Screens/Search';
import ReviewScreen from '../Screens/review';

import Checkout from '../Screens/Checkout/Checkout';
import BuyGiftCard from '../Screens/GiftCards/GiftCards';
import PickAmount from '../Screens/GiftCards/pick-amount';
import ChooseDelivery from '../Screens/GiftCards/Choosedelivery';
import GiftCardCheckout from '../Screens/GiftCards/giftCardCheckout';
import GiftCardEnvelope from '../Screens/GiftCards/giftCardEnvelope';

import CustomizedBundle from '../Screens/CustomizedBundle/CustomizedBundle';
import BuildYourOwnBundle from '../Screens/CustomizedBundle/build-your-own-bundle';
import AddCustomizedCardMessage from '../Screens/CustomizedBundle/add-customized-card-message';
import ReviewCustomizedBundle from '../Screens/CustomizedBundle/review-customized-bundle';
import CustomizedBundleBox from '../Screens/CustomizedBundle/discovery-bundle-box';

import DiscoveryKitBack from '../Screens/DiscovryKit/discovery-kit';
import BuildYourOwnKit from '../Screens/DiscovryKit/build-your-own-kit';
import BuildYourOwnKitWithProduct from '../Screens/DiscovryKit/build-your-own-kit-product';
import ReviewDiscoveryKit from '../Screens/DiscovryKit/review-discovery-kit';
import DiscoveryKitBox from '../Screens/DiscovryKit/discovery-kit-box';

import GiftBox from '../Screens/GiftBox/GiftBox';
import PickBox from '../Screens/GiftBox/pick-box';
import BuildYourOwnGiftBox from '../Screens/GiftBox/build-your-own-gift-box';
import AddGiftBoxMessage from '../Screens/GiftBox/add-gift-box-message';
import ReviewGiftCode from '../Screens/GiftBox/review-gift-box';
import GiftCardBox from '../Screens/GiftBox/gift-card-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Payment from '../Screens/Payment/Payment';
import OrderCart from '../Screens/OrderCart';
import AddressBookList from '../Screens/Profile/AddressBookList';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
import FAQList from '../Screens/ProductPage/FAQList';
import Svg, { Path } from 'react-native-svg'
// reanimated
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
import fontConstant from '../constant/fontConstant';
const AnimatedSvg = Animated.createAnimatedComponent(Svg)

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffff' },
      }}
      initialRouteName={'LoadingPage'}>
      <Stack.Screen name="LoadingPage" component={LoadingPage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="EnterDetail" component={EnterYourDetails} />
      <Stack.Screen name="CreateAccount" component={createAccount} />
      <Stack.Screen name="EnterTheCode" component={enterTheCode} />
      <Stack.Screen name="Order" component={order} />
      <Stack.Screen name="Country" component={Country} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="NoCreditCard" component={NoCredirCard} />
      <Stack.Screen name="AddCreditCard" component={AddCreditCard} />
      <Stack.Screen name="Returns" component={Returns} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} />
      <Stack.Screen name="Changepassword" component={ChangePassword} />
      <Stack.Screen name="Resetpassword" component={ResetPassword} />
      <Stack.Screen name="ReferFriend" component={ReferFriend} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="WriteUs" component={WriteUs} />
      <Stack.Screen name="AddressBookList" component={AddressBookList} />
      <Stack.Screen name="FAQ" component={FAQ} />

      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="GiftCard" component={FeeGiftCard} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="LoyaltyPoint" component={LoyaltyPoint} />
      <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="OnlineOrder" component={OnlineOrder} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="OurStores" component={OurStores} />

      <Stack.Screen name="BuyGiftCard" component={BuyGiftCard} />
      <Stack.Screen name="PickAmount" component={PickAmount} />
      <Stack.Screen name="ChooseDelivery" component={ChooseDelivery} />
      <Stack.Screen name="GiftCardCheckout" component={GiftCardCheckout} />
      <Stack.Screen name="DiscoveryKitBack" component={DiscoveryKitBack} />
      <Stack.Screen name="GiftCardEnvelope" component={GiftCardEnvelope} />

      <Stack.Screen name="BuildYourOwnKit" component={BuildYourOwnKit} />
      <Stack.Screen
        name="BuildYourOwnKitWithProduct"
        component={BuildYourOwnKitWithProduct}
      />
      <Stack.Screen name="ReviewDiscoveryKit" component={ReviewDiscoveryKit} />
      <Stack.Screen name="DiscoveryKitBox" component={DiscoveryKitBox} />
      <Stack.Screen
        name="CustomizedBundleBox"
        component={CustomizedBundleBox}
      />

      <Stack.Screen name="CustomizedBundle" component={CustomizedBundle} />
      <Stack.Screen name="BuildYourOwnBundle" component={BuildYourOwnBundle} />
      <Stack.Screen
        name="AddCustomizedCardMessage"
        component={AddCustomizedCardMessage}
      />
      <Stack.Screen
        name="ReviewCustomizedBundle"
        component={ReviewCustomizedBundle}
      />

      <Stack.Screen name="GiftBox" component={GiftBox} />
      <Stack.Screen name="PickBox" component={PickBox} />
      <Stack.Screen
        name="BuildYourOwnGiftBox"
        component={BuildYourOwnGiftBox}
      />
      <Stack.Screen name="AddGiftBoxMessage" component={AddGiftBoxMessage} />
      <Stack.Screen name="GiftCardBox" component={GiftCardBox} />
      <Stack.Screen name="ReviewGiftCode" component={ReviewGiftCode} />
      <Stack.Screen name="WishList" component={WishList} />
    </Stack.Navigator>
  );
};

const CatalogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffff' },
      }}>
      <Stack.Screen name="CatalogScreen" component={CatalogScreen} />
      <Stack.Screen name="Collection" component={Collection} />
      <Stack.Screen name="CollectionDetails" component={CollectionDetails} />
      <Stack.Screen name="SelectCollection" component={SelectCollection} />
      <Stack.Screen name="FiltersScreen" component={FiltersScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

const WishlistStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffff' },
      }}>
      {/* <Stack.Screen name="WishlistScreen" component={WishlistScreen} /> */}
      <Stack.Screen name="WishList" component={WishList} />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffff' },
      }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="FAQList" component={FAQList} />
    </Stack.Navigator>
  );
};

const MyCartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffff' },
      }}>
      <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ChooseDelivery" component={ChooseDelivery} />
      <Stack.Screen name="GiftCardCheckout" component={GiftCardCheckout} />
      <Stack.Screen name="PickAmount" component={PickAmount} />
      <Stack.Screen name="AddressBookList" component={AddressBookList} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="OrderCart" component={OrderCart} />
    </Stack.Navigator>
  );
};

const BottomTabsData = [
  {
    id: 'Catalog',
    title: 'Catalog',
    icon: Search_ic,
    activeIcon: Search_ic_active,
  },
  {
    id: 'Wishlist',
    title: 'Wishlist',
    icon: Wishlist_ic,
    activeIcon: Wishlist_ic_active,
  },
  {
    id: 'Main',
    title: 'Main',
    icon: Home_ic,
    activeIcon: Home_ic_active,
  },
  {
    id: 'My cart',
    title: 'My cart',
    icon: Cart_ic,
    activeIcon: Cart_ic_active,
  },
  {
    id: 'Profile',
    title: 'Profile',
    icon: Profile_ic,
    activeIcon: Profile_ic_active,
  },
];

const Route = navigation => {
  const { navigate } = useNavigation();

  Constants.Token = getAuthTokenHeaders();

  return (
    <TabsNavigator.Navigator

      tabBar={props => (
        <AnimatedTabBar {...props} />
        // <BottomTabs
        //   tabsData={BottomTabsData}
        //   tabBarBackground="#F3ECE3"
        //   textColor="#BC8B57"
        //   activeTabBackground="#FFFFFF"
        //   activeIconBackColor="#BC8B57"
        //   navigationHandler={screen => {
        //     // call your navigation method
        //     console.log(screen, '::::: SCREEN :::', props);
        //     navigate(screen);
        //   }}
        //   {...props}
        // />
      )}
      screenOptions={{ headerShown: false }}
      // tabBarOptions={{}}
      initialRouteName="Main">
      <TabsNavigator.Screen name="Catalog" component={CatalogStack} />
      <TabsNavigator.Screen name="Wishlist" component={WishlistStack} />
      <TabsNavigator.Screen name="Main" component={MainStack} />
      <TabsNavigator.Screen name="My cart" component={MyCartStack} />
      <TabsNavigator.Screen name="Profile" component={ProfileStack} />
    </TabsNavigator.Navigator>
  );
};
const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets()

  // get information about the components position on the screen -----

  const reducer = (state: any, action: { x: number, index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }]
  }

  const [layout, dispatch] = useReducer(reducer, [])
  console.log(layout)

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex).x - 25;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }
  })

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={174}
        height={40}
        viewBox="22 22 130 50"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill="#FFFFFF"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          console.log('ind3ex', index, route)
          const active = index === activeIndex
          const { options } = descriptors[route.key]
          var imagessvginactive = '';
          var imagessvgactive = '';
          var Tabactivename = '';
          if (index == 0) {
            imagessvginactive = <Search_ic />;
            imagessvgactive = <Search_ic_active />;
            Tabactivename = 'Catalog';
          } else if (index == 1) {
            imagessvginactive = <Wishlist_ic />;
            imagessvgactive = <Wishlist_ic_active />;
            Tabactivename = 'Wishlist';

          } else if (index == 2) {
            imagessvginactive = <Home_ic />;
            imagessvgactive = <Home_ic_active />;
            Tabactivename = 'Main';

          } else if (index == 3) {
            imagessvginactive = <Cart_ic />;
            imagessvgactive = <Cart_ic_active />;
            Tabactivename = 'My cart';

          } else if (index == 4) {
            imagessvginactive = <Profile_ic />;
            imagessvgactive = <Profile_ic_active />;
            Tabactivename = 'Profile';

          }
          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              tabicon={imagessvginactive}
              tabactiveicon={imagessvgactive}
              activename={Tabactivename}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    </View>
  )
}
const TabBarComponent = ({ active, options, tabicon, tabactiveicon, activename, onLayout, onPress }: TabBarComponentProps) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 2 : 2, { duration: 250 })
    }
  })

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View style={[styles.iconContainer, {
        marginBottom: active ? 100 : 0,
      }, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : active ? tabactiveicon : tabicon}

      </Animated.View>
      <Text style={{
        position: 'absolute', bottom: 0, marginTop: 5, alignSelf: 'center', fontSize: 14, color: '#BC8B57', fontFamily: fontConstant.satoshi,
        fontStyle: 'normal',
        fontWeight: '500',
      }}>{active ? activename : ''}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#F3ECE3',
    // height: 50
  },
  activeBackground: {
    position: 'absolute',
    marginBottom: 20
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    height: 70,
  },
  component: {
    height: 90,
    width: 50,
    marginTop: -25,

  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#BC8B57',
    marginBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    width: 50,
    borderRadius: 50 / 2
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 25,

  },
  icon: {
    height: 36,
    width: 36,
  }
})
export default Route;
