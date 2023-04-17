/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    Image,
    I18nManager,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import { COLORS_NEW } from '../../Helper/colors.new';
import { AppButton } from '../../Component/button/app-button';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';

export default function DiscoveryKit({ navigation }) {
  const { t } = useTranslation();
  const [noLimit, SetNoLimit] = useState(false);
    return (
        <>
            <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
            {noLimit ? (<>
                <View style={{
                    borderBottomColor: COLORS_NEW.lightGray,
                    borderBottomWidth: 1,
                }}>
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
                        <TouchableOpacity>
                            <Image style={styles.navBarImage1} source={''} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainView}>
                        <Image
                            style={styles.emptyCartImage}
                            source={require('../../../assets/No-limit.png')}
                        />
                        <Text style={styles.text1}>Limit is used up</Text>
                        <Text style={styles.text2}>
                            You ordered 3 boxes and can't order more
                        </Text>
                        <AppButton
                            preset="primary"
                            text="Save address"
                            style={{ marginTop: Metrics.rfv(16) }}
                        />
                    </View>
                    
            </>) : (<>
                <ImageBackground
                    source={require('../../../assets/discovery-kit-back.png')}
                    resizeMode="stretch"
                    style={styles.img}>
                    <View style={styles.navBarView}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                style={styles.navBarImage1}
                                source={require('../../../assets/Back-Arrow.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image style={styles.navBarImage1} source={''} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.giftCardText}>Discovery box</Text>
                        <Text style={{ fontFamily: fontConstant.satoshi, color: COLORS_NEW.black, fontSize: Metrics.rfv(14) }}>You can use the discovery box a limited number of times</Text>
                    </View>
                </View>
                <View
                    style={{
                        marginHorizontal: Metrics.rfv(20),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: Metrics.rfv(25),
                        width: '100%'
                    }}>
                    <View style={{ width: '75%' }}>
                        <AppButton
                            preset="primary"
                            text="Explore Now"
                            style={{ marginTop: Metrics.rfv(16) }}
                            onPress={() => navigation.navigate('BuildYourOwnKit')}
                        />
                    </View>
                    <View style={{ width: '20%', marginTop: Metrics.rfv(16) }}>
                        <Image
                            style={styles.playButton}
                            source={require('../../../assets/Play-button.png')}
                        />
                    </View>
                </View></>)}
        </>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: Metrics.rfv(330),
        marginBottom: Metrics.rfv(40),
    },
    navBarImage1: {
        height: Metrics.rfv(15),
        width: Metrics.rfv(15),
        resizeMode: 'contain',
        color: COLORS_NEW.white,
    },
    navBarView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Metrics.rfv(15),
        padding: Metrics.rfv(10),
    }, giftCardText: {
        fontSize: Metrics.rfv(25),
        marginBottom: Metrics.rfv(10),
        color: COLORS_NEW.black,
        fontFamily: 'Gambetta-BoldItalic',
    },
    playButton: {
        height: Metrics.rfv(48),
        width: Metrics.rfv(48),
        resizeMode: 'contain',
    },
    emptyCartImage: {
        height: Metrics.rfv(80),
        width: Metrics.rfv(80),
        resizeMode: 'contain',
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
});