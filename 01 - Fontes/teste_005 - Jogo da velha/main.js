const play1 = 'o';
const play2 = 'x';
var playTime = play1;
var playOver = false;

$('#T1').addClass('destaqueImg');

class JogoDaVelha {

    constructor() {

        this.jogadas = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ];
        this.vez = null;
        this.acabou = false;
        this.nroJogada = 0;
    }

    jogar(linha, coluna) {
        if (this.acabou || this.jogadas[linha][coluna] !== null) {
            return;
        }
        this.jogadas[linha][coluna] = this.vez;
        this.verificarFimDeJogo(linha, coluna);
        this.nroJogada = nroJogada++;
    }

    verificarLinha(linha) {
        const primeiraColuna = this.jogadas[linha][0];
        for (let i = 0; i < this.jogadas.length; i++) {
            if (!this.jogadas[linha][i] || this.jogadas[linha][i] !== primeiraColuna) {
                return false;
            }
        }
        return primeiraColuna;
     }

    verificarColuna(coluna) {
        const primeiraLinha = this.jogadas[0][coluna];
        for (let i = 0; i < this.jogadas[0].length; i++) {
            if (!this.jogadas[i][coluna] || this.jogadas[i][coluna] !== primeiraLinha) {
                return false;
            }
        }
        return primeiraLinha;
    }

    verificarDiagonal(coluna, variavel) {
        let colPos = coluna
        const posicaoDeReferencia = this.jogadas[1][1];
        for (let i = 0; i < this.jogadas.length; i++) {
            if (!this.jogadas[i][colPos] || this.jogadas[i][colPos] !== posicaoDeReferencia) {
                return false;
            } colPos = colPos + variavel
        }
        return posicaoDeReferencia;
    }

    verificarFimDeJogo(linha, coluna) {
        if (nroJogada>=5) {
            if ((this.verificarLinha(linha)) ||
                (this.verificarColuna(coluna)) ||
                (this.verificarDiagonal(0, 1)) ||
                (this.verificarDiagonal(2, -1))) {
                console.log('jogo acabou!');
                console.log('O vencedor foi: ' + this.vez);
            }
            return false;
        }
    }
}

const fJogo = new JogoDaVelha();

function atualizaTitulo () {
  if (playTime == play1) {
    if ($('#T1').hasClass('destaqueImg')) {
      return;
    } else {
      $('#T1').addClass('destaqueImg');
      if ($('#T2').hasClass('destaqueImg')) {
        $('#T2').removeClass('destaqueImg');
      } else {
        return;
      }
    }
  } else {
    if ($('#T2').hasClass('destaqueImg')) {
      return;
    } else {
      $('#T2').addClass('destaqueImg');
      if ($('#T1').hasClass('destaqueImg')) {
        $('#T1').removeClass('destaqueImg');
      } else {
        return;
      }
    }
  }
}

function jogar(jogador, posicao) {
  if (playOver) {
    return;
  } else {
    if ($('#' + posicao).hasClass('bola')) {
      return;
    } else {
      if ($('#' + posicao).hasClass('xis')) {
        return;
      } else {
        $('#' + posicao + 'b').addClass(jogador);
        $('#' + posicao)[0].setAttribute('move', playTime);
        if (playTime == play1) {
          playTime = play2;
        } else {
          playTime = play1;
        }
        atualizaTitulo();
      }
      vencedor();
    }
  }
}

function vencedor() {

  var a1 = $('#A1').attr('move');
  var a2 = $('#A2').attr('move');
  var a3 = $('#A3').attr('move');

  var b1 = $('#B1').attr('move');
  var b2 = $('#B2').attr('move');
  var b3 = $('#B3').attr('move');

  var c1 = $('#C1').attr('move');
  var c2 = $('#C2').attr('move');
  var c3 = $('#C3').attr('move');

  let ganha = ''
  let divGanha = ''
  let imgGanha = ''

  if (a1 != '' && a1 == b2 && a1 == c3)
      {
        ganha = a1;
        divGanha = dia1;
        imgGanha = 'reta_d1'
      }

  else if (a3 != '' && a3 == b2 && a3 == c1)
      {
        ganha = a3;
        divGanha = dia2;
        imgGanha = 'reta_d2'
      }

  else if (a1 != '' && a1 == b1 && a1 == c1)
      {
        ganha = a1;
        divGanha = col1;
        imgGanha = 'reta_v'
      }

  else if (a2 != '' && a2 == b2 && a2 == c2)
      {
        ganha = a2;
        divGanha = col2;
        imgGanha = 'reta_v'
      }

  else if (a3 != '' && a3 == b3 && a3 == c3)
      {
        ganha = a3;
        divGanha = col3;
        imgGanha = 'reta_v'
      }

  else if (a1 != '' && a1 == a2 && a1 == a3)
      {
        ganha = a1;
        divGanha = lin1;
        imgGanha = 'reta_h'
      }

  else if (b1 != '' && b1 == b2 && b1 == b3)
      {
        ganha = b1;
        divGanha = lin2;
        imgGanha = 'reta_h'
      }

  else if (c1 != '' && c1 == c2 && c1 == c3)
      {
        ganha = c1;
        divGanha = lin3;
        imgGanha = 'reta_h'
      }

  if (ganha != '') {
    playOver = true;
    if (ganha == 'o') {
      $('#ganhador').addClass('bola');
    } else {
      $('#ganhador').addClass('xis');
    }
    $(divGanha).addClass(imgGanha);
  }

}

function onClickImg(ev) {
  if (ev.currentTarget.attributes.id.nodeValue == 'T1') {
    playTime = play1
  } else {
    playTime = play2
    }
  atualizaTitulo();
}

function onClickTab(ev) {
  if (playTime == play1) {
    jogar('bola', ev.currentTarget.attributes.id.nodeValue);
  } else {
    jogar('xis', ev.currentTarget.attributes.id.nodeValue);
  }
}

$(function onReady() {
  $('.camada5').on('click', '.tamanhoid', onClickTab);
});

$(function onReadyImg() {
  $('.titulo').on('click', '.figura', onClickImg);
});
