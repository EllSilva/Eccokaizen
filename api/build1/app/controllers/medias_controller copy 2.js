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
            const body = request.only(['url', 'img', 'noticiaId',]);
            const noticiaId = 3;
            console.log('PARAMS RECEBIDOS:', params);
            const noticia = await Noticia.findOrFail(noticiaId);
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
    async update({ request }) {
        const media_id = request.param('id');
        const body = request.only(['url', 'img']);
        const media = await Media.find(media_id);
        await media?.merge(body).save();
        return media;
    }
    async destroy({ request }) {
        const media_id = request.param('id');
        const media = await Media.findOrFail(media_id);
        await media.delete();
        return 'Comentario eliminado';
    }
}
//# sourceMappingURL=medias_controller%20copy%202.js.map