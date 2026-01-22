import { create } from "zustand";

const useAppStore = create((set) => ({
  activeCity: "Mumbai",
  totalDrivers: 12450,
  activeTrips: 842,
  setActiveCity: (city) => set({ activeCity: city }),
}));

export default useAppStore;
