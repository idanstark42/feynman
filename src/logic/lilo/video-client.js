export async function getVideoUploadURL (stytch) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/video/upload-url`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${stytch.session.getTokens().session_token}` }
  })
  const json = await response.json()
  return json.url
}

export async function getVideoTokens (playbackId) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/video/signingkey/${playbackId}`, {
    method: 'GET'
  })
  const json = await response.json()
  return json.tokens
}
