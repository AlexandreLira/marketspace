import { theme } from "@/src/theme";
import { Image, ImageProps, StyleSheet } from "react-native";

interface ProfileImageProps extends ImageProps {
    size?: number;
    borderColor?: string;
    borderWidth?: number;
}

interface StylingProps {
    size?: number;
    borderColor?: string;
    borderWidth?: number;
}

export function ProfileImage(props: ProfileImageProps) {
    const {
        size = 45,
        borderColor = theme.colors.blue_light,
        borderWidth = 2,
        style,
        ...rest
    } = props;

    const styles = styling({ size, borderColor, borderWidth });

    return (
        <Image
            {...rest}
            style={[styles.image, style]}
        />

    )

}

const styling = (values: StylingProps) => StyleSheet.create({
    image: {
        width: values.size,
        aspectRatio: 1,
        borderWidth: values.borderWidth,
        borderRadius: 999,
        borderColor: values.borderColor
    }
})