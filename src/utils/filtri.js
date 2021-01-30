import moment from "moment";
import { FILTRI } from "../costanti";

export const normalizzaRicette = (ricetteObj) => {

  const arrayNormalizzato = Object.keys(ricetteObj).map((ricettaChiave) => (
    {
      name: ricetteObj[ricettaChiave].name,
      description: ricetteObj[ricettaChiave].description,
      recipeCategory: ricetteObj[ricettaChiave].recipeCategory.toLowerCase(),
      totalTime: moment.duration(ricetteObj[ricettaChiave].totalTime).asMinutes(),
      cost: ricetteObj[ricettaChiave].estimatedCost?.value,
      id: ricettaChiave
    }
  ));

  return arrayNormalizzato;
};

export const isFiltriObjSelected = (filtriObj) => {
  if (!filtriObj) {
    return false;
  }
  const result = Object.keys(filtriObj).find(val => filtriObj[val] !== null);
  if (result) {
    return true;
  }
  return false;
};

export const filtra = (stringaDaCercare, arrayRicette, filtriObj) => {
  // Mi scompongo la stringa da cercare in un array che abbia tanti elementi quante sono le parole da cercare
  let stringaDaCercareArray = null;
  if (typeof stringaDaCercare === 'string' && stringaDaCercare.length > 0) {
    stringaDaCercareArray = stringaDaCercare.toLowerCase().split(" ");
  }

  let arrayRicetteFiltrate = arrayRicette;

  // filtriamo per gruppi di filtri radio btn
  if (isFiltriObjSelected(filtriObj)) {
    arrayRicetteFiltrate = arrayRicette.filter((ricetta) => {
      let ricettaDaIncludere = true;
      if (filtriObj.CATEGORIA && ricettaDaIncludere) {
        if (ricetta.recipeCategory.toLowerCase().includes(filtriObj.CATEGORIA)) {
          ricettaDaIncludere = true;
        } else {
          ricettaDaIncludere = false;
        }
      }

      // ci troviamo l'oggetto nell'array FILTRI.COSTO cosrrispondente al valore che ha inserito l'utente
      const valoreCostoObj = FILTRI.COSTO.find((valore) => valore.value === filtriObj.COSTO);

      if (valoreCostoObj && ricettaDaIncludere) {
        if (valoreCostoObj.valueInterval[0] <= ricetta.cost && valoreCostoObj.valueInterval[1] > ricetta.cost) {
          ricettaDaIncludere = true;
        } else {
          ricettaDaIncludere = false;
        }
      }

      const valoreDurataObj = FILTRI.DURATA.find((valore) => valore.value === filtriObj.DURATA);

      if (valoreDurataObj && ricettaDaIncludere) {
        if (valoreDurataObj.valueInterval[0] <= ricetta.totalTime && valoreDurataObj.valueInterval[1] > ricetta.totalTime) {
          ricettaDaIncludere = true;
        } else {
          ricettaDaIncludere = false;
        }
      }

      return ricettaDaIncludere;

    });
  }
  
  // qui opero il filtro per la barra di ricerca
  if (stringaDaCercareArray) {
    // attraverso il filter io mi vado a filtrare le ricette che hanno nel NAME una stringa uguale ad una parola cercata
    arrayRicetteFiltrate = arrayRicetteFiltrate.filter((ricetta) => {
      let ricettaDaIncludere = false;
      stringaDaCercareArray.forEach((elemento) => {
        if (ricetta.name.toLowerCase().includes(elemento)) {
          ricettaDaIncludere = true;
        }
        if (ricetta.description.toLowerCase().includes(elemento)) {
          ricettaDaIncludere = true;
        }
        return ricettaDaIncludere;
      })
      return ricettaDaIncludere;
    });
  }
  return arrayRicetteFiltrate;
};