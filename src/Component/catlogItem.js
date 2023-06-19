import {I18nManager, Text} from 'react-native';
import {Image} from 'react-native';
import {View} from 'react-native';
import colorConstant from '../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CatlogItem = props => {
  const {icon, name, right} = props;
  const COLORS = ["#F8F4F1", "#F3F6F6"];

function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }

  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical:icon ? 8 : 16,
        borderBottomColor: colorConstant.LIGHT_GREY,
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          alignItems: 'center',
          flex:1,
          flexDirection: 'row',
        }}>
        {icon && (
          <View style={{ backgroundColor: getRandomColor(), width: 40, height: 40, borderRadius: 40 / 2, alignItems: "center", justifyContent: "center", marginTop: '2%', marginBottom: '2%' }}>
            <Image
              source={{ uri: icon }}
              style={{ width: 25, height: 25, }}
              resizeMode="contain"
            />
          </View>
        )}
       <Text
            style={{
              color: colorConstant.BLACK,
              marginLeft: icon ? 10 : 0,
              fontSize: 14,
              textTransform:'uppercase'
            }}>
            {name}
          </Text>
      </View>
      {right && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="right" size={15} color={colorConstant.LIGHT_GREY} style={{ transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}/>
        </View>
      )}
    </View>
  );
};

export default CatlogItem;
