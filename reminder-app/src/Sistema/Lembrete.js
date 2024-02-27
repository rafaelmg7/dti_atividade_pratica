//import React, { Component } from 'react';

class Lembrete{
    constructor(nome, data){
        this.nome = nome;
        this.data = data;
    };

    addId(id) {
        this.id = id;
    };

    getNome(){
        return this.nome;
    };
    getData(){
        return this.data;
    };
    getId(){
        return this.id;
    };
}

export default Lembrete;