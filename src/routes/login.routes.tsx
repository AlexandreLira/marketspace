import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login } from "../screens/Login";
import { SignUp } from "../screens/SignUp";

export type RootStackParamList = {
    login: undefined;
    signUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function LoginRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade_from_bottom'
            }}
            initialRouteName="login"
        >
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signUp" component={SignUp} />
        </Stack.Navigator>
    )
}