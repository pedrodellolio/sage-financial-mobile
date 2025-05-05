import Header from "@/components/header";
import { Theme } from "@/constants/theme";
import { styles } from "@/styling";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function ImportScreen() {
  return (
    <View style={[styles.container]}>
      <Header
        middle={"Importar"}
        left={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft color={Theme.colors.white} />
          </TouchableOpacity>
        }
      />

      <Text
        style={[
          styles.text,
          {
            fontSize: Theme.typography["2xl"],
            fontWeight: 600,
            textAlign: "left",
          },
        ]}
      >
        Já controlava suas finanças através de uma planilha?
      </Text>
      <Text style={[styles.text, { color: Theme.colors.secondary }]}>
        Traga seus dados para o sistema utilizando um arquivo no formato .csv
      </Text>
      <Text style={[styles.text, { fontWeight: 600 }]}>
        Algumas instruções:
      </Text>
      <Text style={[styles.text, { color: Theme.colors.secondary }]}>
        1. Escolha um arquivo .CSV.
      </Text>
      <Text style={[styles.text, { color: Theme.colors.secondary }]}>
        2. Todas as linhas devem ter o mesmo número de colunas
      </Text>
      <Text style={[styles.text, { color: Theme.colors.secondary }]}>
        3. Não coloque mais de uma tabela dentro da mesma planilha.
      </Text>
      <TouchableOpacity
        style={[
          styles.button,
          {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
        onPress={() =>
          router.push({
            pathname: "/(app)/(user)/import/upload",
            params: {},
          })
        }
      >
        <Text
          style={[
            styles.text,
            {
              fontWeight: 600,
            },
          ]}
        >
          Começar Importação
        </Text>
        <ChevronRight color={Theme.colors.white} />
      </TouchableOpacity>
    </View>
  );
}
