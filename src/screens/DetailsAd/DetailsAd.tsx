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

const PROFILE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvJaoIeJQU_V9rL_ZII61whWyqSFbmMgTgwQ&s'

const item = {
    price: 900.90,
    profile_image: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png',
    title: 'Iphone 16',
    product_image: 'https://jasondeegan.com/wp-content/uploads/2024/09/iPhone-16-Review-Discover-How-Its-Changing-the-Game.jpg',
    isNew: false
}

const payment = [
    {
        title: 'Boleto',
        icon: 'barcode_regular'
    },
    {
        title: 'Pix',
        icon: 'qr_code_regular'
    },
    {
        title: 'Depósito Bancário',
        icon: 'bank_regular'
    },
]

interface DetailsAdProps extends NativeStackScreenProps<RootStackParamList, 'details_ad'> { }

export function DetailsAd({ navigation }: DetailsAdProps) {

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
                    <Icon
                        name="pencil_simple_line_regular"
                        color={theme.colors.gray_1}
                    />
                </View>

                <View>

                    {
                        true &&
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
                        data={[item, item, item]}
                        horizontal
                        // style={{flex: 1}}
                        // style={{flex}}
                        renderItem={({ item }) =>
                            <Image
                                source={{ uri: item.product_image }}
                                style={styles.image}
                            />
                        }
                    />

                </View>







                <View style={styles.content}>
                    <View style={styles.profile}>
                        <ProfileImage
                            size={24}
                            source={{ uri: PROFILE_URL }}
                        />
                        <Text style={styles.label}>Maria Gomes</Text>
                    </View>

                    <View style={{ gap: 8 }}>

                        <View style={styles.tag}>
                            <Text style={styles.tagTitle}>USADO</Text>
                        </View>

                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.priceWrapper}>
                                <Text style={styles.dollarSign}>R$</Text>
                                <Text style={styles.price}>{item.price}</Text>
                            </View>
                        </View>

                        <Text style={styles.label}>
                            Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus.
                        </Text>
                    </View>

                    <View style={{ gap: 16 }}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                            <Text style={styles.text}>
                                Aceita troca?
                            </Text>
                            <Text style={styles.label}>
                                Não
                            </Text>

                        </View>

                        <View style={{ gap: 8 }}>
                            <Text style={styles.text}>
                                Meios de pagamento:
                            </Text>

                            {payment.map(item =>
                                <View
                                    style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
                                    key={item.title}
                                >
                                    <Icon
                                        name={item.icon}
                                        size={18}
                                        color={theme.colors.gray_1}
                                    />
                                    <Text style={styles.label}>
                                        {item.title}
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


const styles = StyleSheet.create({
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
        backgroundColor: theme.colors.gray_5,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 999,
        alignSelf: 'baseline'
    },
    tagTitle: {
        fontFamily: theme.fonts.bold, fontSize: 10, color: theme.colors.gray_2
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