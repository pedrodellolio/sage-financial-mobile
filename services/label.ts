import { AddLabelFormData } from "@/schemas/add-label-schema";
import api from "./axios-config";
import { Label } from "@/models/label";
import { AxiosRequestConfig } from "axios";

export interface AddLabelDto {
  title: string;
}

export async function getLabels(
  fromBudgetGoal: boolean = false,
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

export async function getLabelById(labelId: string) {
  try {
    const response = await api.get<Label>(`label/${labelId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching label:", error);
    throw error;
  }
}

export async function postLabel(label: AddLabelFormData) {
  try {
    return await api.post<Label>(`label`, label);
  } catch (error) {
    console.error("Error creating labels:", error);
    throw error;
  }
}

export async function deleteLabel(labelId: string) {
  try {
    return await api.delete<Label>(`label/${labelId}`);
  } catch (error) {
    console.error("Error deleting label:", error);
    throw error;
  }
}

export async function updateLabel(labelId: string, label: AddLabelFormData) {
  try {
    return await api.put<Label>(`label`, {
      id: labelId,
      title: label.title,
    });
  } catch (error) {
    console.error("Error updating label:", error);
    throw error;
  }
}
