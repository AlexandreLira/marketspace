import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { ProductCard } from "@/src/components/ProductCard";
import { ProfileImage } from "@/src/components/ProfileImage";

import { useAuth } from "@/src/hooks/useAuth";
import { IProductDetails, ProductService } from "@/src/services/ProdutcService";
import { theme } from "@/src/theme";
import { formatPrice } from "@/src/utils/Format";
import { ImageUtils } from "@/src/utils/ImageUtils";

export function Home({ navigation }) {

    const { user } = useAuth();
    const [products, setProducts] = useState<IProductDetails[]>([])


    async function loadProducts() {
        try {
            const response = await ProductService.getAll()

            setProducts(response)

        } catch (error) {
            console.log(error)
        }
    }

    useFocusEffect(useCallback(() => {
        loadProducts()
    }, []))

    return (
        <SafeAreaView style={styles.safearea} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerProfile}>
                        <ProfileImage source={{ uri: ImageUtils.url(user.avatar) }} />

                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={styles.profileText}>Boas vindas,</Text>
                            <Text style={styles.profileName}>{user.name}</Text>
                        </View>
                    </View>

                    <Button
                        title="Criar anuncio"
                        icon="plus_regular"
                        style={{ flexGrow: 1 }}
                        onPress={() => navigation.navigate('create_or_edit_product')}
                    />
                </View>

                {/* Meus anúncios */}
                <View style={styles.sellContent}>
                    <Text style={styles.text}>
                        Seus produtos anunciados para venda
                    </Text>

                    <TouchableOpacity style={styles.sellCard} onPress={() => navigation.navigate('my_ads')}>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16
                        }}>
                            <Icon
                                name="tag_regular"
                                size={22}
                                color={theme.colors.blue}
                            />

                            <View>
                                <Text style={{
                                    fontFamily: theme.fonts.bold,
                                    fontSize: 20,
                                    color: theme.colors.gray_2
                                }}>
                                    4
                                </Text>
                                <Text style={{
                                    fontFamily: theme.fonts.regular,
                                    fontSize: 12,
                                    color: theme.colors.gray_2
                                }}>
                                    anúncios ativos
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8
                        }}>
                            <Text style={{
                                fontFamily: theme.fonts.bold,
                                fontSize: 12,
                                color: theme.colors.blue
                            }}>Meus anúncios</Text>

                            <Icon
                                name="arrow_right_regular"
                                size={16}
                                color={theme.colors.blue}
                            />

                        </View>
                    </TouchableOpacity>
                </View>

                {/*  Busca */}
                <View style={styles.searchContent}>
                    <Text style={styles.text}>
                        Compre produtos variados
                    </Text>

                    <View style={{
                        height: 45,
                        backgroundColor: theme.colors.gray_7,
                        flexGrow: 1,
                        borderRadius: 6,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                    }}>
                        <TextInput
                            placeholder="Buscar anúncio"
                            placeholderTextColor={theme.colors.gray_4}
                            style={{
                                fontSize: 16,
                                fontFamily: theme.fonts.regular,
                                flex: 1,
                            }}
                        />

                        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                            <Icon
                                name="magnifying_glass_regular"
                                size={20}
                                color={theme.colors.gray_2}
                            />


                            <View style={styles.searchLine} />
                            <Icon
                                name="sliders_regular"
                                size={20}
                                color={theme.colors.gray_2}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1 }}>

                    <FlatList
                        keyExtractor={(item) => item.id}
                        columnWrapperStyle={{ gap: 20 }}
                        contentContainerStyle={{ gap: 20, }}
                        numColumns={2}
                        data={products}
                        renderItem={({ item }) =>
                            <ProductCard
                                data={{
                                    isNew: item.is_new,
                                    price: formatPrice(item.price),
                                    product_image: ImageUtils.url(item.product_images[0]?.path)!,
                                    profile_image: ImageUtils.url(item?.user?.avatar)!,
                                    title: item.name,
                                    disabled: item.is_active
                                }}

                                onPress={() => navigation.navigate('details_product', { productId: item.id })}
                            />
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: theme.colors.gray_6
    },
    container: {
        gap: 32,
        flex: 1,
        padding: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerProfile: {
        flexDirection: 'row',
        gap: 10,
        flexGrow: 1
    },
    profileImage: {
        width: 45,
        height: 45,
        aspectRatio: 1,
        borderWidth: 2,
        borderRadius: 999,
        borderColor: theme.colors.blue_light
    },
    text: {
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.gray_3
    },
    profileText: {
        fontFamily: theme.fonts.regular,
        fontSize: 16,
        color: theme.colors.gray_1
    },
    profileName: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.gray_1
    },
    sellContent: {
        gap: 12,
    },
    sellCard: {
        backgroundColor: theme.colors.blue_light + '10',
        height: 66,
        borderRadius: 6,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 20,
    },
    searchContent: {
        gap: 12,
    },
    searchIcon: {
        width: 20,
        aspectRatio: 1,
        tintColor: theme.colors.gray_2
    },
    searchLine: {
        width: 1,
        height: 20,
        backgroundColor: theme.colors.gray_4
    }
})