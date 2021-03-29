import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';
import ProjectModel from './Project';

export default class TaskModel extends Model {
  static table = 'tasks'

  @field('name') name: string | undefined

  @field('color') color: string | undefined

  @date('start') start: Date | undefined

  @date('end') end: Date | undefined

  @relation('projects', 'project_id') project!: ProjectModel;
}
