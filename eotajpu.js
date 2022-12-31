//////////////////////////////////////////////////////////////////////////////////////////////
//	TTT-KLAVARO POR ESPERANTO
//	Tajpu x por aldoni supersignon.
//	(de A. Irvine 2005 .. 2010, beta-versio)
//	http://lingvo.org/eotajpu
//
//	Programeto por MSIE kaj Firefox kaj Opera.
//	Vi povas uzi senpage kaj senpermese,
//	sed ne forigu tiun cxi tektson.
//////////////////////////////////////////////////////////////////////////////////////////////

var EOTAJPU = true;
var NURVX = false; // nur vx, kaj ne ux (cxar kolizias kun ekz. la franca)
var ESTISUX = false;
var tajplingvo = "eo";
var liva0 = -2;
var liva1 = -1;

function legu_tajppozicion(elemento)
{
var i=-1, I=i, j=-1, J=j;
liva1 = -3;
try
{
   if(typeof elemento.selectionStart=="number") {
     i=elemento.selectionStart;
     j=elemento.selectionEnd;
     I=i;
     J=j;
       //alert("FF/O "+i+" "+j);
   } else if(document.selection && elemento.createTextRange) {
	var sel, rngi, rngj, r2;
// http://msdn.microsoft.com/library/default.asp?url=/workshop/browser/mshtml/reference/ifaces/txtrange/txtrange.asp
// http://www.webreference.com/js/column12/trmethods.html
// javascript:alert(document.selection.createRange().text+".")		// nur MSIE
// http://www.devguru.com/Technologies/Ecmascript/Quickref/doc_getSelection.html
// http://www.quirksmode.org/dom/range_intro.html
     sel=document.selection; // bedauride en MISE finaj CR ne estas inkluzivita!
     if(sel){
       try
       {
       r2=sel.createRange();
       liva1 = r2.offsetLeft;
       rngi=elemento.createTextRange();
       rngi.setEndPoint("EndToStart", r2);
       i=rngi.text.length;
       rngj=elemento.createTextRange();
       rngj.setEndPoint("EndToEnd", r2);
       j=rngj.text.length;
       //alert("MS (input) "+i+" "+j);
       }
       catch(e)
       {
        r2=sel.createRange();
	var r3= r2.duplicate();
        liva1 = r2.offsetLeft;
	r3.moveToElementText(elemento); // selekt tekson en r3
	r3.setEndPoint('EndToEnd',r2);
	var x2=r2.text;
	var x3=r3.text;
	i = x3.length - x2.length;
	j = i + x2.length;

	x2 = x2.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
	x3 = x3.replace(/\r?\n/g,"+\n"); // \r\n -> longeco 1 ne 2!
	//alert("MS (linifinoj) "+x3+" "+x3.length);
	I = x3.length - x2.length;
	J = I + x2.length;

        //alert("MS (textarea) {"+x3+"} "+i+" "+j+"("+I+" "+J+")");
       }
     }
     else {
	//alert("NO SEL");
     }
   } else {
	   //alert("ER");
	   i=-1;
	   I=i;
	   j=-1;
	   J=j;
   }
}
catch (e)
{
	//alert(e);
}

//alert("AKIRIS "+i+" "+j);
if (i < 0) // || i != j)
{
	i=-1;
	I=i;
	j=-1;
	J=j;
}

var a = new Array();
a[0] = i;
a[1] = j;
a[2] = I;
a[3] = J;
return a;
}


function skribu_tajppozicion(elemento, kie, komenco)
{
try
{
   if(typeof elemento.selectionStart=="number") {
   	//alert("FF/O relokigu al "+kie);
	//elemento.selectionStart = kie; elemento.selectionEnd = kie; <-- erareto en Opera 8.5/9.10, bug-182864 CHE bugs.opera.com, uzu anstatauxe setSelectionRange()
	elemento.setSelectionRange(kie, kie);
   } else if(elemento.createTextRange) {
	komenco = komenco.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
   	//alert("MS relokigu al "+kie+" ; "+komenco.length);
	var r = elemento.createTextRange(); r.move('character', komenco.length); r.select();
   }
}
catch (e)
{
	//alert(e);
}
}


