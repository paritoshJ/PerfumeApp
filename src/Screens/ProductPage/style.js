import {Dimensions, I18nManager, StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  child: { width, justifyContent: 'center',flexDirection:"row" },
  share_view: {
    width: '100%',
    height: 40,
    marginTop: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop:'10%'
  },
  vanilla: {
    width: 130,
    height: 30,
    backgroundColor: "#BC8B57",
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems:"flex-start",
    opacity:0.5
  },
  rose:{
    width: 100,
    height: 30,
    backgroundColor: '#BC8B57',
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    opacity:0.4,
    alignItems:"flex-start",
  },
  oud:{
    width: 60,
    height: 30,
    backgroundColor: '#BC8B57',
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    opacity:0.3,
    alignItems:"flex-start",
  },
  offer:{
    width: '10%',

    // alignItems: 'center',
    // justifyContent: 'center',
  },
  header_container: {
    width: '100%',
    height: 400,
    // backgroundColor: colorConstant.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text: {
    color: colorConstant.WHITE,
    marginLeft: 10,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  offer_view: {
    width: 80,
    height: 45,
    backgroundColor: colorConstant.BLACK,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offer_text: {
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    color: colorConstant.WHITE,
    fontStyle: 'normal',
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  product_name: {
    fontFamily: fontConstant.gambetta,
    fontSize: fontConstant.TEXT_27_SIZE_REGULAR,
    fontStyle: 'italic',
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
    paddingTop: 15,
    marginLeft:5
  },
  last_time_offer_text: {
    marginLeft: 10,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontStyle: 'normal',
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
  },
  product_size: {
    width: 80,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  product_size_text: {
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontStyle: 'normal',
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
  },
  offer_price:{
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view:{flexDirection: 'row',  marginTop: 15,    marginLeft:5},
  free_offer_view:{
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:5
  },
  free_offer_text:{
    fontStyle: 'normal',
    color: colorConstant.BLACK,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
  },
  dicription_view:{
    marginTop:"10%",
    flexWrap: 'nowrap'
  },
  des_title_text:{
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
  },
  des_titile:{
    fontFamily:fontConstant.satoshi,
    fontSize:fontConstant.TEXT_15_SIZE_REGULAR,
    fontWeight:fontConstant.WEIGHT_REGULAR,
    color:colorConstant.DARK_PRIMARY
  },
  des_text:{
    fontFamily:fontConstant.satoshi,
    fontSize:fontConstant.TEXT_15_SIZE_REGULAR,
    fontWeight:fontConstant.WEIGHT_REGULAR,
    color:colorConstant.BLACK,
    paddingTop:10
  },
  border:{
    width:"100%",
    height:0.5,
    backgroundColor:colorConstant.LIGHT_GREY,
    marginTop:"10%",marginBottom:"10%"
  },
  review_user_name:{
    color: colorConstant.BLACK,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_15_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
  },
  review_text:{
    color: colorConstant.BLACK,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color: colorConstant.BLACK,
  },
  review_add_view:{
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems:"center",
    justifyContent:"center"
  },
  text_viewall:{
    color: colorConstant.DARK_PRIMARY,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  condition_text:{
    marginLeft: 15,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color:colorConstant.BLACK
  },
  footer: {
    width: 200,
    height: 250,
    marginLeft: 20,
    marginRight:15
    // marginRight:"5%"
  },
  add_card_view:{
    width: '90%',
    height: 60,
    alignSelf:"center",
    marginTop:"8%",
    marginBottom:"8%",
  flexDirection:"row"
  }
});
