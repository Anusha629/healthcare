export type UserProfile = {
  uid: string;
  email: string;
  displayName: string | null;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  room: string;
  status: "Stable" | "Critical" | "Monitoring" | "Discharged";
  avatar: string;
  condition: string;
  lastVisit: string;
  score: number;
  notes: string;
};
