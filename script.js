//ตัวแปรตั้งในภาษาเอสเปรันโต
//[1] แปลงข้อความใน div เป็น array
//รับค่าข้อความจาก div
let cxiuj_vortoj = document.getElementById("vortaro");

//แปลงเป็น HTML
let cxiuj_vortoj_HTML = cxiuj_vortoj.innerHTML;

//ตั้งตัวแปรสำหรับการสร้างคำ splite จาก Enter
let disigitaj_vortoj = cxiuj_vortoj_HTML.split(/\n/g);

//หา length โดยตัดช่องว่างออก
let statistiko_disigitaj_vortoj = disigitaj_vortoj.filter(disigitaj_vortoj => disigitaj_vortoj !== "")
document.getElementById("statistiko").innerHTML = statistiko_disigitaj_vortoj.length.toLocaleString("en-US") + " คำหลัก " + document.lastModified;

function sercxi() {
  //ตั้งตัวสำหรับสร้างลูป
  let vortoj_Arr, i;
  for (i = 0; i < disigitaj_vortoj.length; i++) {
    vortoj_Arr = disigitaj_vortoj[i];
  }
  //filter array จาก textInput
  //[2] ค้นหา
  //เรียกข้อความที่จะค้นหา
  let str_sxablono = document.getElementById("input").value;

  //ค้นหาข้อความด้วย regex
  //https://stackoverflow.com/a/50828436
  let sxablono_regex = new RegExp(`${str_sxablono}`, "gi");
  //https://www.delftstack.com/howto/javascript/javascript-filter-string/
  let rezulto = disigitaj_vortoj.filter(function (str) {
    return sxablono_regex.test(str);
  });

  //[3] แสดงผล
  //สร้างข้อความ หากข้อความค้นหาว่างเปล่า
  if (str_sxablono === "") {
    rezulto = "ไม่พบคำค้นหา";
    return document.getElementById("output").innerHTML = "<hr>" + rezulto;
  }

  //แปลงวัตถุ (rezulto) เป็นสตริง
  let sercxitaj_vortoj = rezulto.toString().replace(/,(?!\s)/g, "<br><hr>");

  //[4]ไฮไลท์คำใน sercxitaj_vortoj
  //hilight คำที่ค้นหา
  sercxitaj_vortoj = sercxitaj_vortoj.replace(
    new RegExp(`${str_sxablono}`, "gi"),
    "<b>" + str_sxablono + "</b>"
  );

  //นำออกแสดงผล
  //if ถ้า sercxitaj_vortoj ไม่เท่ากับ "" ให้แสดงข้อความ ไม่พบคำค้นหา
  if (sercxitaj_vortoj !== "") {
    document.getElementById("output").innerHTML = "<hr>" + sercxitaj_vortoj;
  } else document.getElementById("output").innerHTML = "<hr>" + "ไม่พบคำค้นหา";
}
