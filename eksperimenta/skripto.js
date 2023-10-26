//preni variablon de th-vortaro.js, iom konverti al Array (tabeltipo)
vortaro_HTML = vortaro_HTML.replace(/;/g, "<br>")
vortaro_HTML = vortaro_HTML.split(/<br>/g)

// forigi la apostrofojn
let tekstoSenApos = document.getElementById("teksto").innerHTML.replace(/'/g, "")

// eligi ilin sen apostrofoj.
document.getElementById("teksto").innerHTML = tekstoSenApos

//krei la veriablon por elektita vorto.
let elektitaVorto = "";


//funckigi per alklaki vortojn.
document.addEventListener("click", function() {
        if (window.getSelection) {
            elektitaVorto = "^" + window.getSelection().toString() + "";
            console.log('ELEKTITAVORTO', elektitaVorto)
        }
//krei la grupon de sufiksoj
    const sufiksoj = [
        "o", "a", "e",
        "i", "as", "is", "os", "is", "us", "u",
        "on", "an", "aj", "ajn",
        "antoj"
    ];
// se la elektita vorto finiĝas per spaceto forigu ĝin!
    if (elektitaVorto.endsWith(" ")) {
      console.log(elektitaVorto.endsWith(" "));
      elektitaVorto = elektitaVorto.substring(0, elektitaVorto.length - 1)
    }
//faru elektitan vorton kiel radikon.
    let radiko = elektitaVorto;

    console.log('ROOT', radiko)
    let sufikso = "";

    for (const s of sufiksoj) {
        if (elektitaVorto.endsWith(s)) {
          console.log("ĉu vere? ",elektitaVorto.endsWith(s));
            radiko = elektitaVorto.slice(1, - s.length);
            console.log('ROOT', radiko)
            sufikso = s;
            console.log('SUFFIX', sufikso)

            if (elektitaVorto !== "") {
                console.log("Selected text: " + elektitaVorto);
        		let sxablono_regex = new RegExp(`(${(radiko)})`, "ig");
                let rezulto = vortaro_HTML.filter(function(str) {
          		return sxablono_regex.test(str);
       		 });
          		console.log(rezulto)
              if (elektitaVorto !== "^") {
                document.getElementById('traduko').innerHTML = rezulto;
              }
            }
        }
    }

    });
