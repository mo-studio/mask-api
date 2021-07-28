import { DeleteResult, getManager } from 'typeorm';
import { Task } from '../entities/Task';

export interface DataService {
  getTasks(): Promise<Task[]>;
  saveTask(task: Task): Promise<Task>;
  deleteTask(taskID: number): Promise<DeleteResult>;
}

export class PostgresDataService implements DataService {
  getTasks(): Promise<Task[]> {
    return getManager().getRepository(Task).find();
  }

  saveTask(task: Task): Promise<Task> {
    return getManager().getRepository(Task).save(task);
  }

  deleteTask(taskID: number): Promise<DeleteResult> {
    return getManager().getRepository(Task).delete(taskID);
  }
}
