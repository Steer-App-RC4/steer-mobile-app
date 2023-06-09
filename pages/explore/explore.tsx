import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import COLORS from "../../config/COLORS";
import CATEGORIES from "../../config/CATEGORIES";
import HeartButton from "./components/HeartButton";
import ExploreItemPanel from "./components/ExploreItemPanel";
import createAccommodation from "./functions/createAccommodation";
import createExperience from "./functions/createExperience";

const width = Dimensions.get("screen").width;

const handleCreateAccommodation = async () => {
  try {
    await createAccommodation();
    console.log("Accommodation post created successfully!");
    // Add any navigation or UI updates you want here
  } catch (error) {
    console.error("Error creating accommodation post:", error);
    // Handle error or show error message to the user
  }
};

const handleCreateExperience = async () => {
  try {
    await createExperience();
    console.log("Experience post created successfully!");
    // Add any navigation or UI updates you want here
  } catch (error) {
    console.error("Error creating experience post:", error);
    // Handle error or show error message to the user
  }
};

interface ExploreProps {
  navigation: NativeStackNavigationProp<any>;
}

function Explore({ navigation }: ExploreProps) {
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <ScrollView horizontal>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity
              onPress={() => setActiveCategory(index)}
              style={{ marginRight: 10 }}
              key={category.id}
            >
              <Text
                style={{
                  fontSize: 20,
                  color:
                    activeCategory === index ? COLORS.ORANGE : COLORS.BROWN,
                  fontFamily:
                    activeCategory === index
                      ? "AvenirNext-Bold"
                      : "Avenir Next",
                }}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.75}
          decelerationRate="fast"
          pagingEnabled
          style={{ marginVertical: 20 }}
        >
          {CATEGORIES[activeCategory].items.map((item, index) => (
            <TouchableOpacity
              style={styles.card}
              key={index}
              onPress={() =>
                navigation.navigate("Detail", {
                  item: item,
                  navigation: navigation,
                })
              }
            >
              <View style={styles.heartButtonContainer}>
                <HeartButton />
              </View>

              <ExploreItemPanel itemTitle={item.title} itemPrice={item.price} />

              <Image source={item.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button
          title="Create Accommodation!"
          onPress={handleCreateAccommodation}
        />
        <Button title="Create Experience!" onPress={handleCreateExperience} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.BEIGE,
    flex: 1,
  },

  container: {
    padding: 20,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  card: {
    width: width * 0.7,
    height: width * 0.9,
    overflow: "hidden",
    borderRadius: 20,
    marginRight: 20,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
});

export default Explore;
