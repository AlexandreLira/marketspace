import { theme } from "@/src/theme";
import { Image, StyleSheet, Text, View } from "react-native";


type CardProps = {
    price: number;
    profile_image: string;
    title: string;
    product_image: string;
    isNew: boolean;
}

interface ProductCardProps {
    data: CardProps
}

export function ProductCard(props: ProductCardProps) {
    const { data } = props;
    const styles = styling(data)
    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>

                <Image
                    source={{ uri: data.profile_image }}
                    style={styles.profileImage}
                />

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
        width: 24,
        position: 'absolute',
        left: 4,
        top: 4,
        zIndex: 1,
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 999,
        borderColor: theme.colors.gray_7
    },
    image: {
        width: "100%",
        height: 100,
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
        color: theme.colors.gray_2,

    },
    priceContent: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4
    },
    dollarSign: {
        fontFamily: theme.fonts.bold,
        fontSize: 12,
        color: theme.colors.gray_1
    },

    price: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.gray_1
    }
})