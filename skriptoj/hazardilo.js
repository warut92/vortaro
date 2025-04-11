let hazardejo = document.getElementById('eligo')
function hazardaVorto() {
        const hazarda_vorto = tuta_vortaro_senspaceto[Math.floor(Math.random() * tuta_vortaro_senspaceto.length)];
        console.log(hazarda_vorto);
        if (hazarda_vorto.toString() === 1) {
            hazardaVorto()
        }
        hazardejo.innerHTML = ""
        hazardejo.innerHTML = hazarda_vorto.replace(/;/g,";<br>&nbsp;").replace(/<h>/g,"<h style=\"color:#89E682\">")
}