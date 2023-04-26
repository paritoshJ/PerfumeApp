import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import MyStatusBar from '../../Component/MyStatusBar';
import ProductCard from '../../Component/ProducCard';
import perfumedata from '../../utils/perfumedata'
const DATA = [
  {
    id: '1',
    title: 'Data Structures',
  },
  {
    id: '2',
    title: 'STL',
  },
  {
    id: '3',
    title: 'C++',
  },
  {
    id: '4',
    title: 'Java',
  },
  {
    id: '5',
    title: 'Python',
  },
  {
    id: '6',
    title: 'CP',
  },
  {
    id: '7',
    title: 'ReactJs',
  },
  {
    id: '8',
    title: 'NodeJs',
  },
  {
    id: '9',
    title: 'MongoDb',
  },
  {
    id: '10',
    title: 'ExpressJs',
  },
  {
    id: '11',
    title: 'PHP',
  },
  {
    id: '12',
    title: 'MySql',
  },
];

const SearchScreen = () => {
  const [text, setText] = useState('');
  const [store, setstore] = useState(perfumedata);
  const [data, setdata] = useState(perfumedata);

  searchFunction = text => {
    const updatedData = store.filter(item => {
      const item_data = `${item.name})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setdata(updatedData);
    setText(text);
  };


  const renderItem = ({item}) => {
    return(
      <>
      <ProductCard item={item}/>
      </>
    )
  };

  return (
    <ScrollView style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View
        style={{
          width: '100%',
          height: 50,
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomColor: colorConstant.LIGHT_GREY,
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{
            width: '10%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('Search');
          }}>
          <EvilIcons name="search" size={30} color={colorConstant.LIGHT_GREY} />
        </TouchableOpacity>
        <View style={{width: '80%', height: 50, justifyContent: 'center'}}>
          <TextInput
            value={text}
            onChangeText={text => searchFunction(text)}
            placeholder="Search for perfume"
            style={{
              fontFamily: fontConstant.satoshi,
              fontStyle: 'normal',
              fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_LEIGHT,
            }}
          />
        </View>
        <View
          style={{
            width: '10%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 1,
              height: 20,
              backgroundColor: colorConstant.LIGHT_GREY,
              alignSelf: 'center',
            }}></View>
          <MaterialIcons
            name="mic-none"
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
        </View>
      </View>

      <View style={{width: '90%', alignSelf: 'center', marginTop: '5%',marginBottom:"10%"}}>
        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontStyle: 'normal',
            fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            color: colorConstant.BLACK,
          }}>
          POPULAR SEARCHES
        </Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={{marginTop: '5%'}}
        />
      </View>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
