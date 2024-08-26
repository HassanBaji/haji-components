import { forwardRef, useImperativeHandle, useRef } from 'react';
import { BottomSheet, BottomSheetRef } from '../BottomSheet';
import { TouchableOpacity, View, Text } from 'react-native';
import { countries } from '../../consts/countries';
import { Country } from '../../types/Country';

interface PhoneInputBottomSheetProps {
  onSelectCountry: (country: Country) => void;
}

export const PhoneInputBottomSheet = forwardRef(
  (props: PhoneInputBottomSheetProps, ref) => {
    const { onSelectCountry } = props;
    const bottomSheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          bottomSheetRef.current?.open();
        },

        close: () => {
          bottomSheetRef.current?.close();
        }
      }),
      []
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50']}
        enableDynamicSizing={false}>
        <View style={{ gap: 24, paddingHorizontal: 16 }}>
          {countries.map((country) => (
            <View key={country.code}>
              <TouchableOpacity
                onPress={() => onSelectCountry(country)}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  alignContent: 'center'
                }}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={{ fontSize: 18, fontWeight: '400' }}>
                    {country.emoji}
                  </Text>
                  <Text style={{ fontSize: 18 }}>{country.name}</Text>
                  <Text style={{ fontSize: 18, fontWeight: '700' }}>
                    {country.dial_code}
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      height: 24,
                      width: 24,
                      borderWidth: 1,
                      borderRadius: 24
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  backgroundColor: '#ccc',
                  marginTop: 24
                }}
              />
            </View>
          ))}
        </View>
      </BottomSheet>
    );
  }
);
