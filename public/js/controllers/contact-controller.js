myApp.controller('contactCtrl', ['$scope', '$http', 'ngDialog', 'FileUploader', function($scope, $http, ngDialog, FileUploader) {

    $scope.uploader = new FileUploader({
           url: '/uploadFile/'
    });

    var refresh = function() {
        $http.get('/contactList').success(function(res) {
            $scope.contactList = res;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.updateContact = function(contact) {
        ngDialog.openConfirm({
            templateUrl: '/views/modals/contact.html',
            data: angular.copy(contact)
        }).then(function(data) {
            var contact = data;
            if (contact._id) {
                $http.put('/contactList/' + contact._id, contact).success(function(res) {
                    refresh();
                });
            } else {
                $http.post('/contactList', contact).success(function(res) {
                    refresh();
                });
            }
        })
    };

    $scope.removeContact = function(id) {
        ngDialog.openConfirm({
            templateUrl: '/views/modals/confirm.html'
        }).then(function(value) {
            if (value) {
                $http.delete('/contactList/' + id).success(function(res) {
                    refresh();
                });
            }
        }, function(reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };

}]);