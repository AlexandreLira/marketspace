import {
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

import { Icon } from "@/src/components/Icon";
import { theme } from "@/src/theme";
import { Input } from "@/src/components/Input";
import { Selection } from "@/src/components/Selection";
import { Button } from "@/src/components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/routes/app.routes";

const schema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    is_new: yup.boolean(),
    price: yup.string(),
    accept_trade: yup.boolean(),
    payment_methods: yup.array().of(yup.string()).required()
})


const payment_methods = [
    { key: 'pix', label: 'Pix' },
    { key: 'card', label: 'Cartão de Crédito' },
    { key: 'boleto', label: 'Boleto' },
    { key: 'cash', label: 'Dinheiro' },
    { key: 'deposit', label: 'Depósito Bancário' },
]

interface CreateOrEditProductProps extends NativeStackScreenProps<RootStackParamList, 'create_or_edit_product'> { }


export function CreateOrEditProduct({ navigation }: CreateOrEditProductProps) {
    const { register, getValues, handleSubmit, control } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            payment_methods: [],
            accept_trade: false,
            price: '0',
            is_new: true,
        }
    });


    function handleForm(value: any) {
        console.log(value)
    }

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

                <Text style={styles.headerTitle}>Criar anúncio</Text>
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

                    <View style={styles.sectionImage}>
                        <Icon name="plus_regular" color={theme.colors.gray_4} />
                    </View>
                </View>

                {/* Sobre o Produto */}
                <View style={styles.section}>

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
                                title="45.00"
                                keyboardType="decimal-pad"
                                prefix
                                value={value}
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
                                    {payment_methods.map(item =>
                                        <Selection
                                            text={item.label}
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
                />
                <Button
                    onPress={handleSubmit(handleForm)}
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