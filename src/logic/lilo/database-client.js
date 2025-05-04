export default class DatabaseClient {
  constructor(stytch, name, settings) {
    this.stytch = stytch
    this.name = name
    this.settings = settings
    this.options = Object.assign({}, settings.options || {})
  }

  async request(action, data={}, filter={}, options={}) {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/database`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ action, collection: this.settings.collection, data, filter, options })
      })
      const json = await response.json()
      return json.result
    } catch (error) {
      if (error.status === 401) {
        window.location.href = `${window.location.origin}${this.settings.unAuthRedirect}`
      }
      console.error(error)
    }
  }

  get token() {
    return this.stytch?.session?.getTokens()?.session_token
  }

  get headers() {
    const headers = { 'Content-Type': 'application/json' }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    return headers
  }

  get filter() {
    switch (this.settings.filterType) {
      case 'path':
        const path = window.location.pathname.split('/')
        return { owner_id: path[path.length - 1] }
      case 'query':
        const query = new URLSearchParams(window.location.search)
        return { owner_id: query.get('id') }
      case 'element':
        const element = document.querySelector('[owner-id]')
        return { owner_id: element?.getAttribute('owner-id') }
      case 'auth':
        return { owner_id: this.stytch.user?.getInfo()?.user?.user_id }
      case 'none':
        return {}
    }
  }
}