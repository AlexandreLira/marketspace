import { Button } from "@/src/components/Button";
import { Icon } from "@/src/components/Icon";
import { ProductCard } from "@/src/components/ProductCard";
import { ProfileImage } from "@/src/components/ProfileImage";
import { theme } from "@/src/theme";
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const PROFILE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s'


const list = [
    {
        price: 59.90,
        profile_image: 'https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg',
        title: 'Tênis vermelho',
        product_image: 'https://acdn.mitiendanube.com/stores/001/155/809/products/redley_vermelho_5_1_11-da229778b3ee4ace1316763987640324-1024-1024.jpg',
        isNew: false
    },
    {
        price: 120.00,
        profile_image: 'https://media.istockphoto.com/id/1437816897/pt/foto/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring-or.jpg?s=612x612&w=0&k=20&c=OsiL-G3rU8NzppNGl3Yh9exwYzoSfCrRb9gxawy1VR4=',
        title: 'Bicicleta',
        product_image: 'https://lasmagrelas.com.br/wp-content/uploads/2023/05/Frame-36main.png',
        isNew: true
    },
    {
        price: 473.90,
        profile_image: 'https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D',
        title: 'Sofá 1,80m',
        product_image: 'https://imgs.casasbahia.com.br/55062675/1g.jpg',
        isNew: true
    },
    {
        price: 900.90,
        profile_image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png',
        title: 'Iphone 16',
        product_image: 'https://jasondeegan.com/wp-content/uploads/2024/09/iPhone-16-Review-Discover-How-Its-Changing-the-Game.jpg',
        isNew: false
    },
]

export function Home({ navigation }) {

    return (
        <SafeAreaView style={styles.safearea} >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerProfile}>
                        <ProfileImage source={{ uri: PROFILE_URL }} />

                        <View style={{ justifyContent: 'space-evenly' }}>
                            <Text style={styles.profileText}>Boas vindas,</Text>
                            <Text style={styles.profileName}>Maria</Text>
                        </View>
                    </View>

                    <Button
                        title="Criar anuncio"
                        icon="plus_regular"
                        style={{ flexGrow: 1 }}
                    />
                </View>


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
                        keyExtractor={(item) => item.product_image}

                        columnWrapperStyle={{ gap: 20 }}
                        contentContainerStyle={{ gap: 20, }}
                        numColumns={2}
                        data={list}
                        renderItem={({ item }) =>
                            <ProductCard
                                data={item}
                                onPress={() => navigation.navigate('details_ad')}
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