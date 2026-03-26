import { cuid } from '@adonisjs/core/helpers';
import app from '@adonisjs/core/services/app';
import Noticias from '#models/noticia';
export default class NoticiasController {
    async index() {
        const noticia = await Noticias.query().preload('medias');
        return {
            message: 'Lista da noticia',
            data: noticia,
        };
    }
    async show({ params }) {
        const noticia = await Noticias.findOrFail(params.id);
        await noticia.load('medias');
        return {
            message: 'Lista da noticia pelo id',
            data: noticia,
        };
    }
    validationOptions = {
        size: '2mb',
        extnames: ['jpg', 'png', 'jpeg'],
    };
    async store({ request, response, auth }) {
        const body = request.only(['categoria', 'titulo', 'subtitulo', 'descricao', 'imagem', 'autor']);
        try {
            const img = request.file('imagem', this.validationOptions);
            if (img) {
                const imgName = `${cuid()}.${img.extname}`;
                await img.move(app.makePath('storage/uploads'), {
                    name: imgName,
                });
                body.imagem = imgName;
            }
            const noticias = await Noticias.create(body);
            response.status(201);
            return {
                message: 'Nova Publicidade criada com sucesso',
                data: noticias,
            };
        }
        catch (error) {
            return response.unauthorized({
                error: true,
                message: 'Erro na criação , Verifique seus dados',
            });
        }
    }
    async update({ params, request }) {
        const body = request.only(['categoria', 'titulo', 'subtitulo', 'descricao', 'imagem', 'autor']);
        const noticias = await Noticias.findOrFail(params.id);
        noticias.categoria = body.categoria;
        noticias.titulo = body.titulo;
        noticias.subtitulo = body.subtitulo;
        noticias.titulo = body.titulo;
        noticias.descricao = body.descricao;
        noticias.autor = body.autor;
        try {
            const img = request.file('imagem', this.validationOptions);
            if (noticias.imagem != body.imagem || !noticias.imagem) {
                if (img) {
                    const imgName = `${cuid()}.${img.extname}`;
                    await img.move(app.makePath('storage/uploads'), {
                        name: imgName,
                    });
                    noticias.imagem = imgName;
                }
            }
            await noticias.save();
            return {
                message: 'noticias Atualizado com sucesso',
                data: noticias,
            };
        }
        catch (error) {
            return {
                error: true,
                message: 'Erro na atualização , Verifique seus dados',
            };
        }
    }
    async destroy({ params }) {
        const noticias = await Noticias.findOrFail(params.id);
        await noticias.delete();
        return {
            message: 'noticias excluido com sucesso',
            data: noticias,
        };
    }
}
//# sourceMappingURL=noticias_controller.js.map