import type { GmailLabel } from '../types/gmail-label';

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

export async function getLabels(): Promise<{ labels: GmailLabel[] }> {
	const response = await fetch(`${apiUrl}/me/labels`);
	return await response.json();
}

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

export async function deleteLabel(id: string) {
	const response = await fetch(`${apiUrl}/me/labels/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) throw new Error('Network response failed');
	if (response.status === 204) return null;
	return await response.json();
}

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
