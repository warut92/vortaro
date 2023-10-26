//preni JSON
let cxiujVortoj = JSON.parse(datumo)
console.log('CXIUJVORTOJ', cxiujVortoj)

vortaro_HTML = vortaro_HTML.split(/<br>/g)

console.log('VORTARO_HTML', vortaro_HTML)

// forigi la apostrofojn
let tekstoSenApos = document.getElementById("teksto").innerHTML.replace(/'/g, "")

// eligi ilin sen apostrofoj
document.getElementById("teksto").innerHTML = tekstoSenApos

//funckigi per alklaki vortojn.
document.addEventListener("click", function() {
        let elektitaVorto = "";
        if (window.getSelection) {
            elektitaVorto = "^" + window.getSelection().toString() + "";
            console.log('ELEKTITAVORTO', elektitaVorto)
        }

        const sufiksoj = ["o", "a", "e", "i", "as", "is", "os"];

        let radiko = elektitaVorto
        let sufikso = ""
        for (const s of sufiksoj) {
          console.log('SUFIKSOJ', sufiksoj)
          if (elektitaVorto.endsWith(s)) {
            radiko = elektitaVorto.slice(0, -s.length)
            console.log('RADIKO', radiko)
            sufikso = s
            console.log('SUFIKSO', sufikso)
            break
          }
        }

        if (elektitaVorto !== "") {
            console.log("Selected text: " + elektitaVorto);
    		let sxablono_regex = new RegExp(`(${(elektitaVorto)})`, "ig");
            let rezulto = cxiujVortoj.filter(function(str) {
      		return sxablono_regex.test(str);
   		 });
      		console.log(rezulto)
          if (elektitaVorto !== "^") {
            document.getElementById('traduko').innerHTML = rezulto;
          }
        }

    });

    function analyzeEsperantoWord(word) {
    const suffixes = [
        "o", "-a", "-e", "-i", "-as", "-is", "-os",
        "-is", "-us", "-u", "-on", "-an", "-aj", "-ajn"
    ];

    let root = word;
    let suffix = "";

    for (const s of suffixes) {
        if (word.endsWith(s)) {
            root = word.slice(0, -s.length);
            suffix = s;
            break;
        }
    }

    return {
        root: root,
        suffix: suffix
    };
}

function analyzeEsperantoWordWithPrefix(word) {
    const prefixes = [
        "mal", "ge", "ek", "dis", "re", "pre", "ek", "for"
    ];

    let prefix = "";
    let root = word;
    let suffix = "";

    for (const p of prefixes) {
        if (word.startsWith(p)) {
            prefix = p;
            root = word.slice(p.length);
            const analysis = analyzeEsperantoWord(root);
            root = analysis.root;
            suffix = analysis.suffix;
            break;
        }
    }

    return {
        prefix: prefix,
        root: root,
        suffix: suffix
    };
}

// Example usage
// const wordAnalysis = analyzeEsperantoWordWithPrefix("tenton");
// console.log("Prefix:", wordAnalysis.prefix);
// console.log("Root:", wordAnalysis.root);
// console.log("Suffix:", wordAnalysis.suffix);

const wordAnalysis = analyzeEsperantoWord("parolanto");
console.log("Root:", wordAnalysis.root);
console.log("Suffix:", wordAnalysis.suffix);


fetch('last_commit.txt')
  .then(response => response.text())
  .then(data => {
    const lastCommitDate = new Date(data);
    console.log('LASTCOMMITDATE', lastCommitDate)
    document.getElementById('last-commit').textContent = lastCommitDate.toDateString();
  });
