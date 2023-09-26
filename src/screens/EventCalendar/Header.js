import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Colors from '../../assets/colors';
import {useHeaderRefContext} from './utils/HorizontalScroll';

export default Header = ({data, componentWidth, HeaderHeight}) => {
  const headerRef = useHeaderRefContext();

  const renderItem = ({item, index}) => {
    console.log('item', item);
    return (
      <View style={{flexDirection: 'row'}}>
        {item.map((location, locIndex) => {
          return (
            <View
              key={locIndex}
              style={{
                backgroundColor: Colors.greyLight,
                marginEnd: RFValue(2),
                paddingVertical: RFValue(5),
                borderRadius: 10,
                height: HeaderHeight,
                paddingHorizontal: RFValue(5),
                marginVertical: 5,
                width: (componentWidth - RFValue(2) * 7) / 7,
                // width: componentWidth / 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{textAlign: 'center', fontSize: RFValue(10)}}
                numberOfLines={3}>
                {location.name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={headerRef}
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        // pagingEnabled
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
