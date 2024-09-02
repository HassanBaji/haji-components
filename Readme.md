# Haji Phone Input

Haji Phone Input is a customizable phone input component library for React Native applications. It utilizes `@gorhom/bottom-sheet` for selecting the country code and `react-native-reanimated` for smooth animations, offering a seamless user experience for entering phone numbers.

## Features

- **Country Code Selection**: Easily select a country code using a bottom sheet.
- **Customizable Input**: Style the input field to match your application's design.
- **Keyboard Integration**: Optimized for phone number input with a `phone-pad` keyboard.

## Requirements

Before using this library, ensure you have the following dependencies installed in your React Native project:

- [`@gorhom/bottom-sheet`](https://github.com/gorhom/react-native-bottom-sheet)
- [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/)

To install the required dependencies, run:

```bash
npm install @gorhom/bottom-sheet react-native-reanimated

## Installation

To install the Haji Phone Input library, run the following command:

```bash
npm install haji-phone-input
```

## Usage

### Importing the Component

To use the Haji Phone Input component, import it in your React Native application:

```jsx
import { Input } from "haji-phone-input";
```

### Basic Usage

To use the Input component, simply pass in the necessary props:

```jsx
<Input
  placeholder="Enter phone number"
  label="Phone number"
  onPressChangePhone={() => {
    // Handle the change event
  }}
  country={countries[0]}
/>
```

### Props

The Input component accepts the following props:

| Prop Name | Type | Description |
| --- | --- | --- |
| `placeholder` | string | The placeholder text for the input field. |
| `label` | string | The label text for the input field. |
| `onPressChangePhone` | () => void | A function to be called when the country code is changed. |
| `country` | Country | The selected country object. |
| `onChange` | (text: string) => void | A function to be called when the input value changes

The BottomSheet component accepts the following props:

| Prop Name | Type | Description |
| --- | --- | --- |
| 'selectedCountry' | Country? | The selected country object. |
| 'onSelectCountry' | (country: Country) => void | A function to be called when a country is selected. |
| 'selectedRadioColor' | string? | The color of the selected radio button. |
