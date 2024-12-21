import { NavigationContainer } from "@react-navigation/native";
import { LoginRoutes } from "./login.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const auth = true
    return (
        <NavigationContainer independent>
            {auth ? <AppRoutes /> : <LoginRoutes />}
        </NavigationContainer>
    )
}