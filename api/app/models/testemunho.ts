import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

import Comentario from './comentario.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class Testemunho extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descricao: string

  @column()
  declare imagem: string

  @column()
  declare autor: string

  @column()
  declare estado: string

  @hasMany(() => Comentario)
  declare comentarios: HasMany<typeof Comentario>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}