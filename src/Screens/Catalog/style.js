import {StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    justifyContent: 'center'
  },
  search_view: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems:"center",
    padding:15,
    borderBottomColor:colorConstant.LIGHT_GREY,
    borderBottomWidth:1,
  },
  header_title:{
    paddingTop:15,
    fontFamily:fontConstant.satoshi,
    fontSize:fontConstant.TEXT_14_SIZE_REGULAR,
    // fontWeight:fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
    textTransform: 'uppercase'
  },
  border:{
    width:"100%",
    height:1,
    backgroundColor:colorConstant.LIGHT_GREY,
    marginTop:"5%",
  },
  about_view:{
    width: '30%',
    height: 45,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
    borderColor:"rgba(43, 40, 38, 0.1)"
  },
  CatalogScreen_Contain:{
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    borderBottomColor: colorConstant.LIGHT_GREY,
    borderBottomWidth: 1,
  },
  EvilIcons_Icon_Contain:{
    alignItems: 'center',
    justifyContent: 'center',     
  },
  searchbar_Contain:{
    flex:1,
    paddingHorizontal:10,
    alignItems:"flex-start"
  },
  searchtext_Contain:{
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  new_Contain:{
    marginHorizontal: 20,
    marginVertical: 10,
    alignSelf: 'center',
    paddingBottom: 60,
  },
  micnoneIcon_Contain:{
    width: '10%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  micnoneIcon_Row:{
    width: 1,
    height: 20,
    backgroundColor: colorConstant.LIGHT_GREY,
    alignSelf: 'center',
  },
  micnoneIcon:{
    alignSelf: 'center', 
    marginLeft: 10
  },
  
});
