import React, { Component } from "react";
import Lembrete from "./Lembrete";
import "./LembreteSistema.css";

class LembreteSistema extends Component{
    constructor(props){
        super(props);
        this.state = {
            lembretes: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    criarLembrete = (nome, data) => {
        const dataFormatada = data.toISOString().split('T')[0];
        const existeLembretes = this.state.lembretes[dataFormatada] || [];
        const estaDuplicado = existeLembretes.some(reminder => reminder.nome === nome && reminder.data === dataFormatada);
      
        if (!estaDuplicado) {
          const novoLembrete = new Lembrete(nome, data);
          this.setState(prevState => {
            const lembretes = { ...prevState.lembretes };
            if (dataFormatada in lembretes) {
              lembretes[dataFormatada].push(novoLembrete);
              console.log("Lembrete adicionado: ", lembretes[dataFormatada]);
            } else {
              lembretes[dataFormatada] = [novoLembrete];
              console.log("Lembrete criado: ", lembretes[dataFormatada]);
            }
            return { lembretes };
          });
        } else {
          console.log('Lembrete já existe');
        }
    };

    deletaLembrete = (nome, data) => {
        const dataFormatada = data.toLocaleDateString();
        this.setState(prevState => {
            const lembretes = { ...prevState.lembretes };
            if(lembretes[dataFormatada]){
                lembretes[dataFormatada] = lembretes[dataFormatada].filter(
                    lembrete => lembrete.nome !== nome
                );
            }
            return { lembretes };
        });
    };

    ordenaDatas = () => {
        const lembretesOrdenados = Object.keys(this.state.lembretes).sort(
            (a,b) => new Date(a) - new Date(b)
        );
        return lembretesOrdenados.map(data => ({
            data,
            lembretes: this.state.lembretes[data],
        }));
    };

    handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const nome = formData.get('nome');
        const dataValue = formData.get('data');
        console.log("Data value:", dataValue);
        const data = new Date(dataValue);
        console.log("Parsed Date: ", data);
        this.criarLembrete(nome, data);
        event.target.reset();
    };

    formataData(data) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    render(){
        const lembretesOrdenados = this.ordenaDatas();
        console.log("Lembretes Ordenados: ", lembretesOrdenados);
        return(
            <div>
                <div className="base">
                    <div className="lembreteSistema">
                        <img src="/imagens/reminder.png" alt="remind" />
                        <h1>Novo Lembrete</h1>
                        <form className="inputs" onSubmit={this.handleSubmit}>
                            <div>
                                <label>
                                    <strong className="inputsTitle">
                                        Nome:
                                    </strong>
                                    <input 
                                        type="text" 
                                        placeholder="Nome do lembrete"
                                        name="nome"
                                        className="nome" 
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    <strong className="inputsTitle">
                                        Data:
                                    </strong>
                                    <input 
                                        type="date" 
                                        placeholder="Data do lembrete (no formato dd/mm/aaaa)"
                                        name="data" 
                                        className="data"
                                    />
                                </label>
                            </div>
                            <button className="botao" type="submit">Criar</button>
                        </form>
                        <div className="listaLembretes">
                        <h2>Lista de lembretes</h2>
                        </div>
                        <div className="lista">
                        {lembretesOrdenados.map((lembreteData, index) => {;
                            return (
                                <div key={index}>
                                    <p className="dataLista">{this.formataData(lembreteData.data)}</p>
                                    <ul>
                                        {lembreteData.lembretes.map((lembrete, idx) => (
                                            <li key={idx} className="nomeLista">{lembrete.nome}</li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default LembreteSistema;