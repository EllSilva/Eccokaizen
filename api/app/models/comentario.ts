import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Testemunho from './testemunho.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Comentario extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare nome: string

  @column()
  declare comentario: string

  @column()
  declare estado: string

  @column()
  declare testemunhoId: number

  @belongsTo(() => Testemunho)
  declare testemunho: BelongsTo<typeof Testemunho>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}