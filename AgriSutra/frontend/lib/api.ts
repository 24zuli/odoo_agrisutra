import { API_BASE_URL } from "./constants";

export interface Scheme {
  id: string;
  name: string;
  details: string;
  benefits: string[];
  eligibility: string[];
  youtube_link: string;
  registration_link: string;
}

export const fetchSchemes = async (): Promise<Scheme[]> => {
  const res = await fetch(`${API_BASE_URL}/api/schemes`, {});
  if (!res.ok) {
    throw new Error("Failed to fetch schemes");
  }
  return res.json();
};

export const fetchSchemeById = async (id: string): Promise<Scheme> => {
  const res = await fetch(`${API_BASE_URL}/api/schemes/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch scheme");
  }
  return res.json();
};
