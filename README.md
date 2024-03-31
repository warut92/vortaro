# Esperanta Taja Vortaro

Reta Esperanto-Taja Vortaro kompilas de Warut92

พจนานุกรมเอสเปรันโต-ไทยออนไลน์ เรียบเรียงโดย Warut92

Oni povas kontribui tradukojn, novajn vortojn en la dosiero eoth-vortaro.js

ท่านสามารถมีส่วนร่วมกับการเพิ่มคำแปล การเพิ่มคำได้ที่ไฟล์ eoth-vortaro.js

[legi protokolon/อ่านบันทึกการเปลี่ยนแปลง](./log.txt)

## Strukturo de la vortaro

1 artikolo :
`kapvorto {fakvorto} //(verbtipo)// traduko, alia traduko //ekzempla frazo//; subvorto {fakvorto} //(verbtipo)// traduko, alia traduko; ...`

`//vorto//` konvertas aŭtomate al `<i>vorto</i>`
### Datoĝisdatigo

tajpu `++` je la lasta pukto de la artikolo, post tio malfermi la terminalon ĉe la vojo de la vortaro, kaj tajpu `python lasta_sxangxo.py` por aldoni la daton kaj precizan tempon.

## Permesilo
MIT
