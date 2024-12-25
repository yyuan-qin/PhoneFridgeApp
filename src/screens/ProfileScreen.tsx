import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/profile.jpg')} // Replace with actual avatar URL
          style={styles.avatar}
        />
        <Text style={styles.name}>Autumn Qin</Text>
        <Text style={styles.subtitle}>Self Cook</Text>
      </View>

      {/* Stats Section */}
      <View style={[styles.statsContainer, styles.shadow]}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>14</Text>
          <Text style={styles.statLabel}>Favourite Dishes</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>$32.10</Text>
          <Text style={styles.statLabel}>Money Saved</Text>
        </View>
      </View>

      {/* Settings Section */}
      <View style={[styles.settingsContainer, styles.shadow]}>
        <View style={styles.iconAndsettingContainer}>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Username</Text>
            <Text style={styles.settingSubText}>@autumn_qin</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.iconAndsettingContainer}>
          <View style={styles.settingItem}>
          <Text style={styles.settingText}>Preferences</Text>
          <Text style={styles.settingSubText}>Food preferences, Allergies</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.iconAndsettingContainer}>
          <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Text style={styles.settingSubText}>Mute, Push, Email</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={styles.iconAndsettingContainer}>
          <View style={styles.settingItem}>
          <Text style={styles.settingText}>Settings</Text>
          <Text style={styles.settingSubText}>Security, Privacy</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    marginBottom: 20,
    padding: 30,
  },

  iconButton: {
    backgroundColor: "#FFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 195,
  },

  iconText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  profileSection: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 30,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#888",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    elevation: 2, // Adds a subtle shadow for depth
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },

  statLabel: {
    fontSize: 14,
    color: "#555",
  },

  settingsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },

  iconAndsettingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  settingItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  settingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },

  settingSubText: {
    fontSize: 14,
    color: "#888",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDEDED",
    marginVertical: 10,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default ProfileScreen;
