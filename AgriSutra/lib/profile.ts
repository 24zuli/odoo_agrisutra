// lib/api/profile.ts
export interface ProfileData {
  id: number;
  name: string;
  username: string;
  email: string;
  gender?: string;
  date_of_birth?: string; // ISO format (YYYY-MM-DD)
  state: string;
  district: string;
  phone_number: string;
  profile_completed: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getProfile(): Promise<ProfileData> {
  // Get the user ID from localStorage (or your auth context)
  const id = localStorage.getItem("userId") || "1";
  const res = await fetch(`http://localhost:3001/api/profile?userId=${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }
  return res.json();
}

export async function updateProfile(data: ProfileData): Promise<ProfileData> {
  const res = await fetch("http://localhost:3001/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update profile");
  }
  return res.json();
}
