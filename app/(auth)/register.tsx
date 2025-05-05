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
import { signInWithEmail, signUpWithEmail } from "@/services/auth";
import { Link, router } from "expo-router";
import { RegisterFormData, registerSchema } from "@/schemas/register-schema";

type Props = {};

export default function RegisterScreen({}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await signUpWithEmail(data.email, data.password);
    router.replace("/(auth)/login");
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
          Seja bem vindo
        </Text>
        <Text style={[styles.text, { color: Theme.colors.secondary }]}>
          Crie uma conta para acompanhar sua movimentação
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
          title="Criar conta"
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
          Já possui uma conta?{" "}
          <Link href={"/(auth)/login"} style={{ color: Theme.colors.primary }}>
            Entrar
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
