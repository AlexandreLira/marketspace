import {
    Image,
    InteractionManager,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';


import { Icon } from "@/src/components/Icon";
import { theme } from "@/src/theme";
import { Input } from "@/src/components/Input";
import { Selection } from "@/src/components/Selection";
import { Button } from "@/src/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/routes/app.routes";
import { IProductDetails, IProductImage, ProductService } from "@/src/services/ProdutcService";
import { useEffect, useState } from "react";
import Animated, { LinearTransition } from "react-native-reanimated";
import { ImageUtils } from "@/src/utils/ImageUtils";
import { ProductImageService } from "@/src/services/ProductImageService";
import { UserService } from "@/src/services/UserService";
import { formatPrice } from "@/src/utils/Format";

const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    is_new: yup.boolean(),
    price: yup.number(),
    accept_trade: yup.boolean(),
    payment_methods: yup.array().of(yup.string()).required()
})


const PAYMENT_METHODS = [
    { key: 'pix', name: 'Pix' },
    { key: 'card', name: 'Cartão de Crédito' },
    { key: 'boleto', name: 'Boleto' },
    { key: 'cash', name: 'Dinheiro' },
    { key: 'deposit', name: 'Depósito Bancário' },
]

interface CreateOrEditProductProps extends NativeStackScreenProps<RootStackParamList, 'create_or_edit_product'> { }


