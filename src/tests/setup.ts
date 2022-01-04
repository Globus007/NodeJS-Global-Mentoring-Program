import 'dotenv/config';
import { migrator, seeder } from '../db/umzug';
import { server } from '../app';

beforeAll(async () => {
  await migrator.up();
  await seeder.up();
}, 50000);

afterAll(async () => {
  jest.clearAllMocks();
  server.close();
  await seeder.down({ step: 2 });
  await migrator.down({ step: 3 });
}, 50000);
