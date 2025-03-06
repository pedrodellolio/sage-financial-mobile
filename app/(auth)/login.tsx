import { Theme } from "@/constants/theme";
import { LoginFormData, loginSchema } from "@/schemas/login-schema";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signInWithEmail } from "@/services/auth";
import { Link, router } from "expo-router";

type Props = {};

export default function Index({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await signInWithEmail(data.email, data.password);
    router.replace("/(app)/(home)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginBottom: 10,
        }}
      >
        <Text
          style={[
            styles.text,
            { fontWeight: 800, fontSize: Theme.typography["2xl"] },
          ]}
        >
          Bem vindo de volta
        </Text>
        <Text style={[styles.text, { color: Theme.colors.secondary }]}>
          Entre para acompanhar sua movimentação
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 28,
        }}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {/* <Text className="text-gray-300">Email</Text> */}
              <TextInput
                style={[styles.input, errors.email && styles.errorInput]}
                placeholder="Digite seu email"
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={Theme.colors.secondary}
              />
            </View>
          )}
        />
        {errors.email && <Text>{errors.email.message}</Text>}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {/* <Text className="text-gray-300">Senha</Text> */}
              <TextInput
                style={[styles.input, errors.password && styles.errorInput]}
                placeholder="Digite sua senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={Theme.colors.secondary}
              />
            </View>
          )}
        />
        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}
        <Button
          color={Theme.colors.primary}
          onPress={handleSubmit(onSubmit)}
          title="Login"
        />
        <Text
          style={[
            styles.text,
            {
              textAlign: "center",
              fontSize: Theme.typography.md,
              color: Theme.colors.secondary,
            },
          ]}
        >
          Não possui uma conta?{" "}
          <Link href={"/(auth)/register"} style={{ color: Theme.colors.primary }}>
            Crie uma
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    padding: 28,
    paddingTop: 80,
    gap: 28,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 8,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
    color: Theme.colors.white,
  },
  errorInput: {
    borderColor: "red",
  },
  text: {
    color: Theme.colors.white,
    fontSize: Theme.typography.md,
    fontWeight: 400,
  },
});
