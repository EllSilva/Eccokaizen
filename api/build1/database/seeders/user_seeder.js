import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
export default class extends BaseSeeder {
    async run() {
        await User.createMany([
            {
                full_name: 'FDULAN',
                email: 'cicaj@fdulan.ao',
                password: 'admin123',
            },
            {
                full_name: 'Joaquim José ',
                email: 'geral.jlsystem@gmail.com',
                password: '123',
            },
        ]);
    }
}
//# sourceMappingURL=user_seeder.js.map