var ngPersistance = angular.module('ngPersistance', []);

function crudService($q) {
  
  function Crud(Model) {
    this.Model = Model;
    this.query = Model.all();
    this._list = [];
    var list = this._list;
    
    this.query.constructor.prototype.run = function () {
      var deferred = $q.defer();
      this.list(function (data) {
        list = add(clear(list), data);
        deferred.resolve(list);
      });
      
      return deferred.promise;
    }
  }

  Crud.prototype = {
    findById: function (id) {
      var deferred = $q.defer();
    
      this.Model.load(id, function (model) {
        deferred.resolve(model);
      });

      return deferred.promise;
    },

    all: function () {
      return this.query.run();
    },

    save: function (model) {
      var deferred = $q.defer();
      
      if (!model.id) {
        model = new this.Model(model);
        persistence.add(model);
      }

      persistence.flush(function () {
        deferred.resolve(model);
      });

      return deferred.promise;
    },

    remove: function (model) {
      var deferred = $q.defer(); 
      var list = this._list;

      persistence.remove(model);
      remove(list, model);

      persistence.flush(function () {
        deferred.resolve(model);
      });

      return deferred.promise;
    }
  };

  return {
    init: function (Model) {
      return new Crud(Model);
    }
  };

  // helpers

  function clear(arr) {
    while (arr.length > 0) {
      arr.pop();
    }

    return arr;
  }

  function add(to, from) {
     Array.prototype.splice.apply(to, from);
     return to;
  }

  function remove(arr, data) {
    var index = arr.indexOf(data);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}