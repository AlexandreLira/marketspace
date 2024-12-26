import { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { ProfileImage } from "@/src/components/ProfileImage";
import { RootStackParamList } from "@/src/routes/app.routes";
import { theme } from "@/src/theme";
import { IProductDetails, ProductService } from "@/src/services/ProdutcService";
import { ImageUtils } from "@/src/utils/ImageUtils";


const payment_icon = {
    pix: 'qr_code_regular',
    card: 'credit_card_regular',
    boleto: 'bank_regular',
    cash: 'money_regular',
    deposit: 'barcode_regular',
}

interface DetailsAdProps extends NativeStackScreenProps<RootStackParamList, 'details_ad'> { }

export function DetailsAd({ navigation, route }: DetailsAdProps) {
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

                    <TouchableOpacity onPress={() => navigation.navigate('create_or_edit_product', { productId: product.id })}>
                        <Icon
                            name="pencil_simple_line_regular"
                            color={theme.colors.gray_1}
                        />
                    </TouchableOpacity>
                </View>

                <View>

                    {
                        !product?.is_active &&
                        <>

                            <View style={{
                                backgroundColor: theme.colors.gray_1,
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                opacity: 0.6,
                                zIndex: 1
                            }} >

                            </View>
                            <Text style={{
                                color: theme.colors.gray_7,
                                position: 'absolute',
                                alignSelf: 'center',
                                bottom: '50%',
                                zIndex: 1,
                                fontFamily: theme.fonts.bold,
                                fontSize: 14,
                            }}>Anúncio Desativado</Text>

                        </>
                    }

                    <FlatList
                        data={product.product_images}
                        horizontal
                        renderItem={({ item }) =>
                            <Image
                                source={{ uri: ImageUtils.url(item.path) }}
                                style={styles.image}
                            />
                        }
                    />

                </View>

                <View style={styles.content}>
                    <View style={styles.profile}>
                        <ProfileImage
                            size={24}
                            source={{ uri: 'http://192.168.0.7:3333/images/' + product.user.avatar }}
                        />
                        <Text style={styles.label}>{product.user.name}</Text>
                    </View>

                    <View style={{ gap: 8 }}>

                        <View style={styles.tag}>
                            <Text style={styles.tagTitle}>{product.is_new ? 'NOVO' : 'USADO'}</Text>
                        </View>

                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{product.name}</Text>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.dollarSign}>R$</Text>
                                <Text style={styles.price}>{product.price}</Text>
                            </View>
                        </View>

                        <Text style={styles.label}>
                            {product.description}
                        </Text>
                    </View>

                    <View style={{ gap: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Text style={styles.text}>
                                Aceita troca?
                            </Text>
                            <Text style={styles.label}>
                                {product.accept_trade ? 'Sim' : 'Não'}
                            </Text>

                        </View>

                        <View style={{ gap: 8 }}>
                            <Text style={styles.text}>
                                Meios de pagamento:
                            </Text>

                            {product.payment_methods.map(item =>
                                <View
                                    style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
                                    key={item.key}
                                >
                                    <Icon
                                        name={payment_icon[item.key]}
                                        size={18}
                                        color={theme.colors.gray_1}
                                    />
                                    <Text style={styles.label}>
                                        {item.name}
                                    </Text>

                                </View>
                            )}
                        </View>

                    </View>
                    <View style={{ gap: 8 }}>

                        <Button
                            title="Desativar anúncio"
                            icon="power_regular"
                        />
                        <Button
                            title="Excluir anúncio"
                            icon="trash_simple_regular"
                            bg={theme.colors.gray_5}
                            color={theme.colors.gray_2}
                        />
                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


const styling = (data: IProductDetails) => StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        marginTop: 24,
        gap: 24
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24
    },
    image: {
        width: Dimensions.get('screen').width,
        aspectRatio: 1 / 0.8
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        color: theme.colors.gray_1
    },
    text: {
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        color: theme.colors.gray_2
    },
    label: {
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        color: theme.colors.gray_2
    },
    tag: {
        backgroundColor: data.is_new ? theme.colors.blue_light : theme.colors.gray_5,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        alignSelf: 'baseline'
    },
    tagTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 10,
        color: data.is_new ? theme.colors.gray_7 : theme.colors.gray_2
    },

    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4
    },
    dollarSign: {
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        color: theme.colors.blue_light
    },
    price: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        color: theme.colors.blue_light
    }
})