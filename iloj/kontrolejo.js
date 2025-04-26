//[1] preni vortaron de la dosiero th-vortaro.js kile STRING
let cxiuj_vortoj_HTML = vortaro;
//ŝanĝi  /// al tag <i> kaj aliaj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\/\/\((.*?)\)\/\//g, '<i>($1)</i>')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!--.*?-->/g, '--------------<br>')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!-- A -->/g, '--------------<br>')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/---/g, '')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\>\./g, '')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\{\U\L\}/g, '')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(\{.{3,4}\})/g, '<fak>$1</fak>')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-Za-zĈĉĜĝĤĥĴĵŜŝŬŭ-].+?)(\s)/gm, '<h>$1</h> ')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-ZĈĜĤĴŜŬ])$/gm, '<h>$1</h> ')
//aldoni etikedon
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\@(.+?)\@/g, '<o>$1</o>')

//la etikedo por bildoj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/IMG:\[(.*?)\]/g, '<img src="$1">')
//solvi cimon ĉe IMG
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/https:<i>upload/gm, 'https://upload')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/https:<\/i>upload/gm, 'https://upload')

//konverti al ARRAY
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);
//por tuta vortaro
const tuta_vortaro_senspaceto = disigitaj_vortoj.filter(vorto => vorto !== "")
//eligi sur la ekrano
document.getElementById('kontrolejo').innerHTML = tuta_vortaro_senspaceto.toString().replace(/,(?!\s)/g, "<br>");

//krei la veriablon por elektita vorto.
let elektitaVorto = "";

//funckigi per alklaki vortojn.
document.addEventListener("click", function() {
//preni vorton
  if (window.getSelection) {
    elektitaVorto = "" + window.getSelection().toString().toLowerCase();
  }
  // se la elektita vorto finiĝas per spaceto forigu ĝin!
  if (elektitaVorto.endsWith(" ")) {
    elektitaVorto = elektitaVorto.substring(0, elektitaVorto.length - 1)
  }
  console.log("longeco ",elektitaVorto.length);
  const frenesteto = document.getElementById('ligiloj');
  if (elektitaVorto.length == 0) {
      document.getElementById('ligiloj').innerHTML = "";
      frenesteto.style.display = 'none';
    } else {
      document.getElementById('ligiloj').innerHTML = "vidu :<i>“" + elektitaVorto + "”</i> en <a class=\"nigro\" href=\"https://vortaro.net/#" + elektitaVorto + "\" target=\"_blank\">PIV</a>" + ", <a class=\"nigro\" href=\"https://reta-vortaro.de/revo/dlg/index-2m.html?q=" + elektitaVorto + "\" target=\"_blank\">ReVo</a>" + ", <a class=\"nigro\" href=\"https://eo.wikipedia.org/wiki/" + elektitaVorto + "\" target=\"_blank\">Vikipedio</a>";

      frenesteto.style.display = 'block';
    }
//krei lokon por aperigi la elemton ligiloj.
document.addEventListener('click', function(event) {
  const x = event.clientX;
  const y = event.clientY;
  frenesteto.style.left = x + 'px';
  frenesteto.style.top = y + 30 + 'px';
})
});
