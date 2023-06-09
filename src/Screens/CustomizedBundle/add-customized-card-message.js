import React, { useState, useEffect } from 'react';
import * as Progress from 'react-native-progress';
import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    I18nManager,
} from 'react-native';
import { AppButton } from '../../Component/button/app-button';
import { COLORS_NEW } from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import Input from '../../Component/Input';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';
import Constants from '../../Comman/Constants';

export default function AddCustomizedCardMessage({ navigation }) {
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
                <Text style={styles.navBarText}>{Constants.Laungagues.build_your_own == null ? 'BUILD YOUR OWN' : Constants.Laungagues.build_your_own}</Text>
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
                    <Text>{Constants.Laungagues.gifts == null ? 'Gifts' : Constants.Laungagues.gifts}</Text>
                    <Text>{Constants.Laungagues.sticker == null ? 'Sticker' : Constants.Laungagues.sticker}</Text>
                    <Text>{Constants.Laungagues.review == null ? 'Review' : Constants.Laungagues.review}</Text>
                </View>
                <Progress.Bar progress={0.60} width={null} height={1} color={COLORS_NEW.blue} />
            </View>
            <ImageBackground
                source={require('../../../assets/customized-bundle-back.png')}
                resizeMode="stretch"
                style={styles.img}>
                <View
                    style={{
                        marginHorizontal: Metrics.rfv(20),
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 20,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                />
                <Text style={styles.cardText}>{Constants.Laungagues.writey_your_card_message == null ? 'Write your card message' : Constants.Laungagues.writey_your_card_message}</Text>
            </ImageBackground>
            {/*  */}
            <View>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: Metrics.rfv(10) }}>
                    <View style={{ width: '49%' }}>
                        <Input
                            placeholder="To"
                            placeholderTextColor="gray"
                            onChangeText={e => setInput(e)}
                        />
                    </View>
                    <View style={{ width: '49%' }}>
                        <Input
                            placeholder="From"
                            placeholderTextColor="gray"
                            onChangeText={e => setInput(e)}
                        />
                    </View>
                </View>
                <View style={{ paddingHorizontal: Metrics.rfv(10) }}>
                    <TextInput
                        style={styles.input}
                        placeholder={Constants.Laungagues.review_content == null ? "Review content" : Constants.Laungagues.review_content}
                    />
                </View>
            </View>
            <View
                style={{
                    paddingHorizontal: Metrics.rfv(20),
                    marginVertical: Metrics.rfv(30),
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                <View style={{ width: '45%' }}>
                    <AppButton
                        preset="secondary"
                        text={Constants.Laungagues.skip_and_review == null ? "Skip and review" : Constants.Laungagues.skip_and_review}
                        style={{ marginTop: Metrics.rfv(16) }}
                        onPress={() => navigation.navigate('ReviewCustomizedBundle')}
                    />
                </View>
                <View style={{ width: '45%' }}>
                    <AppButton
                        preset="primary"
                        text={Constants.Laungagues.next == null ? "Next" : Constants.Laungagues.next}
                        style={{ marginTop: Metrics.rfv(16) }}
                        onPress={() => navigation.navigate('ReviewCustomizedBundle')}
                    />
                </View>

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
        fontFamily: 'Gambetta-MediumItalic'
    },
    scrollViewImage: {
        marginTop: Metrics.rfv(20),
        height: Metrics.rfv(200),
        width: '100%',
        backgroundColor: COLORS_NEW.beige,
        borderRadius: Metrics.rfv(20),
        justifyContent: 'center',
    },
    messageView: {
        marginTop: Metrics.rfv(10),
    },
    BoxImage: {
        width: '100%',
        height: Metrics.rfv(200),
    },
    itemTag: {
        backgroundColor: COLORS_NEW.itemTagColor,
        width: Metrics.rfv(60),
        padding: Metrics.rfv(2),
        fontSize: Metrics.rfv(12),
        textAlign: 'center',
        borderBottomRightRadius: Metrics.rfv(10),
        borderTopLeftRadius: Metrics.rfv(10),
    },
    itemTagView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    img: {
        height: Metrics.rfv(150),
        width: '100%',
        marginBottom: Metrics.rfv(40),
    },
    cardText: {
        position: 'absolute',
        top: '40%',
        bottom: 0,
        right: 0,
        left: Metrics.rfv(70),
        color: COLORS_NEW.white,
        fontFamily: 'Gambetta-MediumItalic',
        fontSize: Metrics.rfv(25),
    },
    input: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: COLORS_NEW.lightGray,
        borderRadius: Metrics.rfv(20),
        padding: 10,
    },
});
