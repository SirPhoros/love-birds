import React from "react";
import { SafeAreaView, SectionList, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Egg from '../../assets/Egg.png'
import Padlock from '../../assets/Padlock.png'
import Heart2 from '../../assets/Heart2.png'
import { TouchableOpacity } from "react-native";
import { getEggs } from "../../utils";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react"


import moment from 'moment'

import { useRoute } from "@react-navigation/native";


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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEggs(profileId.username, profileId.partner_username)
      .then((eggData: any) => {
        setEggs(eggData)
        setLoading(false);
      })
    }, [profileId.username])

  /* Loading State */
	if (loading) {
		return (
		  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0fb5fe' }}>
			  <ActivityIndicator size="large" color="#D8A7B1" />
		  </View>
		);
	}

    // Group eggs by date
  const groupedEggs = eggs.reduce((result, item) => {
    const date = moment(item.timestamp.seconds * 1000).format('Do MMMM YYYY');
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(item);
    return result;
  }, {});

    const sections = Object.keys(groupedEggs).map((date) => ({
    title: date,
    data: groupedEggs[date],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <SectionList 
      sections={sections}
       keyExtractor={(item) => item.timestamp.seconds}
        data={eggs}
        renderItem={({ item }) => 
        <TouchableOpacity onPress ={() => {item.isLocked ? nav.navigate('Snake Game', {item}) : nav.navigate('My Egg', { item })}}>
        <View style={styles.itemContainer}>
         <Image source={Egg} style={styles.image}/>
          <Text style={styles.item}>{moment(item.timestamp.seconds * 1000).format('h:mm a')}</Text>
          <Image style={styles.image} source={item.isLocked ? Padlock : Heart2}/>
        </View>
        </TouchableOpacity>
       }
         renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        contentContainerStyle={styles.sectionListContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#0fb5fe'
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
   sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#0fb5fe',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionListContent: {
    paddingBottom: 10,
  }
});





