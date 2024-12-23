import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { MyAds } from "../screens/MyAds";
import { Icon } from "../components/Icon";
import { theme } from "../theme";
import { DetailsAd } from "../screens/DetailsAd";

export type RootStackParamList = {
    home: undefined;
    details_ad: undefined;
};

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export function TabBottomRoutes() {
    return (
        <TabBottom.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIconStyle: { height: 60 },
            tabBarInactiveTintColor: theme.colors.gray_4,
            tabBarActiveTintColor: theme.colors.gray_2
        }}>
            <TabBottom.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: (({ size, color, focused }) => (
                        <Icon
                            size={size}
                            color={color}
                            name={focused ? "house_bold" : "house_regular"} />
                    ))
                }}
            />
            <TabBottom.Screen
                name="my_ads"
                component={MyAds}
                options={{
                    tabBarIcon: (({ size, color, focused }) => (
                        <Icon
                            size={size}
                            color={color}
                            name={focused ? "tag_bold" : "tag_regular"}
                        />
                    ))
                }}
            />
            <TabBottom.Screen
                name="sign_out"
                component={Home}
                options={{
                    tabBarIcon: (({ size, color, focused }) => (
                        <Icon
                            size={size}
                            color={theme.colors.red_light}
                            name="sign_out_regular"
                        />
                    ))
                }}
            />
        </TabBottom.Navigator>
    )
}

export function AppRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={TabBottomRoutes} />
            <Stack.Screen name="details_ad" component={DetailsAd} />
        </Stack.Navigator>
    )
}