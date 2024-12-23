import { theme } from "@/src/theme";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProfileImage } from "../ProfileImage";


type CardProps = {
    price: number;
    profile_image: string;
    title: string;
    product_image: string;
    isNew: boolean;
    disabled?: boolean
}

interface ProductCardProps {
    data: CardProps;
    profileShown?: boolean
}

export function ProductCard(props: ProductCardProps) {
    const { data, profileShown = true } = props;
    const styles = styling(data)
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                {data.disabled &&
                    <>
                        <View style={styles.disabledBackground} />
                        <Text style={styles.disabledText}>Anúncio desativado</Text>
                    </>
                }
                {
                    profileShown &&
                    <ProfileImage
                        style={styles.profileImage}
                        source={{ uri: data.profile_image }}
                        size={24}
                        borderWidth={1}
                        borderColor={theme.colors.gray_7}
                    />

                }

                <View style={styles.tagContent}>
                    <Text style={styles.tagText}>{data.isNew ? 'Novo' : 'Usado'}</Text>
                </View>
                <Image
                    source={{ uri: data.product_image }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.title}>
                {data.title}
            </Text>

            <View style={styles.priceContent}>
                <Text style={styles.dollarSign}>R$</Text>
                <Text style={styles.price}>{data.price}</Text>
            </View>

        </View>
    )
}

const styling = (data: CardProps) => StyleSheet.create({
    container: {
        flex: 1,

    },
    imageWrapper: {
        marginBottom: 4,

    },
    profileImage: {
        position: 'absolute',
        left: 4,
        top: 4,
        zIndex: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 1 / 0.8,
        borderRadius: 6,
        resizeMode: 'cover',
    },

    tagContent: {
        position: 'absolute',
        right: 4,
        top: 4,
        zIndex: 1,
        backgroundColor: data.isNew ? theme.colors.blue : theme.colors.gray_2,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    tagText: {
        fontFamily: theme.fonts.bold,
        fontSize: 10,
        color: theme.colors.white
    },

    title: {
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        color: data.disabled ? theme.colors.gray_4 : theme.colors.gray_2

    },
    priceContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4
    },
    dollarSign: {
        fontFamily: data.disabled ? theme.fonts.regular : theme.fonts.bold,
        fontSize: 12,
        color: data.disabled ? theme.colors.gray_4 : theme.colors.gray_1
    },

    price: {
        fontFamily: data.disabled ? theme.fonts.regular : theme.fonts.bold,
        fontSize: 16,
        color: data.disabled ? theme.colors.gray_4 : theme.colors.gray_1
    },
    disabledText: {
        width: '100%',
        flexShrink: 1,
        fontFamily: theme.fonts.bold,
        fontSize: 11,
        textTransform: 'uppercase',
        color: theme.colors.gray_7,
        position: 'absolute',
        zIndex: 3,
        bottom: 8,
        left: 8,
    },
    disabledBackground: {
        backgroundColor: theme.colors.gray_1,
        opacity: 0.45,
        width: '100%',
        height: "100%",
        position: 'absolute',
        zIndex: 2,
        borderRadius: 6,
    }
})