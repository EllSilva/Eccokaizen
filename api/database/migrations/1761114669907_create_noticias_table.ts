import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'noticias'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('categoria').notNullable()
      table.string('titulo').notNullable()
      table.string('subtitulo').notNullable()
      table.string('descricao').notNullable()
      table.string('imagem').notNullable()
      table.string('autor').notNullable() 
        table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
