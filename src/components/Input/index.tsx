import { theme } from "@/src/theme";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface InputProps extends TextInputProps {
    title: string;
    error?: string;
    prefix?: boolean;
}

export function Input(props: InputProps) {
    const {
        title,
        multiline,
        style,
        error,
        secureTextEntry,
        prefix,
        ...rest
    } = props
    const animation = useSharedValue(0)

    const [hidePassword, setHidePassword] = useState(secureTextEntry)

    const styleAnimdated = useAnimatedStyle(() => ({
        borderColor: interpolateColor(animation.value, [0, 100], [theme.colors.gray_7, theme.colors.blue_light]),
        height: multiline ? 120 : 48,
        borderWidth: 1
    }))

    const handleBlur = () => {
        animation.value = withTiming(0)
    }

    const handleFocus = () => {
        animation.value = withTiming(100)
    }

    return (

        <View style={[styles.container, style]}>
            <Animated.View style={[styles.content, styleAnimdated]}>
                <View style={styles.inputWrapper}>
                    {prefix &&
                        <Text style={{
                            fontSize: 16,
                            paddingLeft: 16,
                            fontFamily: theme.fonts.regular,
                            color: theme.colors.gray_1
                        }}>R$</Text>
                    }
                    <TextInput
                        {...rest}
                        multiline={multiline}
                        secureTextEntry={hidePassword}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        cursorColor={theme.colors.gray_1}
                        selectionHandleColor={theme.colors.gray_1}
                        selectionColor={theme.colors.gray_1}
                        style={styles.input}
                        placeholder={title}
                        placeholderTextColor={theme.colors.gray_4}
                    />

                    {
                        secureTextEntry &&
                        <TouchableOpacity
                            onPress={() => setHidePassword(state => !state)}
                        >
                            <Image
                                source={hidePassword ?
                                    theme.images.eye_regular :
                                    theme.images.eye_slash
                                }
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    }
                </View>

            </Animated.View>
            {error &&
                <Text style={{padding: 4}}>{error}</Text>
            }
        </View>
    )
}


export const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    content: {
        minHeight: 48,
        borderRadius: 6,
        backgroundColor: theme.colors.gray_7,
        width: '100%',
    },
    label: {
        ...theme.texts.title_sx,
        color: theme.colors.gray_2
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        padding: 14,
        color: theme.colors.gray_1,

    },
    icon: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
        marginRight: 16,
        tintColor: theme.colors.gray_3
    }

})