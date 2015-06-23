myApp.controller('contactCtrl', ['$scope', '$http', 'ngDialog', function($scope, $http, ngDialog) {


    var refresh = function() {
        $http.get('/contactList').success(function(res) {
            $scope.contactList = res;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function(contact) {
        $http.post('/contactList', contact).success(function(res) {
            refresh();
        });
    };

    $scope.updateContact = function(contact) {
        var dialogUpdateContact = ngDialog.open({
            templateUrl: '/views/modals/editContact.html',
            data: angular.copy(contact)
        });
        dialogUpdateContact.closePromise.then(function(data) {
            var editedContact = data.value;
            $http.put('/contactList/' + editedContact._id, editedContact).success(function(res) {
                refresh();
            });
        })
    };

    $scope.removeContact = function(id) {
        $http.delete('/contactList/' + id).success(function(res) {
            refresh();
        });
    };

}]);