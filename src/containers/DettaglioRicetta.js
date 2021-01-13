import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';

import { useParams } from "react-router-dom";

import moment from "moment";
import { RicetteContext } from './App';
import { breakpoints, colors } from '../global-styles';

export default function DettaglioRicetta (props) {
  const contestoRicette = useContext(RicetteContext);
  const { chiave } = useParams();
  const ricetta = contestoRicette.oggettoRicette[chiave];
  console.log(ricetta);
  return (
    <Contenitore imgUrl={ricetta?.image?.url}>


      <div className="header-container">
        <div className="header-wrapper">

          <span className="header-title">{ricetta?.name}</span>
          <div className="header-description-wrapper">
            <span className="header-description" dangerouslySetInnerHTML={{__html: ricetta?.description}}></span>
          </div>
        </div>
      </div>


      <div className="main-container">
        <div className="ingredients-container">
          {
            ricetta?.recipeIngredient.map((ingrediente, indice) => (
              <div key={indice}>
                <span>{ingrediente}</span>
              </div>
            ))
          }
        </div>
        <div className="info-container">
          
          {ricetta?.prepTime && (
            <div>
              <span>{moment.duration(ricetta.prepTime).asMinutes()} Min</span>
            </div>
          )}

          {ricetta?.recipeYield && (
            <div>
              <span>{ricetta.recipeYield} Persone</span>
            </div>
          )}



        </div>
      </div>
    </Contenitore>
  );
};


const Contenitore = styled.div`
  margin: 0 auto 60px auto;
  width: 100%;
  max-width: 800px;
  .header-container {
    width: 100%;
    background-image: url(${props => props.imgUrl});
    margin-top: 23px;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 10px 10px #eee;
    height: 400px;
    border-radius: 0px 0px 4px 4px;
    background-position: center center;
    display: flex;
    align-items: flex-end;
    margin: 0 auto;
    position: relative;
    .header-wrapper {
      width: 80%;
      margin: 0 auto 20px;
      background: #FFF;
      border-radius: 4px;
      max-width: 400px;
      min-height: 165px;
      text-align: center;
      padding: 30px;
      box-shadow: 0px 10px 10px #0000000e;
      position: absolute;
      bottom: -120px;
      right: 0;
      left: 0;

      .header-title {
        font-weight: bold;
        font-size: 18px;
        text-transform: capitalize;
        @media only screen and (min-width: ${breakpoints.screenMobBig}) {
          color: ${colors.mainRed};
        }
      }

      .header-description-wrapper {
        margin-top: 15px;
        .header-description {
          font-size: 12px;
          color: #888;
        }
      }
    }
  }

  .main-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 90px;
    .ingredients-container {
      display: block;
      padding: 30px 0px;
      margin: 0px;
      width: 50%;
    }

    .info-container {
      display: block;
      text-align: left;
      width: 50%;
      padding: 30px;
    }
  }
`;