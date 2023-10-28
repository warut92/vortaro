//ตัวแปรตั้งในภาษาเอสเปรันโต
//[1] แปลงข้อความใน div เป็น array
//รับค่าข้อความจาก div
// let cxiuj_vortoj = document.getElementById("vortaro");

//แปลงเป็น HTML
// let cxiuj_vortoj_HTML = cxiuj_vortoj.innerHTML;
let cxiuj_vortoj_HTML = vortaro;

//แปลงเครื่องหมาย // เป็น tag ตัวเอียง
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\/\/(.+?)\/\//g, '<i>$1</i>')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!--.*?-->/g, '---')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/---/g, '')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/(^[a-z-].*)(\[)/g, '<h1></h1>$2')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/([A-z])-([aiueo{1}])/g, '$1$2')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.toLowerCase()

//ตั้งตัวแปรสำหรับการสร้างคำ splite จาก new line (\n)
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);
let disigitaj_vortoj_al_kunmetitaj_vortoj = cxiuj_vortoj_HTML.split(/\n|;/g);
disigitaj_vortoj_al_kunmetitaj_vortoj = disigitaj_vortoj_al_kunmetitaj_vortoj.filter(vorto => vorto !== "")

document.getElementById('vortaro').innerHTML = disigitaj_vortoj_al_kunmetitaj_vortoj;

//หา length โดยตัดช่องว่างออก
let statistiko_disigitaj_vortoj = disigitaj_vortoj.filter(disigitaj_vortoj => disigitaj_vortoj !== "")
document.getElementById("statistiko").innerHTML = statistiko_disigitaj_vortoj.length.toLocaleString("en-US") + " คำหลัก " + (disigitaj_vortoj_al_kunmetitaj_vortoj.length - statistiko_disigitaj_vortoj.length).toLocaleString("en-US") + " คำรอง " + document.lastModified;

function sercxi() {
  //ตั้งตัวสำหรับสร้างลูป
  let vortoj_Arr, i;
  for (i = 0; i < disigitaj_vortoj.length; i++) {
    vortoj_Arr = disigitaj_vortoj[i];
  }
  //filter array จาก textInput
  //[2] ค้นหา
  //สร้าง string สำหรับใช้เป็น regex ค้นหา string ที่เริ่มต้นด้วยตัวอักษรนั้น ๆ (สำหรับอักษรละติน)
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
    if (document.getElementById('checkbox').checked) {
      komenclitero = " "
      porTajaSercxo = "(,|;| |$)"
    }
  } else if (str_sxablono.charCodeAt(0) < 500) {
    // console.log("อักษรละติน")
    document.getElementById('sercxoLingvo').innerHTML = "kapvorto"
    if (document.getElementById('checkbox').checked) {
      komenclitero = "^"
      precizaSercxo = 1
    }
  }
  str_sxablono = komenclitero + str_sxablono + porTajaSercxo
  //ถ้าตัวอักษรในช่องค้นหามากกว่า 1 ให้ดำเนินการต่อ
  if (str_sxablono.length > 1) {
    //ค้นหาข้อความด้วย regex
    //https://stackoverflow.com/a/50828436
    let sxablono_regex = new RegExp(`(${(str_sxablono)})`, "ig");
    // let sxablono_regex = new RegExp(`${spaceto}${str_sxablono}(?!,)`, "g");
    console.log('SXABLONO_REGEX', sxablono_regex)
    //https://www.delftstack.com/howto/javascript/javascript-filter-string/
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
