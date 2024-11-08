import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Profile } from "@/src/components/Profile";
import { RootStackParamList } from "@/src/routes/login.routes";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SignUpProps extends NativeStackScreenProps<RootStackParamList, 'signUp'> { }


export function SignUp({ navigation }: SignUpProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={theme.images.icon} style={styles.logo} />
                <Text style={styles.headerTitle}>Boas vindas</Text>
                <Text style={styles.headerSubtitle}>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.form}>

                    <Profile />


                    <Input title="Nome" />
                    <Input title="Email" />
                    <Input title="Telefone" />
                    <Input
                        title="Senha"
                        secureTextEntry
                    />
                    <Input
                        title="Confirmar senha"
                        secureTextEntry
                    />
                    <Button title="Criar" style={{ marginTop: 8 }} />
                </View>

            </View>


            <View style={styles.footer}>
                <Text style={styles.text}>Já tem uma conta?</Text>
                <Button
                    title="Ir para o login"
                    bg={theme.colors.gray_5}
                    color={theme.colors.gray_2}
                    onPress={() => navigation.navigate('login')}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray_6,
        paddingHorizontal: 48,
        justifyContent: 'space-around'
    },
    content: {
    },
    header: {
        alignItems: 'center',
        gap: 12
    },
    logo: {
        height: 40,
        resizeMode: 'contain',

    },
    headerTitle: {
        fontSize: 20, fontFamily: theme.fonts.bold,
    },
    headerSubtitle: {
        fontSize: 14, color: theme.colors.gray_2, fontFamily: theme.fonts.light, textAlign: 'center'
    },
    text: {
        fontSize: 14, color: theme.colors.gray_2, fontFamily: theme.fonts.regular, textAlign: 'center'
    },
    form: {
        width: '100%', gap: 16
    },
    footer: {
        gap: 16
    }
})