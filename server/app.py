from uuid import uuid4

from flask import Flask, jsonify, request
from flask_cors import CORS
from lembrete import Lembrete

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

LEMBRETES = {}

def validate_lembrete(nome, data):
    if not nome or not data:
        return False, 'Falha ao adicionar lembrete.'
    return True, ''

def lembrete_exists(nome, data):
    return any(lembrete for lembrete in LEMBRETES.get(data, []) if lembrete['nome'] == nome)

# Routes
@app.route('/lembretes', methods=['GET', 'POST'])
def all_lembretes():
    response_object = {'status': 'success'}
    response_code = 200
    if request.method == 'POST':
        post_data = request.get_json()
        nome = post_data.get('nome')
        data = post_data.get('data')
        valid, message = validate_lembrete(nome, data)
        
        if not valid:
            return jsonify({'status': 'fail', 'message': message}), 400
        
        if lembrete_exists(nome, data):
            return jsonify({'status': 'fail', 'message': "Erro! Já existe um lembrete com este nome para a data informada!"}), 409
        

        new_id = str(uuid4())
        new_lembrete = Lembrete(nome, data)
        new_lembrete.id = new_id
        # new_lembrete = {"id": new_id, "nome": nome, "data": data}
        
        if data not in LEMBRETES:
            LEMBRETES[data] = []
        LEMBRETES[data].append({
            "id": new_lembrete.id,
            "nome": new_lembrete.nome,
            "data": new_lembrete.data
        })

        response_object['message'] = 'Lembrete adicionado!'
        response_code = 201
    else:
        response_object['lembretes'] = LEMBRETES
        
    return jsonify(response_object), response_code

@app.route('/lembretes/<lembrete_id>', methods=['DELETE'])
def single_lembrete(lembrete_id):
    response_object = {'status': 'fail', 'message': 'Lembrete não encontrado!'}
    response_code = 404
    
    for data, lembretes in LEMBRETES.items():
        lembrete_a_remover = next((lembrete for lembrete in lembretes if lembrete['id'] == lembrete_id), None)

        # Caso o lembrete a ser removido de fato exista, remove-o e retorna uma resposta de sucesso
        if lembrete_a_remover:
            lembretes.remove(lembrete_a_remover)
            response_object = {'status': 'success', 'message': 'Lembrete removido!'}
            response_code = 200

            # Caso a lista de lembretes para a data informada esteja vazia, remove aquela data da lista de lembretes
            if lembretes == []:
                del LEMBRETES[data]
            break
    
    return jsonify(response_object), response_code

if __name__ == '__main__':
    app.run()
