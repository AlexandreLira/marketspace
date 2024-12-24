import { theme } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../Icon";


interface SelectionProps {
    checked?: boolean;
    text: string;
    type: 'radio' | 'checkbox'
}

export function Selection(props: SelectionProps) {
    const { text, type, checked } = props;

    const styles = styling(checked)
    return (
        <View style={styles.container}>

            {type == 'radio' &&
                <View style={styles.radio}>
                    <View style={styles.radioChecked} />
                </View>
            }

            {type == 'checkbox' &&
                <View style={styles.checkbox}>
                    <Icon name="check" size={12} />
                </View>
            }

            <Text
                style={{
                    fontSize: 16,
                    fontFamily: theme.fonts.regular,
                    color: theme.colors.gray_2
                }}
            >
                {text}
            </Text>
        </View>
    )
}

const styling = (checked?: boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: checked ? theme.colors.blue_light : theme.colors.gray_4,
        justifyContent: 'center',
        alignItems: 'center'
    },

    radioChecked: {
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: theme.colors.blue_light,
        display: checked ? 'flex' : 'none'
    },

    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: checked ? theme.colors.blue_light : theme.colors.gray_4,
        backgroundColor: checked ? theme.colors.blue_light : 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },

})