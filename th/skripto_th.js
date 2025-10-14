function getDictionary() {
    //thai - dict
    var csvURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRNrFijrQdRCeGn3BmgZbIqNJF3bUWmw0CsWEsGgSe2b9jCTwvdcpXl9wRRIcIGFUL6a-e0cxcFBez4/pub?gid=0&single=true&output=csv";
    var searchPlaceholder = 'ค้นหา';
  
    $("#parsed_csv_list").empty();
    $("#search").empty();
    $("#search").html("<input id='enigo' placeholder=" + searchPlaceholder + " type='search'> <button id='forigi' onclick='forigi()'>⌫</button>");
  
    Papa.parse(csvURL, {
      download: true,
      header: false,
      // worker: true,
      // step: function(row) {
      //  console.log("Row:", row.data);
      // },
      complete: displayHTMLTable
    });
  }
  
  function displayHTMLTable(results) {
    var table = "<table class='table'><thead><tr>";
    var data = results.data;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].splice(1, 0, data[i][1]));
    }
    var header = data.shift();
    console.log(header);
    for(h=0;h<header.length;h++){
      table+= "<th>" + header[h] + "</th>";
    }
    table+= "</tr></thead><tbody id='jetsContent'>";
  
    for(i=0;i<data.length;i++){
      table+= "<tr>";
      var row = data[i];
      console.log(row);
      for(j=0;j<row.length;j += 1){
        var cell = row[j];
        table+= "<td>" + cell + "</td>";
        console.log(cell);
        // console.log(table+= "<td>" + cell + "</td>");
      }
      table+= "</tr>";
    }
    table+= "</tbody></table>";

    $("#parsed_csv_list").html(table);
    var jets = new Jets({
      contentTag: '#jetsContent',
      searchInSpecificColumn: true,
      callSearchManually: true,
      columns: [0,1],
      diacriticsMap: {
        a: "ÁÀÃÂÄáàãâäāǎ",
        я: "я́",
        e: "ÉÈÊËéèêëēě",
        i: "ÍÌÎÏíìîïīǐ",
        o: "ÓÒÕÔÖóòõôöōǒ",
        u: "ÚÙÛÜúùûŭüū",
        c: "ĉ",
        g: "ĝ",
        h: "ĥ",
        j: "ĵ",
        s: "ŝ",
        x: "",
      }
    });
    $("#enigo").on("input", function(event) { jets.search(event.target.value, [0][1]) } );
    async function addRomanizationToTable() {
      const table = document.getElementById('jetsContent');
      const rows = table.querySelectorAll('tbody tr');
    
      for (let row of rows) {
        const thaiCell = row.cells[0];
        const romanCell = row.cells[2];
        const thaiWord = thaiCell.textContent.trim();
        romanCell.textContent = 'Loading...';
        
        const roman = await fetchRomanization(thaiWord);
        romanCell.textContent = roman;
      }
    }
    
    // Call the function on page load
    addRomanizationToTable();

  }

  function forigi() {
    document.getElementById("enigo").value = "";
    displayHTMLTable(results)
    document.getElementById("enigo").focus()
  }

  async function fetchRomanization(thaiWord) {
    // Google Translate unofficial API
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=en&dt=rm&q=${encodeURIComponent(thaiWord)}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      // data[0][0][3] contains romanization
      return data[0][0][3] || '';
    } catch (err) {
      console.error("Error fetching romanization:", err);
      return '';
    }
  }
  

  