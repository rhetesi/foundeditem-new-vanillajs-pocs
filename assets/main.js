"use strict";

import { createAnyElement } from "./html.js";
/* 
Properties of a founded item:
- ID - egyedi azonosító
- date & time of found - azaz a találás (leadás) dátuma és ideje IDŐBÉLYEG,
- name of the founded item - a talált tárgy megnevezése (pl. sál; karóra),
- description of the founded item - leírás a tárgyról (pl. rózsaszín alapon, arany mintás női sál; fehér számlapos, ezüst keretes, fekete bőr szíjas, analóg férfi karóra),
- place of foundig - találás helye (pl. "G" épület öltöző; "A" épület) lehessen listából váasztani,
- founder - találó (Vendég, Dolgozó),
- name of registrant - nyilvántartásba felvevő megnevezése (a rögzítő dolgozó azonosítója, JWT azonostást követően automatikusan rögzített),
- photo - fénykép (nem kötelező, de célszerű lefotózni a talált tárgyat, selejtezést követően a selejtezett tárgyak fotói törölhetőek),
- date of issue of found item - talált tárgy kiadásának dátuma IDŐBÉLYEG,
- recipient of a found object - talált tárgy átvevője (név, postacím),
- transferee - átadó személy(a rögzítő dolgozó azonosítója, JWT azonostást követően automatikusan rögzített),
- place of custody - őrzés helye(3 hónapig Tófürdő, 3 - 12 hónap között raktár, utána selejtezve),
- status: active, passive or discarded - állapot: aktív (Tófürdőn őrzött), passzív (raktárba szállított) vagy selejtezett,
- start date of current status - az aktuális státusz kezdő időpontja (vagy inkább mindhárom státusz kezdő időpontja),
- initiator of state change - állapotváltozás kezdeményezője (raktárba szállíttató, selejtező; JWT azonosítást követően automatikusan rögzített),
*/

/* 
3 arrays for the active, passive & discarded items

the last 30 days of founded items, which statuses are active shown in the index.html by cards in a table, after click on the view (more) button a modal card opens with the full description of the properties of the selected founded item
the show of the last 30 days founded item is sorted by backward timeline
*/

import { pocarr } from "./db.js";

// console.log(pocarr);

// Card of a founded item

// List of last 30 days founded items
// Írd át olyan függvénnyé (function), amely bármely 2 dátum közötti időszakra lekérdezi a tárgyak listáját
// alapértelmezetten a legeső bejegyzéstől a mai napig
// paraméterként kapja a kezdő és záró dátumot

let today = new Date();

let last60Days = [];

for (let i = 0; i < pocarr.length; i++) {
  /* if (
    new Date(pocarr[i]["found_date&time"]).getFullYear() ===
      today.getFullYear() &&
    new Date(pocarr[i]["found_date&time"]).getMonth() === today.getMonth()
  ) {
    arr30Days.push(pocarr[i]);
  } */
  if (
    new Date(pocarr[i]["found_date&time"]) >=
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 60)
  ) {
    last60Days.push(pocarr[i]);
  }
}

// console.log(last60Days);

/* // How to conditional iterating an array w/ .map()
const printArr = [];

pocarr.map((item) => {
  if (
    new Date(item["found_date&time"]) >=
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
  ) {
    printArr.push(item);
  }
});

console.log(printArr); */

// List of founded items between any two (beginning and ending) dates

// let listOfShowingItems = [];

/* const listDates = {
  begin: new Date(1900, 0, 1),
  last: new Date(),
}; */

const anyTwoDateArray = (
  array,
  last = new Date(),
  begin = new Date(1900, 0, 1)
) => {
  let listOfShowingItems = [];
  array.map((item) => {
    if (
      new Date(item["found_date&time"]) >= new Date(begin) &&
      new Date(item["found_date&time"]) <= new Date(last)
    ) {
      listOfShowingItems.push(item);
    }
  });
  console.log(listOfShowingItems);
};

