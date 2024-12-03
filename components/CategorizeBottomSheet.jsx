import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetFlashList,
} from "@gorhom/bottom-sheet";
import { useGlobalContext } from "@/context/context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const CategorizeBottomSheet = ({
  bottomSheetModalRef,
  handlePresentModal,
  isModalOpen,
  setIsModalOpen,
}) => {
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );

  const { getCategories } = useGlobalContext();
  const [options, setOptions] = useState(null);

  // callbacks

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
      </View>
    ),
    []
  );

  useEffect(() => {
    (async () => {
      handlePresentModal();
      const options = await getCategories();
      console.log("optiones", options);
      setOptions(options);
    })();
  }, []);
  // renders
  return (
    <GestureHandlerRootView style={[styles.container]}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
          snapPoints={["50%", "100%"]}
          backgroundStyle={{ borderRadius: 30 }}
          onDismiss={() => {
            setIsModalOpen(false);
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>

            <BottomSheetFlashList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              estimatedItemSize={43}
              estimatedListSize={{ height: 1000, width: 600 }}
              ListFooterComponent={() => {
                return (
                  <View className="p-3 bg-green-300 m-4 rounded-full mb-10">
                    <Text>footer</Text>
                  </View>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.4)",
    position: "absolute",
    inset: 0,
    height: "100%",
  },
  containerVisible: { display: "flex" },
  containerInvisible: { display: "none" },
  contentContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default CategorizeBottomSheet;
