import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();
  const queryClient = useQueryClient();

  const syncUserMutation = useMutation({
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response: any) => {
      console.log("User synced successfully:", response.data.user);
      // Invalidate the authUser query so useCurrentUser refetches
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => console.error("User sync failed:", error),
  });

  // auto-sync user when signed in
  useEffect(() => {
    // if user is signed in and user is not synced yet, sync user
    if (isSignedIn && !syncUserMutation.data && !syncUserMutation.isPending) {
      syncUserMutation.mutate();
    }
  }, [isSignedIn]);

  return {
    isSyncing: syncUserMutation.isPending,
    isSynced: !!syncUserMutation.data,
    syncError: syncUserMutation.error,
  };
};
