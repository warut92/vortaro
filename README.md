# Reta Esperanto - Taja Vortaro ***(Beta)***

Reta Esperanto-Taja Vortaro kompilas de Warut92

Oni povas kontribui tradukojn, novajn vortojn en la dosiero `eoth-vortaro.js`

พจนานุกรมเอสเปรันโต-ไทยออนไลน์ เรียบเรียงโดย Warut92

ท่านสามารถมีส่วนร่วมกับการเพิ่มคำแปล การเพิ่มคำได้ที่ไฟล์ `eoth-vortaro.js`

[legi protokolon/อ่านบันทึก](./notoj/log.txt)

## Funkcioj (por uzanto)
1. serĉi Esperantan vorton, ankaŭ nur kapvarojn, kaj per `RegEx`.
2. serĉi Tajan vorton, ankaŭ per preciza serĉo, kaj per `RegEx`. _(provizora)_
3. serĉi per kapvortoj de PIV.
4. disdoni serĉaĵon per reteja ligilo.
5. plu serĉi de la aliaj vortaroj: PIV, ReVo, Vikipedio, _se la vorto mankas en la vortaro_, aŭ per alklako al la Esperanta vorto sur la ekrano
6. montri la kavanton de kapvortoj kaj subvortoj, kun la lasta redakt-dato.
7. hazarda vorto.
8. legi la tuton de la vortaro.
9. legi nur baza vortlisto laŭ  Bazaj radikoj Esperanto-Esperanto de Wouter F. Pilger kaj Ilustrita Oficiala Radikaro Esperanta por Lernanto (iOREL), kun mia aldono. _(prilaboranta)_
10. legi la lastajn redaktitajn vortojn ordigitajn laŭ la tago, kun redakto-kvanto.

## Funkcioj (por redaktanto)
- _(aldonontaj)_

## Historieto
- _(aldonontaj)_

## Vortarumado

### La vortoj: 
La vortaro konsistas el vortoj el **Esperanto - Taja Vortareto (vortlisto de Baza Radikaro Esperanta kaj alidono de iOREL)** kaj la unua **Esperanto - Taja Vortaro** (ankoraŭ ne fin-polurita).
Temas pri polurado, la vortojn prenas de Reta Vortaro, inkluzive de kapvortoj kaj subvortoj, kune kun la fakvorto-markiloj. Tamen la fonto de la antaŭula vortaro troviĝas vortoj de PIV, mi ilin restas kun la marikilo (PIV)

### La tradukoj:

Temas pri poluritaj vortoj venas de kontroli difinojn el ReVo unue, se iaokaze due el PIV. Poste estas kontroli vortaron de [Longdo](https://dict.longdo.com/) (Reta Taja-multlingva Vortaro-aro). Se troviĝas taja vorto, kiu ja kongruas kun la signifo/difino, mi prenas tiun vorton (ĉefe de la vortaro Lextrion), iaokaze se ne troviĝas la precizan tajan vorton, mi traduku la difinon al la taja. Temas pri la bildoj, mi ĉiam prenas de Vikipedio. Pro tio faciligas la komprenon de la vortoj.

### หลักการในการเลือกคำศัพท์ในภาษาไทย
1. เป็นคำที่คนไทยใช้อยู่แล้ว
2. หากไม่มีคำที่ใช้จริงให้หาคำที่ใกล้เคียงกับความหมาย
3. หากไม่มีตามข้อ 2 ให้ใช้ประโยคที่มีความกระชับ
4. บางครั้งมีการใช้คำศัพท์บัญญัติของราชบัณฑิต สำหรับศัพท์คำเฉพาะทาง

### Maniero por taja traduko
1. uzataj tajaj vortoj
2. se ne ekzitas, uzu proksimajn signifojn.
3. se ne taŭgas, traduku al mallonga farzo.
4. iakaze, uzas terminojn de la Reĝa Akademio Tajlanda.

## Strukturo de la vortaro

1 artikolo :
`kapvorto {fakvorto} //(verbtipo)// traduko, alia traduko //ekzempla frazo//; subvorto {fakvorto} //(verbtipo)// traduko, alia traduko; ... IMG:[bildo el vikipedio] @dato kaj tempo de la laste redaktita@`

`//vorto//` konvertas aŭtomate al `<i>vorto</i>`

Aranĝo de la vortoj ĉe eoth-vortaro.js :

1. BRE [0] - [9] + privata aldono de iOREL
2. ETV A - Z de [https://legacy.esperanto.org.uk/eldonoj/etv/](https://legacy.esperanto.org.uk/eldonoj/etv/) **Nun pulorata**
3. novaj artikoloj

### Datoĝisdatigo

~~tajpu `++` je la lasta punkto de la artikolo, post tio malfermi la terminalon ĉe la vojo de la vortaro, kaj ruligi sur la terminalo `python lasta_sxangxo.py` por aldoni la daton kaj precizan tempon aŭtomate.~~

Nun estas la maniero de **Snippet** per tajpi `/t` kaj `Enter` la daton kaj tempon aŭtomate aperas. Por la pliaj **Snippet**oj, vidu ĉe la dosiero `.vscode/vortaro.code-snippet`

## Farado-vojoj.
1. kontrolas ĉiujn vortojn de la ETV.
2. pligrandigas la listo de BRE.
3. aldonas de tempo al la tempo novajn vortojn.
4. prenos ĉiujn tradukojn al ReVo.

## Permesilo por kodoj
MIT
