import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        full_name: 'ecco',
        email: 'admin@ecco.ao',
        password: 'admin123',
      },
      {
        full_name: 'Joaquim',
        email: 'geral.jlsystem@gmail.com',
        password: '123',
      },
    ])
  }
}
