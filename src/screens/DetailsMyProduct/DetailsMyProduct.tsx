import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { RootStackParamList } from "@/src/routes/app.routes";
import { theme } from "@/src/theme";
import { IProductDetails, ProductService } from "@/src/services/ProdutcService";
import { PreviewProduct } from "@/src/components/PreviewProduct/PreviewProduct";


interface DetailsMyProductProps extends NativeStackScreenProps<RootStackParamList, 'details_my_product'> { }

export function DetailsMyProduct({ navigation, route }: DetailsMyProductProps) {
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
        <SafeAreaView>
            <ScrollView>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow_left_regular"
                            color={theme.colors.gray_1}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleEditProduct}>
                        <Icon
                            name="pencil_simple_line_regular"
                            color={theme.colors.gray_1}
                        />
                    </TouchableOpacity>
                </View>


                <PreviewProduct
                    product={product}
                />


                <View style={styles.footer}>
                    <Button
                        title={`${product.is_active ? 'Desativar' : 'Reativar'} anúncio`}
                        icon="power_regular"
                        bg={product.is_active ? theme.colors.gray_1 : theme.colors.blue_light}
                        onPress={handleActiveProduct}
                    />
                    <Button
                        title="Excluir anúncio"
                        icon="trash_simple_regular"
                        bg={theme.colors.gray_5}
                        color={theme.colors.gray_2}
                        onPress={handleDeleteProduct}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styling = (data: IProductDetails) => StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24
    },
    footer: {
        gap: 8, padding: 24
    }
})