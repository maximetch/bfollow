(function() {
  'use strict';

  var app = angular.module('app');

  app.controller('LoginController', [
    '$location', 'ConnectService', 'UserService',
    function($location, ConnectService, UserService) {
      var that = this;

      this.init = function init() {
        that.isRegistering = false;
        this.errorMessage = '';
        that.loginInfo = {
          username: '',
          password: ''
        };

        that.registerInfo = {
          username: '',
          email: '',
          password: ''
        };
      };

      this.switchLoginForm = function LoginController_switchLoginForm() {
        var formsElement = document.querySelector('#buf-login__forms');

        this.isRegistering = !this.isRegistering;

        if (this.isRegistering) {
          formsElement.classList.add('registering');
        } else {
          formsElement.classList.remove('registering');
        }
      };

      this.login = function LoginController_login(valid) {
        if (valid) {
          ConnectService.login(this.username, this.password, function(response) {
            if (response.success) {
              $location.path('/');
            } else {
              // display error
            }
          });
        }
      };

      this.register = function LoginController_register(valid) {
        if (valid) {
          this.registerInfo.dateCreate = Date.now();
          UserService.create(this.registerInfo, function(data) {
            console.log(data)
            if (data.status === 'error') {
              that.errorMessage = data.statusMessage;
            } else {
              that.init();
            }
          });
        }
      };

      this.init();
    }
  ]);
})();