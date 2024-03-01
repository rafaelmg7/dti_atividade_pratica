# Reminder App: dti_atividade_pratica
Bem-vindo ao repositório do Reminder App, seu local para criar e gerenciar lembretes facilmente.

## INFORMAÇÕES GERAIS
Este repositório serve como armazenamento para o nosso Sistema de Criação de Lembretes desenvolvido durante a Imersão DTI Digital + UFMG (26/02 e 27/02).

**Membros da Equipe:**
- Júlio Pontes | Engenharia de Controle e Automação
- Rafael Martins | Ciência da Computação
- Samuel Viana | Ciência da Computação


**Nome do Sistema:** Reminder App (Versão 1.0)


## DECISÕES DO PROJETO
A versão 1.0 priorizou as funcionalidades essenciais do sistema para atender ao prazo de entrega.
Testes unitários para front-end e back-end serão realizados na próxima fase.
Mais melhorias estão programadas para próximas iterações.


## FUNCIONALIDADES/CARACTERÍSTICAS DO SISTEMA
O sistema oferece dois campos de entrada:
- **“Nome do lembrete”**
- **“Data”**.

Para salvar um lembrete, basta clicar no botão "Criar".

Há uma lista de lembretes criados, ordenados em ordem cronológica (DO mais recente PARA mais antigo).

A criação de lembretes para datas passadas ou inválidas é restrita. Em tais casos, uma mensagem é exibida ao usuário, e o lembrete não é criado.

Lembretes existentes podem ser excluídos ao clicar no botão "X" ao lado de seus nomes.


## TECNOLOGIAS UTILIZADAS
O projeto utiliza as seguintes tecnologias:

- **Javascript**; 
- **React**;
- **HTML**;
- **CSS**;

## SETUP/INSTALAÇÃO
1)	Instale o Node.js e npm em sua máquina, de acordo com seu sistema operacional.
2)	Baixe o **“reminder-app”** em sua máquina, sinta-se livre para clonar o repositório.
3)	Concluído!


## EXECUÇÃO
### BACK-END:
Rode os seguintes comandos numa janela de terminal:

```
$ cd server
$ python3 -m venv env
$ source env/bin/activate
(env)$ pip install -r requirements.txt
(env)$ flask run --debug 
```

### FRONT-END:
1)	Abra o Prompt de Comando.
2)  Navegue até a pasta "reminder-app" usando o comando:
```
cd /*caminho_para_o_diretorio*/reminder-app
```
3)	Digite o comando para instalar as dependências necessárias:
```
npm install
```
4)	Digite o comando para iniciar o sistema em seu navegador: 
```
npm start
```
5)	Para executar a compilação do sistema, digite o comando:
```
npm run build
```
6)	Concluído! Navegue para [http://localhost:3000](http://localhost:3000)

## Contato

Para quaisquer dúvidas, sugestões ou se você encontrar algum bug no sistema, sinta-se à vontade para nos contatar via GitHub ou através dos e-mails:

- Julio: [juliocontato@outlook.com.br](mailto:juliocontato@outlook.com.br) 
- Rafael: [rafaelmgomes.dev@gmail.com](mailto:rafaelmgomes.dev@gmail.com) 
- Samuel: [samuelsnviana@gmail.com](mailto:samuelviana@gmail.com)
