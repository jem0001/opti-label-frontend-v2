import CategorizeBottomSheet from "@/components/CategorizeBottomSheet";
import { useGlobalContext } from "../../context/context.jsx";
import ConnectionError from "../../components/ConnectionError.jsx";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title:
      "First Item aswd asd asfucking shitFirst Item aswd asd asfucking shitFirst Item aswd asd asfucking First Item aswd asd asfucking shitFirst Item aswd asd asfucking shit",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "1a2d3b4c-5d6e-7f8g-9h0i-j1k2l3m4n5o6",
    title: "First Item",
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-j0k1l2m3n4o5p6",
    title: "Second Item",
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-k1l2m3n4o5p6q7",
    title: "Third Item",
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-l2m3n4o5p6q7r8",
    title: "First Item",
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-m3n4o5p6q7r8s9",
    title: "Second Item",
  },
  {
    id: "6f7g8h9i-0j1k-2l3m-n4o5p6q7r8s9t0",
    title: "Third Item",
  },
  {
    id: "7g8h9i0j-1k2l-3m4n-o5p6q7r8s9t0u1",
    title: "First Item",
  },
  {
    id: "8h9i0j1k-2l3m-4n5o-p6q7r8s9t0u1v2",
    title: "Second Item",
  },
  {
    id: "9i0j1k2l-3m4n-5o6p-q7r8s9t0u1v2w3",
    title: "Third Item",
  },
  {
    id: "0j1k2l3m-4n5o-6p7q-r8s9t0u1v2w3x4",
    title: "First Item",
  },
  {
    id: "1k2l3m4n-5o6p-7q8r-s9t0u1v2w3x4y5",
    title: "Second Item",
  },
  {
    id: "2l3m4n5o-6p7q-8r9s-t0u1v2w3x4y5z6",
    title: "Third Item",
  },
  {
    id: "3m4n5o6p-7q8r-9s0t-u1v2w3x4y5z6a7",
    title: "First Item",
  },
  {
    id: "4n5o6p7q-8r9s-0t1u-v2w3x4y5z6a7b8",
    title: "Second Item",
  },
  {
    id: "5o6p7q8r-9s0t-1u2v-w3x4y5z6a7b8c9",
    title: "Third Item",
  },
  {
    id: "6p7q8r9s-0t1u-2v3w-x4y5z6a7b8c9d0",
    title: "First Item",
  },
  {
    id: "7q8r9s0t-1u2v-3w4x-y5z6a7b8c9d0e1",
    title: "Second Item",
  },
  {
    id: "8r9s0t1u-2v3w-4x5y-z6a7b8c9d0e1f2",
    title: "Third Item",
  },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      id: uuidv4(),
      title: `blank-${numberOfElementsLastRow}`,
      empty: true,
    });
    numberOfElementsLastRow++;
  }

  return data;
};
const Categorize = () => {
  const { getCategories } = useGlobalContext();
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bottomSheetModalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setIsModalOpen(true);
  }, []);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    console.log("getting cat");
    // Simulate a network request or some async operation
    const categories = await getCategories();
    setCategories(categories);
    setRefreshing(false);
  };

  const rendererItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handlePresentModal();
        }}
        className={`bg-white flex-1 justify-center items-center m-2 p-1 min-h-[100] rounded-md shadow-slate-500 shadow-2xl 
         ${item.empty && "invisible"}`}
      >
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const categories = await getCategories();
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"black"} />
      </View>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      // <View className="flex-1 justify-center items-center">
      <ScrollView
        refreshing={refreshing}
        onRefresh={onRefresh}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100%",
        }}
      >
        <ConnectionError onPress={onRefresh} />
      </ScrollView>
      // </View>
    );
  }

  return (
    <View className="flex-1 ">
      <View className=" flex-1">
        <FlatList
          data={formatData(categories, 2)}
          renderItem={rendererItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 2,
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
      {isModalOpen && (
        <CategorizeBottomSheet
          bottomSheetModalRef={bottomSheetModalRef}
          handlePresentModal={handlePresentModal}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </View>
  );
};
export default Categorize;
