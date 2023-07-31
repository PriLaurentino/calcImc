// algoritimo

// CALCULAR IMC
// 1. Pegar os valores
// 2. Calcular o IMC
// 3. Gerar a classificação do IMC
// 4. Organizar as informações
// 5. Salvar os dados na lista
// 6. Ler a lista com os dados
// 7. Renderiza o conteudo no html
// 8. Botao de limpar os registros

// FUNÇÃO PRINCIPAL
function calcularImc(event) {
    // event.preventDefault() - faz a tela nao recarregar automaticamente

    console.log("funcionou!!!");

    let dadosUsuario = pegarValores();

    let imc = calcular(dadosUsuario.altura, dadosUsuario.peso);

    let classificacaoImc = classificarImc(imc);

    let usuarioAtualizado = organizarDados(dadosUsuario, imc, classificacaoImc);

    cadastrarUsuario(usuarioAtualizado);




}

// Passo 1. Pegar os valores
function pegarValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebida = parseFloat(document.getElementById("altura").value);
    let pesoRecebido = parseFloat(document.getElementById("peso").value);

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido,
    }

    console.log(dadosUsuario);

    return dadosUsuario;

}

// Passo 2. Calcular o IMC
function calcular(altura, peso) {
    let imc = peso / (altura * altura)

    console.log(imc);
    return imc;
}


// Passo 3. Gerar a classificação do IMC
function classificarImc(imc) {
    /*
    Resultado               Situação
    Abaixo de 18,5          Filezinho!!!
    Entre 18,5 e 24,9       Diliça!!!
    Entre 25 e 29,99        Ta Top!!!
    Acima de 30             Oh lá em casa!!!
    */

    if (imc < 18.5) {
        return "Filezinho!!!"

    } else if (imc < 24.99) {
        return "Diliça!!!"

    } if (imc < 29.99) {
        return "Ta Top!!!"

    } else {
        return "Oh lá em casa!!!"
    }
}


// Passo 4. Organizar as informações
function organizarDados(dadosUsuario, valorImc, classificacaoImc) {
    let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacao: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

    console.log(dadosUsuarioAtualizado);

    return dadosUsuarioAtualizado;
}


// Passo 5. Salvar
function cadastrarUsuario(usuario) {
    let listaUsuarios = [];

    //if (localStorage.getItem("usuariosCadastrados") == true) 
    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    listaUsuarios.push(usuario)

    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

// Passo 6. Ler a lista 
function carregarUsuarios() {
    let listaUsuarios = [];

    if (localStorage.getItem("usuariosCadastrados")) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    if (listaUsuarios.length == 0) {
        let tabela = document.getElementById("corpo-tabela");

        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">nenhum usuário cadastrado!</td>
    </tr>`
    } else {
        montarTabela(listaUsuarios);

    }

}

window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


// Passo 7. montar tabela
function montarTabela(listaDeCadastrados) {
    let tabela = document.getElementById("corpo-tabela");

    let template = '';

    console.log(listaDeCadastrados);

    listaDeCadastrados.forEach(pessoa => {
        template += `<tr>
       <td data-cell="nome">${pessoa.nome}</td>
       <td data-cell="altura">${pessoa.altura}</td>
       <td data-cell="peso">${pessoa.peso}</td>
       <td data-cell="valor do IMC">${pessoa.imc}</td>
       <td data-cell="classificação do IMC">${pessoa.classificacao}</td>
       <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
   </tr>`
    });

    tabela.innerHTML = template;
}

// Passo 8. Limpar
function deletarRegistros() {
    localStorage.removeItem("usuariosCadastrados");
    window.location.reload();

}
