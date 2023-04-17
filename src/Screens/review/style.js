import {StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  search_view: {
    width: '100%',
    height: 50,
    alignSelf: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems:"center",
    padding:15,
    borderBottomColor:colorConstant.LIGHT_GREY,
    borderBottomWidth:1,
  
  },
});
