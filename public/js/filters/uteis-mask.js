myApp.filter('telefoneBrmask', function() {
    return function(value) {
        var v = value;
        v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        return v;

    };
});

myApp.filter('cpfBrmask', function() {
    return function(value) {
        var v = value;
        v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
        v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2") //Coloca ponto entre o setimo e o oitava dígitos
        v = v.replace(/(\d{3})(\d)/, "$1-$2") //Coloca ponto entre o decimoprimeiro e o decimosegundo dígitos
        return v
    };
});