import React, { Component } from "react";
import moment from "moment";
import Lembrete from "./Lembrete";
import { Button, CloseButton } from "react-bootstrap";
import "./LembreteSistema.css";

class LembreteSistema extends Component{
    constructor(props){
        super(props);
        this.state = {
            lembretes: {},
            mensagemErro: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    criarLembrete = (nome, data) => {
        const dataInformada = new Date(data);
        const dataAtual = new Date();

        if (!nome || !data) {
            this.setState({ mensagemErro: "Erro! O nome e a data são obrigatórios!" });
            return;
        }

        if (dataInformada <= dataAtual) {
            console.log("Data inválida"); 
            this.setState({ mensagemErro: "Erro! A data informada deve estar no futuro!" });
            return;
        } else {
            this.setState({ mensagemErro: "" });

            const dataFormatada = data.toISOString().split('T')[0];
            const novoLembrete = new Lembrete(nome, dataFormatada);

            this.setState(prevState => {
                const lembretes = { ...prevState.lembretes };
                console.log("Lembrete antes de adicionar: ", lembretes);
                if (dataFormatada in lembretes) {
                    const lembreteExistente = lembretes[dataFormatada].find(lembrete => lembrete.nome === nome);
                    if (lembreteExistente) {
                        console.log("Lembrete já existe");
                        // this.setState({ mensagemErro: "Erro! Já existe um lembrete com este nome para a data informada!" });
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
        }
    };

    deletaLembrete = (nome, data) => {
        // const dataFormatada = data.toISOString().split('T')[0];
        const dataFormatada = data;
        this.setState(prevState => {
            const lembretes = { ...prevState.lembretes };
            if(dataFormatada in lembretes){
                lembretes[dataFormatada] = lembretes[dataFormatada].filter(
                    lembrete => lembrete.nome !== nome
                );
                if(lembretes[dataFormatada].length === 0){
                    delete lembretes[dataFormatada];
                }
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
                            <Button className="botao" variant="primary" size="lg" type="submit">Criar</Button>
                        </form>
                        {this.state.mensagemErro && <div className="mensagemErro">{this.state.mensagemErro}</div>}
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
                                        <div className="elementoLista"> 
                                            <li key={idx} className="nomeLista">{lembrete.nome}</li>
                                            <CloseButton className="botao_deletar" onClick={() => this.deletaLembrete(lembrete.nome, lembreteData.data)} />
                                        </div>
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