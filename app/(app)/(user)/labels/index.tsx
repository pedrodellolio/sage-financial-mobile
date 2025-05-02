import Header from "@/components/header";
import LabelItem from "@/components/lists/items/label-item";
import NoResultsText from "@/components/no-results-text";
import { Theme } from "@/constants/theme";
import { Label } from "@/models/label";
import { getLabels } from "@/services/label";
import { styles } from "@/styling";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ChevronLeft, Plus } from "lucide-react-native";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function LabelsScreen() {
  const { data, isLoading, error } = useQuery<Label[]>({
    queryKey: ["labels"],
    queryFn: () => getLabels(),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading goals</Text>;
  return (
    <View style={[styles.container]}>
      <Header
        middle={"Categorias"}
        left={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
        right={
          <TouchableOpacity
            onPress={() => router.push("/(modals)/add-label-modal")}
          >
            <Plus color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />

      {data && data.length > 0 ? (
        <FlatList
          style={{
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={(value) => (
            <TouchableOpacity
              key={value.item.id}
              style={{ marginBottom: 12 }}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/add-label-modal",
                  params: {
                    id: value.item.id,
                    value: value.item.title,
                  },
                })
              }
            >
              <LabelItem data={value.item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <NoResultsText />
      )}
    </View>
  );
}
