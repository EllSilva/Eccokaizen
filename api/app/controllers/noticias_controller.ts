import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import Noticias from '#models/noticia'

export default class NoticiasController {
  // 
  //  public async index() {
  //    const publicidade = await Noticias.query()
  //    return {
  //      message: 'Lista da publicidade',
  //      data: publicidade,
  //    }
  //  }

      //mostrar todos AS  publicacao 
    public async index() {
        const noticia = await Noticias.query().preload('medias')
        return {
            message: 'Lista da noticia',
            data: noticia,
        }
    }

    //mostrar apenas uma publicacao e os seus Comentarios 
    public async show({ params }: HttpContext) {
        const noticia = await Noticias.findOrFail(params.id)

        await noticia.load('medias')

        return {
            message: 'Lista da noticia pelo id',
            data: noticia,
        }
    }

  private validationOptions = {
    size: '2mb',
    extnames: ['jpg', 'png', 'jpeg'],
  }

  //CADASTRO DE PUBLICACAO
  public async store({ request, response, auth }: HttpContext) {
    const body = request.only(['categoria', 'titulo', 'subtitulo', 'descricao', 'imagem', 'autor'])

    try {
      //ENVIO DE IMAGEM
      const img = request.file('imagem', this.validationOptions)

      if (img) {
        const imgName = `${cuid()}.${img!.extname}`
        await img.move(app.makePath('storage/uploads'), {
          name: imgName,
        })
        body.imagem = imgName
      }

      const noticias = await Noticias.create(body)

      response.status(201)

      return {
        message: 'Nova Publicidade criada com sucesso',
        data: noticias,
      }
    } catch (error) {
      return response.unauthorized({
        error: true,
        message: 'Erro na criação , Verifique seus dados',
      })
    }
  }

  //ATUALIZA DE PUBLICACAO
  public async update({ params, request }: HttpContext) {
    const body = request.only(['categoria', 'titulo', 'subtitulo', 'descricao', 'imagem', 'autor'])
    const noticias = await Noticias.findOrFail(params.id)

    noticias.categoria = body.categoria
    noticias.titulo = body.titulo
    noticias.subtitulo = body.subtitulo
    noticias.titulo = body.titulo
    noticias.descricao = body.descricao
    noticias.autor = body.autor

    try {
      //ENVIO DE IMAGEM

      const img = request.file('imagem', this.validationOptions)

      if (noticias.imagem != body.imagem || !noticias.imagem) {
        if (img) {
          const imgName = `${cuid()}.${img!.extname}`

          await img.move(app.makePath('storage/uploads'), {
            name: imgName,
          })

          noticias.imagem = imgName
        }
      }
      await noticias.save()

      return {
        message: 'noticias Atualizado com sucesso',
        data: noticias,
      }
    } catch (error) {
      return {
        error: true,
        message: 'Erro na atualização , Verifique seus dados',
      }
    }
  }

  //eliminar publicacao
  public async destroy({ params }: HttpContext) {
    const noticias = await Noticias.findOrFail(params.id)
   await noticias.delete()
    return {
      message: 'noticias excluido com sucesso',
      data: noticias,
    }
  }


}
