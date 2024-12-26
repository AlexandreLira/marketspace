import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Container } from "@/src/components/Container";
import { Icon } from "@/src/components/Icon";
import { ProductCard } from "@/src/components/ProductCard";
import { theme } from "@/src/theme";
import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/routes/app.routes";
import { IProductDetails } from "@/src/services/ProdutcService";
import { api } from "@/src/services/api";



interface MyAdsProps extends NativeStackScreenProps<RootStackParamList, 'home'> { }


export function MyAds({ navigation }: MyAdsProps) {

    const [products, setProducts] = useState<IProductDetails[]>([])

    async function loadProducts() {
        try {
            const response = await api.get<IProductDetails[]>('/users/products')

            setProducts(response.data)

        } catch {

        }
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <Container>
            <View style={{ justifyContent: 'center', alignItems: "center" }}>
                <Text style={styles.headerTitle} >Meus anúncios</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('create_or_edit_product')}
                    style={{ position: 'absolute', right: 0 }}
                >
                    <Icon
                        size={24}
                        name="plus_regular"
                        color={theme.colors.gray_1}

                    />
                </TouchableOpacity>
            </View>

            <View>
                <Text
                    style={{
                        fontFamily: theme.fonts.regular,
                        fontSize: 14,
                        color: theme.colors.gray_1
                    }}>
                    {products.length} anúncios
                </Text>
            </View>

            <View style={{ flex: 1 }}>

                <FlatList
                    keyExtractor={(item) => item.id}
                    columnWrapperStyle={{ gap: 24 }}
                    contentContainerStyle={{ gap: 24, }}
                    numColumns={Platform.select({ web: 4, default: 2 })}
                    data={products}
                    renderItem={({ item }) =>
                        <ProductCard
                            data={{
                                isNew: item.is_new,
                                price: item.price,
                                product_image: item.product_images[0] ? `http://192.168.0.7:3333/images/${item.product_images[0].path}` : 'https://acdn.mitiendanube.com/stores/001/155/809/products/redley_vermelho_5_1_11-da229778b3ee4ace1316763987640324-1024-1024.jpg',
                                profile_image: 'https://acdn.mitiendanube.com/stores/001/155/809/products/redley_vermelho_5_1_11-da229778b3ee4ace1316763987640324-1024-1024.jpg',
                                title: item.name,
                                disabled: !item.is_active
                            }}
                            onPress={() => navigation.navigate('details_ad', { productId: item.id })}
                            profileShown={false}
                        />
                    }
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        color: theme.colors.gray_1
    }
})