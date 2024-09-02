import React, { createRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Input,
  BottomSheetRef,
  PhoneInputBottomSheet,
} from "../../../src/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { countries } from "../../../src/consts/countries";

const bottomSheetRef = createRef<BottomSheetRef>();
const InputMeta: Meta<typeof Input> = {
  title: "Input",
  component: Input,

  args: {
    placeholder: "Enter phone number",
    label: "Phone number",
    onPressChangePhone: () => {
      bottomSheetRef.current?.open();
    },

    country: countries[0],
  },
  decorators: [
    (Story) => (
      <GestureHandlerRootView>
        <View style={styles.container}>
          <Story />
        </View>
        <PhoneInputBottomSheet
          onSelectCountry={(country) => {}}
          ref={bottomSheetRef}
          selectedCountry={countries[0]}
        />
      </GestureHandlerRootView>
    ),
  ],
};

export default InputMeta;

export const Basic: StoryObj<typeof Input> = {};

export const InputExample: StoryObj<typeof Input> = {
  args: {
    placeholder: "Placeholder",
    label: "label",
    country: countries[0],
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});
