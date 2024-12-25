import { NavigationContainer } from "@react-navigation/native";
import { LoginRoutes } from "./login.routes";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useAuth } from "../hooks/useAuth";

export function Routes() {

    const { user } = useAuth()

   
    return (
        <NavigationContainer>
            {user ? <AppRoutes /> : <LoginRoutes />}
        </NavigationContainer>
    )
}