export function CreateOrEditProduct({ navigation, route }: CreateOrEditProductProps) {
    const productId = route.params?.productId
    const { handleSubmit, control, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            payment_methods: [],
            accept_trade: false,
            is_new: true,
        }
    });

    const [images, setImages] = useState<IProductImage[]>([])
    const [photoFile, setPhotoFile] = useState([])

    async function handleForm(value: any) {
        try {
            if (productId) {
                await ProductService.update({ ...value, price: Number(value.price) }, productId)

                if (photoFile.length > 0) {
                    await ProductImageService.add(productId, photoFile)
                }
            } else {
                const response = await ProductService.create({ ...value, price: Number(value.price) })

                if (photoFile.length > 0) {
                    await ProductImageService.add(response.id, photoFile)

                }

            }

            navigation.navigate('homeStack')
        } catch (error) {

            console.log(error)
        }
    }

    async function loadProduct() {
        try {
            // setLoading(true)
            if (!productId) return
            const response = await ProductService.get(productId)

            setValue('name', response.name)
            setValue('description', response.description)
            setValue('is_new', response.is_new)
            setValue('accept_trade', response.accept_trade)
            setValue('price', response.price)
            setValue('payment_methods', response.payment_methods.map(item => item.key))

            setImages(response.product_images.map(item => ({ id: item.id, path: item.path })))

        } catch (error) {
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }

    async function handlePhotoSelect() {
        try {
            let photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,

            })

            if (photoSelected.canceled) return
            const photo = photoSelected.assets[0]

            if (photo) {
                const fileExtersion = photo.uri.split('.').pop()
                const photoFile = {
                    name: `${photo.fileName}.${fileExtersion}`,
                    uri: photo.uri,
                    type: `${photo.type}/${fileExtersion}`
                }
                setPhotoFile(state => [...state, photoFile])


                setImages(state => [...state, {
                    id: photoFile.name,
                    path: photo.uri
                }])
            }

        } catch {

        }



    }

    async function handleConfirm(form: typeof schema.__outputType) {
        try {
            const user = await UserService.get()

            const product: IProductDetails = {
                id: productId,
                name: form.name,
                product_images: images,
                payment_methods: form.payment_methods.map(item => ({
                    key: item,
                    name: PAYMENT_METHODS.find(pay => pay.key == item)?.name
                })),
                accept_trade: form.accept_trade || false,
                is_active: true,
                description: form.description || '',
                is_new: form.is_new || true,
                price: form.price || 0,
                user: user


            }

            navigation.navigate('preview_product', { product })
        } catch (error) {
            console.log(error)
        }


    }

    useEffect(() => {

        loadProduct()

    }, [productId])

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: theme.colors.gray_6 }}
            edges={{ bottom: 'off', top: 'maximum' }}
        >

            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBack} onPress={() => navigation.goBack()}>
                    <Icon
                        name="arrow_left_regular"
                        size={24}
                        color={theme.colors.gray_1}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>{productId ? 'Editar' : 'Criar'} anúncio</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>

                {/* Images */}
                <View style={styles.section}>
                    <View style={{ gap: 4 }}>
                        <Text style={styles.sectionTitle}>
                            Imagens
                        </Text>
                        <Text style={styles.sectionImageText}  >
                            Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
                        </Text>
                    </View>

                    <Animated.View
                        style={{ flexDirection: 'row', gap: 8 }}
                        layout={LinearTransition}
                    >
                        {images.map(img =>
                            <View key={img.id}>
                                <Image

                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 6,
                                    }}
                                    source={{
                                        uri: ImageUtils.url(img.path)
                                    }}
                                />

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: 4,
                                        position: "absolute", right: 4, top: 4,
                                        backgroundColor: theme.colors.gray_2,
                                        borderRadius: 999
                                    }}

                                    onPress={() => {
                                        ProductImageService.delete(img.id)
                                        const newArray = images.filter(item => item.id != img.id)
                                        setImages(newArray)
                                    }}
                                >

                                    <Icon
                                        name="x_regular"
                                        size={12}
                                        color={theme.colors.gray_7}

                                    />
                                </TouchableOpacity>
                            </View>
                        )}

                        {images.length < 3 &&

                            <TouchableOpacity
                                style={styles.sectionImage}
                                onPress={handlePhotoSelect}
                            >
                                <Icon name="plus_regular" color={theme.colors.gray_4} />
                            </TouchableOpacity>
                        }



                    </Animated.View>


                </View>

                {/* Sobre o Produto */}
                < View style={styles.section} >

                    <Text style={styles.sectionTitle} >
                        Sobre o produto
                    </Text>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                title="Título do anúncio"
                                value={value}
                                onChangeText={onChange}
                            />
                        }
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                title="Descrição do produto"
                                value={value}
                                onChangeText={onChange}
                                multiline
                            />
                        }
                    />



                    <View style={styles.selectionWrapper}>
                        <Controller
                            control={control}
                            name="is_new"
                            render={({ field: { onChange, value } }) =>
                                <>
                                    <Selection
                                        checked={value}
                                        onPress={() => onChange(true)}
                                        text="Produto novo"
                                        type="radio"
                                    />
                                    <Selection
                                        checked={!value}
                                        onPress={() => onChange(false)}
                                        text="Produto usado"
                                        type="radio"
                                    />
                                </>
                            }
                        />

                    </View>

                </View>

                {/* Pagamento */}
                <View style={styles.section}>

                    <Text style={styles.sectionTitle}>
                        Venda
                    </Text>

                    <Controller
                        control={control}
                        name="price"
                        render={({ field: { onChange, value } }) =>

                            <Input
                                title="Preço"
                                keyboardType="decimal-pad"
                                prefix
                                value={String(value || '')}
                                onChangeText={onChange}
                            />

                        }
                    />

                    <View style={{ gap: 12 }}>
                        <Text style={styles.sectionSubtitle}>
                            Aceita troca?
                        </Text>
                        <Controller
                            control={control}
                            name="accept_trade"
                            render={({ field: { onChange, value } }) =>
                                <Switch
                                    style={{ alignSelf: 'flex-start' }}
                                    value={value}
                                    onValueChange={onChange}
                                    trackColor={{
                                        false: theme.colors.gray_5,
                                        true: theme.colors.blue_light
                                    }}
                                />
                            }
                        />

                    </View>

                    <View style={{ gap: 12 }}>
                        <Text style={styles.sectionSubtitle}>
                            Meios de pagamento aceitos
                        </Text>
                        <Controller
                            control={control}
                            name="payment_methods"
                            render={({ field: { onChange, value } }) =>
                                <View style={{ gap: 8 }}>
                                    {PAYMENT_METHODS.map(item =>
                                        <Selection
                                            text={item.name}
                                            checked={value?.includes(item.key)}
                                            type="checkbox" key={item.key}
                                            onPress={() => {
                                                if (value?.includes(item.key)) {
                                                    const newMethos = value.filter(method => method != item.key)
                                                    onChange(newMethos)
                                                } else {

                                                    onChange([...value, item.key])
                                                }
                                            }}
                                        />
                                    )}

                                </View>
                            }
                        />

                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.sectionFooter}>
                <Button
                    title="Cancelar"
                    style={{ flex: 1 }}
                    bg={theme.colors.gray_5}
                    color={theme.colors.gray_2}
                    onPress={() => navigation.goBack()}
                />
                <Button
                    onPress={handleSubmit(handleConfirm)}

                    title="Avançar"
                    style={{ flex: 1 }}
                />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: theme.fonts.bold,
        color: theme.colors.gray_1
    },
    headerBack: {
        position: 'absolute',
        left: 24
    },
    scrollView: {
        padding: 24,
        gap: 32
    },
    section: {
        gap: 16
    },
    sectionImageText: {
        fontSize: 14,
        fontFamily: theme.fonts.regular,
        color: theme.colors.gray_3
    },
    sectionImage: {
        width: 100,
        height: 100,
        backgroundColor: theme.colors.gray_5,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        color: theme.colors.gray_2
    },
    sectionSubtitle: {
        fontSize: 14,
        fontFamily: theme.fonts.bold,
        color: theme.colors.gray_2
    },
    selectionWrapper: {
        flexDirection: 'row', gap: 20, alignItems: 'center'
    },
    sectionFooter: {
        backgroundColor: theme.colors.gray_7,
        padding: 24,
        paddingBottom: 32,
        gap: 12,
        flexDirection: 'row',
    }
})