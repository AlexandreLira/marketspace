import { theme } from "@/src/theme";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    icon?: keyof typeof theme.images;
    title: string;
    outline?: boolean;
    bg?: string;
    color?: string;
}

export function Button(props: ButtonProps) {
    const {
        icon,
        title,
        outline = false,
        bg = theme.colors.gray_2,
        color = theme.colors.gray_7,
        style,
        ...rest
    } = props;

    const styles = styling({
        outline,
        bg,
        color
    })
    return (
        <TouchableOpacity style={[styles.container, style]} {...rest}>
            {icon &&
                <Image
                    source={theme.images[icon]}
                    style={styles.icon}
                />
            }
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

interface Styling extends Pick<ButtonProps, 'bg' | 'outline' | 'color'> {

}

const styling = (values: Styling) => StyleSheet.create({
    container: {
        backgroundColor: values.bg,
        minHeight: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        borderWidth: values.outline ? 1 : 0,
        borderColor: theme.colors.gray_1
    },
    text: {
        ...theme.texts.title_sx,
        color: values.color
    },
    icon: {
        width: 18,
        aspectRatio: 1,
        tintColor: values.color ? theme.colors.gray_1 : theme.colors.white
    }
})