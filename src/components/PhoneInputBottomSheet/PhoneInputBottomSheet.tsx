import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheet, BottomSheetRef } from "../BottomSheet";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import { countries as allCountries } from "../../consts/countries";
import { Country } from "../../types/Country";

interface PhoneInputBottomSheetProps {
  onSelectCountry: (country: Country) => void;
  selectedCountry?: Country;
  selectedRadioColor?: string;
}

export const PhoneInputBottomSheet = forwardRef(
  (props: PhoneInputBottomSheetProps, ref) => {
    const { onSelectCountry, selectedCountry, selectedRadioColor } = props;
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          bottomSheetRef.current?.open();
        },

        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      []
    );

    const [search, setSearch] = useState("");
    const countries = useMemo(
      () =>
        allCountries.filter(
          (country) =>
            country.name.toLowerCase().includes(search.toLowerCase()) ||
            country.dial_code.includes(search) ||
            country.code.toLowerCase().includes(search.toLowerCase())
        ),
      [search]
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["50"]}
        enableDynamicSizing={false}
      >
        <View style={{ gap: 24, paddingHorizontal: 16 }}>
          <TextInput
            placeholder="Search country"
            style={{
              borderWidth: 0.5,
              borderColor: "grey",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
            }}
            onChange={(e) => setSearch(e.nativeEvent.text)}
          />
          {countries.map((country) => (
            <View key={country.code}>
              <TouchableOpacity
                onPress={() => onSelectCountry(country)}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <View style={{ flexDirection: "row", gap: 8 }}>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {country.emoji}
                  </Text>
                  <Text style={{ fontSize: 18 }}>{country.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {country.dial_code}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      borderWidth: 1,
                      borderRadius: 24,
                      backgroundColor:
                        selectedCountry?.code === country.code
                          ? selectedRadioColor ?? "blue"
                          : "white",
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#ccc",
                  marginTop: 24,
                }}
              />
            </View>
          ))}
        </View>
      </BottomSheet>
    );
  }
);
