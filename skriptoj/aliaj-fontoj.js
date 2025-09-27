//ĉe komputiloj
document.addEventListener("click", function() {
  viduFontojn()
})

//ĉe poŝtelefonoj
document.addEventListener("touchstart", function() {
  viduFontojn()
})

function viduFontojn() {
  if (window.getSelection) {
    elektitaVorto = "" + window.getSelection().toString().toLowerCase();
  }
  // se la elektita vorto finiĝas per spaceto forigu ĝin!
  if (elektitaVorto.endsWith(" ")) {
    elektitaVorto = elektitaVorto.substring(0, elektitaVorto.length - 1)
  }
  console.log(elektitaVorto);
  document.getElementById('aliaj-fontoj').innerHTML = "vidu :<i>“" + elektitaVorto + "”</i> en <a class=\"blanko\" href=\"https://reta-vortaro.de/revo/dlg/index-2m.html?q=" + elektitaVorto + "\" target=\"_blank\">ReVo</a>, <a class=\"blanko\" href=\"https://vortaro.net/#" + elektitaVorto + "\" target=\"_blank\">PIV</a>" + ", <a class=\"blanko\" href=\"https://eo.wikipedia.org/wiki/" + elektitaVorto + "\" target=\"_blank\">Vikipedio</a>";
  if (elektitaVorto === "") {
    document.getElementById('aliaj-fontoj').innerHTML = ""
  }
}
