import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { RootStackParamList } from "@/src/routes/app.routes";
import { theme } from "@/src/theme";
import { IProductDetails, ProductService } from "@/src/services/ProdutcService";
import { PreviewProduct } from "@/src/components/PreviewProduct/PreviewProduct";
import { formatPrice } from "@/src/utils/Format";


interface DetailsProductProps extends NativeStackScreenProps<RootStackParamList, 'details_product'> { }

export function DetailsProduct({ navigation, route }: DetailsProductProps) {
    const productId = route.params?.productId
    const [product, setProduct] = useState<IProductDetails>({} as IProductDetails)
    const [isLoading, setLoading] = useState(true)

    const styles = styling(product)


    async function loadProduct() {
        try {
            setLoading(true)
            const response = await ProductService.get(productId)
            console.log(response)
            setProduct(response)
        } catch (error) {
            navigation.goBack()
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleActiveProduct() {
        try {
            setProduct(state => ({ ...state, is_active: !state.is_active }))
            await ProductService.active(product.id, !product.is_active)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleDeleteProduct() {
        Alert.alert('Deletar', 'Confirma',
            [
                {
                    text: 'Não',

                },
                {
                    text: 'Sim',
                    isPreferred: true,
                    onPress: deleteProduct
                },
            ]
        )
    }

    async function deleteProduct() {
        try {
            setLoading(true)
            await ProductService.delete(product.id)
            setLoading(false)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditProduct() {
        navigation.navigate('create_or_edit_product', { productId: product.id })
    }

    useEffect(() => {
        loadProduct()
    }, [productId])

    if (isLoading) {
        return <></>
    }


    return (
        <View style={{ flex: 1, }}>
            <ScrollView>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow_left_regular"
                            color={theme.colors.gray_1}
                        />
                    </TouchableOpacity>
                </View>


                <PreviewProduct
                    product={product}
                />




            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.priceWrapper}>
                    <Text style={styles.dollarSign}>R$</Text>
                    <Text style={styles.price}>{formatPrice(product.price)}</Text>

                </View>

                <Button
                    title="Entrar em contato"
                    icon="whatsapp_logo_fill"
                    bg={theme.colors.blue_light}
                    color={theme.colors.gray_7}
                    style={{ flex: 1.2 }}
                    onPress={handleDeleteProduct}
                />
            </View>
        </View>
    )
}


const styling = (data: IProductDetails) => StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: 42 + 24
    },
    priceWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    dollarSign: {
        // flex: 1,
        flexShrink: 1,
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        color: theme.colors.blue_light
    },
    price: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        color: theme.colors.blue_light
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.gray_7,
        padding: 24
    }
})