# Esperanta Taja Vortaro

Reta Esperanto-Taja Vortaro kompilas de Warut92

พจนานุกรมเอสเปรันโต-ไทยออนไลน์ เรียบเรียงโดย Warut92

Oni povas kontribui tradukojn, novajn vortojn en la dosiero eoth-vortaro.js

ท่านสามารถมีส่วนร่วมกับการเพิ่มคำแปล การเพิ่มคำได้ที่ไฟล์ eoth-vortaro.js

[legi protokolon/อ่านบันทึก](./log.txt)

## Vortarumado

### La vortoj:

### La tradukoj:

Temas pri poluritaj vortoj venas de kontroli difinojn el ReVo unue, se iaokaze due el PIV. Poste estas kontroli vortaron de [Longdo](https://dict.longdo.com/) (Granda Reta Taja-multlingva Vortaro). Se troviĝas taja vorto, kiu ja kongruas kun la signifo/difino, mi prenas tiun vorton, iaokaze se ne troviĝas la precizan tajan vorton, mi traduku la difinon al la taja.

## Strukturo de la vortaro

1 artikolo :
`kapvorto {fakvorto} //(verbtipo)// traduko, alia traduko //ekzempla frazo//; subvorto {fakvorto} //(verbtipo)// traduko, alia traduko; ...`

`//vorto//` konvertas aŭtomate al `<i>vorto</i>`

aranĝo de la vortoj ĉe eoth-vortaro.js :

1. BRE [0] - [9] + privata aldono de iOREL
2. ETV A - Z de [https://legacy.esperanto.org.uk/eldonoj/etv/](https://legacy.esperanto.org.uk/eldonoj/etv/)
3. novaj artikoloj

### Datoĝisdatigo

tajpu `++` je la lasta pukto de la artikolo, post tio malfermi la terminalon ĉe la vojo de la vortaro, kaj tajpu `python lasta_sxangxo.py` por aldoni la daton kaj precizan tempon.

## Permesilo
MIT
