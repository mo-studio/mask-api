import { Request, Response } from 'express';
import { DataService } from '../services/data.service';
import { Task } from '../entities/Task';

class TaskController {
  private _dataService: DataService;
  constructor(dataService: DataService) {
    this._dataService = dataService;
  }

  async getTasks(req: Request, res: Response) {
    console.log(`GET tasks`);
    try {
      const tasks = await this._dataService.getTasks();

      const tasksJSON = {
        tasks: tasks,
      };

      console.log('GET tasks succeeded:', JSON.stringify(tasksJSON, null, 2));
      res.json(tasksJSON);
    } catch (e) {
      console.error('Unable to GET tasks:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  async createTask(req: Request, res: Response) {
    console.log(`CREATE task`);
    const taskToCreate = new Task();
    taskToCreate.title = req.body.title;
    taskToCreate.text = req.body.text;
    taskToCreate.categoryID = req.body.categoryID;
    taskToCreate.isFirstDutyStation = req.body.isFirstDutyStation;
    taskToCreate.isFirstTermAirman = req.body.isFirstTermAirman;
    taskToCreate.isOfficer = req.body.isOfficer;
    taskToCreate.verificationRequired = req.body.verificationRequired;
    taskToCreate.location = req.body.location;
    taskToCreate.office = req.body.office;
    taskToCreate.pocName = req.body.pocName;
    taskToCreate.pocPhoneNumber = req.body.pocPhoneNumber;
    taskToCreate.pocEmail = req.body.pocEmail;

    try {
      const result = await this._dataService.saveTask(taskToCreate);
      console.log('CREATE task succeeded:', JSON.stringify(result, null, 2));
      res.json(result);
    } catch (e) {
      console.error('Unable to CREATE task:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  // only need to pass in parameters that you want to update
  // i.e. if you're only updating the text, just include text in the body
  async updateTask(req: Request, res: Response) {
    console.log(`UPDATE task`);
    const taskToUpdate = new Task();
    taskToUpdate.id = Number(req.params.taskID);
    taskToUpdate.title = req.body.title;
    taskToUpdate.text = req.body.text;
    taskToUpdate.categoryID = req.body.categoryID;
    taskToUpdate.isFirstDutyStation = req.body.isFirstDutyStation;
    taskToUpdate.isFirstTermAirman = req.body.isFirstTermAirman;
    taskToUpdate.isOfficer = req.body.isOfficer;
    taskToUpdate.verificationRequired = req.body.verificationRequired;
    taskToUpdate.location = req.body.location;
    taskToUpdate.office = req.body.office;
    taskToUpdate.pocName = req.body.pocName;
    taskToUpdate.pocPhoneNumber = req.body.pocPhoneNumber;
    taskToUpdate.pocEmail = req.body.pocEmail;

    try {
      const result = await this._dataService.saveTask(taskToUpdate);
      console.log('UPDATE task succeeded:', JSON.stringify(result, null, 2));
      res.json(result);
    } catch (e) {
      console.error('Unable to UPDATE task:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }

  async deleteTask(req: Request, res: Response) {
    console.log(`DELETE task`);
    const taskID = Number(req.params.taskID);
    try {
      const result = await this._dataService.deleteTask(taskID);
      console.log('DELETE task succeeded:', JSON.stringify(result, null, 2));
      res.json(result);
    } catch (e) {
      console.error('Unable to DELETE task:', JSON.stringify(e, null, 2));
      res.sendStatus(500).send(e);
    }
  }
}

export default TaskController;
