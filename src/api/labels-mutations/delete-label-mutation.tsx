import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteLabel } from "../delete-label";

export function deleteLabelMutation(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteLabel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] });
        },
    });
}