/* anyTwoDateArray(pocarr);
anyTwoDateArray(pocarr, new Date(2022, 11, 31));
anyTwoDateArray(pocarr, new Date(2023, 1, 28), new Date(2022, 5, 30));
anyTwoDateArray(pocarr, new Date(), new Date(2022, 5, 30)); */

// Hogy bármelyik dátumot kezeld, a dátumokat egy object kulcs:érték párjaiban add át!!!

// console.log(new Date(2023, 10, 23));

/* 

const anyTwoDateArray = (
  array,
  begin,
  last
) => {
  let listOfShowingItems = [];
  !begin ? 
  !last ? array.map((item) => {
  if (new Date(item["found_date&time"]) >= new Date(1900, 0, 1) && new Date(item["found_date&time"]) <= new Date()) {
  listOfShowingItems.push(item);
  } : if (new Date(item["found_date&time"]) >= new Date(1900, 0, 1) && new Date(item["found_date&time"]) <= new Date(last)) {
  listOfShowingItems.push(item);
  } : if (new Date(item["found_date&time"]) >= new Date(begin) && new Date(item["found_date&time"]) <= new Date(last)) {
  listOfShowingItems.push(item);
  }
  });
  console.log(listOfShowingItems)
};

*/

let listDates = {
  begin: new Date(1900, 0, 1),
  last: new Date(),
};

const ld = {
  begin: new Date(1900, 0, 1),
  last: new Date(),
};

Object.seal(ld);

// console.log(listDates);

function atda(array, params) {
  let listOfShowingItems = [];
  array.map((item) => {
    if (
      new Date(item["found_date&time"]) >= new Date(params.begin) &&
      new Date(item["found_date&time"]) <= new Date(params.last)
    ) {
      listOfShowingItems.push(item);
    }
  });
  console.log(listOfShowingItems);
}

// 1. változat: kívül módosítom az object kulcsainak értékeit, majd azután hívom a lekérdező függvényt. Ekkor az object lehet CONST -tal definiált
ld.begin = new Date(2022, 5, 30);
ld.last = new Date(2023, 1, 28);
// atda(pocarr, ld);

// Ezzel a függvénybe ágyazott megoldással nincs felesleges külső objetum, azaz a garbage collector a függvény lefutását követően törli a nem használt memória részleteket. :)
const atdaFunc = () => {
  const ls = {
    begin: new Date(2000, 0, 1),
    last: new Date(),
  };
  Object.seal(ls);
  ls.begin = new Date(2022, 5, 30);
  ls.last = new Date(2022, 11, 15);
  atda(pocarr, ls);
};

// atdaFunc();

// listDates = {
//   begin: new Date(2022, 6, 30),
//   last: new Date(2023, 2, 28)
// }
// console.log(listDates);

// 2. válozta: a lekérdező függvény hívásakor módosítom az object kulcsainak értékeit. Ekkor csak LET -tel lehet definiálni az objectet, mert magát az object-et írom felül
// atda(pocarr, listDates = {
//   begin: new Date(2022, 6, 31),
//   last: new Date(2023, 2, 31)
// });

// atda(pocarr, ld);
// atda(pocarr, ld.begin = new Date(2022, 5, 30), ld.last = new Date(2023, 1, 28));

/* function atda(array,
  params) {
  let listOfShowingItems = [];
  array.map((item) => {
    if (new Date(item["found_date&time"]) >= new Date(params.begin) &&
      new Date(item["found_date&time"]) <= new Date(params.last)) {
      listOfShowingItems.push(item);
    }
  });
  console.log(listOfShowingItems);
}

const atdaFunc = () => {
  const ls = {
    begin: new Date(2000, 0, 1),
    last: new Date()
  }
  Object.seal(ls);
  ls.begin = new Date(2022, 5, 30);
  ls.last = new Date(2022, 11, 15);
  atda(pocarr, ls);
}

atdaFunc(); */
// let showDates = document.querySelector(".list");

