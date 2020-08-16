// Get table elements in a template
function queryTables(){
  let tables = document.getElementsByTagName("table"),
  tLen = tables.length,
  i;
  if (tLen > 0){
    for (i = 0; i < tLen; i++){
      btncreator(tables[i]);
    }
  }
}

// Create btns with respective actions for each table
function btncreator(table){
  let i, btn, btnTxt;
  table.setAttribute("class", "aiTle");
  for (i=0; i <3; i++){
    btn = document.createElement("BUTTON");
    switch (i){
      case 0:
        Object.assign(btn, {
          className: "aiTleBtns",
          onclick: function() {
            console.log("will paginate");
          }
        })
        btnTxt = document.createTextNode("Paginate");
        break;
      case 1:
        Object.assign(btn, {
          className: "aiTleBtns",
          onclick: function() {
            let filterForm = document.createElement("INPUT"),
            tableParent = this.parentNode;
            if (tableParent.firstElementChild.tagName == "INPUT"){
              tableParent.firstElementChild.remove();
            } else {
              Object.assign(filterForm, {
                type: "text",
                id: "filterForm",
                placeholder: "Search..",
                onkeyup: filterTable
              })
              tableParent.insertBefore(filterForm, tableParent.children[0]);
            }
          }
        })
        btnTxt = document.createTextNode("Filter");
        break;
      case 2:
        Object.assign(btn, {
          className: "aiTleBtns",
          onclick: function() {
            let tableParent = this.parentNode,
            aiTleTh, aiTleThLen, i;
            if (tableParent.firstElementChild.tagName == "INPUT") {
              aiTleTh = tableParent.children[1].querySelectorAll("th");
              aiTleThLen = aiTleTh.length;
            } else {
              aiTleTh = tableParent.firstElementChild.querySelectorAll("th");
              aiTleThLen = aiTleTh.length;
            }
            for (let i = 0; i < aiTleThLen; i++) {
              Object.assign(aiTleTh[i], {
                className: "aiTleTh",
                onclick: function() {
                  sortTable(i)
                }
              })
            }
          }
        })
        btnTxt = document.createTextNode("Sort");
        break;
      default:
        console.log("Check with btncreator");
    }
    btn.appendChild(btnTxt);
    table.parentNode.appendChild(btn); 
  }
}

// Filter table
function filterTable() {
  // Declare variables
  let input = this,
  filter = input.value.toUpperCase(),
  table = input.nextElementSibling,
  tr = table.querySelectorAll("tbody tr"),
  len = tr.length, td, i, txtValue;

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < len; i++) {
    td = tr[i];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "table-row";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Sort table
function sortTable(n) {
  let table  = event.target.parentNode.parentNode.parentNode,
  switching = true,
  switchcount = 0, rows, i, x, y, shouldSwitch, dir;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}