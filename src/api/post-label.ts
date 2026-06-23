export interface LabelPayload {
	id: string;
	labelListVisibility: string;
	messageListVisibility: string;
	messagesTotal: number;
	messagesUnread: number;
	name: string;
	threadsTotal: number;
	threadsUnread: number;
	type: string;
}

const apiUrl = import.meta.env.VITE_LABELS_API_URL;

export async function postLabel(label: LabelPayload): Promise<LabelPayload> {
    const response = await fetch(`${apiUrl}/me/labels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(label),
    });
    return await response.json();
}