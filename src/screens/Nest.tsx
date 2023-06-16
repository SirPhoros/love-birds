import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Image  } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Egg from '../../assets/Egg.png'
import { TouchableOpacity } from "react-native";
import { getEggs } from "../../utils";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";


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
    return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:5}} />;
    };
  
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

export default function Nest () {
  const [eggs, setEggs] = useState([])
  const nav = useNavigation();
  const {profileId} = useContext(UserContext)


useEffect(() => {
  getEggs(profileId.username)
  .then((eggData: any) => {
    console.log(eggData)
    setEggs(eggData)
    console.log(eggs[0]["isLocked"])
  })
}, [profileId.username])


  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
       keyExtractor={(item) => item["timestamp"]}
        data={eggs}
        renderItem={( item ) => 
        <TouchableOpacity onPress ={() => {item["isLocked"] ? nav.navigate('Game') : nav.navigate('My Egg')}}>
        <View style={styles.itemContainer}>
         <Image source={item[image]} style={styles.image}/>
          <Text style={styles.item}>{item.timestamp}</Text>
          <Text style={styles.item}>{item.isLocked ? '🔒' : '🔓'}</Text>
        </View>
        </TouchableOpacity>
        // fetching data inappropriate format
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
  },
    itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 5,
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





