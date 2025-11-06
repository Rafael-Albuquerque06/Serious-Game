// js/jogo.js
class CodeBreakerMission {
    constructor() {
        this.nivelAtual = 0;
        this.pontuacao = 0;
        this.vidas = 3;
        this.niveis = [
            {
                tipo: "cesar",
                titulo: "Missão 1: Cifra de César",
                descricao: "Descriptografe a mensagem usando Cifra de César com chave = 5",
                mensagemCifrada: "mjqqt hjxfw",
                chave: 5,
                respostaCorreta: "hello cesar"
            },
            {
                tipo: "deslocamento",
                titulo: "Missão 2: Cifra de Deslocamento ASCII",
                descricao: "Descriptografe a mensagem usando Cifra de Deslocamento com chave = 3",
                mensagemCifrada: "Pds#456$",
                chave: 3,
                respostaCorreta: "map 123!"
            },
            {
                tipo: "substituicao",
                titulo: "Missão 3: Cifra de Substituição",
                descricao: "Descriptografe a mensagem usando Cifra de Substituição (ROT13)",
                mensagemCifrada: "Uryyb Jbeyq",
                chave: "rot13",
                respostaCorreta: "hello World"
            }
        ];
        
        this.inicializarJogo();
    }

    inicializarJogo() {
        this.atualizarInterface();
        this.configurarEventos();
    }

    atualizarInterface() {
        const nivel = this.niveis[this.nivelAtual];
        
        document.getElementById('titulo-nivel').textContent = nivel.titulo;
        document.getElementById('descricao-nivel').textContent = nivel.descricao;
        document.getElementById('mensagem-cifrada').textContent = nivel.mensagemCifrada;
        document.getElementById('pontuacao').textContent = this.pontuacao;
        document.getElementById('vidas').textContent = this.vidas;
        document.getElementById('resposta-input').value = '';
        
        // Mostrar dica baseada no tipo de cifra
        this.mostrarDica(nivel.tipo);
    }

    mostrarDica(tipoCifra) {
        const dicaElement = document.getElementById('dica');
        
        switch(tipoCifra) {
            case "cesar":
                dicaElement.innerHTML = `
                    <h5 class="text-warning">Dica:</h5>
                    <p class="text-light">Use a fórmula: Letra original = (Letra cifrada - chave) mod 26</p>
                    <p class="text-light">Lembre-se: A chave é ${this.niveis[this.nivelAtual].chave}</p>
                    <p class="text-light">Exemplo: A = 0, m → h (m(12) - 5 = h(7))</p>
                    <div class="text-center mt-3">
                        <img src="img/Alfabeto.png" alt="Alfabeto" class="img-fluid" style="max-width: 300px;">
                    </div>
                `;
                break;
            case "deslocamento":
                dicaElement.innerHTML = `
                    <h5 class="text-warning">Dica:</h5>
                    <p class="text-light">Desloque cada caractere ${this.niveis[this.nivelAtual].chave} posições na tabela ASCII</p>
                    <p class="text-light">Exemplo: P(80) - 3 = M(77)</p>
                    <div class="text-center mt-3">
                        <img src="img/ASCII.png" alt="Tabela ASCII" class="img-fluid" style="max-width: 400px;">
                    </div>
                `;
                break;
            case "substituicao":
                dicaElement.innerHTML = `
                    <h5 class="text-warning">Dica:</h5>
                    <p class="text-light">Use ROT13: A↔N, B↔O, C↔P, etc.</p>
                    <p class="text-light">A B C D E F G H I J K L M</p>
                    <p class="text-light">N O P Q R S T U V W X Y Z</p>
                    <div class="text-center mt-3">
                        <img src="img/Substituição.png" alt="Substituição de letra" class="img-fluid" style="max-width: 300px;">
                    </div>
                `;
                break;
        }
    }

    configurarEventos() {
        document.getElementById('verificar-resposta').addEventListener('click', () => {
            this.verificarResposta();
        });

        document.getElementById('resposta-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.verificarResposta();
            }
        });
    }

    verificarResposta() {
        const respostaUsuario = document.getElementById('resposta-input').value.toLowerCase().trim();
        const respostaCorreta = this.niveis[this.nivelAtual].respostaCorreta.toLowerCase();
        
        if (respostaUsuario === respostaCorreta) {
            this.pontuacao += 10;
            this.proximoNivel();
        } else {
            this.vidas--;
            this.mostrarMensagem("Resposta incorreta! Tente novamente.", "danger");
            
            if (this.vidas <= 0) {
                this.fimDeJogo();
            } else {
                this.atualizarInterface();
            }
        }
    }

    proximoNivel() {
        this.nivelAtual++;
        
        if (this.nivelAtual < this.niveis.length) {
            this.mostrarMensagem("Correto! Avançando para a próxima missão.", "success");
            this.atualizarInterface();
        } else {
            this.vitoria();
        }
    }

    mostrarMensagem(mensagem, tipo) {
        const mensagemElement = document.getElementById('mensagem');
        mensagemElement.textContent = mensagem;
        mensagemElement.className = `alert alert-${tipo} mt-3`;
        mensagemElement.style.display = 'block';
        
        setTimeout(() => {
            mensagemElement.style.display = 'none';
        }, 3000);
    }

    vitoria() {
        document.getElementById('conteudo-jogo').innerHTML = `
            <div class="col-12 text-center">
                <h2 class="text-success">Missão Cumprida!</h2>
                <p class="text-light">Parabéns, agente! Você descriptografou todas as mensagens.</p>
                <p class="text-light">Sua pontuação final: ${this.pontuacao}</p>
                <button class="btn btn-success mt-3" onclick="location.reload()">Jogar Novamente</button>
            </div>
        `;
    }

    fimDeJogo() {
        document.getElementById('conteudo-jogo').innerHTML = `
            <div class="col-12 text-center">
                <h2 class="text-danger">Missão Falhou!</h2>
                <p class="text-light">Você perdeu todas as suas vidas.</p>
                <p class="text-light">Sua pontuação final: ${this.pontuacao}</p>
                <button class="btn btn-success mt-3" onclick="location.reload()">Tentar Novamente</button>
            </div>
        `;
    }
}

// Inicializar o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new CodeBreakerMission();
});