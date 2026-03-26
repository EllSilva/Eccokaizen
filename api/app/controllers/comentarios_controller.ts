import type { HttpContext } from '@adonisjs/core/http' 
import Comentario from '#models/comentario'
import Testemunho from '#models/testemunho' 
 

export default class ComentariosController {
  public async index({}: HttpContext) {
    const comentario = await Comentario.all()
    return comentario
  }
 
  public async store({ request, params, response }: HttpContext) {
    try {
      // Obter apenas os campos necessários
      const body = request.only(['nome', 'comentario', 'estado', 'testemunhoId'])

      // Obter o ID da notícia dos parâmetros
      const testemunhoId = body.testemunhoId 

      // Verificar se a notícia existe
      const testemunho = await Testemunho.find(testemunhoId)
      if (!testemunho) {
        return response.status(404).json({
          error: true,
          message: `Notícia com ID ${testemunhoId} não encontrada.`,
        })
      }

      console.log('MOSTRA O ID:', testemunho.id)

      // Adicionar o ID ao corpo
      body.testemunhoId = testemunho.id
 
      // Criar o registro de media
      const comentario = await Comentario.create(body)

      return response.status(201).json({
        message: 'Novo Comentario criada com sucesso',
        data: comentario,
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
    const comentario_id = request.param('id')
    const comentario = await Comentario.find(comentario_id)
    return comentario
  }

  
  public async update({ params, request }: HttpContext) {
    try {
    
            // Obter apenas os campos necessários
      const body = request.only(['nome', 'comentario', 'estado', 'testemunhoId'])
      const comentario = await Comentario.findOrFail(params.id)

    
    comentario.nome = body.nome
    comentario.comentario = body.comentario
    comentario.estado = body.estado 
        

      await comentario.save()

      return {
        message: 'comentario atualizado com sucesso',
        data: comentario,
      }
    } catch (error) {
      console.error(error)
      return {
        error: true,
        message: 'Erro na atualização. Verifique os dados enviados.',
      }
    }
  }
  
  public async destroy({ request }: HttpContext) {
    const comentario_id = request.param('id')
    const comentario = await Comentario.findOrFail(comentario_id)
    await comentario.delete()
    return 'Comentario eliminado'
  }
}



