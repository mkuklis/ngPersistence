var ngPersistance = angular.module('ngPersistance', []);

function crudService($q) {
  
  function Crud(Model) {
    this.Model = Model;
    this.query = Model.all();
    
    this.query.constructor.prototype.run = function () {
      var deferred = $q.defer();
      this.list(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }
  }

  Crud.prototype = {
    findById: function (id) {
      var deferred = $q.defer();
      
      persistence.load(function (model) {
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

      persistence.remove(model);
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
}

ngPersistance.factory('crudService', [ '$q', crudService ]);