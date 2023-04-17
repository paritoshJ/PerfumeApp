import { StyleSheet } from "react-native";
import colorConstant from "../../constant/colorConstant";
import fontConstant from "../../constant/fontConstant";


export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"rgba(255, 255, 255, 1)"
    },
    header_title:{
        // paddingTop:15,
        fontFamily:fontConstant.satoshi,
        fontSize:fontConstant.TEXT_14_SIZE_REGULAR,
        fontWeight:fontConstant.WEIGHT_REGULAR,
        color:colorConstant.BLACK,
        marginLeft:10
      },
    border:{
        width:"100%",
        height:1,
        backgroundColor:colorConstant.LIGHT_GREY,
        // marginTop:"5%",
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
     collationdata_Contain:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    collationItemData:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
      },
     searchicon_contain:{
        width: '10%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
     },
     collations_Contain:{
        fontFamily: fontConstant.satoshi,
        fontSize: fontConstant.TEXT_15_SIZE_REGULAR,
        fontWeight: fontConstant.WEIGHT_REGULAR,
        color: colorConstant.BLACK, 
     },
     View_Collection_Conatain:{
        width: '90%',
        alignSelf: 'center',
     },
     viewall_Conatin:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
     },
     viewall_Image:{
        width: 100, 
        height: 80
     },
     
})