var mockUrl = 'http://private-9aad-note10.apiary-mock.com';
var currentLanguage = '';
var langEN = {
  currentLanguage: 'EN',
  title: 'TODO list',
  sendButton: 'ADD',
  lineName: 'Operation State Info'
};
var langCZ = {
  currentLanguage: 'CZ',
  title: 'Plánovací seznam',
  sendButton: 'PŘIDAT',
  lineName: 'Info o prováděných operacích'
};

angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: function ($http) {
      var checkResponse = function (response) {
        res.stateLine = response.status + ' - ' + response.statusText + '\n' + res.stateLine;
      };

      var getNotes = function () {
        $http({
          method: 'GET',
          url: mockUrl + '/notes',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          res.resData = response.data;
          checkResponse(response);
        }, function (response) {
          checkResponse(response);
        });

        res.stateLine = 'Retrieving notes...\n' + res.stateLine;
      };

      var postNote = function () {
        if (!res.noteField) {
          res.stateLine = 'Can\'t put empty note.\n' + res.stateLine;
          return false;
        }

        $http({
          method: 'POST',
          url: mockUrl + '/notes',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            title: res.noteField
          }
        })
        .then(function (response) {
          checkResponse(response);
          res.noteField = '';
          getNotes();
        }, function (response) {
          checkResponse(response);
        });

        res.stateLine = 'Posting note (' + res.noteField + ')...\n' + res.stateLine;
        return true;
      };

      var removeNote = function (id) {
        $http({
          method: 'DELETE',
          url: mockUrl + '/notes/' + id,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          checkResponse(response);
          getNotes();
        }, function (response) {
          checkResponse(response);
        });

        res.stateLine = 'Removing note ' + id + '...\n' + res.stateLine;
      };

      var updateNote = function (note, id) {
        if (!note) {
          res.stateLine = 'Can\'t put empty note.\n' + res.stateLine;
          return false;
        }

        $http({
          method: 'PUT',
          url: mockUrl + '/notes/' + id,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            title: note
          }
        })
        .then(function (response) {
          checkResponse(response);
          getNotes();
        }, function (response) {
          checkResponse(response);
        });

        res.stateLine = 'Updating note (' + note + ')...\n' + res.stateLine;
        return true;
      };

      var editNote = function (id) {
        var pencilIcon = angular.element('#note_' + id + ' > .note_options > span:first-of-type');
        if (pencilIcon.hasClass('glyphicon-pencil')) {
          angular.element('#note_' + id + ' > .note_title').html('<input class="form-control" type="text" value="' + angular.element('#note_' + id + ' > .note_title').html() + '"/>');
          pencilIcon.removeClass('glyphicon-pencil').addClass('glyphicon-ok');
          // hide all other edit symbols
          angular.element('table .glyphicon-pencil').css('visibility', 'hidden');
          res.stateLine = 'Editing note ' + id + '...\n' + res.stateLine;
        } else {
          if (!updateNote(angular.element('#note_' + id + ' > .note_title > input').val(), id)) {
            return;
          }
          angular.element('#note_' + id + ' > .note_title').html(angular.element('#note_' + id + ' > .note_title > input').val());
          pencilIcon.removeClass('glyphicon-ok').addClass('glyphicon-pencil');
          res.stateLine = 'Finished editing note ' + id + '...\n' + res.stateLine;
        }
      };

      var toggleMessages = function () {
        res.showStatusMessages = !res.showStatusMessages;
        angular.element('#stateLine .glyphicon').toggleClass('glyphicon-triangle-bottom');
        angular.element('#stateLine .glyphicon').toggleClass('glyphicon-triangle-top');
      };

      var toggleLanguages = function (initRun) {
        var lng = {};
        if ((initRun) || currentLanguage === 'CZ') {
          lng = langEN;
        } else {
          lng = langCZ;
        }
        currentLanguage = lng.currentLanguage;
        res.title = lng.title;
        res.sendButton = lng.sendButton;
        res.lineName = lng.lineName;
        angular.element('#langSel .lang').toggleClass('selected');
      };

      var res = this;
      res.stateLine = '';

      res.sendFormNote = postNote;
      res.removeNote = removeNote;
      res.editNote = editNote;
      res.toggleMessages = toggleMessages;
      res.toggleLanguages = toggleLanguages;
      res.$onInit = function () {
        toggleLanguages();
        getNotes();
      };
    }
  });
