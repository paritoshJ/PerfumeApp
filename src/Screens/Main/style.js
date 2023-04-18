import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import Metrics from '../../Helper/metrics';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header_view: {
    width: '100%',
    height: 350,
    // backgroundColor: colorConstant.PRIMARY,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  shop_view: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '60%',
    padding: 5,
    marginTop: '3%',
  },
  banner_image_view: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
    padding: 5,
    marginTop: '3%',
  },
  ajmal_text: {
    fontSize: fontConstant.TEXT_26_SIZE_REGULAR,
    fontStyle: 'normal',
    fontFamily: fontConstant.gambetta,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.TEXT_COLOR,
    marginLeft: I18nManager.isRTL ? 0 : '5%',
    marginRight: I18nManager.isRTL ? '5%' : 0,
  },
  shop_button: {
    width: '90%',
    height: 40,
    borderRadius: 40,
    backgroundColor: colorConstant.DARK_PRIMARY,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft:"3%"
  },
  button_text: {
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontStyle: 'italic',
    fontFamily: fontConstant.gambetta,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.WHITE,
    marginLeft: '5%',
  },
  image_view: {
    width: '40%',
    height: '75%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 5,
    marginTop: '5%',
    // marginTop: '3%',
  },
  image_view_banner: {
    flexDirection:'row',
    width: '100%',
    height: '100%',
    // marginTop: '3%',
  },
  container_two: {
    backgroundColor: colorConstant.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
     paddingHorizontal:20,
    bottom: '1%',
    marginTop: 24,
    
  },
  arrivals_text: {
    marginBottom:20,
    fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    fontFamily: fontConstant.gambetta,
    fontStyle: 'italic',
    color: colorConstant.TEXT_COLOR,
  },
  premium_text: {
    fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    fontFamily: fontConstant.gambetta,
    fontStyle: 'italic',
    color: colorConstant.WHITE,
    marginHorizontal: 24,
    marginTop:48,
  },
  collection_text: {
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
    color: colorConstant.WHITE,
    
  },
  footer: {
    width: 150,
    height: 200,
    marginHorizontal: 16,
    borderWidth:1,
    borderColor:colorConstant.DARK_PRIMARY,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
  },
  footerText: {
    color: 'gray',
  },
  sale_text: {
    fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
    fontFamily: fontConstant.gambetta,
    fontStyle: 'italic',
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.TEXT_COLOR,
  },
  child: {width, flexDirection: 'row', justifyContent:'space-between'},
  paginationContain: {
    marginBottom: '8%',
    alignSelf: 'center',
    width: '100%',
  },
  searchContain: {
    alignSelf: 'center',
    justifyContent:'center',
    flexDirection: 'row',
    paddingHorizontal:10,
    paddingVertical:8,
    marginHorizontal:20,
    borderWidth: 1,
    borderColor: colorConstant.LIGHT_GREY,
    borderRadius: 25,
    shadowColor: colorConstant.LIGHT_GREY,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.95,
    shadowRadius: 3.22,
    elevation: 2,
    backgroundColor: colorConstant.WHITE,
    bottom: '5%',
  },
  searchbarRow: {
    justifyContent: 'center',
    alignItems:'center',
  },
  textinputContain: {
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  micContain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  micnoneicon: {
    alignSelf: 'center',
    paddingHorizontal:10,
  },
  perfumestextcontain: {
    marginTop: '3%',
    fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    fontFamily: fontConstant.gambetta,
    fontStyle: 'normal',
    color: colorConstant.TEXT_COLOR,
    paddingLeft: I18nManager.isRTL ? 0 : 10,
    paddingRight: I18nManager.isRTL ? 10 : 0,
    marginTop: '5%',
  },
  imageContstant_banner_image: {
    alignItems: 'center',
    flex:1,
  },
  Premiumcollection_Conatin: {
    height: Metrics.rfp(40),
    flex:1,
    marginTop: 48,
  },
  imageConstant_card: {
    flex:1,
    alignItems: 'center',
  },
  perfumeData: {
    bottom: '5%',
    marginLeft: 20,
  },
  imageConstant_cardman_Contain: {
    height: Metrics.rfp(40),
    flex:1,
    // bottom: Metrics.rfv(-130),
  },
  arrowrightIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  sale_text_Contain: {
    marginTop: '-25%',
  },
  perfumedata_contain: {
    bottom: '5%',
    marginLeft: 20,
  },
  premiumdata_contain: {
    marginTop: '15%',
    marginRight: 10,
  },
  TextInput_row_Contain: {
    justifyContent:'center',
    alignItems: 'flex-start',
    paddingHorizontal:10,
    flex:1,
    
  },
  micIcon_Contain: {
    width: 1,
    height: 30,
    backgroundColor: colorConstant.LIGHT_GREY,
    alignSelf: 'center',
  },
  perfumeData_Conatain: {
    width: '100%',
    marginLeft: 20,
  },
  imageContstant_banner_image_Contain: {
    height: 500,
  },
});
