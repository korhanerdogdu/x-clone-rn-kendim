import { Redirect, Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { useUserSync } from "../../hooks/useUserSync";
import { View, ActivityIndicator } from "react-native";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const { isSignedIn } = useAuth();
  const { isSyncing, syncError } = useUserSync();

  if (!isSignedIn) return <Redirect href="/(auth)" />;

  // Show loading while user is being synced to database
  if (isSyncing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "#657786",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E1E8ED",
          height: 50 + insets.bottom,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",

          tabBarIcon: ({ color, size }) => <Feather name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "",

          tabBarIcon: ({ color, size }) => <Feather name="bell" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "",

          tabBarIcon: ({ color, size }) => <Feather name="mail" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};
export default TabsLayout;
