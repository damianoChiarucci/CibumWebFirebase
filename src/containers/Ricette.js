import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import SearchIcon from "@material-ui/icons/Search";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Pagination from '@material-ui/lab/Pagination';


import { colors, breakpoints } from "../global-styles";
import MiniaturaRicetta from '../components/MiniaturaRicetta';
import noResult from '../assets/img/no-result.svg';
import { RicetteContext, UtenteContext } from '../containers/App';
import { normalizzaRicette, filtra,  isFiltriObjSelected} from '../utils/filtri';
import { FILTRI } from '../costanti';


const Ricette = () => {
  const ricetteContesto = useContext(RicetteContext);
  const utenteContest = useContext(UtenteContext);
  const { oggettoRicette } = ricetteContesto;

  const [ricetteNormalizzateArray, setRicetteNormalizzateArray] = useState([]);
  const [ricetteFiltrate, setRicetteFiltrate] = useState([]);

  const [barraRicercaInput, setBarraRicercaInput] = useState(null);

  const [filtriRicercaInput, setFiltriRicercaInput] = useState({
    CATEGORIA: null,
    COSTO: null,
    DURATA: null,
  });

  useEffect(() => {
    const newRicetteNormalizzate = normalizzaRicette(oggettoRicette);
    setRicetteNormalizzateArray(newRicetteNormalizzate);
    setRicetteFiltrate(newRicetteNormalizzate);
  }, [oggettoRicette]);

  useEffect(() => {
    if (barraRicercaInput || isFiltriObjSelected(filtriRicercaInput)) {

      const newRicetteFiltrate = filtra(barraRicercaInput, ricetteNormalizzateArray, filtriRicercaInput);
      setRicetteFiltrate(newRicetteFiltrate);

    } else {
      setRicetteFiltrate(ricetteNormalizzateArray);
    }
  }, [barraRicercaInput, filtriRicercaInput]);

  const onChangeBarraRicerca = (evento) => {
    setBarraRicercaInput(evento.target.value);
  };

  const pulisciFiltri = () => {
    setFiltriRicercaInput({
      CATEGORIA: null,
      COSTO: null,
      DURATA: null,
    });
  };

  const selezionaFiltro = (tipo, evento) => {
    const newFiltriObj = {...filtriRicercaInput};
    if (newFiltriObj[tipo] === evento.target.value) {
      newFiltriObj[tipo] = null;
    } else {
      newFiltriObj[tipo] = evento.target.value;
    }

    setFiltriRicercaInput(newFiltriObj);
  };


  return (
    <Contenitore>
      <div className="searchbar-container">
        <div className="search-icon-wrapper">
          <SearchIcon />
        </div>
        <input 
          type="text"
          className="search-field"
          id="addInput"
          placeholder="Cerca una ricetta..."
          onChange={(evento) => onChangeBarraRicerca(evento)}
        />
      </div>
      <div className="search-container">
        <div className="search-fields-container">
          <Accordion className="search-fields-accordion-container" elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="tipologia-content"
                id="tipologia-header"
              >
              <div className="search-fields-header">
                <span className="search-fields-title">Filtra per:</span>
                <button type="button" className="search-fields-clear-btn" onClick={() => pulisciFiltri()}>
                  Pulisci i filtri
                </button>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tipologia</FormLabel>
                <RadioGroup aria-label="tipologia" name="tipologia" value={filtriRicercaInput.CATEGORIA} onChange={(e) => selezionaFiltro('CATEGORIA', e)}>
                  {FILTRI.CATEGORIA.map((filter, index) => (
                    <FormControlLabel key={filter.value} value={filter.value} control={<Radio />} label={filter.label} />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Costi</FormLabel>
                <RadioGroup aria-label="costi" name="costi" value={filtriRicercaInput.COSTO} onChange={(e) => selezionaFiltro('COSTO', e)}>
                  {FILTRI.COSTO.map((filter, index) => (
                    <FormControlLabel key={filter.value} value={filter.value} control={<Radio />} label={filter.label} />
                  ))}
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset">
                <FormLabel component="legend">Tempi di cottura</FormLabel>
                <RadioGroup aria-label="tempi-cottura" name="tempi-cottura" value={filtriRicercaInput.DURATA} onChange={(e) => selezionaFiltro('DURATA', e)}>
                  {FILTRI.DURATA.map((filter, index) => (
                    <FormControlLabel key={filter.value} value={filter.value} control={<Radio />} label={filter.label} />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="search-results-container">
          {ricetteFiltrate.map((ricettaNormalizzata) => (
            <MiniaturaRicetta
              chiave={ricettaNormalizzata.id}
              key={ricettaNormalizzata.id}
              titolo={ricetteContesto.oggettoRicette[ricettaNormalizzata.id].name}
              url={ricetteContesto.oggettoRicette[ricettaNormalizzata.id].image.url}
              descrizione={ricetteContesto.oggettoRicette[ricettaNormalizzata.id].description}
              categoria={ricetteContesto.oggettoRicette[ricettaNormalizzata.id].recipeCategory}
            />
          ))}
          {ricetteFiltrate.length === 0 && (
            <div className="no-result"/>
          )}
        </div>
      </div>


    </Contenitore>
  );
};

const Contenitore = styled.div`
  margin: 0 auto 40px auto;
  width: 80%;
  max-width: 1280px;
  @media only screen and (min-width: ${breakpoints.screenMobBig}){
    margin: 0 auto 60px auto;
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
  .searchbar-container {
    background-color: #eeeeee;
    max-width: 500px;
    display: flex;
    padding: 8px 12px;
    border-radius: 4px;
    margin: 20px auto;
    .search-icon-wrapper {
      display: inline-flex;
    }
    .search-field {
      display: inline-flex;
      border: none;
      width: 88%;
      background: transparent;
      margin-left: 20px;
    }
  }
  .search-container {
    width: 100%;
    display: flex;
    padding: 20px 0px;
    justify-content: space-between;
    flex-direction: column;
    @media only screen and (min-width: ${breakpoints.screenMobBig}){
      width: 100%;
      flex-direction: row;
    }
    .search-fields-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      margin-bottom: 45px;
      @media only screen and (min-width: ${breakpoints.screenMobBig}){
        flex-wrap: nowrap;
        flex-direction: column;
        width: 20%;
        max-width: 300px;
        margin-bottom: 0px;
      }
      .search-fields-accordion-container {
        width: 100%;
        .MuiAccordionDetails-root {
          display: block;
          padding: 0;
        }
        .MuiAccordionSummary-content {
          margin: 0px;
        }
        .MuiAccordionSummary-root {
          padding: 0px;
          min-height: 30px;
        }
        .search-fields-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          margin-top: 15px;
          width: 100%;
          .search-fields-title {
            font-weight: bold
          }
          .search-fields-clear-btn {
            color: ${colors.mainRed};
            font-size: 11px;
            cursor: pointer;
          }
        }
        fieldset {
          margin-top: 20px;
          width: 100%;
          @media only screen and (min-width: ${breakpoints.screenMobMid}){
            width: 33%;
          }
          @media only screen and (min-width: ${breakpoints.screenMobBig}){
            width: 100%;
          }
          .Mui-focused {
            color: ${colors.mainRed}
          }
          .Mui-checked {
            color: ${colors.mainRed}
          }
        }
      }
    }
    .search-results-container{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      @media only screen and (min-width: ${breakpoints.screenMobMid}){
        width: 100%;
        
      }
      @media only screen and (min-width: ${breakpoints.screenMobBig}){
        width: 80%;
        flex-direction: row;
        align-items: flex-start;
        padding-left: 8%;
      }
      .recipe-preview-container {
        width: 100%;
        margin-bottom: 45px;
        @media only screen and (min-width: ${breakpoints.screenMobMid}){
          width: 100%;
        }
        @media only screen and (min-width: ${breakpoints.screenMobBig}){
          width: 40%;
          margin: 20px;
        }
        .recipe-preview-wrapper {
          margin: 0 auto;
        }
      }
      .no-result {
        background-image: url(${noResult});
        background-size: contain;
        height: 80vw;
        background-repeat: no-repeat;
        width: 100%;
        @media only screen and (min-width: ${breakpoints.screenMobBig}){
          height: 70vh;
          max-width: 800px;
        }
      }
    }
  }
`;

export default Ricette;