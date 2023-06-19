import React from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, Image  } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Egg from '../../assets/Egg.png'
import Padlock from '../../assets/Padlock.png'
import Heart2 from '../../assets/Heart2.png'
import { TouchableOpacity } from "react-native";
import { getEggs } from "../../utils";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";
import moment from 'moment'


// const eggArray = [
//   {
//     image: Egg,
//     date: '04-06-2023',
//     isLocked: false
//   },
//    {
//     image: Egg,
//     date: '05-06-2023',
//     isLocked: false
//   },
//    {
//     image: Egg,
//     date: '06-06-2023',
//     isLocked: true
//   },
//   {
//     image: Egg,
//     date: '07-06-2023',
//     isLocked: true
//   }
// ]

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

  const [eggs, setEggs] = useState([])
  const nav = useNavigation();
  const {profileId} = useContext(UserContext)

  useEffect(() => {
  getEggs(profileId.username, profileId.partner_username)
  .then((eggData: any) => {
    console.log(eggData, 'RECEIVED DATA')
    setEggs(eggData)
console.log(eggs, 'state')
  })
}, [profileId.username])

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
       keyExtractor={(item) => item.timestamp.seconds}
        data={eggs}
        renderItem={({ item }) => 
        <TouchableOpacity onPress ={() => {item.isLocked ? nav.navigate('Snake Game') : nav.navigate('My Egg')}}>
        <View style={styles.itemContainer}>
         <Image source={Egg} style={styles.image}/>
          <Text style={styles.item}>{moment(item.timestamp.seconds * 1000).format('Do MMMM YYYY, h:mm a')}</Text>
          <Image style={styles.image} source={item.isLocked ? Padlock : Heart2}/>
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
    backgroundColor: '#e0218a'
  },
    itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ffc0cb",
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





