import React, { Component } from "react";
import Lembrete from "./Lembrete";

class LembreteSistema extends Component{
    constructor(props){
        super(props);
        this.state = {
            lembretes: {}
        }
    }

    criarLembrete = (nome, data) => {
        const novoLembrete = new Lembrete(nome, data);
        const dataFormatada = novoLembrete.getData().toLocaleDateString();

        this.setState(prevState =>{
            // const lembretes = {nome: novoLembrete.getNome(), data: dataFormatada};
            const lembretes = { ...prevState.lembretes}
            if(lembretes[dataFormatada]){
                lembretes[dataFormatada].push(novoLembrete);
            }
            else{
                lembretes[dataFormatada] = [novoLembrete];
            }
            console.log(lembretes[dataFormatada]);
            return {lembretes};
        });
        
    };

    ordenaDatas = () => {
        const lembretesOrdenados = Object.keys(this.state.lembretes).sort();
        return lembretesOrdenados.map(data => ({
            data,
            lembretes: this.state.lembretes[data],
        }));
    };

    render(){
        return(
            <div>
                <h1>Lembrete</h1>
                <form id="reminder-form" onSubmit={this.criarLembrete}>
                    <input type="text" id="name" placeholder="Nome" />
                    <input type="date" id="date" />
                    <button type="submit">Adicionar Lembrete</button>
                </form>
                <ul id="reminder-list">
                    {this.state.lembretes.map((lembrete, index) => (
                        <li key={index}>
                            {lembrete.data}:
                            {lembrete.lembretes.map((lembreteItem, lembreteIndex) => (
                                <div key={lembreteIndex}>
                                    <p>{lembreteItem.nome}</p>
                                </div>
                            ))}
                        </li>
                    ))}
                    
                    {/* /* {this.state.lembretes.map(lembrete => <li key={lembrete.nome}>{lembrete}</li>)} */}

                </ul>
            </div>
        );
    };
}

export default LembreteSistema;