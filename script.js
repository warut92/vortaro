//ตัวแปรตั้งในภาษาเอสเปรันโต
//[1] แปลงข้อความใน div เป็น array
//รับค่าข้อความจาก div
let cxiuj_vortoj = document.getElementById("vortaro");

//แปลงเป็น HTML
let cxiuj_vortoj_HTML = cxiuj_vortoj.innerHTML;
//แปลงเครื่องหมาย // เป็น tag ตัวเอียง
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/\/\/(.+?)\/\//g, '<i>$1</i>')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/<!--.*?-->/g, '---')
cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.replace(/---/g, '')
// cxiuj_vortoj_HTML = cxiuj_vortoj_HTML.toLowerCase()

//ตั้งตัวแปรสำหรับการสร้างคำ splite จาก new line (\n)
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);
let disigitaj_vortoj_al_kunmetitaj_vortoj = cxiuj_vortoj_HTML.split(/\n|;/g);
disigitaj_vortoj_al_kunmetitaj_vortoj = disigitaj_vortoj_al_kunmetitaj_vortoj.filter(vorto => vorto !== "")
console.log('DISIGITAJ_VORTOJ_AL_KUNMETITAJ_VORTOJ', disigitaj_vortoj_al_kunmetitaj_vortoj)

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
  //เรียกข้อความที่จะค้นหา
  let str_sxablono = document.getElementById("enigo").value;
  //ถ้าตัวอักษรในช่องค้นหามากกว่า 1 ให้ดำเนินการต่อ
  if (str_sxablono.length > 1) {
    //ค้นหาข้อความด้วย regex
    //https://stackoverflow.com/a/50828436
    let spaceto = " "
    let sxablono_regex = new RegExp(`${str_sxablono}`, "i");
    // let sxablono_regex = new RegExp(`${spaceto}${str_sxablono}(?!,)`, "g");
    console.log('SXABLONO_REGEX', sxablono_regex)
    //https://www.delftstack.com/howto/javascript/javascript-filter-string/
    let rezulto = disigitaj_vortoj.filter(function (str) {
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
    console.log('REZULTO', rezulto.length)


    //[4]ไฮไลท์คำใน sercxitaj_vortoj
    //hilight คำที่ค้นหา
    sercxitaj_vortoj = sercxitaj_vortoj.replace(
      new RegExp(`${str_sxablono}`, "gi"),
      "<b>" + str_sxablono + "</b>"
    );

    //นำออกแสดงผล
    //if ถ้า sercxitaj_vortoj ไม่เท่ากับ "" ให้แสดงข้อความ ไม่พบคำค้นหา

    if (sercxitaj_vortoj !== "") {
      document.getElementById("eligo").innerHTML = "<hr>" + sercxitaj_vortoj;
    } else  document.getElementById("eligo").innerHTML = "<hr>" + "ไม่พบคำค้นหา";
  } else {
    document.getElementById("eligo").innerHTML = "";
  }

}

// Register service worker to control making site work offline
//adoptita de https://github.com/mdn/pwa-examples/blob/main/a2hs/index.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}
