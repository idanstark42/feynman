export default async function uploadImage (file) {
  const formData = new FormData()
  formData.append('image', file)
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/image`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${stytch.session.getTokens().session_token}` },
    body: formData
  })
  return await response.json()
}