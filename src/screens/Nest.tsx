import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Image  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Egg from '../../assets/Egg.png'
import { TouchableOpacity } from "react-native";


const eggArray = [
  {
    image: Egg,
    date: '04-06-2023',
    isLocked: false
  },
   {
    image: Egg,
    date: '05-06-2023',
    isLocked: false
  },
   {
    image: Egg,
    date: '06-06-2023',
    isLocked: true
  },
  {
    image: Egg,
    date: '07-06-2023',
    isLocked: true
  }
]

  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey", marginHorizontal:5}} />;
    };
  
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

export default function Nest () {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
       keyExtractor={(item) => item.date}
        data={eggArray}
        renderItem={({ item }) => 
        <TouchableOpacity onPress ={() => {item.isLocked ? nav.navigate('Snake Game') : nav.navigate('My Egg')}}>
        <View style={styles.itemContainer}>
         <Image source={item.image} style={styles.image}/>
          <Text style={styles.item}>{item.date}</Text>
          <Text style={styles.item}>{item.isLocked ? '🔒' : '🔓'}</Text>
        </View>
        </TouchableOpacity>

       }
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        contentContainerStyle={styles.flatListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#F0CCB0'
  },
    itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 50,
  },
  item: {
    padding: 5,
    fontSize: 15,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  flatListContent: {
    paddingBottom: 10,
  }
});





