import { theme } from "@/src/theme";
import { StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";

interface ContainerProps extends SafeAreaViewProps { }

export function Container(props: ContainerProps) {
    const { children } = props
    return (
        <SafeAreaView style={styles.safearea}>
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: theme.colors.gray_6
    },
    content: {
        gap: 32,
        flex: 1,
        padding: 24
    }
})