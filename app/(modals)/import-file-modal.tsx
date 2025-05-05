import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react-native";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import {
  ImportFileFormData,
  importFileSchema,
} from "@/schemas/import-file-schema";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import DropdownTransactionColInput from "@/components/dropdowns/dropdown-transaction-col-input";
import Toast from "react-native-toast-message";
import { importFile } from "@/services/files";

export const transactionProps = [
  { prop: "Título", required: true },
  { prop: "Tipo", required: true },
  { prop: "Valor", required: true },
  { prop: "Data", required: true },
  { prop: "Categoria", required: false },
];

export interface MappedColumn {
  fileIndex: number;
  value: { prop: string; required: boolean };
}

export default function ImportFileModal() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ImportFileFormData>({
    resolver: zodResolver(importFileSchema),
  });

  const [mappedColumns, setMappedColumns] = useState<MappedColumn[]>([]);
  const [fileFirstRow, setFileFirstRow] = useState<string[]>([]);
  const [showOptionalMapping, setShowOptionalMapping] =
    useState<boolean>(false);
  const [fileContent, setFileContent] = useState<string | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: ({
      data,
      content,
    }: {
      data: ImportFileFormData;
      content: string;
    }) => importFile(data, mappedColumns, content),
    onSuccess: () => {
      router.replace("/(app)/(user)/profiles");
    },
  });

  const onSubmit = async (data: ImportFileFormData) => {
    const mappedRequiredColumns = mappedColumns.filter(
      (m) => m.value.required
    ).length;
    const totalRequiredColumns = transactionProps.filter(
      (m) => m.required
    ).length;
    if (mappedRequiredColumns != totalRequiredColumns) {
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Preencha todas as colunas obrigatórias.",
      });
    }

    if (!fileContent)
      Toast.show({
        type: "error",
        text1: "Ops!",
        text2: "Ocorreu um erro ao converter o arquivo.",
      });

    fileContent && mutateAsync({ data, content: fileContent });
  };

  const fileUploaded = watch("file");
  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: false,
        type: "text/comma-separated-values",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setMappedColumns([]);
        setFileFirstRow([]);
        setFileContent(null);
        const successResult =
          result as DocumentPicker.DocumentPickerSuccessResult;
        const fileResult = successResult.assets[0];
        const fileContents = await FileSystem.readAsStringAsync(
          fileResult.uri,
          {
            encoding: FileSystem.EncodingType.UTF8,
          }
        );
        const base64 = stringToBase64(fileContents);
        const numColumns = await readNumberOfColumnsCSV(fileContents);

        setFileContent(base64);
        setValue("file", {
          name: fileResult.name,
          size: fileResult.size ?? 0,
          numColumns: numColumns ?? 0,
        });
      }
    } catch (error) {
      console.log("Error picking documents:", error);
    }
  };

  const stringToBase64 = (fileContent: string) => {
    return btoa(unescape(encodeURIComponent(fileContent)));
  };

  const readNumberOfColumnsCSV = async (fileContent: string) => {
    try {
      console.log(fileContent);
      const rows = fileContent.split(/\r?\n/);
      setFileFirstRow(rows[1].split(";"));
      return rows[0].split(";").length;
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleColumnMapping = (
    fileIndex: number,
    value: { prop: string; required: boolean }
  ) => {
    setMappedColumns((prevState) => {
      const index = prevState.findIndex((item) => item.fileIndex === fileIndex);
      if (index !== -1) {
        // Update existing item
        const updated = [...prevState];
        updated[index] = { ...updated[index], value };
        return updated;
      } else {
        // Insert new item
        return [...prevState, { fileIndex, value }];
      }
    });
  };

  console.log(mappedColumns);
  return (
    <View style={[styles.container, { flex: 1 }]}>
      <Header
        middle="Importar"
        left={
          <TouchableOpacity
            onPress={() => router.replace("/(app)/(user)/import")}
          >
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <TouchableOpacity
          style={[
            styles.outlineButton,
            {
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            },
          ]}
          onPress={handleFilePick}
        >
          <Upload color={Theme.colors.white} />
          <Text style={[styles.text, { fontWeight: 600 }]}>
            {fileUploaded ? fileUploaded.name : "Escolha um arquivo..."}
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.text,
            { color: Theme.colors.secondary, fontSize: Theme.typography.sm },
          ]}
        >
          Escolha apenas arquivos .csv de até 5 MB.
        </Text>
        {errors.file && <Text>{errors.file.message}</Text>}
      </View>
      {fileUploaded && (
        <ScrollView>
          <View>
            <Text
              style={[
                styles.text,
                {
                  fontSize: Theme.typography.lg,
                  fontWeight: 600,
                  marginBottom: 20,
                },
              ]}
            >
              Colunas obrigatórias
            </Text>
            {transactionProps.map((prop, i) => {
              if (!prop.required) return;
              return (
                <View key={i} style={{ marginBottom: 30 }}>
                  <View
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Text style={styles.text}>Coluna {i + 1}</Text>
                    <ArrowRight color={Theme.colors.white} />
                    <DropdownTransactionColInput
                      style={{ height: 48 }}
                      onChange={(value) => handleColumnMapping(i + 1, value)}
                    />
                  </View>
                  <Text
                    style={[
                      styles.text,
                      {
                        marginTop: 8,
                        color: Theme.colors.secondary,
                        fontSize: Theme.typography.sm,
                      },
                    ]}
                  >
                    Valores encontrados: "{fileFirstRow[i]}"
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => setShowOptionalMapping((prevState) => !prevState)}
              style={[styles.row, { gap: 10, marginBottom: 20 }]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: Theme.typography.lg,
                    fontWeight: 600,
                  },
                ]}
              >
                Colunas Opcionais
              </Text>
              {showOptionalMapping ? (
                <ChevronDown color={Theme.colors.white} size={18} />
              ) : (
                <ChevronRight color={Theme.colors.white} size={18} />
              )}
            </TouchableOpacity>
            {showOptionalMapping &&
              transactionProps.map((prop, i) => {
                if (prop.required) return;
                return (
                  <View key={i} style={{ marginBottom: 30 }}>
                    <View
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 20,
                      }}
                    >
                      <Text style={styles.text}>Coluna {i + 1}</Text>
                      <ArrowRight color={Theme.colors.white} />
                      <DropdownTransactionColInput
                        style={{ height: 48 }}
                        onChange={(value) => handleColumnMapping(i + 1, value)}
                      />
                    </View>
                    <Text
                      style={[
                        styles.text,
                        {
                          marginTop: 8,
                          color: Theme.colors.secondary,
                          fontSize: Theme.typography.sm,
                        },
                      ]}
                    >
                      Valores encontrados: "{fileFirstRow[i]}"
                    </Text>
                  </View>
                );
              })}
          </View>
        </ScrollView>
      )}

      <View style={[{ display: "flex", flexDirection: "row", gap: 20 }]}>
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
            Importar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
