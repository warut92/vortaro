# Reta Esperanto - Taja Vortaro ***(Beta)***

Reta Esperanto-Taja Vortaro kompilas de Warut92

Oni povas kontribui tradukojn, novajn vortojn en la dosiero `eoth-vortaro.js`

พจนานุกรมเอสเปรันโต-ไทยออนไลน์ เรียบเรียงโดย Warut92

ท่านสามารถมีส่วนร่วมกับการเพิ่มคำแปล การเพิ่มคำได้ที่ไฟล์ `eoth-vortaro.js`

[legi protokolon/อ่านบันทึก](./log.txt)

## Vortarumado

### La vortoj: 
La vortaro konsistas el vortoj el **Esperanto - Taja Vortareto (vortlisto de Baza Radikaro Esperanta kaj alidono de iOREL)** kaj la unua **Esperanto - Taja Vortaro** (ankoraŭ ne fin-polurita).
Temas pri polurado, la vortojn prenas de Reta Vortaro, inkluzive de kapvortoj kaj subvortoj, kune kun la fakvorto-markiloj. Tamen la fonto de la antaŭula vortaro troviĝas vortoj de PIV, mi ilin restas kun la marikilo (PIV)

### La tradukoj:

Temas pri poluritaj vortoj venas de kontroli difinojn el ReVo unue, se iaokaze due el PIV. Poste estas kontroli vortaron de [Longdo](https://dict.longdo.com/) (Reta Taja-multlingva Vortaro-aro). Se troviĝas taja vorto, kiu ja kongruas kun la signifo/difino, mi prenas tiun vorton (ĉefe de la vortaro Lextrion), iaokaze se ne troviĝas la precizan tajan vorton, mi traduku la difinon al la taja. Temas pri la bildoj, mi ĉiam prenas de Vikipedio. Pro tio faciligas la komprenon de la vortoj.

## Strukturo de la vortaro

1 artikolo :
`kapvorto {fakvorto} //(verbtipo)// traduko, alia traduko //ekzempla frazo//; subvorto {fakvorto} //(verbtipo)// traduko, alia traduko; ... IMG:[bildo el vikipedio] @dato kaj tempo de la laste redaktita@`

`//vorto//` konvertas aŭtomate al `<i>vorto</i>`

aranĝo de la vortoj ĉe eoth-vortaro.js :

1. BRE [0] - [9] + privata aldono de iOREL
2. ETV A - Z de [https://legacy.esperanto.org.uk/eldonoj/etv/](https://legacy.esperanto.org.uk/eldonoj/etv/) **Nun pulorata**
3. novaj artikoloj

### Datoĝisdatigo

tajpu `++` je la lasta punkto de la artikolo, post tio malfermi la terminalon ĉe la vojo de la vortaro, kaj ruligi sur la terminalo `python lasta_sxangxo.py` por aldoni la daton kaj precizan tempon aŭtomate.

## Farado-vojoj.
1. kontrolas ĉiujn vortojn de la ETV.
2. pligrandigas la listo de BRE
3. aldonas de tempo al la tempo novajn vortojn.

## Permesilo
MIT
