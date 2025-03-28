//E alfabeto
let E_alfabeto = `
A
B
C
Ĉ
D
E
F
G
Ĝ
H
Ĥ
I
J
Ĵ
K
L
M
N
O
P
R
S
Ŝ
T
U
Ŭ
V
Z`
//[1] preni vortaron de la dosiero th-vortaro.js kile STRING
vortaro = vortaro.concat(E_alfabeto)
let cxiuj_vortoj_HTML = vortaro;
//ŝanĝi  /// al tag <i> kaj aliaj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\/\/(.+?)\/\//g, '<i>$1</i>')
//forigi la etikedon HTML kommento
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!--.*?-->/g, '---')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/---/g, '')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\>\./g, '')
//forigi la markon por vortoj de la unua libro
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\{\U\L\}/g, '')
//ŝanĝi >> al la signo →
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\>\>/g, '→')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[a-z-].*)(\[)/g, '<h1>$</h1>$2')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-Za-zĈĉĜĝĤĥĴĵŜŝŬŭ-].+?)(\s)/gm, '<h>$1</h> ')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-ZĈĜĤĴŜŬ])$/gm, '<h>$1</h> ')
//por sencoj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(1)\. /gm, '① ')
.replace(/(2)\. /gm, '② ')
.replace(/(3)\. /gm, '③ ')
.replace(/(4)\. /gm, '④ ')
.replace(/(5)\. /gm, '⑤ ')
//por redakt-dato
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\@(.+?)\@/g, '<o>$1</o>')
//la etikedo por bildoj
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/IMG:\[(.*)\]/g, '<img src="$1">')

//konverti la fakideksojn kun speciala etikedo
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(\{.{3,4}\})/g, '<fak>$1</fak>')
//vinjetoj
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\{KEM\}/g, 'Ⓚ')

//konverti al ARRAY
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);

//24-4-11 Mi solvis la cimon (https://github.com/warut92/vortaro/blob/eca6a32ffcac8ddc8717620cbcbedd3a3877b5a1/log.txt#L9) per aldoni (\n \n) inter ĉiuj ĉenoj (array)
let disigitaj_vortoj_join = disigitaj_vortoj.join("\n \n")
const disigitaj_vortoj_array = disigitaj_vortoj_join.split(/\n/g)

//por tuta vortaro
const tuta_vortaro_senspaceto = disigitaj_vortoj.filter(vorto => vorto !== "")

//por ignori la signon -
const lauxafabelta_arangxo = (a, b) => {
const normiga_A = a.replace(/-/g, '').replace(/<h>/g, '').toLowerCase();
const normiga_B = b.replace(/-/g, '').replace(/<h>/g, '').toLowerCase();
return normiga_A.localeCompare(normiga_B, 'eo');
};
//aranĝi laŭ esperanta ordo.
let tuta_vortaro = tuta_vortaro_senspaceto.sort(lauxafabelta_arangxo)
document.getElementById('tuto').innerHTML = tuta_vortaro.toString().replace(/,(?!\s)/g, "<br>");

let disigitaj_vortoj_al_kunmetitaj_vortoj = cxiuj_vortoj_HTML.split(/\n|;/g);
disigitaj_vortoj_al_kunmetitaj_vortoj = disigitaj_vortoj_al_kunmetitaj_vortoj.filter(vorto => vorto !== "")

//serĉi kvanton da vortoj
let statistiko_disigitaj_vortoj = disigitaj_vortoj.filter(disigitaj_vortoj => disigitaj_vortoj !== "")
document.getElementById("statistiko").innerHTML = statistiko_disigitaj_vortoj.length.toLocaleString("en-US") + " คำหลัก " + (disigitaj_vortoj_al_kunmetitaj_vortoj.length - statistiko_disigitaj_vortoj.length).toLocaleString("en-US") + " คำรอง " + lastaTempo;

