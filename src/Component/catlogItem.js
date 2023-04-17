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
        paddingVertical:16,
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
          <View style={{backgroundColor:getRandomColor(),borderRadius:25,alignItems:"center",justifyContent:"center"}}>
            <Image
              source={icon}
              style={{width: 20, height: 20,}}
              resizeMode="contain"
            />
          </View>
        )}
       <Text
            style={{
              color: colorConstant.BLACK,
              marginLeft: icon ? 10 : 0,
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
          <AntDesign name="right" size={20} color={colorConstant.LIGHT_GREY} style={{ transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}/>
        </View>
      )}
    </View>
  );
};

export default CatlogItem;
