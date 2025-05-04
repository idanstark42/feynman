import DatabaseClient from './database-client'

export default class SingletonDatabaseClient extends DatabaseClient {
  constructor(stytch, name, settings) {
    super(stytch, name, settings)
    Object.assign(this.options, { limit: 1 })
  }

  async init () {
    const { createIfEmpty } = this.settings
    return await this.read().then(data => {
      if (!data && createIfEmpty) {
        return this.create({}).then(() => this.read())
      }
      return data
    })
  }

  async read(filter={}) {
    return await this.request('read', {}, Object.assign({}, filter, this.filter), this.options).then(data => data[0])
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