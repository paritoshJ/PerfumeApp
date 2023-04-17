import React from 'react';
import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    Image,
    TouchableOpacity,
    I18nManager,
} from 'react-native';
import { AppButton } from '../../Component/button/app-button';
import { COLORS_NEW } from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';

export default function ReviewDiscoveryKit({ navigation }) {
  const { t } = useTranslation();

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
                <Text style={styles.navBarText}>REVIEW YOUR BOX</Text>
                <TouchableOpacity>
                    <Image style={styles.navBarImage1} source={require('../../../assets/close-button.png')} />
                </TouchableOpacity>
            </View>
            {/* Progress Bar */}
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: Metrics.rfv(20)
                    }}>
                    <Text>Gift</Text>
                    <Text>Sticker</Text>
                    <Text>Review</Text>
                </View>
                <Progress.Bar progress={1} width={null} height={1} color={COLORS_NEW.blue} />
            </View>
            {/* Card */}
            <View style={styles.orderSummaryView}>
                <View>
                    <View>
                        <Text
                            style={{
                                color: COLORS_NEW.black,
                                fontSize: Metrics.rfv(20),
                                fontFamily: 'Gambetta-MediumItalic',
                                marginVertical: Metrics.rfv(10)
                            }}>{t('Order summary')}</Text>
                    </View>
                    <Text style={{ color: COLORS_NEW.lightGray, marginVertical: Metrics.rfv(10) }}>{t('perfumes')}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={styles.orderSummaryimg} source={require('../../../assets/per-1.png')} />
                        <Text>Aborable Amber</Text>
                        <Text>Х1</Text>
                        <Text>100ml</Text>
                        <Text>24 {t('AED')}</Text>
                    </View>
                </View>
                {/*  */}
                <View>
                    <View>
                        <Text style={{ color: COLORS_NEW.lightGray, marginVertical: Metrics.rfv(10) }}>{t('Perfume oils')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={styles.orderSummaryimg} source={require('../../../assets/per-1.png')} />
                        <Text>Aborable Amber</Text>
                        <Text>Х1</Text>
                        <Text>100ml</Text>
                        <Text>24 {t('AED')}</Text>
                    </View>
                </View>
                {/*  */}
                <View>
                    <View>
                        <Text style={{ color: COLORS_NEW.lightGray, marginVertical: Metrics.rfv(10) }}>{t('Oud')}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Image style={styles.orderSummaryimg} source={require('../../../assets/per-1.png')} />
                        <Text>Aborable Amber</Text>
                        <Text>Х1</Text>
                        <Text>100ml</Text>
                        <Text>24 {t('AED')}</Text>
                    </View>
                </View>
                {/* Total View */}
                <View style={styles.TotalView}>
                    <Text style={styles.totalViewText}>Discovery total</Text>
                    <Text style={styles.totalViewText}>240.00 {t('AED')}</Text>
                </View>
            </View>
            {/* Next Button */}
            <View
                style={{
                    marginHorizontal: Metrics.rfv(20),
                    marginVertical: Metrics.rfv(30)
                }}>
                <AppButton
                    preset="primary"
                    text={t('Add to cart')}
                    style={{ marginTop: Metrics.rfv(16) }}
                    onPress={() => navigation.navigate('DiscoveryKitBox')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    mainView: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Metrics.rfv(15),
        backgroundColor: '#fff',
        padding: Metrics.rfv(10),
        // borderBottomColor: '#EEEDE7',
        // borderBottomWidth: 1,
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
        height: Metrics.rfv(60),
        width: Metrics.rfv(60),
    },
    createAccountButton: {
        width: Metrics.rfv(270),
        height: Metrics.rfv(45),
        borderRadius: Metrics.rfv(20),
        borderColor: '#BC8B57',
        borderWidth: 1,
        marginTop: Metrics.rfv(16),
        backgroundColor: '#BC8B57',
    },
    goShopping: {
        flex: 1,
        padding: Metrics.rfv(12),
        textAlign: 'center',
        color: 'white',
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
    blueCardView: {
        marginHorizontal: Metrics.rfv(15),
        paddingHorizontal: Metrics.rfv(150),
        paddingVertical: Metrics.rfv(90),
        borderRadius: Metrics.rfv(20),
        backgroundColor: '#F5FAFE',
        position: 'relative',
    },
    giftCardText: {
        fontFamily: 'Gambetta-BoldItalic',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: Metrics.rfv(25),
        color: COLORS_NEW.black,
        top: '60%',
        left: Metrics.rfv(80),
        right: 0,
        bottom: 0,
        marginTop: Metrics.rfv(80),
    },
    scrollViewImage: {
        marginTop: Metrics.rfv(20),
        height: Metrics.rfv(150),
        width: Metrics.rfv(250),
        marginHorizontal: Metrics.rfv(10),
        backgroundColor: COLORS_NEW.beige,
        borderRadius: Metrics.rfv(20),
        justifyContent: 'center',
        top: Metrics.rfv(100),
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    showAmountView: {
        flexDirection: 'row',
        borderColor: COLORS_NEW.lightGray,
        borderWidth: 1,
        borderRadius: Metrics.rfv(100),
        backgroundColor: '#fff',
        width: Metrics.rfv(100),
        height: Metrics.rfv(40),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Metrics.rfv(10),
    },
    textHeading: {
        fontSize: Metrics.rfv(20),
        color: COLORS_NEW.black,
        fontFamily: 'Gambetta-MediumItalic',
    },
    orderSummaryView: {
        paddingHorizontal: Metrics.rfv(20),
        marginHorizontal: Metrics.rfv(20),
        marginTop: Metrics.rfv(20),
        borderColor: COLORS_NEW.lightGray,
        borderWidth: 1,
        borderRadius: Metrics.rfv(10),
    },
    orderSummaryimg: {
        height: Metrics.rfv(25),
        width: Metrics.rfv(25)
    },
    TotalView: {
        borderTopColor: COLORS_NEW.lightGray,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Metrics.rfv(10),
    },
    totalViewText: {
        fontSize: Metrics.rfv(15),
        color: COLORS_NEW.black,
        fontFamily: 'Satoshi-Variable',
    },
});
