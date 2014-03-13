function Todos(crudService) {
  persistence.store.websql.config(persistence, 'todos', 'todos', 5 * 1024 * 1024);

  var Todo = persistence.define('Todo', {
    name: 'TEXT',
    done: 'BOOL'
  });

  persistence.schemaSync();
  return crudService.init(Todo);
}

ngPersistance.factory('Todos', [ 'crudService', Todos ]);