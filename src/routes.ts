import { Express } from 'express';
import { DataService } from './services/data.service';
import TaskController from './controllers/task.controller';
import { validate } from 'express-validation';
import { taskValidation } from './entities/Task';
import { keycloak } from './index';

export function loadRoutes(app: Express, dataService: DataService) {
  const taskController = new TaskController(dataService);

  app.get('/api/v1/healthcheck', (req, res) => {
    console.log('healthcheck hit');
    res.send('ok');
  });

  app.get('/api/v1/tasks', keycloak.protect('realm:mask-admin'), (req, res) =>
    taskController.getTasks(req, res)
  );
  app.post(
    '/api/v1/task',
    keycloak.protect('realm:mask-admin'),
    validate(taskValidation, {}, {}),
    (req, res) => taskController.createTask(req, res)
  );
  app.put(
    '/api/v1/task/:taskID',
    keycloak.protect('realm:mask-admin'),
    validate(taskValidation, {}, {}),
    (req, res) => taskController.updateTask(req, res)
  );
  app.delete(
    '/api/v1/task/:taskID',
    keycloak.protect('realm:mask-admin'),
    (req, res) => taskController.deleteTask(req, res)
  );
}
