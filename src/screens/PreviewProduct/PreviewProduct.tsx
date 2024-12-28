import { Button } from "@/src/components/Button";
import { PreviewProduct } from "@/src/components/PreviewProduct/PreviewProduct";
import { RootStackParamList } from "@/src/routes/app.routes";
import { IProductCreate, ProductService } from "@/src/services/ProdutcService";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface PreviewProductScreenProps extends NativeStackScreenProps<RootStackParamList, 'preview_product'> { }

export function PreviewProductScreen({ navigation, route }: PreviewProductScreenProps) {
    const product = route.params?.product;
    const [isLoading, setIsLoading] = useState(false)


    async function handleSave() {

        try {
            setIsLoading(true)
            const payload: IProductCreate = {
                ...product,
                price: Number(product.price),
                payment_methods: product.payment_methods.map(item => item.key)

            }

            if (product.id) {
                await ProductService.update(payload, product.id)

                // if (photoFile.length > 0) {
                //     await ProductImageService.add(productId, photoFile)
                // }
            } else {
                const response = await ProductService.create(payload)

                // if (photoFile.length > 0) {
                //     await ProductImageService.add(response.id, photoFile)

                // }

            }

            setIsLoading(false)
            navigation.navigate('homeStack')
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    if (!product) {
        navigation.goBack()
    }


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerSection}>
                <Text style={styles.headerTitle}>Pré visualização do anúncio</Text>
                <Text style={styles.headerText}>É assim que seu produto vai aparecer!</Text>
            </View>

            {/* Product Preview */}
            <ScrollView>
                <PreviewProduct product={product} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footerSection}>
                <Button
                    title="Voltar a editar"
                    style={{ flex: 1 }}
                    bg={theme.colors.gray_5}
                    color={theme.colors.gray_2}
                    icon="arrow_left_regular"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    onPress={handleSave}
                    bg={theme.colors.blue_light}
                    title="Publicar"
                    icon="tag_regular"
                    isLoading={isLoading}
                    style={{ flex: 1 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerSection: {
        paddingTop: 42 + 24,
        backgroundColor: theme.colors.blue_light,
        padding: 24,
        alignItems: 'center'
    },
    headerTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.gray_7,
    },
    headerText: {
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        color: theme.colors.gray_7,
    },

    footerSection: {
        backgroundColor: theme.colors.gray_7,
        padding: 24,
        paddingBottom: 32,
        gap: 12,
        flexDirection: 'row',
    }
})