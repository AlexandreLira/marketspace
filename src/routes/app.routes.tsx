import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/Home";
import { MyAds } from "../screens/MyAds";
import { Icon } from "../components/Icon";
import { theme } from "../theme";
import { DetailsMyProduct } from "../screens/DetailsMyProduct";
import { CreateOrEditProduct } from "../screens/CreateOrEditProduct";
import { useAuth } from "../hooks/useAuth";
import { PreviewProductScreen } from "../screens/PreviewProduct/PreviewProduct";
import { IProductDetails } from "../services/ProdutcService";
import { DetailsProduct } from "../screens/DetailsProduct";

export type RootStackParamList = {
    homeStack: undefined;
    details_my_product: { productId: string };
    details_product: { productId: string };
    create_or_edit_product: { productId: string } | undefined;
    preview_product: { product: IProductDetails }
};

const TabBottom = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

export function TabBottomRoutes() {
    const { logout } = useAuth()
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
                listeners={{ tabPress: logout }}
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
            <Stack.Screen name="homeStack" component={TabBottomRoutes} />
            <Stack.Screen name="details_product" component={DetailsProduct} />
            <Stack.Screen name="details_my_product" component={DetailsMyProduct} />
            <Stack.Screen name="create_or_edit_product" component={CreateOrEditProduct} />
            <Stack.Screen name="preview_product" component={PreviewProductScreen} />
        </Stack.Navigator>
    )
}