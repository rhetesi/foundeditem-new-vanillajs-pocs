'use strict';

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

import {
    pocarr
} from "./db.js";

// console.log(pocarr);