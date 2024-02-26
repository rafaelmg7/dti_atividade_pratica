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
        const dataCerta = new Date(data);
        const dataFormatada = dataCerta.toLocaleDateString();

        const existeLembretes = this.state.lembretes[dataFormatada] || [];
        const estaDuplicado = existeLembretes.some(reminder => reminder.nome === nome);

        if (!estaDuplicado) {
            const novoLembrete = new Lembrete(nome, dataCerta);
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
        const lembretesOrdenados = Object.keys(this.state.lembretes).sort();
        return lembretesOrdenados.map(data => ({
            data,
            lembretes: this.state.lembretes[data],
        }));
    };

    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const nome = event.target.nome.value;
        const data = new Date(form.elements.data.value);
        this.criarLembrete(nome, data);
        form.reset();
    }

    render(){
        const lembretesOrdenados = this.ordenaDatas();
        return(
            <div>
                <h2>Sistema de Lembretes</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                        <input type="text" name="nome" />
                    </label>
                    <label>
                        Data:
                        <input type="date" name="data" />
                    </label>
                    <button type="submit">Adicionar Lembrete</button>
                </form>
                {lembretesOrdenados.map((lembreteData, index) => (
                    <div key={index}>
                        <h3>{lembreteData.data}</h3>
                        <ul>
                            {lembreteData.lembretes.map((lembrete, idx) => (
                                <li key={idx}>{lembrete.nome}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };
}

export default LembreteSistema;