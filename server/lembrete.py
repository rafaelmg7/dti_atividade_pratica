class Lembrete:
    def __init__(self, nome, data):
        self.nome = nome
        self.data = data
        self.id = 0

    def exibir(self):
        print(f"Nome: {self.nome}")
        print(f"Data: {self.data}")