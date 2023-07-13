import {Dimensions, StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import imageConstant from '../../constant/imageConstant';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header_view: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // backgroundColor: colorConstant.PRIMARY,
    // flexDirection: 'row',
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
  share_view: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  tochablesize: {
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colorConstant.LIGHT_GREY,
  },
  sizetext: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    fontFamily: fontConstant.satoshi,
    fontSize: 11,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color: colorConstant.BLACK,
  },
  displaycategytext: {
    fontFamily: fontConstant.satoshi,
    fontSize: 11,
    fontStyle: 'normal',
    lineHeight: 14,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color: colorConstant.LIGHT_TEXT,
    textTransform: 'uppercase',
    fontWeight: '400'
  },
  nametext: {
    color: colorConstant.BLACK,
    fontSize: fontConstant.TEXT_18_SIZE_REGULAR,
    fontStyle: 'italic',
    fontFamily: fontConstant.gambetta,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    marginTop: 6,
    textTransform: 'capitalize',
  },
  finalpricetext: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    // fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    fontWeight: '700',
    lineHeight: 18,

    fontFamily: fontConstant.satoshifont,
  },
  regularpricetext: {
    marginLeft: 10,
    color: colorConstant.LIGHT_TEXT,
    textDecorationLine: 'line-through',
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: '400',
    lineHeight: 18,

    fontFamily: fontConstant.satoshi,
  }
});
