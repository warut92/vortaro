//ARR
const THEO_VORTARO = theo_vortaro.split("\n").sort((a, b) => a.localeCompare(b, 'th'))
const THEO_VORTARO_PURIGA = THEO_VORTARO.filter(subArray => subArray.length > 0)

//STR
let theo_vortaro_str = THEO_VORTARO_PURIGA.toString().replace(/,/g, "<br><hr>")
document.getElementById("theo_vortaro").innerHTML = theo_vortaro_str
