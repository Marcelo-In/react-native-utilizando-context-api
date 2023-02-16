import { createContext, useEffect, useState } from "react";
import { pegarProdutos, salvarProduto, removerProduto } from "../servicos/requisicoes/produtos";

export const ProdutosContext = createContext({});

export function ProdutosProvider( {children} ) {
  const [quantidade, setQuantidade] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [ultimosVistos, setUltimosVistos] = useState([]);
  const [precoTotal, setPrecoTotal] = useState(0);

  useEffect( async () => {
    const resultado = await pegarProdutos();
    setCarrinho(resultado);
    setQuantidade(resultado.length);
    let precoTotalInicial = 0;
    resultado.forEach( produto => { precoTotalInicial = precoTotalInicial + produto.preco });
    setPrecoTotal(precoTotalInicial);
  }, []);

  async function viuProduto(produto){
    const resultado = await salvarProduto(produto);
    const novoItemCarinho = [...carrinho, resultado];
    setCarrinho(novoItemCarinho);

    let novoUltimosVistos = new Set(ultimosVistos);
    novoUltimosVistos.add(produto);
    setUltimosVistos([...novoUltimosVistos]);

    setQuantidade(quantidade + 1);
    let novoPrecoTotal = precoTotal + produto.preco;
    setPrecoTotal(novoPrecoTotal);
  }

  async function finalizarCompra() {
    // para cada item no carrinho, apagar do banco de dados usando o removerProduto
    try {
        carrinho.forEach(async produto => {
            await removerProduto(produto);
        })
        setQuantidade(0);
        setPrecoTotal(0);
        setCarrinho([]);
        return 'Compra finalizada com sucesso!';
    }
    catch(erro) {
        return 'Erro ao finalizar a compra, tente novamente!';
    }
  };

  return (
    <ProdutosContext.Provider value={{
      quantidade, carrinho, ultimosVistos, viuProduto, precoTotal, finalizarCompra   
    }}>
      {children}
    </ProdutosContext.Provider>
  )
}