/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import { COLORS_NEW } from '../../Helper/colors.new';
import { AppButton } from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';

export default function CustomizedBundleBox({ navigation }) {
    return (
        <>
            <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
            <>
                <ImageBackground
                    source={require('../../../assets/Back.png')}
                    resizeMode="stretch"
                    style={styles.img}>
                    <View style={styles.ScrollView}>
                        <Image
                            style={styles.scrollViewImage}
                            source={require('../../../assets/discovery-bundle-box.png')}
                        />
                       <Text style={{color: COLORS_NEW.black, fontFamily: 'Gambetta-MediumItalic', fontSize: Metrics.rfv(30), textAlign: 'center'}}>Your bundle has been successfully added to cart</Text>
                    </View>
                    <View 
                    style={{
                        width: '100%', 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        paddingHorizontal: Metrics.rfv(10),  
                        marginBottom: Metrics.rfv(25),
                         
                        }}>
                        <View style={{width: '45%', marginVertical: Metrics.rfv(30)}}>
                            <AppButton
                                preset="secondary"
                                text='Build another box'
                                style={{ marginTop: Metrics.rfv(16) }}
                                onPress={() => navigation.navigate('CustomizedBundle')}
                            />
                        </View>
                        <View style={{width: '45%', marginVertical: Metrics.rfv(30)}}>
                            <AppButton
                                preset="primary"
                                text='View cart'
                                style={{ marginTop: Metrics.rfv(16) }}
                                onPress={() => navigation.navigate('GiftBox')}
                            />
                        </View>

                    </View>
                </ImageBackground>
            </>
        </>
    );
}

const styles = StyleSheet.create({
    ScrollView: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        height: '100%',
        marginBottom: Metrics.rfv(40),
    },
    scrollViewImage: {
        height: '20%',
        width: '20%',
        resizeMode: 'contain',
    },
});
