import {StyleSheet} from 'react-native';
import colorConstant from '../../constant/colorConstant';

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: colorConstant.TRANSPARANT,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  listItem: {
    textAlign: 'center',
    padding: 5,
    color: colorConstant.BACKGROUND_PEACH,
    fontSize: 16,
  },
  subscript: {
    textAlign: 'center',
    color: colorConstant.BACKGROUND_PEACH,
    marginLeft: -5,
    fontSize: 10,
    lineHeight: 24,
  },
  flex: {
    flex: 1,
  },
  strippedBG: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
  },
});

export default styles;
