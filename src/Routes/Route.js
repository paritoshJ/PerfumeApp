import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabs} from 'rn-animated-tabbar';
import {Image} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
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

const ProfileStack = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    checkIfTokenExists();
  }, []);

  const checkIfTokenExists = async () => {
    const tokenVal = await AsyncStorage.getItem('token');
    setToken(tokenVal);
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffff'},
      }}
      initialRouteName={!token ? 'Login' : 'Profile'}>
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
    </Stack.Navigator>
  );
};

const CatalogStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffff'},
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
        cardStyle: {backgroundColor: '#ffff'},
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
        cardStyle: {backgroundColor: '#ffff'},
      }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    </Stack.Navigator>
  );
};

const MyCartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#ffff'},
      }}>
      <Stack.Screen name="MyCartScreen" component={MyCartScreen} />
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
  const {navigate} = useNavigation();

  return (
    <TabsNavigator.Navigator
      tabBar={props => (
        <BottomTabs
          tabsData={BottomTabsData}
          tabBarBackground="#F3ECE3"
          textColor="#BC8B57"
          activeTabBackground="#FFFFFF"
          activeIconBackColor="#BC8B57"
          navigationHandler={screen => {
            // call your navigation method
            console.log(screen, '::::: SCREEN :::', props);
            navigate(screen);
          }}
          {...props}
        />
      )}
      screenOptions={{headerShown: false}}
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

export default Route;
