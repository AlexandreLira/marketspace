import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "../screens/Home";

export type RootStackParamList = {
    home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    )
}