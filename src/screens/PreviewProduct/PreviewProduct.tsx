import { Button } from "@/src/components/Button";
import { PreviewProduct } from "@/src/components/PreviewProduct/PreviewProduct";
import { RootStackParamList } from "@/src/routes/app.routes";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface PreviewProductScreenProps extends NativeStackScreenProps<RootStackParamList, 'preview_product'> {

}

export function PreviewProductScreen({ navigation, route }: PreviewProductScreenProps) {
    const product = route.params?.product;

    if (!product) {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                paddingTop: 42 + 24,
                backgroundColor: theme.colors.blue_light,
                padding: 24,
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: theme.fonts.bold,
                    fontSize: 16,
                    color: theme.colors.gray_7,

                }}
                >Pré visualização do anúncio</Text>
                <Text style={{
                    fontFamily: theme.fonts.regular,
                    fontSize: 14,
                    color: theme.colors.gray_7,

                }}>É assim que seu produto vai aparecer!</Text>
            </View>
            <ScrollView>

                <PreviewProduct product={product} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.sectionFooter}>
                <Button
                    title="Voltar a editar"
                    style={{ flex: 1 }}
                    bg={theme.colors.gray_5}
                    color={theme.colors.gray_2}
                    icon="arrow_left_regular"
                    onPress={() => navigation.goBack()}
                />
                <Button
                    // onPress={handleSubmit(handleConfirm)}
                    bg={theme.colors.blue_light}
                    title="Publicar"
                    icon="tag_regular"
                    style={{ flex: 1 }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionFooter: {
        backgroundColor: theme.colors.gray_7,
        padding: 24,
        paddingBottom: 32,
        gap: 12,
        flexDirection: 'row',
    }
})