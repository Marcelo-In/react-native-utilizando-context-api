import { Text, View, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { estilos } from './estilos';
import { useContext } from 'react';
import { TemaContext } from '../../contexts/TemaContext';
import { AutenticacaoContext } from '../../contexts/AutenticacaoContext';
import { ProdutosContext } from '../../contexts/ProdutosContext';

export default function Finalizar({navigation}) {
  const { temaEscolhido } = useContext(TemaContext);
  const estilo = estilos(temaEscolhido);

  const { usuario } = useContext(AutenticacaoContext);

  const { quantidade, precoTotal, finalizarCompra } = useContext(ProdutosContext);

  async function finalizar() {
    const resultado = await finalizarCompra();
    Alert.alert(resultado);
    navigation.navigate('Principal');
  };

  return (
    <View style={estilo.container}>
      <View style={estilo.enderecoArea}>
        <Text style={estilo.titulo}>Informações de entrega</Text>

        <Text style={estilo.texto}>Nome: {usuario.nome}</Text>
        <Text style={estilo.texto}>Endereço: {usuario.endereco}</Text>
        <Text style={estilo.texto}>Email: {usuario.email}</Text>
        <Text style={estilo.texto}>Telefone: {usuario.telefone}</Text>
      </View>
      <View style={estilo.resumoArea}>
        <Text style={estilo.texto}>Quantidade: {quantidade}</Text>
        <Text style={estilo.texto}>Preço Total: R${precoTotal}</Text>
      </View>
      <TouchableOpacity style={estilo.botao}
        onPress={() => finalizar()}
      >
        <Text style={estilo.botaoTexto}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

