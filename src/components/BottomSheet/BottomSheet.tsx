import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BS, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
  BottomSheetProps as BSProps,
} from "@gorhom/bottom-sheet";

import { BackHandler, Keyboard, StyleSheet } from "react-native";

interface BottomSheetProps extends BSProps {
  children: ReactNode;

  onClose?: () => void;
  onSnapChange?: (index: number) => void;
}

export interface BottomSheetRef {
  open: () => void;
  snapToIndex: (index: number) => void;
  close: () => void;
}

const INITIAL_INDEX = -1;
const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  (props, ref) => {
    const { children, snapPoints, onClose, onSnapChange, ...rest } = props;
    const [sheetIndex, setSheetIndex] = useState<number>(INITIAL_INDEX);
    const bottomSheetRef = useRef<BS>(null);

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setSheetIndex(0);
          bottomSheetRef.current?.collapse();
        },
        snapToIndex: (i) => {
          setSheetIndex(i);
          bottomSheetRef.current?.snapToIndex(i);
        },
        close: () => {
          bottomSheetRef.current?.close();
        },
      }),
      []
    );

    const onSheetChange = useCallback(
      (index: number) => {
        if (index !== -1) {
          setSheetIndex(index);
          Keyboard.dismiss();
        } else {
          setSheetIndex(-1);
        }
        onSnapChange?.(index);
      },
      [onSnapChange]
    );

    useCallback(() => {
      const backAction = () => {
        if (sheetIndex !== -1) {
          bottomSheetRef.current?.close();
          return true;
        } else {
          bottomSheetRef.current?.close();
        }
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [sheetIndex]);

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        return (
          <BottomSheetBackdrop
            {...backdropProps}
            pressBehavior="close"
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        );
      },
      []
    );

    const onCloseBottomSheet = useCallback(() => {
      Keyboard.dismiss();
      onClose?.();
    }, [onClose]);

    return (
      <BS
        ref={bottomSheetRef}
        index={INITIAL_INDEX}
        snapPoints={snapPoints ?? ["30%"]}
        enablePanDownToClose={true}
        enableDynamicSizing={true}
        handleIndicatorStyle={{ display: "none" }}
        onClose={onCloseBottomSheet}
        onChange={onSheetChange}
        backdropComponent={renderBackdrop}
        {...rest}
      >
        <BottomSheetScrollView style={styles.container}>
          {children}
        </BottomSheetScrollView>
      </BS>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 10,
  },
});
