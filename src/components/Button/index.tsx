import { theme } from "@/src/theme";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import { Icon } from "../Icon";

interface ButtonProps extends TouchableOpacityProps {
    icon?: keyof typeof theme.images;
    title: string;
    outline?: boolean;
    bg?: string;
    color?: string;
    isLoading?: boolean
}

interface Styling extends Pick<ButtonProps, 'bg' | 'outline' | 'color' | 'isLoading'> { }


export function Button(props: ButtonProps) {
    const {
        icon,
        title,
        outline = false,
        bg = theme.colors.gray_1,
        color = theme.colors.gray_7,
        isLoading,
        style,
        ...rest
    } = props;

    const styles = styling({
        outline,
        bg,
        color,
        isLoading
    })
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            disabled={isLoading}
            {...rest}
        >
            {isLoading && <ActivityIndicator color={color} />
            }
            {icon && <Icon
                name={icon}
                color={color}
                size={18}
            />}

            {!isLoading && <Text style={styles.text}>{title}</Text>}

        </TouchableOpacity>
    )
}


const styling = (values: Styling) => StyleSheet.create({
    container: {
        backgroundColor: values.bg,
        minHeight: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        borderWidth: values.outline ? 1 : 0,
        borderColor: theme.colors.gray_1,
        opacity: values.isLoading ? 0.6 : 1
    },
    text: {
        ...theme.texts.title_sx,
        color: values.color
    },
    icon: {
        width: 18,
        aspectRatio: 1,
        tintColor: values.color || theme.colors.white
    }
})