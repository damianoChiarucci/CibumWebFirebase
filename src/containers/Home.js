import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import Slider from 'react-slick';
import { RicetteContext } from './App';
import MiniaturaRicettaSlider from '../components/MiniaturaRicettaSlider';

import { colors, breakpoints } from '../global-styles';
import bgHome from '../assets/img/bg_home.svg';

import { isMobile } from '../utils/deviceDetector';

const Home = (props) => {
  const ricetteContesto = useContext(RicetteContext);
  
  const SLIDE_DA_MOSTRARE = isMobile() ? 1 : 3;
  const sliderSettings = {
    dots: false,
    infinte: true,
    speed: 500,
    slidesToShow: SLIDE_DA_MOSTRARE,
    slidesToScroll: SLIDE_DA_MOSTRARE,
  };
  return (
    <Contenitore>
      <div className="home-main-container"></div>

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
  @media only screen and (min-width: ${breakpoints.screenMobBig}) {
    margin: 0 auto 60px auto;
  }
  .home-main-container {
    background: url(${bgHome}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 400px;
  }
  .home-slider-container {
    padding: 15px 15px;

    max-width: 1280px;
    background-color: ${colors.mainRed};
    @media only screen and (min-width: ${breakpoints.screenMobBig}) {
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
      @media only screen and (min-width: ${breakpoints.screenMobBig}) {
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