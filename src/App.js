import React, { Component } from 'react';
import './assets/style.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      numero: 0,
      botao: "VAI",
      marcacao: []
    };

    this.timer = null;
    this.vai = this.vai.bind(this);
    this.limpar = this.limpar.bind(this);
    this.marcar = this.marcar.bind(this);
    this.excluirTempo = this.excluirTempo.bind(this);
    this.limparMarcador = this.limparMarcador.bind(this);
  }

  vai(){
    let state = this.state;

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
      state.botao = "VAI";
    } else {
      this.timer = setInterval(() => {
        let state = this.state;
        state.numero += 0.1;
        this.setState(state);
      }, 100);
      state.botao = "PAUSAR";
    }

    this.setState(state);

  }

  limpar(){
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;  
    }

    let state = this.state;

    state.numero = 0;
    state.botao = "VAI";

    this.setState(state);
  }

  marcar(){
    let state = this.state;
    let marcacaoValor = state.numero;

    if (marcacaoValor === 0) {
      alert("Inicie o cronometro para marcar o valor.")
    } else {
      state.marcacao = [...state.marcacao, marcacaoValor.toFixed(1)];
  
      this.setState(state);      
    }
    
  }

  excluirTempo(indice){
    let state = this.state;

    state.marcacao.splice(indice, 1);

    this.setState(state);
  }

  limparMarcador(){
    let state = this.state;

    if (window.confirm(`Tem certeza que deseja limpar todas as marcações?`)) {
      state.marcacao = [];
    }

    this.setState(state);
  }

  render(){
    return(
      <div className='container'>
        <img src={require('./assets/cronometro.png')} className='img' alt="imagem_cronometro"/>
        <a className='timer'>{this.state.numero.toFixed(1)}</a>
        <div className='areaBtn'>
          <a className='botao' onClick={this.vai}>{this.state.botao}</a>
          <a className='botao' onClick={this.marcar}>MARCAR</a>
          <a className='botao' onClick={this.limpar}>LIMPAR</a>
        </div>
        <div className='areamarcacao'>
          {this.state.marcacao.length > 0 ? <Marcacoes listagemMarcacoes={this.state.marcacao} acaoBtn={this.excluirTempo} acaoLimparBtn={this.limparMarcador}/> : ""}
        </div>
      </div>
    );
  }

}

class Marcacoes extends Component{
  render(){
    return(
      <div className='areaTable'>
        <div>
          <a className='botao btnLimparMarcador' onClick={() => this.props.acaoLimparBtn()}>ZERAR MARCAÇÕES</a>
        </div>

        <table border="1" className='table'>
          <thead>
            <tr>
              <th colSpan="3">Marcações</th>
            </tr>
            <tr>
              <th>#</th>
              <th colSpan="2">Tempo</th>
            </tr>
          </thead>
          <tbody>
            {this.props.listagemMarcacoes.map((item, key) => {
              return(
                <tr key={key}>
                  <td>
                    {key}
                  </td>
                  <td>
                    {item}
                  </td>
                  <td>
                    <a className='iconExcluir' onClick={() => this.props.acaoBtn(key)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;