import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Media from './media.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class Noticia extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoria: string

  @column()
  declare titulo: string

  @column()
  declare subtitulo: string

  @column()
  declare descricao: string

  @column()
  declare imagem: string

   @column()
  declare autor: string

  @hasMany(() => Media)
  declare medias: HasMany<typeof Media> 
 
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

 