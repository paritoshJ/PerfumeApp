import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';

export default function PrivacyPolicy({navigation}) {
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
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

        <Text style={styles.navBarText}>PRIVACY POLICY</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {/* Terms And Condition View */}
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.mainText}>
            Ajmal International Trading Co. LLC, a company incorporated and
            REGISTERED in Dubai, UAE and (who we refer to as "we", "us" and
            "our" below), take your privacy very seriously. This Privacy
            Statement explains what personal information we collect, how and
            when it is collected, what we use it for now and how we will use it
            in the FUTURE and details of the circumstances in which we may
            disclose it to third parties. If you have any questions about the
            way in which your information is being collected or used which are
            not answered by this Privacy Statement and/or any complaints please
            contact us on estore@ajmal.net By visiting and using
            www.ajmalperfume.com (the "Website") or any other application or
            website ("Application") for the purchase or sampling of products
            from Ajmal Perfumes (as applicable) you acknowledge that you have
            read, understood and are consenting to the practices in relation to
            use and disclosure of your personal information described in this
            Privacy Statement and our Terms and Conditions. Please obtain your
            parent's or guardian's consent before providing us with any personal
            information if you are visiting and using the Site; Anywhere else in
            the world and you are under the age of 16.
          </Text>
        </View>
        <View>
          <Text style={styles.TextHeading}>
            What information do we collect and how will we use it?
          </Text>
        </View>
        <View>
          <Text style={styles.mainText}>
            When you REGISTER for an account with us, place an order with us or
            send us an enquiry, we will collect certain personal information
            from you, for example, your name, postal address, phone numbers,
            e-mail addresses. We may also obtain information about you as a
            result of authentication or identity checks. We use this information
            to identify you as a customer, to process your order, to deliver
            products, to process payments, to update our records, to enable your
            use of interactive features of our service and to generally manage
            your account with us and if you have consented to provide you with
            information by post, e-mail, mobile messaging, telephone
            communications and/or through any other electronic means including
            social network platforms about our products, events, promotions and
            services. We may also use this information to tailor how our website
            appears to you and to tailor the contents of our communications with
            you, so as to make the website and those communications more
            relevant to you. We may also at times ask you for other information,
            for example product and category preferences, age and any special
            dates (such as birthday and anniversary) which will be used to
            enhance our service to you. Providing us with this sort of
            information is entirely voluntary, however we may not be able to
            process your order if you do not provide us with all the requested
            information.We may also use your personal information for our
            internal MARKETING and demographic studies, together with
            non-personal data to analyze, profile and monitor customer patterns
            so we can consistently improve our products and services and
            understand what may be of interest to you and other customers.
          </Text>
        </View>
      </ScrollView>
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
  feedCardView: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(250),
    width: '100%',
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
  },
  discountText: {
    fontSize: Metrics.rfv(18),
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(5),
  },
  dateText: {
    color: COLORS_NEW.lightGray,
    marginTop: Metrics.rfv(5),
  },
  cardFirstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSecondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
  },
  scrollViewImage: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(200),
    width: '100%',
    borderRadius: Metrics.rfv(20),
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    left: 170,
    right: 0,
    bottom: 0,
  },
  imageText: {
    fontSize: 20,
    color: COLORS_NEW.balanceColor,
    fontWeight: 'bold',
  },
  emptyCartImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
    resizeMode: 'contain',
  },
  yourBalanceText: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
    color: COLORS_NEW.gray,
  },
  cardWalletImage: {
    marginTop: Metrics.rfv(10),
    height: Metrics.rfv(25),
    width: Metrics.rfv(25),
    resizeMode: 'contain',
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
    marginVertical: Metrics.rfv(10),
    resizeMode: 'contain',
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
  orderNumberText: {
    fontSize: Metrics.rfv(20),
    fontWeight: 500,
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(20),
  },
  TextHeading: {
    fontSize: Metrics.rfv(18),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  mainText: {
    marginTop: Metrics.rfv(10),
    marginHorizontal: Metrics.rfv(5),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.black,
  },
});
