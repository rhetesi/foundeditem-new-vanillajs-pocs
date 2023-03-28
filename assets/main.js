"use strict";

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

const listDates = {
  begin: new Date(1900, 0, 1),
  last: new Date(),
};

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

anyTwoDateArray(pocarr);
anyTwoDateArray(pocarr, new Date(2022, 11, 31));
anyTwoDateArray(pocarr, new Date(2023, 1, 28), new Date(2022, 5, 30));
anyTwoDateArray(pocarr, new Date(), new Date(2022, 5, 30));

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
