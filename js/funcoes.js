var URLAPI = "http://localhost/sistema-vendas/public/api";

function dataFormatada(dataFormatar){
    var data = new Date(Date.parse(dataFormatar)),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? "0" + dia : dia,
        mes  = (data.getMonth() + 1).toString(),
        mesF = (mes.length == 1) ? "0" + mes : mes,
        anoF = data.getFullYear(),
        hora  = data.getHours().toString(),
        horaF = (hora.length == 1) ? "0" + hora : hora,
        minuto  = data.getMinutes().toString(),
        minutoF = (minuto.length == 1) ? "0" + minuto : minuto,
        segundo  = data.getSeconds().toString(),
        segundoF = (segundo.length == 1) ? "0" + segundo : segundo;

    return diaF + "/" + mesF + "/" + anoF + " " + horaF + ":" + minutoF + ":" + segundoF;
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isDecimal(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && (charCode != 44)) {
        return false;
    }
    return true;
}