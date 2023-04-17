import { StyleSheet } from "react-native";
import colorConstant from "../../constant/colorConstant";
import fontConstant from "../../constant/fontConstant";


export default StyleSheet.create({
container:{
        flex:1,
        backgroundColor:"rgba(255, 255, 255, 1)"
    },
header_title:{
        paddingTop:15,
        fontFamily:fontConstant.satoshi,
        fontSize:fontConstant.TEXT_14_SIZE_REGULAR,
        fontWeight:fontConstant.WEIGHT_REGULAR,
        color:colorConstant.BLACK
      },
border:{
        width:"100%",
        height:1,
        backgroundColor:colorConstant.LIGHT_GREY,
        marginTop:"5%",
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
        fontFamily: fontConstant.satoshi,
        fontSize: fontConstant.TEXT_15_SIZE_REGULAR,
        fontWeight: fontConstant.WEIGHT_REGULAR,
        color: colorConstant.BLACK,
      },
viewall_Contain:{
        width: '90%',
        alignSelf: 'center',
},
Mossy_Conatain:{
        width: '100%',
        height: 120,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
},
mossyItem:{
        fontFamily: fontConstant.gambetta,
        fontStyle: 'italic',
        fontWeight: fontConstant.WEIGHT_REGULAR,
        fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
        color: colorConstant.WHITE,
},
Circus_Contain:{
        width: '100%',
        height: 120,
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
},
circusItem:{
        fontFamily: fontConstant.gambetta,
        fontStyle: 'italic',
        fontWeight: fontConstant.WEIGHT_REGULAR,
        fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
        color: colorConstant.WHITE,
},
})