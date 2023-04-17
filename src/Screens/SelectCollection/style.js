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
    // backgroundColor: colorConstant.PRIMARY,
    // flexDirection: 'row',
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },
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
});
