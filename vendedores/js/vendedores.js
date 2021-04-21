function cadastrar() {
    nome = $("#nome");
    
    if(!nome.val()) {
        alert("Preencha o campo nome");
        nome.focus();
        return;
    }

    email = $("#email");

    if(!email.val()) {
        alert("Preencha o campo email");
        email.focus();
        return;
    }

    $.ajax({
        url: URLAPI + "/vendedor",
        cache: false,
        method: "POST",
        data: { 
            "nome": nome.val(), 
            "email": email.val()
        }
    })
    .done(function( jsonAPI ) {
        html = "";

        if(jsonAPI) {
            html += 
                "ID: " + jsonAPI.id + "<br />" +
                "Nome: " + jsonAPI.nome + "<br />" +
                "E-mail: " + jsonAPI.email;
        }
        
        $("#mensagem_cadastro").html("Dados gravados com sucesso<br />" + html);
        
        $("#formulario_cadastro")[0].reset();

        nome.focus();
    }).fail(function() {
        $("#mensagem_cadastro").html("Erro ao gravar dados");
    });
}

function listar() {
    $.ajax({
        url: URLAPI + "/vendedor",
        method: "GET",
        cache: false
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
                        ((objAPI.comissao) ? objAPI.comissao.replace(".", ",") : "0") +
                        "</td>" +
                    "</tr>";
            });
        } else {
            html += 
                "<tr>" +
                    "<td colspan=\"4\">Busca sem resultados</td>" +
                "</tr>";
        }
            
        html += "</table>";

        $("#lista_vendedores").html(html);
    })
    .fail(function() {
        $("#lista_vendedores").html("Erro ao carregar dados");
    });
}