import User from '#models/user';
import { loginValidator } from '#validators/user';
export default class SessionController {
    async store({ request, auth, response }) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);
        return User.accessTokens.create(user);
    }
    async destroy({ request, auth, response }) {
        const user = auth.user;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        return { message: 'success' };
    }
    async login({ request }) {
        const { email, password } = await request.validateUsing(loginValidator);
        const user = await User.verifyCredentials(email, password);
        return User.accessTokens.create(user);
    }
    async logout({ auth }) {
        const user = auth.user;
        await User.accessTokens.delete(user, user.currentAccessToken.identifier);
        return { message: 'success' };
    }
}
//# sourceMappingURL=session_controller.js.map