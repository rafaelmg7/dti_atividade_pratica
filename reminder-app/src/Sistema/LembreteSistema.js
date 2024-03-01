import React, { Component } from "react";
import moment from "moment";
import axios from 'axios';
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
    
    componentDidMount() {
        this.getLembretes();
    }

    deletaLembrete = async (lembreteId) => {
        try {
          await axios.delete(`http://localhost:5000/lembretes/${lembreteId}`);
          this.getLembretes();
        } catch (error) {
          console.error("Erro ao tentar deletar o lembrete:", error);
          const errorMessage = error.response?.data?.message || "Erro ao buscar os lembretes!";
          this.setState({ mensagemErro: errorMessage });
        }
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
    
    getLembretes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/lembretes');
            this.setState({ lembretes: response.data['lembretes'] });
        } catch (error) {
            console.error("Erro ao buscar os lembretes: ", error);
            const errorMessage = error.response?.data?.message || "Erro ao buscar os lembretes!";
            this.setState({ mensagemErro: errorMessage });
        }
    };

    validaFormulario = (nome, data) => {
        if (!nome.trim() || !data.isValid()) {
            this.setState({ mensagemErro: "Erro! O nome e a data são obrigatórios!" });
            console.log("entrou aqui");
            return false;
        }

        const dataInformada = new Date(data);
        const dataAtual = new Date();

        if (dataInformada <= dataAtual) {
            console.log("Data inválida"); 
            this.setState({ mensagemErro: "Erro! A data informada deve estar no futuro!" });
            return false;
        }

        // Se chegou até aqui, o formulário é válido
        this.setState({ mensagemErro: "" });
        return true;
    }
    
    handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const nome = formData.get('nome');
        const dataValue = formData.get('data');

        const data = moment(dataValue).utc().local();

        if(this.validaFormulario(nome, data)){
            const dataFormatada = data.toISOString().split('T')[0];
            try{
                const response = await axios.post('http://localhost:5000/lembretes', {
                    nome: nome,
                    data: dataFormatada
                });
                this.setState({ mensagemErro: "" });
                this.getLembretes();
            }catch(error){
                const message = error.response?.data?.message || 'Algo deu errado.';
                console.error("Erro ao criar o lembrete: ", error);
                this.setState({ mensagemErro: message });
            }
        }
            
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
                                        required
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
                                        required
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
                                    <p className="dataLista" key={index}>{this.formataData(lembreteData.data)}</p>
                                    <ul>
                                        {lembreteData.lembretes.map((lembrete, idx) => (
                                        <div className="elementoLista"> 
                                            <li key={idx} className="nomeLista">{lembrete.nome}</li>
                                            <CloseButton className="botao_deletar" onClick={() => this.deletaLembrete(lembrete.id)} />
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