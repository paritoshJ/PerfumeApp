import {Dimensions, StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';

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
});
