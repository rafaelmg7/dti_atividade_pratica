import React, { Component } from "react";
import moment from "moment";
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
      
        const novoLembrete = new Lembrete(nome, dataFormatada);
        this.setState(prevState => {
            const lembretes = { ...prevState.lembretes };
            console.log("Lembrete antes de adicionar: ", lembretes);
            if (dataFormatada in lembretes) {
                const lembreteExistente = lembretes[dataFormatada].find(lembrete => lembrete.nome === nome);
                if (lembreteExistente) {
                    console.log("Lembrete já existe");
                    return;
                }
                let id = 0;
                lembretes[dataFormatada].forEach(lembrete => {
                    id += 1;
                }); // incrementa o id a cada lembrete que esta na data
                novoLembrete.addId(id);
                lembretes[dataFormatada].push(novoLembrete);
                console.log("Lembrete adicionado: ", lembretes[dataFormatada]);
            } else {
                novoLembrete.addId(0);
                lembretes[dataFormatada] = [novoLembrete];
                console.log("Lembrete criado: ", lembretes[dataFormatada]);
            }
            return { lembretes };
        });
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
        const data = moment(dataValue).utc();
        const dataLocal = moment(data).local();
        console.log("Parsed Date: ", data);
        console.log("Local Date: ", dataLocal);
        this.criarLembrete(nome, dataLocal);
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