function eotajpu0
(
	elemento
)
{
	legu_tajppozicion(elemento);
	liva0=liva1;
	elemento.focus();
}

function eotajpu
(
	elemento, // ENA, DEVIGA, FIKSITA "this"
	ev, // ENA, DEVIGA, FIKSITA "event"
	maksimuma_longeco, // ENA, FAKULTATIVA, ENTJERO >= 0
	komencaj_spacoj, // ENA, FAKULTATIVA, true/false
	modelo, // ENA, REGEXP
	alvoko // ENA, KODO ALVOKENDA KIAM ERARO
)
{
	if (!EOTAJPU)
	{
		return;
	}

	var klavo = -1;
	if (ev && ev.which)
	{
	    klavo = ev.which; // NS4 & NS6
	}
	else if (window.event && window.event.keyCode)
	{
	   klavo = window.event.keyCode; // IE
	}
	//alert("Vi premis "+klavo+" "+String.fromCharCode(klavo));
	if (
		klavo != -1
		&& klavo != 0  // mus
		&& klavo != 16 // mal-maj!
		&& klavo != 33 // ^^
		&& klavo != 34 // vv
		&& klavo != 35 // fin
		&& klavo != 36 // hejm
		&& klavo != 37 // <-
		&& klavo != 38 // ^
		&& klavo != 39 // ->
		&& klavo != 40 // v
	)
	{
		try
		{
			var metu = false;
			var a = legu_tajppozicion(elemento);
			var i = a[0];
			var I = a[2];
			var M = -1;
			if (i < 0)
			{
				return;
			}
			var k = elemento.value.substr(0,i);
			var f = elemento.value.substr(i);
			//alert(i+" | "+'"'+k+'"'+" | "+'"'+f+'"');

			var k0 = k;
			var f0 = f;
			if (tajplingvo == "eo")
			{
				k = k.replace(/c[Xx]$/g,"\u0109");
				k = k.replace(/g[Xx]$/g,"\u011D");
				k = k.replace(/h[Xx]$/g,"\u0125");
				k = k.replace(/j[Xx]$/g,"\u0135");
				k = k.replace(/s[Xx]$/g,"\u015D");
				if (/v[Xx]$/.test(k))
				{
					ESTISUX = false;
				}
				k = k.replace(/v[Xx]$/g,"\u016D");
				if (!NURVX)
				{
					if (/u[Xx]$/.test(k))
					{
						ESTISUX = true;
					}
					k = k.replace(/u[Xx]$/g,"\u016D");
				}

				k = k.replace(/C[Xx]$/g,"\u0108");
				k = k.replace(/G[Xx]$/g,"\u011C");
				k = k.replace(/H[Xx]$/g,"\u0124");
				k = k.replace(/J[Xx]$/g,"\u0134");
				k = k.replace(/S[Xx]$/g,"\u015C");
				k = k.replace(/V[Xx]$/g,"\u016C");
				if (/U[Xx]$/.test(k))
				{
					ESTISUX = false;
				}
				if (!NURVX)
				{
					if (/U[Xx]$/.test(k))
					{
						ESTISUX = true;
					}
					k = k.replace(/U[Xx]$/g,"\u016C");
				}
				//k = k.replace(/;X$/g,"X");
				//k = k.replace(/;x$/g,"x");
				/*
				// Alia ebla metodo estas ^c )u
				k = k.replace(/c\^$/g,"\u0109");
				k = k.replace(/g\^$/g,"\u011D");
				k = k.replace(/h\^$/g,"\u0125");
				k = k.replace(/j\^$/g,"\u0135");
				k = k.replace(/s\^$/g,"\u015D");
				k = k.replace(/u\($/g,"\u016D");
				k = k.replace(/C\^$/g,"\u0108");
				k = k.replace(/G\^$/g,"\u011C");
				k = k.replace(/H\^$/g,"\u0124");
				k = k.replace(/J\^$/g,"\u0134");
				k = k.replace(/S\^$/g,"\u015C");
				k = k.replace(/U\($/g,"\u016C");
				*/
				if (k.length != k0.length)
				{
					metu = true;
					M=I-1;
				}
				else
				{
					k = k.replace(/\u0109x$/g,"cx");
					k = k.replace(/\u0109X$/g,"cX");
					k = k.replace(/\u011Dx$/g,"gx");
					k = k.replace(/\u011DX$/g,"gX");
					k = k.replace(/\u0125x$/g,"hx");
					k = k.replace(/\u0125X$/g,"hX");
					k = k.replace(/\u0135x$/g,"jx");
					k = k.replace(/\u0135X$/g,"jX");
					k = k.replace(/\u015Dx$/g,"sx");
					k = k.replace(/\u015DX$/g,"sX");
					if (ESTISUX)
					{
						k = k.replace(/\u016Dx$/g,"ux");
						k = k.replace(/\u016DX$/g,"uX");
					}
					else
					{
						k = k.replace(/\u016Dx$/g,"vx");
						k = k.replace(/\u016DX$/g,"vX");
					}

					k = k.replace(/\u0108x$/g,"Cx");
					k = k.replace(/\u0108X$/g,"CX");
					k = k.replace(/\u011Cx$/g,"Gx");
					k = k.replace(/\u011CX$/g,"GX");
					k = k.replace(/\u0124x$/g,"Hx");
					k = k.replace(/\u0124X$/g,"HX");
					k = k.replace(/\u0134x$/g,"Jx");
					k = k.replace(/\u0134X$/g,"JX");
					k = k.replace(/\u015Cx$/g,"Sx");
					k = k.replace(/\u015CX$/g,"SX");
					if (ESTISUX)
					{
						k = k.replace(/\u016Cx$/g,"Ux");
						k = k.replace(/\u016CX$/g,"UX");
					}
					else
					{
						k = k.replace(/\u016Cx$/g,"Vx");
						k = k.replace(/\u016CX$/g,"VX");
					}

					if (k != k0)
					{
						metu = true;
						M=I;
					}
				}
			}

			if (metu)
			{
				elemento.value = k+f;
				skribu_tajppozicion(elemento, M, k);
				//alert(k0+" => "+k);
			}

			var eraro= false;
			var K=k; K = K.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
			var F=f; F = F.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
			M=I;
			if (typeof(maksimuma_longeco) != "undefined" && (K+F).length>maksimuma_longeco)
			{
				eraro = true;
				while (k.length > 0 && (K+F).length>maksimuma_longeco)
				{
					k = k.replace(/\r?.$/, "");
					K = K.replace(/.$/g,"");
					M--;
				}
			}
			if (typeof(komencaj_spacoj) != "undefined" && !komencaj_spacoj && (K+F).match(/^\s+/))
			{
				var re = RegExp("^\\s+");
				while ((K+F).match(re))
				{
					eraro = true;
					while ((K+F).match(re))
					{
						k = k.replace(/^./, "");
						K = K.replace(/^./g,"");
						M--;
					}
				}
			}
			if (typeof(modelo) != "undefined" && modelo.length>0)
			{
				var re = RegExp(modelo);
				while (!(K+F).match(re))
				{
					eraro = true;
					while (!(K+F).match(re))
					{
						k = k.replace(/\r?.$/, "");
						K = K.replace(/.$/g,"");
						M--;
					}
				}
			}
			if (eraro)
			{
				elemento.value = k+f;
				skribu_tajppozicion(elemento, M, k);
				if (typeof(alvoko) != "undefined" && alvoko.length>0)
				{
					setTimeout(alvoko,0);
				}
			}
			//alert(elemento.value);
		}
		catch (e)
		{
			//alert(e);
		}
	}
}

