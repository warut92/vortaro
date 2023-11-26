var x = document.createElement("DIV");
var t = document.createTextNode("alklaka vortareto farita de Warut");
x.setAttribute("style", "background-color: pink;position: fixed;top: 0;");
x.appendChild(t);
document.body.appendChild(x).id = "traduko";

//preni variablon de th-vortaro.js, iom konverti al Array (tabeltipo)
vortaro_HTML = vortaro_HTML.replace(/\/\/(.+?)\/\//g, '<i>$1</i>')
// vortaro_HTML = vortaro_HTML.replace(/;/g, '<br>')
vortaro_HTML = vortaro_HTML.split(/<br>/g)
console.log('VORTARO_HTML', vortaro_HTML)

//krei la veriablon por elektita vorto.
let elektitaVorto = "";

//funckigi per alklaki vortojn.
document.addEventListener("click", function() {
        if (window.getSelection) {
            elektitaVorto = "^" + window.getSelection().toString() + "";
        }
//krei la grupon de sufiksoj
    const sufiksoj = [
        //participaj
        //aktiva
        "anto", "into", "onto",
        "antoj", "intoj", "ontoj",
        "antojn", "intojn", "ontojn",
        "anta", "inta", "onta",
        "antan", "intan", "ontan",
        "antaj", "intaj", "ontaj",
        "antajn", "intajn", "ontajn",
        "ante", "inte", "onte",
        "antas", "intis", "ontos",
        //pasiva
        "ato", "ito", "oto",
        "atoj", "itoj", "otoj",
        "atojn", "itojn", "otojn",
        "ata", "ita", "ota",
        "ataj", "itaj", "otaj",
        "atajn", "itajn", "otajn",
        "ate", "ite", "ote",
        //multnombraj
        "oj", "j", "uj", "aj",
        //verboj
        "i", "as", "is", "os", "is", "us", "u",
        //akuzatuvaj
        "on", "ojn","an", "ajn",
        //bazaj
        "o", "a", "e",
        //aŭ-vortojn
        "ŭ"
    ];
// se la elektita vorto finiĝas per spaceto forigu ĝin!
    if (elektitaVorto.endsWith(" ")) {
      elektitaVorto = elektitaVorto.substring(0, elektitaVorto.length - 1)
    }
//faru elektitan vorton kiel radikon.
    let radiko = elektitaVorto;
    let sufikso = "";

    for (const s of sufiksoj) {
        if (elektitaVorto.endsWith(s)) {
          console.log("ĉu la vorto finiĝas per la sufikso ",elektitaVorto.endsWith(s)), s;
            radiko = elektitaVorto.slice(1, - s.length);
            console.log('RADIKO', radiko)
            sufikso = s;
            console.log('SUFFIX', sufikso)

            if (elektitaVorto !== "") {
                console.log("Selected text: " + elektitaVorto);
        		let sxablono_regex = new RegExp(`(^${(radiko)}[aeiuo]{1})`, "ig");
            console.log('SXABLONO_REGEX ', sxablono_regex )
                let rezulto = vortaro_HTML.filter(function(str) {
          		return sxablono_regex.test(str);
       		 });
           console.log('REZULTO ', rezulto )
          		rezulto = rezulto.toString().replace(/,(?!\s)/g, "<br><hr>")
              if (elektitaVorto !== "^") {
                document.getElementById('traduko').innerHTML = rezulto;
              }
            }
        }
    }
    });

    document.onkeydown = (event) => {
  if (event.keyCode == 27) document.getElementById('traduko').innerHTML = "" ;
};

// onmousemove = function(e){console.log("mouse location:", e.clientX, e.clientY)}
