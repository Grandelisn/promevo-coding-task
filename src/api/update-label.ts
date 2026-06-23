import type { LabelPayload } from './post-label';

const apiUrl = import.meta.env.VITE_LABELS_API_URL;

export async function updateLabel(
    payload: LabelPayload
): Promise<LabelPayload> {
    const response = await fetch(`${apiUrl}/me/labels/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to update label');
    }

    return response.json();
}