function internaciemetu
(
	elemento, // ENA, DEVIGA, OFTE "this"
	ev, // ENA, DEVIGA, FIKSITA "event"
	kion // litero
)
{
	if (1)
	{
		try
		{
			var metu = false;
			elemento.focus(); var a = legu_tajppozicion(elemento);
			var i = a[0];
			var I = a[2];
			var M = -1;
			//alert(i);
			//alert(liva0+" ~ "+liva1)
			if (i < 0)
			{
				return;
			}
			var k = elemento.value.substr(0,i);
			var f = elemento.value.substr(a[1]);

			if (navigator.userAgent.match(/msie/i) && !navigator.userAgent.match(/opera/i) // en MSIE stulte "xCR" ighas "x"
						&& liva0 == liva1 // unua kolumno
						&& k != "" // sed ne tutunua linio
						)
			{
				k = k + "\n";
				f = f.replace(/^\r?\n/,"");
			}
			//alert(i+" | "+'<'+k+'>'+" | "+'<'+f+'>');

			var k0 = k;
			var f0 = f;

			if (1)
			{
				k = k.replace(/$/g,kion);
				if (k.length != k0.length)
				{
					metu = true;
					M=I+1;
				}
			}

			if (metu)
			{
				elemento.value = k+f;
				skribu_tajppozicion(elemento, M, k);
				//alert(k0+" => "+k);
			}

			var eraro= false;
			var K=k; K = K.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
			var F=f; F = F.replace(/\r?\n/g,"\n"); // \r\n -> longeco 1 ne 2!
			M=I;
			if (typeof(maksimuma_longeco) != "undefined" && (K+F).length>maksimuma_longeco)
			{
				eraro = true;
				while (k.length > 0 && (K+F).length>maksimuma_longeco)
				{
					k = k.replace(/\r?.$/, "");
					K = K.replace(/.$/g,"");
					M--;
				}
			}
			if (typeof(komencaj_spacoj) != "undefined" && !komencaj_spacoj && (K+F).match(/^\s+/))
			{
				var re = RegExp("^\\s+");
				while ((K+F).match(re))
				{
					eraro = true;
					while ((K+F).match(re))
					{
						k = k.replace(/^./, "");
						K = K.replace(/^./g,"");
						M--;
					}
				}
			}
			if (typeof(modelo) != "undefined" && modelo.length>0)
			{
				var re = RegExp(modelo);
				while (!(K+F).match(re))
				{
					eraro = true;
					while (!(K+F).match(re))
					{
						k = k.replace(/\r?.$/, "");
						K = K.replace(/.$/g,"");
						M--;
					}
				}
			}
			if (eraro)
			{
				elemento.value = k+f;
				skribu_tajppozicion(elemento, M, k);
				if (typeof(alvoko) != "undefined" && alvoko.length>0)
				{
					setTimeout(alvoko,0);
				}
			}
			//alert(elemento.value);
		}
		catch (e)
		{
			//alert(e);
		}
	}
}

function decxvx(teksto)
{
	teksto = teksto.replace(/([Xx][Xx])/g,"__$1__");
	teksto = teksto.replace(/C[Xx]/g,"\u0108");
	teksto = teksto.replace(/c[Xx]/g,"\u0109");
	teksto = teksto.replace(/G[Xx]/g,"\u011C");
	teksto = teksto.replace(/g[Xx]/g,"\u011D");
	teksto = teksto.replace(/H[Xx]/g,"\u0124");
	teksto = teksto.replace(/h[Xx]/g,"\u0125");
	teksto = teksto.replace(/J[Xx]/g,"\u0134");
	teksto = teksto.replace(/j[Xx]/g,"\u0135");
	teksto = teksto.replace(/S[Xx]/g,"\u015C");
	teksto = teksto.replace(/s[Xx]/g,"\u015D");
	teksto = teksto.replace(/([AaEe])U[Xx]/g,"$1\u016C");
	teksto = teksto.replace(/([AaEe])u[Xx]/g,"$1\u016D");
	teksto = teksto.replace(/V[Xx]/g,"\u016C");
	teksto = teksto.replace(/v[Xx]/g,"\u016D");
	teksto = teksto.replace(/__([Xx][Xx])__/g,"$1");
	return teksto;
}
