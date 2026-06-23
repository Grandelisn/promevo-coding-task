import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLabel } from "../update-label";

export function updateLabelMutation(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateLabel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['labelsData'] });
        },
    });
}