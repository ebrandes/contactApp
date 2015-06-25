myApp.directive('datepicker', ['$compile', function($compile) {

    return {
        require: 'ngModel',
        scope : {
            beginDate : '=',
            finishDate : '='
        },
        link: function(scope, element, attrs, modelCtrl) {
            var el = $(element);
            var orientation = attrs["orientation"];
            var minDate ;

            var elemEnd = element.parent().next().find('input');

            if(elemEnd.length>0) {
                $(element).on("dp.change", function (e) {
                    if($(elemEnd).data("DateTimePicker")) {
                        $(elemEnd).data("DateTimePicker").minDate(e.date);
                        scope.beginDate = element.val();
                    }
                });
                $(elemEnd).on("dp.change", function (e) {
                    $(element).data("DateTimePicker").maxDate(e.date);
                    scope.finishDate = elemEnd.val();
                });
            }

            el.datetimepicker({
                locale: 'pt-br',
                format: "DD/MM/YYYY",
                minDate: (minDate) ? minDate : false,
                keepOpen: true,
                widgetPositioning: {
                    horizontal: 'auto',
                    vertical: (orientation) ? orientation : 'auto'
                }
            });

            $compile(el);
        }
    };
}]);