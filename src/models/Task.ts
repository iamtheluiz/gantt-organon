import { Model } from '@nozbe/watermelondb';
import { field, date, relation } from '@nozbe/watermelondb/decorators';

export default class TaskModel extends Model {
  static table = 'tasks'

  public associations = {
    tasks: { type: 'has_many', foreignKey: 'project_id' },
  };

  @field('name') name: any

  @field('color') color: any

  @date('start') start: any

  @date('end') end: any

  @relation('projects', 'project_id') project: any
}
