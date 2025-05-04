import DatabaseClient from './database-client'

export default class CollectionDatabaseClient extends DatabaseClient {
  async init () {
    const { createIfEmpty } = this.settings
    return await this.read().then(data => {
      if (!data.length && createIfEmpty) {
        return this.create({}).then(() => this.read())
      }
      return data
    })
  }

  async read(filter) {
    return await this.request('read', {}, Object.assign({}, filter, this.filter), this.options)
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