import { NavigationContainer } from "@react-navigation/native";
import { LoginRoutes } from "./login.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/useAuth";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { theme } from "../theme";

export function Routes() {

    const { user, isLoadUser } = useAuth()

    if (isLoadUser) {
        return (
            <View style={style.loading}>
                <ActivityIndicator color={theme.colors.blue} size="large" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {user.email ? <AppRoutes /> : <LoginRoutes />}
        </NavigationContainer>
    )
}

const style = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})