import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Profile } from "@/src/components/Profile";
import { RootStackParamList } from "@/src/routes/login.routes";
import { api } from "@/src/services/api";
import { theme } from "@/src/theme";
import { AppError } from "@/src/utils/AppError";
import { yupResolver } from "@hookform/resolvers/yup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from 'yup';


interface SignUpProps extends NativeStackScreenProps<RootStackParamList, 'signUp'> { }


type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const schema = yup.object({
    name: yup
        .string()
        .required('O campo nome é obrigatório'),
    email: yup
        .string()
        .email()
        .required('O campo e-mail é obrigatório'),
    password: yup
        .string()
        .required('O campo e-mail é obrigatório')
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password_confirm: yup
        .string()
        .required('Confirme a senha.')
        .oneOf([yup.ref('password')], 'Senhas não são iguais.')

}).required()

export function SignUp({ navigation }: SignUpProps) {

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });

    async function handleSignUp(data: FormDataProps) {
        try {
            const { email, name, password } = data
            await api.post('/users', { email, name, password, avatar: '' })

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde'

            Alert.alert(title)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={theme.images.icon} style={styles.logo} />
                <Text style={styles.headerTitle}>Boas vindas</Text>
                <Text style={styles.headerSubtitle}>
                    Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.form}>

                    <Profile />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Nome"
                                placeholder="Nome"
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Email"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Input title="Telefone" />


                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password_confirm"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Confirmar senha"
                                secureTextEntry
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Button
                        title="Criar"
                        style={{ marginTop: 8 }}
                        onPress={handleSubmit(handleSignUp)}
                    />
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