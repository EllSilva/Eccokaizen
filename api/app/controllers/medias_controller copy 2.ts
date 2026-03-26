import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import Media from '#models/media'
import Noticia from '#models/noticia'
import { createMediaValidator } from '#validators/media'


export default class MediasController {
  public async index({ }: HttpContext) {
    const media = await Media.all()
    return media
  }

  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }



  public async store({ request, params, response }: HttpContext) {
    try {
      // Obter apenas os campos necessários
      const body = request.only(['url', 'img', 'noticiaId',])

      // Obter o ID da notícia dos parâmetros
      const noticiaId = 3
      console.log('PARAMS RECEBIDOS:', params)

      // Verificar se a notícia existe
      const noticia = await Noticia.findOrFail(noticiaId)

      console.log('MOSTRA O ID:', noticia.id)

      // Adicionar o ID ao corpo
      body.noticiaId = noticia.id

      // Verificar e tratar a imagem enviada
      const imagem = request.file('img', this.validationOptions)

      if (imagem) {
        const imagemName = `${cuid()}.${imagem.extname}`

        await imagem.move(app.makePath('storage/uploads'), {
          name: imagemName,
        })

        body.img = imagemName
      }

      // Criar o registro de media
      const media = await Media.create(body)

      return response.status(201).json({
        message: 'Nova Media criada com sucesso',
        data: media,
      })
    } catch (error) {
      console.error(error)
      return response.status(400).json({
        error: true,
        message: 'Erro na criação, verifique seus dados.',
      })
    }
  }


  public async show({ request }: HttpContext) {
    const media_id = request.param('id')
    const media = await Media.find(media_id)
    return media
  }

  public async update({ request }: HttpContext) {
    const media_id = request.param('id')
    const body = request.only(['url', 'img'])
    const media = await Media.find(media_id)
    await media?.merge(body).save()

    return media
  }

  public async destroy({ request }: HttpContext) {
    const media_id = request.param('id')
    const media = await Media.findOrFail(media_id)
    await media.delete()
    return 'Comentario eliminado'
  }
}
