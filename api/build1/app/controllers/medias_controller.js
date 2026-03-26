import app from '@adonisjs/core/services/app';
import { cuid } from '@adonisjs/core/helpers';
import Media from '#models/media';
import Noticia from '#models/noticia';
export default class MediasController {
    async index({}) {
        const media = await Media.all();
        return media;
    }
    validationOptions = {
        types: ['image'],
        size: '2mb',
    };
    async store({ request, params, response }) {
        try {
            const body = request.only(['url', 'img', 'noticiaId']);
            const noticiaId = body.noticiaId;
            const noticia = await Noticia.find(noticiaId);
            if (!noticia) {
                return response.status(404).json({
                    error: true,
                    message: `Notícia com ID ${noticiaId} não encontrada.`,
                });
            }
            console.log('MOSTRA O ID:', noticia.id);
            body.noticiaId = noticia.id;
            const imagem = request.file('img', this.validationOptions);
            if (imagem) {
                const imagemName = `${cuid()}.${imagem.extname}`;
                await imagem.move(app.makePath('storage/uploads'), {
                    name: imagemName,
                });
                body.img = imagemName;
            }
            const media = await Media.create(body);
            return response.status(201).json({
                message: 'Nova Media criada com sucesso',
                data: media,
            });
        }
        catch (error) {
            console.error(error);
            return response.status(400).json({
                error: true,
                message: 'Erro na criação, verifique seus dados.',
            });
        }
    }
    async show({ request }) {
        const media_id = request.param('id');
        const media = await Media.find(media_id);
        return media;
    }
    async update({ params, request }) {
        try {
            const body = request.only(['url']);
            const media = await Media.findOrFail(params.id);
            media.url = body.url;
            const img = request.file('img', this.validationOptions);
            if (img) {
                const imgName = `${cuid()}.${img.extname}`;
                await img.move(app.makePath('storage/uploads'), {
                    name: imgName,
                    overwrite: true,
                });
                media.img = imgName;
            }
            await media.save();
            return {
                message: 'Media atualizado com sucesso',
                data: media,
            };
        }
        catch (error) {
            console.error(error);
            return {
                error: true,
                message: 'Erro na atualização. Verifique os dados enviados.',
            };
        }
    }
    async destroy({ request }) {
        const media_id = request.param('id');
        const media = await Media.findOrFail(media_id);
        await media.delete();
        return 'Comentario eliminado';
    }
}
//# sourceMappingURL=medias_controller.js.map