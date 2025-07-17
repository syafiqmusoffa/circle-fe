import api from "@/utils/api";
import { SuggestedUserType } from "@/types/suggested-profile";

export async function fetchUser(name: string): Promise<SuggestedUserType[]> {
  try {
    const res = await api.get(`/api/search?q=${name}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
