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
//verdig la daton 01-01-2023-w
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<o>(01-01-2023-w)<\/o>/g, '<o style=\"color:green\">$1</o>')

//la etikedo por bildoj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/IMG:\[(.*?)\]/g, '<img src="$1">')

//la atikedoj por vikipedia paĝo
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/WIKI:\[(.*?)\]/g, ' <a href="$1" target="_blank"><img src="https://en.wikipedia.org/favicon.ico" alt="wikipdia" style="width:20px;height:auto;"></a>')

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

//tempa funkcio krita de AI
// const entries = Object.entries(tuta_vortaro_senspaceto);
// console.log(typeof entries);

// let startIndex = entries.findIndex(([key, value]) => value.includes("**"));
// let endIndex = entries.findIndex(([key, value]) => value.startsWith("<h>uzino"));

// const resultRange = entries.slice(startIndex, endIndex + 1);
// const count = resultRange.length;
// // Output
// console.log("trafoj:", count);
// document.getElementById('kalkulo').innerHTML = count