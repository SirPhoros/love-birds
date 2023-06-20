import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking, FlatList } from "react-native";
import Cat from '../../assets/Cat.jpeg'
import Tom from '../../assets/Tom.jpeg'
import Cris from '../../assets/Cris.jpeg'
import Ale from '../../assets/Ale.jpeg'
import Dan from '../../assets/Dan.jpeg'
import Heel from '../../assets/Heel.png'
import { Ionicons } from '@expo/vector-icons';

interface TeamMember {
  name: string;
  image: any;
  linkedinUrl: string;
}

const teamMembers: TeamMember[] = [
    {
      name: 'Alessandro Frondini',
      image: Ale,
      linkedinUrl: 'https://www.linkedin.com/in/alefrondini/',
    },
    {
      name: 'Cristóbal Gutiérrez Torrubia',
      image: Cris,
      linkedinUrl: 'https://www.linkedin.com/in/cgtorrubia/',
    },
    {
      name: 'Daniel Couperthwaite',
      image: Dan,
      linkedinUrl: 'https://www.linkedin.com/in/daniel-couperthwaite-209290139/',
    },
  {
    name: `Tom O'Neill`,
    image: Tom,
    linkedinUrl: 'https://www.linkedin.com/in/tomoneill98/',
  },
];

export default function About() {

const openLinkedIn = (url: string) => {
Linking.openURL(url)
}

  const renderTeamMember = ({ item }: { item: TeamMember }) => (
   <TouchableOpacity
      onPress={() => openLinkedIn(item.linkedinUrl)}
      style={styles.memberContainer}
    >
        <Image source={item.image} style={styles.memberImage}/>
      <Text style={styles.memberName}>{item.name}</Text>
      <Ionicons name="logo-linkedin" size={40} color="#0077B5" style={styles.linkedinIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <Image
              source={Cat}
              style={styles.teamPicture}
              resizeMode="cover"
              />
                <View style={styles.teamTitleContainer}>
                <Image source={Heel} style={styles.leftHeel} />
                <Text style={styles.teamTitle}>The Dev Wears Java</Text>
                <Image source={Heel} style={styles.rightHeel} />
                </View>
            <Text style={styles.description}>
             Love Birds is where distance bends to devotion. Experience a mesmerizing connection between long-distance lovers as each day unravels the magic hidden within a daily egg. {'\n'}{'\n'}Messages, images, and tokens of affection from your beloved await, nourishing your bond and kindling an eternal flame. Unlock the treasures within by conquering challenging games that test your spirit and ingenuity.{'\n'}{'\n'}Love Birds: Keeping the flame alive, one captivating surprise at a time.
            </Text>
            <Text style={styles.meetTeam}>Meet Our Team</Text>
          </>
        }
        data={teamMembers}
        renderItem={renderTeamMember}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fb5fe'
  },
  contentContainer: {
    padding: 16,
  },
  teamPicture: {
    width: 300,
    height: 300,
    marginBottom: 16,
    borderRadius: 150,
    overflow: 'hidden',
  alignSelf: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 24,
    width: '100%',
    color: '#FAE8E0'
  },
   meetTeam: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FAE8E0',
    textAlign: 'center'
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberName: {
    fontSize: 18,
    marginLeft: 8,
    color: '#FAE8E0',
  },
  memberImage: {
    width: 80,
  height: 80, 
  borderRadius: 100
  },
  linkedinIcon: {
    marginLeft: 16,
    color: '#f21fa9'
  },
  teamTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  leftHeel: {
    width: 70,
    height: 70,
    marginLeft: -3,
    marginRight: 3,
    transform: [{ scaleX: -1 }],
  },
  rightHeel: {
    width: 70,
    height: 70,
    marginLeft: -3,
    marginRight: -3,
  },
  teamTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: -5,
    color: '#FAE8E0'
  },
});