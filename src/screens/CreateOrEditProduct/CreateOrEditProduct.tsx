import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import { Icon } from "@/src/components/Icon";
import { theme } from "@/src/theme";
import { Input } from "@/src/components/Input";
import { Selection } from "@/src/components/Selection";
import { Button } from "@/src/components/Button";

import { SafeAreaView } from "react-native-safe-area-context";

export function CreateOrEditProduct() {
    return (
        <SafeAreaView
            style={{ flex: 1 }}
            edges={{ bottom: 'off', top: 'maximum' }}
        >

            <View style={styles.header}>
                <TouchableOpacity style={styles.headerBack}>
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

                    <Text
                        style={styles.sectionTitle}
                    >
                        Sobre o produto
                    </Text>
                    <Input title="Título do anúncio" />
                    <Input title="Descrição do produto" multiline />

                    <View style={styles.selectionWrapper}>
                        <Selection checked text="Produto novo" type="radio" />
                        <Selection text="Produto usado" type="radio" />
                    </View>

                </View>

                {/* Pagamento */}
                <View style={styles.section}>

                    <Text style={styles.sectionTitle}>
                        Venda
                    </Text>
                    <Input title="45.00" keyboardType="decimal-pad" prefix />

                    <View style={{ gap: 12 }}>
                        <Text style={styles.sectionSubtitle}>
                            Aceita troca?
                        </Text>

                        <Switch
                            trackColor={{
                                false: theme.colors.gray_5,
                                true: theme.colors.blue_light
                            }}
                        />
                    </View>

                    <View style={{ gap: 12 }}>
                        <Text style={styles.sectionSubtitle}>
                            Meios de pagamento aceitos
                        </Text>

                        <View style={{ gap: 8 }}>
                            <Selection text="Boleto" type="checkbox" />
                            <Selection text="Pix" type="checkbox" />
                            <Selection text="Dinheiro" type="checkbox" />
                            <Selection text="Cartão de Crédito" type="checkbox" />
                            <Selection text="Depósito Bancário" type="checkbox" />
                        </View>
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
                <Button title="Avançar" style={{ flex: 1 }} />
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