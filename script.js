// Cada item: id = grafia da resposta, nome = como aparece no termo, p = pista.
// A ordem desta lista é a numeração das casas.
const ITENS = [
  { id: "MICROCONTROLADOR", nome: "Microcontrolador", p: "Um computador inteiro dentro de um só chip, como o cérebro do Arduino." },
  { id: "RAM", nome: "RAM", p: "A “mesa de trabalho” do computador: guarda o que está aberto e some ao desligar." },
  { id: "ULA", nome: "ULA", p: "Parte do cérebro do computador que faz as contas: soma, subtrai e compara números." },
  { id: "DATABUS", nome: "Data bus", p: "“Estrada” de mão dupla que leva a informação entre CPU, memória e aparelhos." },
  { id: "FLASH", nome: "Flash", p: "Usada em pen drives e cartões de celular; guarda dados mesmo sem energia." },
  { id: "REGISTRADORES", nome: "Registradores", p: "Gavetinhas minúsculas dentro do cérebro do computador, ultrarrápidas, que seguram os números do momento." },
  { id: "DMA", nome: "DMA", p: "Deixa aparelhos ligados ao computador enviarem dados à RAM sem incomodar a CPU." },
  { id: "ROM", nome: "ROM", p: "Guarda as instruções de fábrica; não some ao desligar e o usuário não consegue mudar." },
  { id: "DUALCORE", nome: "Dual core", p: "Cérebro do computador com dois núcleos, ou seja, duas partes trabalhando juntas." },
  { id: "CACHE", nome: "Cache", p: "Atalho super rápido que guarda o que a CPU mais usa, para ela não esperar." },
  { id: "UC", nome: "UC", p: "Parte do cérebro do computador que age como chefe, mandando cada peça o que fazer." },
  { id: "ADDRESSBUS", nome: "Address bus", p: "“Estrada” de mão única onde a CPU informa o local que quer acessar." },
  { id: "EEPROM", nome: "EEPROM", p: "Guarda pequenas configurações mesmo desligada, e dá para trocar um dado de cada vez." },
  { id: "CPU", nome: "CPU", p: "O “cérebro” do computador: é ele que executa as ordens dos programas." },
  { id: "MEMORIADEMASSA", nome: "Memória de massa", p: "O “armário” do computador: guarda fotos, vídeos e programas para sempre, como HD ou SSD." },
];

const N = ITENS.length;
const porId = Object.fromEntries(ITENS.map(i => [i.id, i]));
const el = id => document.getElementById(id);
const tabuleiro = el("tabuleiro"), termos = el("termos"), pistaAtual = el("pista-atual");

let casas, marcas, reveladas, dicas, sel, ordemTermos;

function embaralhar(v) {
  const a = v.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function iniciar() {
  casas = Array(N).fill(null);   // casas[i] = id do termo encaixado
  marcas = Array(N).fill("");    // "", "ok" ou "err"
  reveladas = Array(N).fill(false);
  dicas = Array(N).fill(false);
  sel = 0;
  ordemTermos = embaralhar(ITENS.map(i => i.id));
  el("barra").style.width = "0";
  el("contador").textContent = "0 de " + N + " palavras";
  desenhar();
}

function desenhar() {
  // Casas
  tabuleiro.innerHTML = "";
  casas.forEach((id, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "casa " + (id ? "cheia" : "vazia") + (i === sel ? " sel" : "") +
      (marcas[i] ? " " + marcas[i] : "") + (reveladas[i] ? " rev" : "");
    b.setAttribute("aria-label", "Casa " + (i + 1) + (id ? ": " + porId[id].nome : ": vazia"));
    const n = document.createElement("span");
    n.className = "n"; n.textContent = i + 1;
    b.appendChild(n);
    if (id) {
      b.appendChild(document.createTextNode(porId[id].nome));
      b.draggable = true;
      b.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", id + "|" + i));
    }
    b.addEventListener("click", () => { sel = i; desenhar(); });
    b.addEventListener("dragover", e => { e.preventDefault(); b.classList.add("sobre"); });
    b.addEventListener("dragleave", () => b.classList.remove("sobre"));
    b.addEventListener("drop", e => {
      e.preventDefault();
      const [tid, de] = e.dataTransfer.getData("text/plain").split("|");
      if (!porId[tid]) return;
      soltar(tid, Number(de), i);
    });
    tabuleiro.appendChild(b);
  });

  // Termos que ainda não foram encaixados
  termos.innerHTML = "";
  ordemTermos.filter(id => !casas.includes(id)).forEach(id => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = porId[id].nome;
    b.draggable = true;
    b.addEventListener("dragstart", e => e.dataTransfer.setData("text/plain", id + "|-1"));
    b.addEventListener("click", () => encaixar(id, sel, true));
    termos.appendChild(b);
  });

  // Pista da casa selecionada
  const item = ITENS[sel];
  pistaAtual.textContent = (sel + 1) + ". " + item.p;
  if (dicas[sel]) {
    const d = document.createElement("em");
    d.textContent = "Dica: começa com “" + item.id[0] + "” e tem " + item.id.length + " letras.";
    pistaAtual.appendChild(d);
  }
}

// Coloca o termo na casa i; quem estava lá volta para a lista de termos
function encaixar(id, i, avancar) {
  const antiga = casas.indexOf(id);
  if (antiga >= 0) { casas[antiga] = null; marcas[antiga] = ""; reveladas[antiga] = false; }
  casas[i] = id; marcas[i] = ""; reveladas[i] = false;
  if (avancar) {
    const prox = casas.findIndex((c, k) => !c && k > i);
    const qualquer = casas.findIndex(c => !c);
    sel = prox >= 0 ? prox : qualquer >= 0 ? qualquer : i;
  } else sel = i;
  desenhar();
}

// Arrastar: de uma casa para outra troca os termos
function soltar(id, de, para) {
  if (de >= 0 && de !== para) {
    const outro = casas[para];
    casas[de] = outro; marcas[de] = ""; reveladas[de] = false;
    casas[para] = id; marcas[para] = ""; reveladas[para] = false;
    sel = para; desenhar();
  } else if (de < 0) encaixar(id, para, false);
}

// Soltar na lista de termos devolve o termo
termos.addEventListener("dragover", e => { e.preventDefault(); termos.classList.add("sobre"); });
termos.addEventListener("dragleave", () => termos.classList.remove("sobre"));
termos.addEventListener("drop", e => {
  e.preventDefault(); termos.classList.remove("sobre");
  const [id, de] = e.dataTransfer.getData("text/plain").split("|");
  if (Number(de) >= 0) { casas[de] = null; marcas[de] = ""; reveladas[de] = false; desenhar(); }
});

el("btn-conferir").addEventListener("click", () => {
  let certas = 0;
  casas.forEach((id, i) => {
    const ok = id === ITENS[i].id;
    marcas[i] = ok ? "ok" : "err";
    if (ok) certas++;
  });
  el("barra").style.width = (certas / N * 100) + "%";
  el("contador").textContent = certas + " de " + N + " palavras";
  desenhar();
});

el("btn-dica").addEventListener("click", () => { dicas[sel] = true; desenhar(); });

el("btn-resposta").addEventListener("click", () => {
  encaixar(ITENS[sel].id, sel, false);
  reveladas[sel] = true;
  desenhar();
});

el("btn-reiniciar").addEventListener("click", iniciar);
iniciar();
