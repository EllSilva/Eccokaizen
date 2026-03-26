import User from '#models/user'
import { loginValidator } from '#validators/user'
import { HttpContext } from '@adonisjs/core/http'



export default class SessionController {

  async store({ request, auth, response }: HttpContext) {
       const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async destroy({ request, auth, response }: HttpContext) {
      const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  } 

 async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)

    return User.accessTokens.create(user)
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return { message: 'success' }
  }

}

