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
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!--.*?-->/g, '---')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/---/g, '')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\>\./g, '')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\{\U\L\}/g, '')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[a-z-].*)(\[)/g, '<h1>$</h1>$2')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-Za-zĈĉĜĝĤĥĴĵŜŝŬŭ-].+?)(\s)/gm, '<h>$1</h> ')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[A-ZĈĜĤĴŜŬ])$/gm, '<h>$1</h> ')

//konverti al ARRAY
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);
//por tuta vortaro
const tuta_vortaro_senspaceto = disigitaj_vortoj.filter(vorto => vorto !== "")
//por ignori la signon -
const lauxafabelta_arangxo = (a, b) => {
const normiga_A = a.replace(/-/g, '').toLowerCase();
const normiga_B = b.replace(/-/g, '').toLowerCase();
return normiga_A .localeCompare(normiga_B, 'eo');
};
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
  let komenclitero = ""
  //สำหรับการค้นหาด้วยภาษาไทย
  let porTajaSercxo = ""
  //สำหรับการค้นหาด้วยอักษรละติน
  let precizaSercxo = 0
  //เรียกข้อความที่จะค้นหา
  let str_sxablono = document.getElementById("enigo").value;
  const str_sxablono_len = str_sxablono.length
  //การค้นหาด้วยภาษาไทยแบบตรงตัว
  if (str_sxablono.charCodeAt(0) > 500) {
    // console.log("อักษรไทย")
    document.getElementById('sercxoLingvo').innerHTML = "ค้นหาตรงตัว"
    document.getElementById('titolo').innerHTML = " พจนานุกรมเอสเปรันโต-ไทย"
    if (document.getElementById('checkbox').checked) {
      komenclitero = " "
      porTajaSercxo = "(,|;| |$)"
    }
  } else if (str_sxablono.charCodeAt(0) < 500) {
    // console.log("อักษรละติน")
    document.getElementById('sercxoLingvo').innerHTML = "kapvorto"
    document.getElementById('titolo').innerHTML = " Esperanto-Taja Vortaro Reta"
    if (document.getElementById('checkbox').checked) {
      komenclitero = "^<h>"
      precizaSercxo = 1
    }
  }
  str_sxablono = komenclitero + str_sxablono + porTajaSercxo
  //ถ้าตัวอักษรในช่องค้นหามากกว่า 1 ให้ดำเนินการต่อ
  if (str_sxablono.length > 1) {
    let sxablono_regex = new RegExp(`(${(str_sxablono)})`, "igm");
    let rezulto = disigitaj_vortoj.filter(function(str) {
      //test() ส่งค่าเป็น boolean สำหรับการตรวจสอบการค้นหา
      return sxablono_regex.test(str);
    });
    //การแสดงผลการค้นหาแบบตรงตัว

    //[3] เตรียมแสดงผล
    //สร้างข้อความ หากข้อความค้นหาว่างเปล่า
    if (str_sxablono === "") {
      rezulto = "ไม่พบคำค้นหา";
      return document.getElementById("eligo").innerHTML = "<hr>" + rezulto;
    }

    //แปลงวัตถุ (rezulto) เป็นสตริง แล้วเปลี่ยนเครื่องหมายลูกน้ำที่ไม่มีอะไรตามหลังด้วย <br><hr>
    let sercxitaj_vortoj = rezulto.toString().replace(/,(?!\s)/g, "<br><hr>");
    // console.log('REZULTO', rezulto.length)

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
      //อักษรไทยแบบไม่ตรงตัว
    }
      console.log("แบบไม่ตรงตัว");
      str_sxablono = str_sxablono.substr(0)
      str_sxablono

      sercxitaj_vortoj = sercxitaj_vortoj.replace(sxablono_regex, "<b>$1</b>")

    //นำออกแสดงผล
    //if ถ้า sercxitaj_vortoj ไม่เท่ากับ "" ให้แสดงข้อความ ไม่พบคำค้นหา

    if (sercxitaj_vortoj !== "") {
      document.getElementById("eligo").innerHTML = "<hr>" + sercxitaj_vortoj;
    } else document.getElementById("eligo").innerHTML = "<hr>" + "ไม่พบคำค้นหา";
  } else {
    document.getElementById("eligo").innerHTML = "";
  }
  let statistiko_pri = document.getElementById("statistiko").innerHTML
}

// Register service worker to control making site work offline
//prenitaj de https://github.com/mdn/pwa-examples/blob/main/a2hs/index.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('Service Worker Registered');
    });
}
