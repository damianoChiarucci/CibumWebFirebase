import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import Slider from 'react-slick';

import Slide from '@material-ui/core/Slide';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

import { RicetteContext } from './App';
import MiniaturaRicettaSlider from '../components/MiniaturaRicettaSlider';

import { colors, breakpoints } from '../global-styles';
import bgHome from '../assets/img/bg_home.svg';

import { isMobile } from '../utils/deviceDetector';
import { normalizzaRicette, filtra,  isFiltriObjSelected} from '../utils/filtri';
import { ROTTE } from "../costanti";

const Home = (props) => {
  const [ricetteNormalizzateArray, setRicetteNormalizzateArray] = useState([]);
  const [ricetteFiltrate, setRicetteFiltrate] = useState([]);
  const [barraRicercaInput, setBarraRicercaInput] = useState(null);

  const ricetteContesto = useContext(RicetteContext);

  
  const SLIDE_DA_MOSTRARE = isMobile() ? 1 : 3;
  const sliderSettings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: SLIDE_DA_MOSTRARE,
    slidesToScroll: SLIDE_DA_MOSTRARE,
  };

  const listaRottePrecedenti = useHistory();

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
  };


  useEffect(() => {
    const newRicetteNormalizzate = normalizzaRicette(ricetteContesto.oggettoRicette);
    setRicetteNormalizzateArray(newRicetteNormalizzate);
  }, [ricetteContesto]);

  useEffect(() => {
    if (barraRicercaInput) {

      const newRicetteFiltrate = filtra(barraRicercaInput, ricetteNormalizzateArray, null);
      setRicetteFiltrate(newRicetteFiltrate);

    } else {
      setRicetteFiltrate([]);
    }
  }, [barraRicercaInput]);

  const onChangeBarraRicerca = (evento) => {
    setBarraRicercaInput(evento.target.value);
  };

  return (
    <Contenitore>
      <div className="home-main-container">
        <div className="searchbar-container">
          <div className="searchbar-wrapper">
            {/* <div className="search-icon-wrapper">
              <SearchIcon />
            </div> */}
            <input
              autoComplete="off"
              type="text"
              className="search-field"
              id="addInput"
              placeholder="Cerca una ricetta..."
              onChange={(evt) => onChangeBarraRicerca(evt)}
            />
          </div>
        </div>
        <div className="searchbar-results-wrapper">
          {ricetteFiltrate.slice(0, 3).map((ricetta, index) => (
            <Slide key={index} in={true} direction="up" mountOnEnter unmountOnExit>
              <div className="searchbar-results" onClick={() => cambiaRotta(ROTTE.DETTAGLIO_RICETTA + '/' + ricetta.id)}>
                {ricetta.name}
              </div>
            </Slide>
          ))}
        </div>
      </div>

      <div className="home-slider-container">
        <div className="home-slider-title">
          <span>Le Ricette Del Giorno:</span>

        </div>
        <Slider className="home-slider-wrapper" {...sliderSettings}>
          {ricetteContesto.chiaviRicette && ricetteContesto.chiaviRicette.map((chiave) => (
            <MiniaturaRicettaSlider
              chiave={chiave}
              key={chiave}
              titolo={ricetteContesto.oggettoRicette[chiave].name}
              url={ricetteContesto.oggettoRicette[chiave].image.url}
              descrizione={ricetteContesto.oggettoRicette[chiave].description}
              categoria={ricetteContesto.oggettoRicette[chiave].recipeCategory}
            />
          ))}
        </Slider>

      </div>
    </Contenitore>
  );
};

const Contenitore = styled.div`
  width: 100%;
  @media only screen and (min-width: ${breakpoints.screenMobBig}){
    margin: 0 auto 60px auto;
  }
  .home-main-container {
    background: url(${bgHome}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 400px;
    .searchbar-container {
      bottom: 40px;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 300px;
      .searchbar-wrapper {
        background: #ffffff;
        border-radius: 4px;
        padding: 20px 36px;
        display: inline-flex;
        justify-content: center;
        @media only screen and (min-width: ${breakpoints.screenMobBig}){
          padding: 20px 75px;
        }
        .search-icon-wrapper {
          display: inline-block;
          padding-right: 15px;
        }
        .search-field {
          display: inline-block;
          border: none;
        }
      }
    }
    .searchbar-results-wrapper {
      max-width: 257px;
      margin: -5px auto;
      position: relative;
      @media only screen and (min-width: ${breakpoints.screenMobBig}){
        max-width: 335px;
      }
      .searchbar-results {
        padding: 15px 20px;
        margin: 0px;
        font-weight: bold;
        background: #ffffff;
        border-bottom: 2px solid #f44336;
        color: #f44336;
        transition: opacity .2s, visibility .2s, margin-top 0s .2s;
        @media only screen and (min-width: ${breakpoints.screenMobBig}){
          padding: 15px 55px;
        }
      }
    }
  }
  .home-slider-container {
    padding: 15px 15px;
    
    max-width: 1280px;
    background-color: ${colors.mainRed};
    @media only screen and (min-width: ${breakpoints.screenMobBig}){
      border-radius: 6px;
      margin: 30px auto;
    }
    .home-slider-title {
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 3px;
      margin-top: 20px;
      margin-left: 30px;
      @media only screen and (min-width: ${breakpoints.screenMobBig}){
        text-align: center;
        font-size: 18px;
        letter-spacing: 6px;
        font-weight: 500;
        margin-top: 40px;
        margin-bottom: 50px;
      }
    }
    .home-slider-wrapper {
      margin: 30px;
    }
  }
`;

export default Home;