import { theme } from "@/src/theme";
import { Image, StyleSheet, View } from "react-native";

const DEFAULT_USER_PHOTO = 'https://www.summithealth.org.au/wp-content/uploads/2021/07/placeholder.jpg';

export function Profile() {
    return (
        <View style={styles.container}>
            <Image source={{ uri: DEFAULT_USER_PHOTO }}
                style={styles.avatar}
            />

            <View style={styles.button}>
                <Image
                    source={theme.images.pencil_simple_line_regular}
                    style={styles.icon}
                />
            </View>
        </View>
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