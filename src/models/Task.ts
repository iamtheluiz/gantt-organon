import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';
import ProjectModel from './Project';

export default class TaskModel extends Model {
  static table = 'tasks'

  @field('name')
  name!: string;

  @field('color')
  color!: string;

  @date('start')
  start!: Date;

  @date('end')
  end!: Date;

  @relation('projects', 'project_id') project!: ProjectModel;
}
