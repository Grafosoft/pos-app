import { Numeration, Seller } from "@/interface/invoiceParameters";
import { useMemo } from "react";

interface Params {
    idSelect : number
    arrayFind : Numeration | Seller
    setSelectStateFunction: () => void
    selectStateFunction: []

}

export const ObjectsSelects = (idSelect, arrayFind, setSelectStateFunction, selectStateFunction)=> {
    console.log(idSelect, "idSelect");
    console.log(arrayFind, "arrayFind");
    console.log(setSelectStateFunction, "setSelectStateFunction");
    console.log(selectStateFunction, "selectStateFunction");
    
    setSelectStateFunction(idSelect);
    let object = arrayFind.find(element => (element.id).toString() === Array.from(selectStateFunction)[0])
    return object;
}