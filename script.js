let pedido = [];
let total = 0;

function adicionarItem(nome, preco) {
  pedido.push({ nome, preco });
  atualizarPedido();
}

function atualizarPedido() {
  const lista = document.getElementById("listaPedido");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";
  total = 0;

  pedido.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
    lista.appendChild(li);
    total += item.preco;
  });

  totalEl.textContent = total.toFixed(2);
}

function limparPedido() {
  pedido = [];
  atualizarPedido();
}

function abrirPedidoEmOutraAba() {
  const novaAba = window.open();
  let conteudo = `
    <html>
    <head>
      <title>Seu Pedido</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap">
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #f0f0f0;
          padding: 20px;
          color: #333;
        }
        .card {
          background-color: #fff;
          max-width: 500px;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          text-align: center;
          color: #d2691e;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          background-color: #f4f4f4;
          margin: 10px 0;
          padding: 10px;
          border-radius: 8px;
        }
        p {
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🧾 Seu Pedido</h1>
        <ul>`;

  pedido.forEach(item => {
    conteudo += `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`;
  });

  conteudo += `
        </ul>
        <p>Total: R$ ${total.toFixed(2)}</p>
      </div>
    </body>
    </html>`;

  novaAba.document.write(conteudo);
  novaAba.document.close();
}
