import { create } from "zustand";
import { Patient, UserProfile } from "../types";

const initialPatients: Patient[] = [
  {
    id: "p-001",
    name: "Amelia Rivera",
    age: 32,
    room: "A202",
    status: "Stable",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    condition: "Type II Diabetes",
    lastVisit: "Today, 09:20 AM",
    score: 84,
    notes: "Vital signs stable. Continue medication review.",
  },
  {
    id: "p-002",
    name: "Marcus Lee",
    age: 46,
    room: "B105",
    status: "Critical",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=256&q=80",
    condition: "Hypertension and arrhythmia",
    lastVisit: "Just now",
    score: 56,
    notes: "Monitor cardiac rhythm. Alert cardiology team.",
  },
  {
    id: "p-003",
    name: "Nina Patel",
    age: 29,
    room: "C013",
    status: "Monitoring",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80",
    condition: "Post-op recovery",
    lastVisit: "Yesterday, 03:45 PM",
    score: 72,
    notes: "Scheduled physiotherapy session at 11:30 AM.",
  },
  {
    id: "p-004",
    name: "Oscar Grant",
    age: 67,
    room: "D401",
    status: "Discharged",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
    condition: "Recovery from pneumonia",
    lastVisit: "2 days ago",
    score: 90,
    notes: "Discharged with home care support and follow-up call tomorrow.",
  },
];

type AppState = {
  user: UserProfile | null;
  authLoading: boolean;
  patients: Patient[];
  selectedPatientId: string | null;
  setUser: (user: UserProfile | null) => void;
  setAuthLoading: (loading: boolean) => void;
  setSelectedPatientId: (id: string | null) => void;
  logout: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: null,
  authLoading: true,
  patients: initialPatients,
  selectedPatientId: null,
  setUser: (user) => set({ user, authLoading: false }),
  setAuthLoading: (loading) => set({ authLoading: loading }),
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  logout: () => set({ user: null, selectedPatientId: null }),
}));
