import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import Testemunho from '#models/testemunho'

export default class TestemunhosController {
  // 
  //  public async index() {
  //    const publicidade = await Testemunho.query()
  //    return {
  //      message: 'Lista da publicidade',
  //      data: publicidade,
  //    }
  //  }

      //mostrar todos AS  testemunho 
    public async index() {
        const testemunho = await Testemunho.query().preload('comentarios')
        return {
            message: 'Lista da testemunho',
            data: testemunho,
        }
    }

    //mostrar apenas uma testemunho e os seus Comentarios 
    public async show({ params }: HttpContext) {
        const testemunho = await Testemunho.findOrFail(params.id)

        await testemunho.load('comentarios')

        return {
            message: 'Lista da testemunho pelo id',
            data: testemunho,
        }
    }

  private validationOptions = {
    size: '2mb',
    extnames: ['jpg', 'png', 'jpeg'],
  }

  //CADASTRO DE Testemunho
  public async store({ request, response, auth }: HttpContext) {
    const body = request.only(['titulo', 'descricao', 'imagem', 'autor', 'estado'])

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

      const testemunho = await Testemunho.create(body)

      response.status(201)

      return {
        message: 'Nova Testemunho criada com sucesso',
        data: testemunho,
      }
    } catch (error) {
      return response.unauthorized({
        error: true,
        message: 'Erro na criação , Verifique seus dados',
      })
    }
  }

  //ATUALIZA DE Testemunho
  public async update({ params, request }: HttpContext) {
    const body = request.only(['titulo', 'descricao', 'imagem', 'autor', 'estado'])
    const testemunhos = await Testemunho.findOrFail(params.id)
 
    testemunhos.titulo = body.titulo
    testemunhos.descricao = body.descricao
    testemunhos.imagem = body.imagem
    testemunhos.autor = body.autor
    testemunhos.estado = body.estado

    try {
      //ENVIO DE IMAGEM

      const img = request.file('imagem', this.validationOptions)

      if (testemunhos.imagem != body.imagem || !testemunhos.imagem) {
        if (img) {
          const imgName = `${cuid()}.${img!.extname}`

          await img.move(app.makePath('storage/uploads'), {
            name: imgName,
          })

          testemunhos.imagem = imgName
        }
      }
      await testemunhos.save()

      return {
        message: 'testemunhos Atualizado com sucesso',
        data: testemunhos,
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
    const testemunhos = await Testemunho.findOrFail(params.id)
   await testemunhos.delete()
    return {
      message: 'testemunhos excluido com sucesso',
      data: testemunhos,
    }
  }


}
