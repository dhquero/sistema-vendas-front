function cadastrar() {
    idVendedor = $("#id_vendedor");
    
    if(!idVendedor.val()) {
        alert("Preencha o campo ID do vendedor");
        idVendedor.focus();
        return;
    }

    valor = $("#valor");

    if(!valor.val()) {
        alert("Preencha o campo valor");
        valor.focus();
        return;
    }

    mensagemCadastro = $("#mensagem_cadastro");
    
    $.ajax({
        url: URLAPI + "/venda",
        cache: false,
        method: "POST",
        data: { 
            "id_vendedor": idVendedor.val(), 
            "valor": valor.val().replace(",", ".")
        }
    })
    .done(function( jsonAPI ) {
        html = "";

        if(jsonAPI) {
            html += 
                "ID: " + jsonAPI.id + "<br />" +
                "Nome: " + jsonAPI.nome + "<br />" +
                "E-mail: " + jsonAPI.email + "<br />" +
                "Comissao: " + jsonAPI.comissao.replace(".", ",") + "<br />" +
                "Valor: " + jsonAPI.valor.replace(".", ",") + "<br />" +
                "Data: " + dataFormatada(jsonAPI.data);
        }
        
        mensagemCadastro.html("Dados gravados com sucesso<br />" + html);
        
        $("#formulario_cadastro")[0].reset();

        idVendedor.focus();
    }).fail(function() {
        mensagemCadastro.html("Erro ao gravar dados");
    });
}

function listar() {
    idVendedor = $("#id_vendedor");
    
    if(!idVendedor.val()) {
        alert("Preencha o campo ID do vendedor");
        idVendedor.focus();
        return;
    }

    listaVendas = $("#lista_vendas");

    $.ajax({
        url: URLAPI + "/venda/vendedor/" + idVendedor.val(),
        cache: false,
        method: "GET"
      })
    .done(function( jsonAPI ) {
        html = 
            "<table>" +
                "<tr>" +
                    "<td>" +
                        "<b>ID</b>" +
                    "</td>" +
                    "<td>" +
                        "<b>Nome</b>" +
                    "</td>" +
                    "<td>" +
                        "<b>E-mail</b>" +
                    "</td>" +
                    "<td>" +
                        "<b>Comissão</b>" +
                    "</td>" +
                    "<td>" +
                        "<b>Valor</b>" +
                    "</td>" +
                    "<td>" +
                        "<b>Data</b>" +
                    "</td>" +
                "</tr>";

        if(jsonAPI.length) {
            jsonAPI.forEach( function(objAPI) {
                html += 
                    "<tr>" +
                        "<td>" +
                            objAPI.id +
                        "</td>" +
                        "<td>" +
                            objAPI.nome +
                        "</td>" +
                        "<td>" +
                            objAPI.email +
                        "</td>" +
                        "<td>" +
                            objAPI.comissao.replace(".", ",") +
                        "</td>" +
                        "<td>" +
                            objAPI.valor.replace(".", ",") +
                        "</td>" +
                        "<td>" +
                            dataFormatada(objAPI.data)
                        "</td>" +
                    "</tr>";
            });
        } else {
            html += 
                "<tr>" +
                    "<td colspan=\"6\">Busca sem resultados</td>" +
                "</tr>";
        }
            
        html += "</table>";

        listaVendas.html(html);

        idVendedor.focus();
    })
    .fail(function() {
        listaVendas.html("Erro ao carregar dados");
    });
}