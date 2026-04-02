import { authApi } from "@/lib/api-module";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useToast from '@/contexts/toast-context';

export const useSessions = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const response = await authApi.getSessions();
      return response;
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async (sessionId: string) => {
      await authApi.logout(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast({ title: "Session terminated successfully." });
    },
    onError: () => {
      toast({ title: "Could not terminate session.", type: "error" });
    },
  });

  return {
    sessions,
    isLoading,
    revokeSession: revokeMutation.mutate,
  };
};
