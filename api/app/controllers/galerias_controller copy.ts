import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import Galeria from '#models/galeria'


export default class GaleriasController {

  public async index({ }: HttpContext) {
    const galeria = await Galeria.all()
    return galeria
  }

  private validationOptions = {
    types: ['image'],
    size: '2mb',
  }



  public async store({ request, params, response }: HttpContext) {
    try {
      // Obter apenas os campos necessários
      const body = request.only(['titulo', 'imagem'])

      // Verificar e tratar a imagem enviada
      const imagens = request.file('imagem', this.validationOptions)

      if (imagens) {
        const imagemName = `${cuid()}.${imagens.extname}`

        await imagens.move(app.makePath('storage/uploads'), {
          name: imagemName,
        })
        console.log("olaaaa")
        body.imagem = imagemName
      }
      console.log("olaaaa")
      // Criar o registro de Galeria
      const galeria = await Galeria.create(body)

      return response.status(201).json({
        message: 'Nova Galeria criada com sucesso',
        data: galeria,
      })
    } catch (error) {
      console.error(error)
      return response.status(400).json({
        error: true,
        message: error + 'Erro na criação, verifique seus dados.',
      })
    }
  }

  public async show({ request }: HttpContext) {
    const galeria_id = request.param('id')
    const galeria = await Galeria.find(galeria_id)
    return galeria
  }






  public async destroy({ request }: HttpContext) {
    const galeria_id = request.param('id')
    const galeria = await Galeria.findOrFail(galeria_id)
    await galeria.delete()
    return 'Comentario eliminado'
  }
}
