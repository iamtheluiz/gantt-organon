import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';

export default class ProjectModel extends Model {
  static table = 'projects'

  public static associations: any = {
    tasks: { type: 'has_many', foreignKey: 'project_id' },
  };

  @field('title') title: string | undefined

  @field('subtitle') subtitle: string | undefined

  @field('emoji') emoji: string | undefined

  @children('tasks') tasks: any;
}