function sercxi() {
  let vortoj_Arr, i;
  for (i = 0; i < disigitaj_vortoj.length; i++) {
    vortoj_Arr = disigitaj_vortoj[i];
  }
  let serĉa_komenclitero = ""
  //สำหรับการค้นหาด้วยภาษาไทย
  let porTajaSercxo = ""
  //สำหรับการค้นหาด้วยอักษรละติน
  let precizaSercxo = 0
  //เรียกข้อความที่จะค้นหา
  let str_sxablono = document.getElementById("enigo").value;
  //ใส่ hash ที่ url
  location.hash = str_sxablono
  const str_sxablono_len = str_sxablono.length
  //การค้นหาด้วยภาษาไทยแบบตรงตัว
  if (str_sxablono.charCodeAt(0) > 500) {
    // console.log("อักษรไทย")
    document.getElementById('sercxoLingvo').innerHTML = "ค้นหาตรงตัว"
    document.getElementById('titolo').innerHTML = " พจนานุกรมเอสเปรันโต-ไทย (beta)"
    if (document.getElementById('checkbox').checked) {
      serĉa_komenclitero = " "
      porTajaSercxo = "(,||;|| ||$)"
    }
  } else if (str_sxablono.charCodeAt(0) < 500) {
    // console.log("อักษรละติน")
    document.getElementById('sercxoLingvo').innerHTML = "kapvorto"
    document.getElementById('titolo').innerHTML = "  Reta Esperanto-Taja Vortaro (beta)"
    if (document.getElementById('checkbox').checked) {
      serĉa_komenclitero = "<h>"
      precizaSercxo = 1
    }
  }
  str_sxablono = serĉa_komenclitero + str_sxablono + porTajaSercxo
  //ถ้าตัวอักษรในช่องค้นหามากกว่า 1 ให้ดำเนินการต่อ
  if (str_sxablono.length > 1) {
    let sxablono_regex = new RegExp(`(${(str_sxablono)})`, "gmi");
    let rezulto = disigitaj_vortoj_array.filter(function(str) {
      //test() ส่งค่าเป็น boolean สำหรับการตรวจสอบการค้นหา
      return sxablono_regex.test(str);
    });
    // console.log('REZULTO', rezulto)
    //การแสดงผลการค้นหาแบบตรงตัว

    //[3] เตรียมแสดงผล
    //สร้างข้อความ หากข้อความค้นหาว่างเปล่า
    if (str_sxablono === "") {
      rezulto = "ไม่พบคำค้นหา";
      return document.getElementById("eligo").innerHTML = "<hr>" + rezulto;
    }
    //จัดลำดับตามตัวอักษรภาษาเอสเปรันโต
    rezulto.sort(lauxafabelta_arangxo)

    //สร้าง custom compare ให้แสดงอักษรที่มาก่อนแสดงก่อน
    rezulto.sort((a, b) => {
      // Eltiru la enhavon ene de <h>-etikedoj por komparo
      const pattern = /<h>(.*?)<\/h>/;
      const aMatch = a.match(pattern);
      const bMatch = b.match(pattern);

      // Propra ordiga logiko
      if (aMatch && aMatch[1] === str_sxablono) {
        return -1; // "a" venas unue
      } else if (bMatch && bMatch[1] === str_sxablono) {
        return 1; // "b" venas unue
      } else {
        // Defaŭlta alfabeta ordigo por aliaj kazoj
        return a.localeCompare(b);
      }
    });

    //แปลงวัตถุ (rezulto) เป็นสตริง แล้วเปลี่ยนเครื่องหมายลูกน้ำที่ไม่มีอะไรตามหลังด้วย <br><hr>
    // let sercxitaj_vortoj = rezulto.toString().replace(/,(?!\s)/g, "<br><hr>");
    let sercxitaj_vortoj = rezulto.toString().replace(/; /g, ";<br>&nbsp;").replace(/,(?!\s)/g, "<br><hr>");

    //[4]ไฮไลท์คำใน sercxitaj_vortoj
    //hilight คำที่ค้นหา
    // อักษรไทย
    if (str_sxablono.charCodeAt(0) > 500) { //ลบ ^ ที่จะออกมาแสดงผล ในการค้นหาด้วยอักษรละติน
      console.log("อักษรไทย");
      str_sxablono = str_sxablono.substr(0)
      // อักษรไทยแบบตรงตัว// ผ่าน
    } else if (document.getElementById('checkbox').checked) {
      console.log("แบบตรงตัว");
      str_sxablono = str_sxablono.substr(precizaSercxo, str_sxablono_len + 1)
      console.log('STR_SXABLONO', str_sxablono)
      //อักษรไทยแบบไม่ตรงตัว
    }
      console.log("แบบไม่ตรงตัว");
      str_sxablono = str_sxablono.substr(0)

      sercxitaj_vortoj = sercxitaj_vortoj.replace(sxablono_regex, "<b>$1</b>")

    //นำออกแสดงผล
    //if ถ้า sercxitaj_vortoj ไม่เท่ากับ "" ให้แสดงข้อความ ไม่พบคำค้นหา
    if (sercxitaj_vortoj !== "") {
      document.getElementById("eligo").innerHTML = "<hr>" + sercxitaj_vortoj;
    } else document.getElementById("eligo").innerHTML = "<hr>" + "ไม่พบคำค้นหา" + "<br> โปรดค้นหา :<i>“" + str_sxablono + "”</i> ที่ <a href=\"https://vortaro.net/#" + str_sxablono + "\" target=\"_blank\">PIV</a>" + ", <a href=\"https://www.reta-vortaro.de/revo/dlg/index-2l.html?q=" + str_sxablono + "\" target=\"_blank\">ReVo</a>" + ", <a href=\"https://eo.wikipedia.org/wiki/" + str_sxablono + "\" target=\"_blank\">Vikipedio</a>";;
  } else {
    document.getElementById("eligo").innerHTML = "";
  }
  let statistiko_pri = document.getElementById("statistiko").innerHTML
}

//premi la butonon 'Escape' por aktivigi la serĉujon.
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    // event.preventDefault();
    document.getElementById("enigo").focus();
    // enigo.focus()
      }})


// Register service worker to control making site work offline
//prenitaj de https://github.com/mdn/pwa-examples/blob/main/a2hs/index.js
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/sw.js')
//     .then(() => {
//       console.log('Service Worker Registered');
//     });
// }

//โหลดคำจาก hash และดำเนินการรัน sercxi()
if (location.hash) {
        let vorto_hash = location.hash
        let vorto_hash_slice = vorto_hash.slice(1)
        document.getElementById('enigo').value = decodeURI(vorto_hash_slice)
        sercxi()
      }
