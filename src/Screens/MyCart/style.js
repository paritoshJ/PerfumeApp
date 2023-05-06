import {StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  price_view: {flexDirection: 'row', marginTop: 15, marginLeft: 5},
  free_offer_view: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  free_offer_text: {
    fontStyle: 'normal',
    color: colorConstant.BLACK,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
  },
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
    paddingBottom: 10,
  },
});
