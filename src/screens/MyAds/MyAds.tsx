import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Container } from "@/src/components/Container";
import { Icon } from "@/src/components/Icon";
import { ProductCard } from "@/src/components/ProductCard";
import { theme } from "@/src/theme";
import { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/routes/app.routes";

const list = [
    {
        price: 59.90,
        profile_image: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
        title: 'Tênis vermelho',
        product_image: 'https://acdn.mitiendanube.com/stores/001/155/809/products/redley_vermelho_5_1_11-da229778b3ee4ace1316763987640324-1024-1024.jpg',
        isNew: false,
        disabled: false,
    },
    {
        price: 120.00,
        profile_image: 'https://media.istockphoto.com/id/1437816897/pt/foto/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring-or.jpg?s=612x612&w=0&k=20&c=OsiL-G3rU8NzppNGl3Yh9exwYzoSfCrRb9gxawy1VR4=',
        title: 'Bicicleta',
        product_image: 'https://lasmagrelas.com.br/wp-content/uploads/2023/05/Frame-36main.png',
        isNew: true,
        disabled: false,
    },
    {
        price: 473.90,
        profile_image: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D',
        title: 'Sofá 1,80m',
        product_image: 'https://imgs.casasbahia.com.br/55062675/1g.jpg',
        isNew: true,
        disabled: true,
    },
    {
        price: 900.90,
        profile_image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png',
        title: 'Iphone 16',
        product_image: 'https://jasondeegan.com/wp-content/uploads/2024/09/iPhone-16-Review-Discover-How-Its-Changing-the-Game.jpg',
        isNew: false,
        disabled: true,
    },
]

interface MyAdsProps extends NativeStackScreenProps<RootStackParamList, 'home'> { }


export function MyAds({ navigation }: MyAdsProps) {

    const [items, setItems] = useState(list)

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
                    {items.length} anúncios
                </Text>
            </View>

            <View style={{ flex: 1 }}>

                <FlatList
                    keyExtractor={(item) => item.product_image}
                    columnWrapperStyle={{ gap: 24 }}
                    contentContainerStyle={{ gap: 24, }}
                    numColumns={Platform.select({ web: 4, default: 2 })}
                    data={items}
                    renderItem={({ item }) =>
                        <ProductCard
                            data={item}
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