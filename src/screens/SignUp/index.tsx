import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Profile } from "@/src/components/Profile";

import { RootStackParamList } from "@/src/routes/login.routes";
import { LibraryService } from "@/src/services/LibraryService";
import { theme } from "@/src/theme";
import { AppError } from "@/src/utils/AppError";
import { useAuth } from "@/src/hooks/useAuth";
import { UserService } from "@/src/services/UserService";


interface SignUpProps extends NativeStackScreenProps<RootStackParamList, 'signUp'> { }

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
    tel: string;
}

export type PhotoFile = {
    name: string;
    uri: string;
    type: string;
}

const schema = yup.object({
    name: yup
        .string()
        .required('O campo nome é obrigatório'),
    email: yup
        .string()
        .email()
        .required('O campo e-mail é obrigatório'),
    tel: yup
        .string()
        .required('O campo telefone é obrigatório'),
    password: yup
        .string()
        .required('O campo senha é obrigatório')
        .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    password_confirm: yup
        .string()
        .required('Confirme a senha.')
        .oneOf([yup.ref('password')], 'Senhas não são iguais.')

}).required()


export const DEFAULT_USER_PHOTO = 'https://www.summithealth.org.au/wp-content/uploads/2021/07/placeholder.jpg';

export function SignUp({ navigation }: SignUpProps) {

    const { handleSubmit, control } = useForm({
        resolver: yupResolver(schema)
    });
    const { signIn } = useAuth()

    const [photoFile, setPhotoFile] = useState<PhotoFile>({} as PhotoFile)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSignUp(data: FormDataProps) {
        try {
            setIsLoading(true)

            await UserService.signUp({ ...data, photoFile })
            await signIn(data.email, data.password)

        } catch (error) {
            setIsLoading(false)

            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde'

            Alert.alert(title)
        }
    }

    async function handleUserPhotoSelect() {
        try {
            const photo = await LibraryService.imagePicker()

            if (photo) {

                const fileExtersion = photo.uri.split('.').pop()

                const photoFile = {
                    name: `${photo.fileName}.${fileExtersion}`,
                    uri: photo.uri,
                    type: `${photo.type}/${fileExtersion}`
                }
                setPhotoFile(photoFile)
            }

        } catch (error) {

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

                    <Profile
                        onPress={handleUserPhotoSelect}
                        source={{ uri: photoFile?.uri || DEFAULT_USER_PHOTO }}
                    />

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Nome"
                                placeholder="Nome"
                                textContentType="name"
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
                                textContentType="emailAddress"
                                inputMode="email"
                                keyboardType="email-address"
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="tel"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Telefone"
                                textContentType="telephoneNumber"
                                inputMode="tel"
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Input
                                title="Senha"
                                secureTextEntry
                                textContentType="password"
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
                                textContentType="password"
                                onChangeText={onChange}
                                value={value}
                                error={error?.message}
                            />
                        )}
                    />

                    <Button
                        title="Criar"
                        style={{ marginTop: 8 }}
                        isLoading={isLoading}
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