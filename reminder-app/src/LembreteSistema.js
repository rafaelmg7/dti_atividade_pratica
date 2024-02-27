import React, { Component } from "react";
import Lembrete from "./Lembrete";

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
        const estaDuplicado = existeLembretes.some(reminder => reminder.nome === nome);
    
        if (!estaDuplicado) {
            const novoLembrete = new Lembrete(nome, data);
            this.setState(prevState => {
                const lembretes = { ...prevState.lembretes };
                if (lembretes[dataFormatada]) {
                    lembretes[dataFormatada].push(novoLembrete);
                } else {
                    lembretes[dataFormatada] = [novoLembrete];
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
                <h2>Novo Lembrete</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" name="nome" />
                    </label>
                    <label>
                        Data:
                        <input type="date" name="data" />
                    </label>
                    <button type="submit">Criar</button>
                </form>
                <h2>Lista de lembretes</h2>
                <p></p>
                {lembretesOrdenados.map((lembreteData, index) => {;
                    return (
                        <div key={index}>
                            <p>{this.formataData(lembreteData.data)}</p>
                            <ul>
                                {lembreteData.lembretes.map((lembrete, idx) => (
                                    <li key={idx}>{lembrete.nome}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    };
}

export default LembreteSistema;