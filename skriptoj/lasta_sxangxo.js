  //Prenas la datojn de la tuta vortaro
  //rearanĝita dato kaj tempo
  let vortaro_re_aranĝita = vortaro.replace(/-w/g, " 00:00:00")
  .replace(/@(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})@/g, "@$3$2$1$4$5$6")
  //ARRAY-igi
  let DATO_DE_VORTARO_ARR = vortaro_re_aranĝita.match(/@\d{14}/g);
  //ordigi
  DATO_DE_VORTARO_ARR.sort((a, b) => {
    return a.localeCompare(b);
  });
  //prenas la lastan indicon
 let lasta_dato = DATO_DE_VORTARO_ARR[DATO_DE_VORTARO_ARR.length - 1].slice(1,20)
  //rearanĝi la daton kaj tempon por homoj facile legi
 let rearangxita_dato = lasta_dato.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,"$3-$2-$1 $4:$5:$6");
  // console.log(rearangxita_dato);
//  document.getElementById('lasta_dato').innerHTML = rearangxita_dato
  
