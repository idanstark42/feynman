import DatabaseClient from './database-client'

export default class CollectionDatabaseClient extends DatabaseClient {
  async init () {
    const { createIfEmpty } = this.settings
    const projection = this.settings.protectedFields ? this.settings.protectedFields.reduce((acc, field) => ({ ...acc, [field]: 0 }), {}) : undefined
    return await this.read({ projection }).then(data => {
      if (!data.length && createIfEmpty) {
        return this.create({}).then(() => this.read())
      }
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