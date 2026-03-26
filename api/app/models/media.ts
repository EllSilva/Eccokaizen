import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Noticia from './noticia.js'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare img: string

  @column()
  declare noticiaId: number

  @belongsTo(() => Noticia)
  declare noticia: BelongsTo<typeof Noticia>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
