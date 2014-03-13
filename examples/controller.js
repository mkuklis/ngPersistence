'use strict';

var app = angular.module('app', ['ngPersistance']);

app.controller('TodosController', function($scope, Todos) {
  
  Todos.all().then(function (todos) {
    $scope.todos = todos;
  });
  
  Todos.save({ name: 'todo 1', done: false });
  Todos.query.limit(10).run().then(function (todos) {
  });
  
});
