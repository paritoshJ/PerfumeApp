/* eslint-disable react-native/no-inline-styles */
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
import Constants from '../../Comman/Constants';

export default function TermAndCindition({navigation}) {
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

        <Text style={styles.navBarText}>{Constants.Laungagues.terms_condition == null ? "TERMS & CONDITION" : Constants.Laungagues.terms_condition}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {/* Terms And Condition View */}
      <ScrollView style={styles.scrollView}>
        <View>
          <Text style={styles.TextHeading}>A. Introduction</Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={styles.mainText}>1.</Text>
            </View>
            <View>
              <Text style={styles.mainText}>
                www.ajmalperfume.com (the "Website") is owned by and/or operated
                by or on behalf of Ajmal International Trading Co. L.L.C ("Ajmal
                Perfumes/we/us"), with delivery services provided by Aramex.
                United Arab of Emirates is Ajmal Perfumes country of domicile.
                If you have any questions regarding the Website or these terms
                and conditions, or in the unlikely event that you have any
                complaints about any products purchased by you from the Website
                or through any Applications (as defined below), you can contact
                us at estore@ajmal.net. In case of any disputes, the law
                applicable would be based on the UAE Governing Law.
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.mainText}>2.</Text>
            <View>
              <Text style={styles.mainText}>
                If you select a shipping destination in the UAE, please go
                through the Terms and Conditions thoroughly which shall apply to
                your purchase and use of the Website.
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.TextHeading}>B. Use of website</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.mainText}>1.</Text>
            <View>
              <Text style={styles.mainText}>
                These terms and conditions and any other policies referred to in
                these terms and conditions (including any policies or documents
                to which a link is provided from these terms and conditions)
                (together the "Terms") apply to your use of and access to the
                Website and any other website or application permitting you to
                place an order with Ajmal Perfumes for any products and services
                (such websites and applications being the “Applications” for the
                purpose of these Terms) including all orders submitted by you
                for any products or services made available by us for purchase
                over the Website and/or Applications. As the context requires,
                references to “Website” in these Terms shall also include
                Applications as applicable. By accessing this Website and/or the
                Applications you agree to these Terms and Conditions, we
                therefore advise you to read these Terms carefully and to save
                or print a copy of these Terms and Conditions for FUTURE
                reference. If you do not agree to these Terms, you must cease
                using and accessing this Website and all Applications
                immediately. The Terms may be changed and updated from time to
                time and any changes will be effective from the publication of
                the new terms on the Website or the relevant Application. Please
                note that all options available on our Website may not be
                available on any Application or the Website accessed using a
                mobile device.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
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
    marginTop: Metrics.rfv(5),
    marginHorizontal: Metrics.rfv(5),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.black,
  },
});
