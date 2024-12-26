import { theme } from "@/src/theme";
import {
    Image,
    StyleSheet,
    TouchableOpacityProps,
    TouchableOpacity,
    View,
    ImageSourcePropType
} from "react-native";


interface ProfileProps extends TouchableOpacityProps {
    source?: ImageSourcePropType
}

export function Profile(props: ProfileProps) {
    const {
        source,
        ...rest
    } = props;
    return (
        <TouchableOpacity
            style={styles.container}
            {...rest}
        >
            <Image source={source}
                style={styles.avatar}
            />

            <View style={styles.button}>
                <Image
                    source={theme.images.pencil_simple_line_regular}
                    style={styles.icon}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 88,
        height: 88,
        borderWidth: 3,
        borderColor: theme.colors.blue_light,
        alignSelf: 'center',
        borderRadius: 999
    },
    avatar: {
        flex: 1, borderRadius: 999
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: theme.colors.blue_light,
        borderRadius: 999,
        bottom: 0,
        right: -8,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        tintColor: theme.colors.gray_6,
        width: 16,
        height: 16
    }
})