import DatabaseClient from './database-client'

export default class CollectionDatabaseClient extends DatabaseClient {
  async init () {
    const { createIfEmpty } = this.settings
    const loggedIn = Boolean(this.stytch.session.getTokens())
    const enrichedRecordsFilter = loggedIn ? {} : { public: true }
    const projection = this.settings.protectedFields ? this.settings.protectedFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {}) : undefined
    return await Promise.all([this.read({ projection }), this.read({ filter: enrichedRecordsFilter })]).then(([data, enrichment]) => {
      if (!data.length && createIfEmpty) {
        return this.create({}).then(() => this.read())
      }
      data.forEach(datum => Object.assign(datum, enrichment.find(entry => entry._id === datum._id) || {}))
      return data
    })
  }

  async read({ filter=undefined, projection=undefined } = {}) {
    return await this.request('read', {}, Object.assign({}, filter, this.filter), projection ? { ...this.options, projection } : this.options)
  }

  async update(filter, data) {
    return await this.request('update', data, Object.assign({}, filter, this.filter), this.options)
  }

  async delete(filter) {
    return await this.request('delete', {}, Object.assign({}, filter, this.filter), this.options)
  }

  async create(data) {
    return await this.request('create', data, {}, this.options)
  }
}