/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router' 
import app from '@adonisjs/core/services/app'
import User from '#models/user'
import Noticias from '#models/noticia'
import { middleware } from '#start/kernel'
import MediasController from '#controllers/medias_controller'
const UsersControllers = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const NoticiaController = () => import('#controllers/noticias_controller')
import TestemunhoController from '#controllers/testemunhos_controller'
import ComentarioController from '#controllers/comentarios_controller'
 

 router.post('users/:id/tokens', async ({ params }) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(user)

  return {
    type: 'bearer',
    value: token.value!.release(),
  }
  return token
})
 

router.post('session', [SessionController, 'store'])
router.delete('session', [SessionController, 'destroy'])
  .use(middleware.auth({ guards: ['api'] }))
router.post('/login', [SessionController, 'login']).as('auth.login')
router.delete('/logout', [SessionController, 'logout']).as('auth.logout').use(middleware.auth())
 
router.resource('users', UsersControllers);
router.resource('noticias', NoticiaController);
router.resource('media', MediasController);
router.resource('testemunhos', TestemunhoController);
router.resource('comentarios', ComentarioController);

router.get('/carregar_img/:file', async ({ response, params }) => {
  const filePath = app.makePath(`storage/uploads/${params.file}`)

  response.download(filePath)
})
 
router.get('/', async () => {
  return {
    hello: 'world',
  }
});

 
   