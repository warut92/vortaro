let hazardejo = document.getElementById('eligo')
function hazardaVorto() {
        let hazarda_vorto = tuta_vortaro_senspaceto[Math.floor(Math.random() * tuta_vortaro_senspaceto.length)];
        // console.log(hazarda_vorto);
        if (hazarda_vorto.toString() === 1) {
            hazardaVorto()
        }
        hazardejo.innerHTML = ""
        fakindeksoj_ARR_2.forEach(([name, emoji, signifo]) => {
            const regex = new RegExp(`${name}`, 'gm');
            hazarda_vorto = hazarda_vorto.replace(regex,"<abbr title=\"" + signifo + "\">" + emoji + "</abbr>");
          });
        hazardejo.innerHTML = hazarda_vorto.replace(/;/g,";<br>&nbsp;").replace(/<h>/g,"<h style=\"color:#89E682\">")
}