let cxiujVortoj = JSON.parse(datumo)

let tekstoSenApos = document.getElementById("teksto").innerHTML.replace(/'/g, "")

document.getElementById("teksto").innerHTML = tekstoSenApos

document.addEventListener("click", function() {
        var elektitaVorto = "";
        if (window.getSelection) {
            elektitaVorto = "^" + window.getSelection().toString() + " ";
        } 
        	console.log("len ",elektitaVorto.slice(elektitaVorto.length - 2))
        	if (elektitaVorto.slice(elektitaVorto.length - 2) == "u ") {
			elektitaVorto = elektitaVorto.slice(0, elektitaVorto.length - 2) + "i "
			console.log("vorto ",elektitaVorto)
		};

        if (elektitaVorto !== "") {
            console.log("Selected text: " + elektitaVorto);
    		let sxablono_regex = new RegExp(`(${(elektitaVorto)})`, "ig");
            let rezulto = cxiujVortoj.filter(function(str) {
      		return sxablono_regex.test(str);
   		 });
      		console.log(rezulto)
        }
    });