function sxaven(kiu)
{
	// konverti al la sxava
	// var certa = confirm("\u0108u vi certas ke vi volas konverti al la ŝava?");
	// if (!certa) {return;}

	var teksto = document.getElementById(kiu).value;

	//granda
	teksto = teksto.replace(/A/,"𐑨");
	teksto = teksto.replace(/B/,"𐑚");
	teksto = teksto.replace(/C/g,"𐑔");
	teksto = teksto.replace(/D/g,"𐑛");
	teksto = teksto.replace(/E/g,"𐑧");
	teksto = teksto.replace(/F/g,"𐑓");
	teksto = teksto.replace(/G/g,"𐑜");
	teksto = teksto.replace(/H/g,"𐑣");
	teksto = teksto.replace(/I/g,"𐑦");
	teksto = teksto.replace(/J/g,"𐑢");
	teksto = teksto.replace(/K/g,"𐑒");
	teksto = teksto.replace(/L/g,"𐑤");
	teksto = teksto.replace(/M/g,"𐑫");
	teksto = teksto.replace(/N/g,"𐑵");
	teksto = teksto.replace(/O/g,"𐑩");
	teksto = teksto.replace(/P/g,"𐑐");
	teksto = teksto.replace(/R/g,"𐑮");
	teksto = teksto.replace(/S/g,"𐑕");
	teksto = teksto.replace(/T/g,"𐑑");
	teksto = teksto.replace(/U/g,"𐑪");
	teksto = teksto.replace(/V/g,"𐑝");
	teksto = teksto.replace(/Z/g,"𐑟");
	//malgranda
	teksto = teksto.replace(/a/g,"𐑨");
	teksto = teksto.replace(/b/g,"𐑚");
	teksto = teksto.replace(/c/g,"𐑔");
	teksto = teksto.replace(/d/g,"𐑛");
	teksto = teksto.replace(/e/g,"𐑧");
	teksto = teksto.replace(/f/g,"𐑓");
	teksto = teksto.replace(/g/g,"𐑜");
	teksto = teksto.replace(/h/g,"𐑣");
	teksto = teksto.replace(/i/g,"𐑦");
	teksto = teksto.replace(/j/g,"𐑢");
	teksto = teksto.replace(/k/g,"𐑒");
	teksto = teksto.replace(/l/g,"𐑤");
	teksto = teksto.replace(/m/g,"𐑫");
	teksto = teksto.replace(/n/g,"𐑵");
	teksto = teksto.replace(/o/g,"𐑩");
	teksto = teksto.replace(/p/g,"𐑐");
	teksto = teksto.replace(/r/g,"𐑮");
	teksto = teksto.replace(/s/g,"𐑕");
	teksto = teksto.replace(/t/g,"𐑑");
	teksto = teksto.replace(/u/g,"𐑪");
	teksto = teksto.replace(/v/g,"𐑝");
	teksto = teksto.replace(/z/g,"𐑟");


	teksto = teksto.replace(/ĉ/g,"𐑗");
	teksto = teksto.replace(/ĝ/g,"𐑡");
	teksto = teksto.replace(/ĥ/g,"𐑙");
	teksto = teksto.replace(/ĵ/g,"𐑠");
	teksto = teksto.replace(/ŝ/g,"𐑖");
	teksto = teksto.replace(/ŭ/g,"𐑘");


	document.getElementById(kiu).value=teksto;
	kiom();
}


function espen(kiu)
{
	// konverti al la sxava
	// var certa = confirm("\u0108u vi certas ke vi volas konverti al la ŝava?");
	// if (!certa) {return;}

	var teksto = document.getElementById(kiu).value;

	teksto = teksto.replace(/𐑨/g,"a");
	teksto = teksto.replace(/𐑚/g,"b");
	teksto = teksto.replace(/𐑔/g,"c");
	teksto = teksto.replace(/𐑗/g,"ĉ");
	teksto = teksto.replace(/𐑛/g,"d");
	teksto = teksto.replace(/𐑧/g,"e");
	teksto = teksto.replace(/𐑓/g,"f");
	teksto = teksto.replace(/𐑜/g,"g");
	teksto = teksto.replace(/𐑡/g,"ĝ");
	teksto = teksto.replace(/𐑣/g,"h");
	teksto = teksto.replace(/𐑙/g,"ĥ");
	teksto = teksto.replace(/𐑦/g,"i");
	teksto = teksto.replace(/𐑢/g,"j");
	teksto = teksto.replace(/𐑠/g,"ĵ");
	teksto = teksto.replace(/𐑒/g,"k");
	teksto = teksto.replace(/𐑤/g,"l");
	teksto = teksto.replace(/𐑫/g,"m");
	teksto = teksto.replace(/𐑵/g,"n");
	teksto = teksto.replace(/𐑩/g,"o");
	teksto = teksto.replace(/𐑐/g,"p");
	teksto = teksto.replace(/𐑮/g,"r");
	teksto = teksto.replace(/𐑕/g,"s");
	teksto = teksto.replace(/𐑖/g,"ŝ");
	teksto = teksto.replace(/𐑑/g,"t");
	teksto = teksto.replace(/𐑪/g,"u");
	teksto = teksto.replace(/𐑘/g,"ŭ");
	teksto = teksto.replace(/𐑝/g,"v");
	teksto = teksto.replace(/𐑟/g,"z");


	document.getElementById(kiu).value=teksto;
	kiom();
}
