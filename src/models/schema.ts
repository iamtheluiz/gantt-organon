import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'projects',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'subtitle', type: 'string' },
        { name: 'emoji', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'start', type: 'string' },
        { name: 'end', type: 'string' },
        { name: 'project_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
});
