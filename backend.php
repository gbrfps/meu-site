<?php
// Receber dados do formulário
$data = $_POST['data'];
$local = $_POST['local'];
$caçambeiros = explode(',', $_POST['caçambeiros']);
$quantidadeCarradas = $_POST['quantidadeCarradas'];

// Carregar dados existentes do arquivo JSON ou inicializar um array vazio se o arquivo não existir
$dados_existentes = file_exists('dados.json') ? json_decode(file_get_contents('dados.json'), true) : [];

// Adicionar novo registro aos dados existentes
$dados_existentes[] = array(
    'data' => $data,
    'local' => $local,
    'caçambeiros' => $caçambeiros,
    'quantidadeCarradas' => $quantidadeCarradas
);

// Salvar dados atualizados de volta no arquivo JSON
file_put_contents('dados.json', json_encode($dados_existentes));

// Responder ao cliente com os dados salvos (opcional)
echo json_encode($dados_existentes);
?>
