import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile, AgeRange, ProfileSensitivity } from '@/types';

const SCHEMA_VERSION = 1;

interface ProfileStore {
  profile: UserProfile;
  setAgeRange: (range: AgeRange) => void;
  toggleSensitivity: (s: ProfileSensitivity) => void;
}

const defaultProfile: UserProfile = {
  childAgeRange: undefined,
  sensitivities: [],
  schemaVersion: SCHEMA_VERSION,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: defaultProfile,

      setAgeRange: (range) =>
        set((state) => ({
          profile: { ...state.profile, childAgeRange: range },
        })),

      toggleSensitivity: (s) =>
        set((state) => {
          const has = state.profile.sensitivities.includes(s);
          return {
            profile: {
              ...state.profile,
              sensitivities: has
                ? state.profile.sensitivities.filter((x) => x !== s)
                : [...state.profile.sensitivities, s],
            },
          };
        }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
