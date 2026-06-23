import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { postLabel } from "../post-label";

export function addLabelMutation() {
    const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationFn: postLabel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] });
        },
    });
}