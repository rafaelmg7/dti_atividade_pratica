//import React, { Component } from 'react';

class Lembrete{
    constructor(nome, data){
        this.nome = nome;
        this.data = data;
    };

    getNome(){
        return this.nome;
    };
    getData(){
        return this.data;
    }
}

export default Lembrete;