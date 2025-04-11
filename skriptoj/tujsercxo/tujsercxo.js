let i = 1
let enigo = document.getElementById('enigo')
let pivDiv = document.getElementById('piv_vortoj')

function tujsercxi() {
    if (i == 1) {
        pivDiv.style.display = "block"
        i = 0
        PIVtujsercxi()    
    } else {
        i = 1
        pivDiv.style.display = "none"
    }
}

function PIVtujsercxi() {
    if (i == 0) {
        let str_sxablono = enigo.value  
        if (str_sxablono.length >= 1) {
            console.log(str_sxablono);
            //piv_vortoj venas de la dosiero piv_vortoj.js    
            const PIV_VORTOJ = piv_vortoj.split("\n")
            piv_vortoj = piv_vortoj.replace(/   /g, "+")
        
            //regex
            let sxablono_regex = new RegExp(`(${(str_sxablono)})`, "gmi");
            let REZULTO = PIV_VORTOJ.filter(function(str) {
              //test() ส่งค่าเป็น boolean สำหรับการตรวจสอบการค้นหา
              return sxablono_regex.test(str);
            });
            const REZULTO_JOIN = REZULTO.join("</span><span onclick=\"preniPIVvortojn(this)\">,");
            let rezulto = REZULTO_JOIN.toString().replace(/^<\/span>/g,"").replace(/,/g,"<br>")
           pivDiv.innerHTML = "<span onclick=\"preniPIVvortojn(this)\">" + rezulto
        }
    }
}

function preniPIVvortojn(elektita_piv_vorto) {
    let polurita_piv_vorto = elektita_piv_vorto.innerText.replace(/\n/g,"").replace(/\+/g,"")
    enigo.value = polurita_piv_vorto
    sercxi()
}