const play1 = 'o';
const play2 = 'x';
var playTime = play1;
var playOver = false;

$('#T1').addClass('destaqueImg');

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
        $('#' + posicao).addClass(jogador);
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

  var ganha = ''
  /*var eixo = ''
  var tipo = ''*/

  if (a1 != '' && a1 == b2 && a1 == c3)
      {
        ganha = a1;
        /*eixo = 'D1';
        tipo = 'reta_d1'*/
      }

  else if (a3 != '' && a3 == b2 && a3 == c1)
      {
        ganha = a3;
        /*eixo = 'D2';
        tipo = 'reta_d2'*/
      }

  else if (a1 != '' && a1 == b1 && a1 == c1)
      {
        ganha = a1;
        /*eixo = 'C1';
        tipo = 'reta_v'*/
      }

  else if (a2 != '' && a2 == b2 && a2 == c2)
      {
        ganha = a2;
        /*eixo = 'C2';
        tipo = 'reta_v'*/
      }

  else if (a3 != '' && a3 == b3 && a3 == c3)
      {
        ganha = a3;
        /*eixo = 'C3';
        tipo = 'reta_v'*/
      }

  else if (a1 != '' && a1 == a2 && a1 == a3)
      {
        ganha = a1;
        /*eixo = 'L1';
        tipo = 'reta_h'*/
      }

  else if (b1 != '' && b1 == b2 && b1 == b3)
      {
        ganha = b1;
        /*eixo = 'L2';
        tipo = 'reta_h'*/
      }

  else if (c1 != '' && c1 == c2 && c1 == c3)
      {
        ganha = c1;
        /*eixo = 'L3';
        tipo = 'reta_h'*/
      }

  if (ganha != '') {
    playOver = true;
    if (ganha == 'o') {
      $('#ganhador').addClass('bola');
      /*$("#"+eixo).addClass(tipo);*/
    } else {
      $('#ganhador').addClass('xis');
      /*$('#'+eixo).addClass(tipo);*/
    }
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
  $('.principal').on('click', '.tamanhoid', onClickTab);
});

$(function onReadyImg() {
  $('.titulo').on('click', '.figura', onClickImg);
});
