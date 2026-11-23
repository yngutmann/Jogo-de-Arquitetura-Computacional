# Encaixe de Arquitetura Computacional

Jogo de encaixe de termos que roda no navegador para treinar os conceitos da aula de Tópicos de Arquitetura Computacional (SPTECH, Sprint 3). Feito com HTML, CSS e JavaScript puros.

**Site publicado:** https://SEU-USUARIO.github.io/arqcomp-cruzadinha/

## Como jogar

1. Clique numa casa numerada para ler a pista dela.
2. Escolha o termo certo na lista: clique nele ou arraste até a casa. O termo vai para a casa selecionada.
3. Para trocar, arraste um termo de uma casa para outra, ou solte-o na lista para devolvê-lo.
4. **Dica** mostra a letra inicial e o número de letras da palavra da casa selecionada. **Mostrar resposta** encaixa o termo certo nela.
5. Clique em **Conferir** para ver o que está certo (verde) e errado (vermelho). O contador mostra, por exemplo, "8 de 15 palavras".
6. Clique em **Reiniciar** para começar de novo.

## Palavras e pistas

| Nº | Termo | Pista |
|---|---|---|
| 1 | Microcontrolador | Um computador inteiro dentro de um só chip, como o cérebro do Arduino. |
| 2 | RAM | A “mesa de trabalho” do computador: guarda o que está aberto e some ao desligar. |
| 3 | ULA | Parte do cérebro do computador que faz as contas: soma, subtrai e compara números. |
| 4 | Data bus | “Estrada” de mão dupla que leva a informação entre CPU, memória e aparelhos. |
| 5 | Flash | Usada em pen drives e cartões de celular; guarda dados mesmo sem energia. |
| 6 | Registradores | Gavetinhas minúsculas dentro do cérebro do computador, ultrarrápidas, que seguram os números do momento. |
| 7 | DMA | Deixa aparelhos ligados ao computador enviarem dados à RAM sem incomodar a CPU. |
| 8 | ROM | Guarda as instruções de fábrica; não some ao desligar e o usuário não consegue mudar. |
| 9 | Dual core | Cérebro do computador com dois núcleos, ou seja, duas partes trabalhando juntas. |
| 10 | Cache | Atalho super rápido que guarda o que a CPU mais usa, para ela não esperar. |
| 11 | UC | Parte do cérebro do computador que age como chefe, mandando cada peça o que fazer. |
| 12 | Address bus | “Estrada” de mão única onde a CPU informa o local que quer acessar. |
| 13 | EEPROM | Guarda pequenas configurações mesmo desligada, e dá para trocar um dado de cada vez. |
| 14 | CPU | O “cérebro” do computador: é ele que executa as ordens dos programas. |
| 15 | Memória de massa | O “armário” do computador: guarda fotos, vídeos e programas para sempre, como HD ou SSD. |

## Diferença entre as memórias (e o DMA)

Resumo rápido, em linguagem simples:

| Termo | O que é | Perde os dados ao desligar? | Pode ser regravada? | Onde aparece |
|---|---|---|---|---|
| cache | Memória pequena e muito rápida, perto da CPU, com cópias do que ela mais usa | Sim | Sim | Dentro ou ao lado da CPU |
| RAM | Memória principal de trabalho, guarda programas e dados em uso | Sim | Sim, o tempo todo | Pentes de memória do computador |
| ROM | Memória gravada de fábrica, guarda o programa de inicialização (firmware) | Não | Não (só leitura) | Placa-mãe, aparelhos eletrônicos |
| EEPROM | Memória que guarda pequenas configurações e permite trocar um byte por vez | Não | Sim, byte a byte | Arduino, chaves de carro, configurações |
| Flash | Memória que guarda muitos dados e é apagada e regravada em blocos | Não | Sim, em blocos | Pen drive, cartão SD, SSD |
| DMA | **Não é memória.** É um recurso que deixa aparelhos trocarem dados com a RAM sem passar pela CPU | não se aplica | não se aplica | Discos, placas de som e de rede |

**Em uma frase cada:**
- **Voláteis** (perdem tudo sem energia): cache e RAM.
- **Não voláteis** (guardam sem energia): ROM, EEPROM e Flash.
- **Velocidade, em geral:** cache é mais rápida que a RAM, e a RAM é mais rápida que Flash, EEPROM e ROM.
- **ROM, EEPROM e Flash:** a ROM não é regravada pelo usuário; a EEPROM muda um byte por vez; a Flash muda em blocos.
- **DMA:** serve para a CPU não ficar ocupada só copiando dados de um lugar para outro.
