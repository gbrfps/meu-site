document.addEventListener("DOMContentLoaded", function() {
    // Função para criar checkbox para caçambeiros
    function criarCheckboxCaçambeiros() {
        var caçambeirosCheckbox = document.getElementById('caçambeirosCheckbox');
        var caçambeiros = ['Marcos', 'Ramalho', 'Milson', 'Zé Paulo', 'Alison', 'Jacaré', 'Ramon'];

        caçambeiros.forEach(function(caçambeiro) {
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'caçambeiro' + caçambeiro;
            checkbox.value = caçambeiro;
            var label = document.createElement('label');
            label.htmlFor = 'caçambeiro' + caçambeiro;
            label.textContent = caçambeiro;
            caçambeirosCheckbox.appendChild(checkbox);
            caçambeirosCheckbox.appendChild(label);
            caçambeirosCheckbox.appendChild(document.createElement('br'));
        });
    }

    criarCheckboxCaçambeiros(); // Chamar a função ao carregar a página

    // Função para criar um novo registro de atividade em um card
    function criarCardRegistro(registro) {
        var cardsContainer = document.getElementById('cardsContainer');

        var card = document.createElement('div');
        card.classList.add('card');

        var titulo = document.createElement('h3');
        titulo.textContent = `Data: ${registro.data}`;
        card.appendChild(titulo);

        var paragrafoLocal = document.createElement('p');
        paragrafoLocal.textContent = `Local do Serviço: ${registro.local}`;
        card.appendChild(paragrafoLocal);

        var paragrafoCaçambeiros = document.createElement('p');
        paragrafoCaçambeiros.textContent = `Caçambeiros: ${registro.caçambeiros.join(', ')}`;
        card.appendChild(paragrafoCaçambeiros);

        var paragrafoQuantidade = document.createElement('p');
        paragrafoQuantidade.textContent = `Quantidade de Carradas: ${registro.quantidadeCarradas}`;
        card.appendChild(paragrafoQuantidade);

        cardsContainer.appendChild(card);
    }

    // Função para salvar os dados
    function salvar(event) {
        event.preventDefault(); // Evitar o envio do formulário

        var data = document.getElementById('dataInput').value;
        var local = document.getElementById('localInput').value;
        var caçambeirosSelecionados = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(cb => cb.value);
        var quantidadeCarradas = document.getElementById('quantidadeCarradas').value;

        // Enviar dados para o backend.php
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "backend.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Atividade registrada com sucesso!");
                // Carregar e exibir os dados atualizados após salvar
                carregarDados();
            }
        };
        xhr.send(`data=${data}&local=${local}&caçambeiros=${caçambeirosSelecionados.join(',')}&quantidadeCarradas=${quantidadeCarradas}`);
    }

    // Função para carregar e exibir os registros de atividades
    function carregarDados() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "dados.json", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var dados = JSON.parse(xhr.responseText);
                exibirDados(dados);
            }
        };
        xhr.send();
    }

    // Função para exibir os registros de atividades na página HTML
    function exibirDados(dados) {
        var cardsContainer = document.getElementById('cardsContainer');
        cardsContainer.innerHTML = ''; // Limpar os cards antes de adicionar os novos registros

        var registrosPorDia = {};

        dados.forEach(function(registro) {
            var data = registro.data;
            if (!registrosPorDia[data]) {
                registrosPorDia[data] = [];
            }
            registrosPorDia[data].push(registro);
        });

        for (var data in registrosPorDia) {
            var registrosDoDia = registrosPorDia[data];
            var cardDia = document.createElement('div');
            cardDia.classList.add('card');

            var tituloDia = document.createElement('h3');
            tituloDia.textContent = `Registros de ${data}`;
            cardDia.appendChild(tituloDia);

            registrosDoDia.forEach(function(registro) {
                var paragrafoLocal = document.createElement('p');
                paragrafoLocal.textContent = `Local do Serviço: ${registro.local}`;
                cardDia.appendChild(paragrafoLocal);

                var paragrafoCaçambeiros = document.createElement('p');
                paragrafoCaçambeiros.textContent = `Caçambeiros: ${registro.caçambeiros.join(', ')}`;
                cardDia.appendChild(paragrafoCaçambeiros);

                var paragrafoQuantidade = document.createElement('p');
                paragrafoQuantidade.textContent = `Quantidade de Carradas: ${registro.quantidadeCarradas}`;
                cardDia.appendChild(paragrafoQuantidade);
            });

            cardsContainer.appendChild(cardDia);
        }
    }

    // Adicionar evento de submit ao formulário
    var formRegistro = document.getElementById('formRegistro');
    formRegistro.addEventListener('submit', salvar);

    // Carregar e exibir os registros ao carregar a página
    carregarDados();
});
