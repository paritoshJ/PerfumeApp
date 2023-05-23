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
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontFamily: fontConstant.satoshi,
    fontSize: 12,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color: colorConstant.BLACK,
  },
  displaycategytext: {
    fontFamily: fontConstant.satoshi,
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    color: colorConstant.LIGHT_TEXT,
  },
  nametext: {
    color: colorConstant.BLACK,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
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
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  regularpricetext: {
    marginLeft: 10,
    color: colorConstant.LIGHT_GREY,
    textDecorationLine: 'line-through',
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  }
});
