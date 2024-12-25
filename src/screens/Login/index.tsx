import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { useAuth } from "@/src/hooks/useAuth";
import { RootStackParamList } from "@/src/routes/login.routes";
import { theme } from "@/src/theme";
import { AppError } from "@/src/utils/AppError";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LoginProps extends NativeStackScreenProps<RootStackParamList, 'login'> { }

type FormData = {
    email: string;
    password: string;
}

export function Login({ navigation }: LoginProps) {

    const { control, handleSubmit } = useForm<FormData>();
    const { signIn } = useAuth();

    const [isLoading, setIsLoading] = useState(false)

    async function handleForm(data: FormData) {
        try {
            setIsLoading(true)
            await signIn(data.email, data.password)
        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível fazer logim. Tente novamente mais tarde'
            Alert.alert(title)
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={{ bottom: "maximum" }} >
            <View style={styles.content}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={theme.images.icon}
                        style={styles.logo}
                    />

                    <Text style={styles.title}>
                        marketspace
                    </Text>
                    <Text style={styles.subtitle}>
                        Seu espaço de compra e venda
                    </Text>
                </View>

                <View style={styles.form} >

                    <Text style={styles.text}>Acesse sua conta</Text>

                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Informe o e-mail' }}
                        render={({ field, fieldState }) =>
                            <Input
                                title="E-mail"
                                onChangeText={field.onChange}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                inputMode="email"
                                value={field.value}
                                error={fieldState.error?.message}
                                autoCapitalize="none"
                            />
                        }
                    />

                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'Informe a senha' }}
                        render={({ field, fieldState }) =>
                            <Input
                                title="Senha"
                                secureTextEntry
                                onChangeText={field.onChange}
                                textContentType="password"
                                value={field.value}
                                error={fieldState.error?.message}
                            />
                        }
                    />

                    <Button
                        title="Entrar"
                        style={{ width: '100%', marginTop: 16 }}
                        bg={theme.colors.blue_light}
                        isLoading={isLoading}
                        onPress={handleSubmit(handleForm)}
                    />

                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.text}>Ainda não tem acesso?</Text>

                <Button
                    title="Criar uma conta"
                    onPress={() => navigation.navigate('signUp')}
                    style={{ width: '100%' }}
                    bg={theme.colors.gray_5}
                    color={theme.colors.gray_2}

                />
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.gray_7
    },
    content: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 48,
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.gray_6,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    logo: {
        height: 64, resizeMode: 'contain', marginBottom: 18
    },
    title: {
        fontSize: 32, fontFamily: theme.fonts.bold,
    },
    subtitle: {
        fontSize: 14, color: theme.colors.gray_2, fontFamily: theme.fonts.light, textAlign: 'center'
    },
    text: {
        fontSize: 14, color: theme.colors.gray_2, fontFamily: theme.fonts.regular, textAlign: 'center'
    },
    form: {
        width: '100%', gap: 16
    },
    footer: {
        padding: 48, gap: 16
    }
})