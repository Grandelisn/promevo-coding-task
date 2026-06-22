const apiUrl = import.meta.env.VITE_LABELS_API_URL;

export async function getLabels() {
    
  const response = await fetch(`${apiUrl}/me/labels`);
  return await response.json();
 
}