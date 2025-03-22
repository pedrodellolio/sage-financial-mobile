import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/models/label";
import { AddLabelFormData, addLabelSchema } from "@/schemas/add-label-schema";
import {
  deleteLabel,
  getLabelById,
  postLabel,
  updateLabel,
} from "@/services/label";

type Params = {
  id: string;
  title: string;
};

export default function AddLabelModal() {
  const params: Params = useLocalSearchParams();
  const { data, isLoading, error } = useQuery<Label>({
    queryKey: ["label", params.id],
    queryFn: () => getLabelById(params.id),
    enabled: !!params.id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<AddLabelFormData>({
    resolver: zodResolver(addLabelSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
    }
  }, [data]);

  const { mutateAsync } = useMutation({
    mutationFn: (data: AddLabelFormData) => {
      return params.id ? updateLabel(params.id, data) : postLabel(data);
    },
    onSuccess: () => {
      router.replace("/(app)/(user)/labels");
    },
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationFn: (LabelId: string) => deleteLabel(LabelId),
    onSuccess: () => {
      router.replace("/(app)/(user)/labels");
    },
  });

  const onSubmit = async (data: AddLabelFormData) => {
    mutateAsync(data);
  };

  const confirmDelete = () =>
    Alert.alert(
      "Atenção",
      "Tem certeza que deseja apagar? Essa ação não é reversível.",
      [
        {
          text: "Voltar",
          style: "cancel",
        },
        {
          text: "Apagar",
          style: "destructive",
          onPress: () => deleteAsync(params.id),
        },
      ],
      {
        userInterfaceStyle: "dark",
        cancelable: true,
      }
    );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading transaction</Text>;
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        middle="Adicionar"
        left={
          <TouchableOpacity
            onPress={() => router.replace("/(app)/(user)/labels")}
          >
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.title && styles.errorInput]}
              placeholder={"Mercado, Lazer, Saúde..."}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={Theme.colors.secondary}
            />
          )}
        />
      </View>
      <View
        style={[
          styles.footer,
          { display: "flex", flexDirection: "row", gap: 20 },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={[
              styles.text,
              {
                textAlign: "center",
                fontWeight: 800,
                fontSize: Theme.typography.md,
              },
            ]}
          >
            {params.id ? "Salvar" : "Criar"}
          </Text>
        </TouchableOpacity>
        {params.id && (
          <TouchableOpacity
            style={[styles.outlineButton, { flex: 1, borderColor: "red" }]}
            onPress={confirmDelete}
          >
            <Text
              style={[
                styles.text,
                {
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: Theme.typography.md,
                  color: "red",
                },
              ]}
            >
              Apagar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