const anyTwoDatesArray = (array, returnArray, params) => {
  array.map((item) => {
    if (
      new Date(item["found_date&time"]) >= new Date(params.begin) &&
      new Date(item["found_date&time"]) <= new Date(params.last)
    ) {
      returnArray.push(item);
    }
  });
  // console.log(`Eredeti tömb`);
  // console.log(array);
  // console.log(`Kimeneti tömb`);
  // console.log(returnArray);
  return returnArray;
};

/* const anyTwoDatesCall = () => {
  let list = [];
  const dates = {
    begin: new Date(2000, 0, 1),
    last: new Date(),
  };
  Object.seal(dates);
  dates.begin = new Date(2022, 5, 30);
  dates.last = new Date(2023, 0, 31);
  anyTwoDatesArray(pocarr, list, dates);
  let viewList = document.querySelector(".list");
  for (let i = 0; i < list.length; i++) {
    viewList.insertAdjacentText(`beforeend`, list[i][`found_date&time`]);
  }
}; */
const anyTwoDatesCall = () => {
  let tbody = document.querySelector(`.tbody`);
  let list = [];
  const dates = {
    begin: new Date(2000, 0, 1),
    last: new Date(),
  };
  Object.seal(dates);
  dates.begin = new Date(2022, 5, 30);
  dates.last = new Date(2023, 0, 31);
  anyTwoDatesArray(pocarr, list, dates);
  console.log(list);
  let viewList = document.querySelector(".list");
  for (let i = 0; i < list.length; i++) {
    let tr = createAnyElement("tr");
    // first cell of table's row
    let td = createAnyElement("td");
    td.insertAdjacentText(`beforeend`, `${i + 1}`);
    tr.appendChild(td);
    // second cell of table's row
    td = createAnyElement("td");
    td.insertAdjacentText(`beforeend`, list[i][`found_date&time`]);
    tr.appendChild(td);
    // third cell of table's row
    td = createAnyElement("td");
    td.insertAdjacentText(`beforeend`, list[i][`name_of_the_founded_item`]);
    tr.appendChild(td);
    // issue's cell of table's row
    td = createAnyElement("td");
    td.insertAdjacentText(
      `beforeend`,
      list[i][`date_of_issue_of_founded_item`]
    );
    tr.appendChild(td);
    // custody's cell of table's row
    td = createAnyElement("td");
    td.insertAdjacentText(`beforeend`, list[i][`start_date_of_current_status`]);
    tr.appendChild(td);
    // buttons cell of table's row
    td = createAnyElement("td", {
      class: "btn-group",
    });
    let btn = createAnyElement("button", {
      class: "btn btn-outline-info",
    });
    // btn.insertAdjacentText(`beforeend`, `view`);
    let image = createAnyElement(`i`, {
      class: `bi bi-eye`,
    });
    btn.appendChild(image);
    td.appendChild(btn);
    btn = createAnyElement("button", {
      class: "btn btn-outline-warning",
    });
    // btn.insertAdjacentText(`beforeend`, `edit`);
    image = createAnyElement(`i`, {
      class: `bi bi-pencil`,
    });
    btn.appendChild(image);
    td.appendChild(btn);
    btn = createAnyElement("button", {
      class: "btn btn-outline-success",
    });
    // btn.insertAdjacentText(`beforeend`, `transfer`);
    image = createAnyElement(`i`, {
      class: `bi bi-send`,
    });
    btn.appendChild(image);
    td.appendChild(btn);
    btn = createAnyElement("button", {
      class: "btn btn-outline-danger",
    });
    // btn.insertAdjacentText(`beforeend`, `delete`);
    image = createAnyElement(`i`, {
      class: `bi bi-trash`,
    });
    btn.appendChild(image);
    td.appendChild(btn);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
};

anyTwoDatesCall();
