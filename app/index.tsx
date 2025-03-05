import React from "react";
import { Redirect } from "expo-router";

type Props = {};

export default function Index({}: Props) {
  return <Redirect href={"/(app)/(home)"} />;
}
