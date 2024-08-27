import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { Country } from "../../types/Country";

export interface InputProps extends TextInputProps {
  onPressChangePhone: () => void;
  country: Country;
  label?: string;
}

export const Input = (props: InputProps) => {
  const { onPressChangePhone, country, label } = props;

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.container}>
        <Pressable style={styles.selectButton} onPress={onPressChangePhone}>
          <View>
            <Text>
              {country.emoji} {country.dial_code}
            </Text>
          </View>
        </Pressable>
        <TextInput {...props} style={styles.input} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "70%",
    height: 50,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 12,
    borderStartStartRadius: 0,
    borderEndStartRadius: 0,
    padding: 12,
  },
  selectButton: {
    borderWidth: 0.5,
    borderStartStartRadius: 12,
    borderEndStartRadius: 12,
    borderColor: "grey",
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
});
