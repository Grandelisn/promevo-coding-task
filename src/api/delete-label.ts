const apiUrl = import.meta.env.VITE_LABELS_API_URL;

export async function deleteLabel(id: string) {
    const response = await fetch(`${apiUrl}/me/labels/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response failed');
    if (response.status === 204) return null;
    return await response.json();
}