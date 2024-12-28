import { IProductDetails } from "@/src/services/ProdutcService";
import { theme } from "@/src/theme";
import { ImageUtils } from "@/src/utils/ImageUtils";
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ProfileImage } from "../ProfileImage";
import { Icon } from "../Icon";
import { formatPrice } from "@/src/utils/Format";

interface PreviewProductProps {
    product: IProductDetails
}


export enum TPyamentIcons {
    pix = 'qr_code_regular',
    card = 'credit_card_regular',
    boleto = 'bank_regular',
    cash = 'money_regular',
    deposit = 'barcode_regular',
}


export function PreviewProduct(props: PreviewProductProps) {
    const { product } = props;
    const styles = styling(product)
    console.log(product)

    return (
        < >
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
                        source={{ uri: ImageUtils.url(product.user.avatar) }}
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
                            <Text style={styles.price}>{formatPrice(product.price)}</Text>
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
                                    name={TPyamentIcons[item.key]}
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


            </View>
        </>
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