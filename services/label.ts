import { AddLabelFormData } from "@/schemas/add-label-schema";
import api from "./axios-config";
import { Label } from "@/models/label";
import { AxiosRequestConfig } from "axios";

export interface AddLabelDto {
  title: string;
}

export async function getLabels(
  fromBudgetGoal: boolean,
  month?: number,
  year?: number
): Promise<Label[]> {
  try {
    const params: Record<string, any> = {};
    if (month) params.month = month;
    if (year) params.year = year;
    params.fromBudgetGoal = fromBudgetGoal;
    const config: AxiosRequestConfig = {
      params: params,
    };

    const response = await api.get<Label[]>(`label/all`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}

export async function postLabel(label: AddLabelFormData) {
  try {
    return await api.post<Label>(`label`, label);
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
}

export async function deleteLabel(labelId: string) {
  try {
    return await api.delete<Label>(`labe`);
  } catch (error) {
    console.error("Error deleting labels:", error);
    throw error;
  }
}
