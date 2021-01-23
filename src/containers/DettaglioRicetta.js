import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";

import moment from "moment";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCart from "@material-ui/icons/RemoveShoppingCart";


import { Menu, IconButton } from "@material-ui/core";
import { Share } from "@material-ui/icons";

import yieldImg from "../assets/img/yield.svg";
import totalTime from "../assets/img/total-time.svg";
import cookTime from "../assets/img/cook-time.svg";
import euro from "../assets/img/euro.svg";

import { RicetteContext, UtenteContext } from "./App";
import { breakpoints, colors } from "../global-styles";

export default function DettaglioRicetta(props) {
  const contestoRicette = useContext(RicetteContext);
  const contestoUtente = useContext(UtenteContext);
  const { chiave } = useParams();
  const [apriChiudiShareMenu, setApriChiudiShareMenu] = useState(null);
  const ricetta = contestoRicette.oggettoRicette[chiave];
  console.log(ricetta);
  return (
    <Contenitore imgUrl={ricetta?.image?.url}>
      <div className="header-container">
        <div className="header-wrapper">
          <IconButton
            className="favorite btn"
            onClick={() => contestoUtente.togglePreferito(chiave)}
          >
            {contestoUtente.isPreferito(chiave) ? (
              <FavoriteIcon htmlColor={colors.mainRed} />
            ) : (
              <FavoriteBorderIcon htmlColor={colors.mainRed} />
            )}
          </IconButton>
          <IconButton className="shopping btn" onClick={() => contestoUtente.toggleElemInListaSpesa(chiave)}>
            {contestoUtente.isInListaSpesa(chiave) ? <RemoveShoppingCart htmlColor={colors.mainRed} /> : <AddShoppingCart htmlColor={colors.mainRed} />}
          </IconButton>
          <IconButton
            className="share btn"
            aria-label="condividi"
            onClick={(e) => setApriChiudiShareMenu(e.currentTarget)}
          >
            <Share htmlColor={colors.mainRed} />
          </IconButton>
          <Menu
            id="share-menu"
            className="share-menu"
            keepMounted
            anchorEl={apriChiudiShareMenu}
            open={Boolean(apriChiudiShareMenu)}
            onClose={() => setApriChiudiShareMenu(null)}
          >
            <WhatsappShareButton
              title={`Ciao, vedi questa ricetta che si chiama ${ricetta?.name} : `}
              url={window.location.href}
              children={
                <WhatsappIcon className="share-btn" size={32} round={true} />
              }
            />
            <TwitterShareButton
              title={`Ciao, vedi questa ricetta che si chiama ${ricetta?.name} : `}
              url={window.location.href}
              children={
                <TwitterIcon className="share-btn" size={32} round={true} />
              }
            />
            <FacebookShareButton
              quote={`Ciao, vedi questa ricetta che si chiama ${ricetta?.name} : `}
              url={window.location.href}
              children={
                <FacebookIcon className="share-btn" size={32} round={true} />
              }
            />
          </Menu>

          <span className="header-title">{ricetta?.name}</span>
          <div className="header-description-wrapper">
            <span
              className="header-description"
              dangerouslySetInnerHTML={{ __html: ricetta?.description }}
            ></span>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="ingredients-container">
          <div className="ingredients-title">Ingredienti:</div>
          {ricetta?.recipeIngredient.map((ingredient, ind) => (
            <div key={ind} className="ingredient-wrapper">
              <span className="ingredient-label">{ingredient}</span>
            </div>
          ))}
        </div>
        <div className="info-container">
          {ricetta?.recipeYield && (
            <div className="info-wrapper">
              <img className="info-img" src={yieldImg} />
              <span className="info-label">{ricetta.recipeYield} Persone</span>
            </div>
          )}
          {ricetta?.prepTime && (
            <div className="info-wrapper">
              <img className="info-img" src={cookTime} />
              <span className="info-label">
                {moment.duration(ricetta.prepTime).asMinutes()} Min
              </span>
            </div>
          )}
          {ricetta?.cookTime && (
            <div className="info-wrapper">
              <img className="info-img" src={cookTime} />
              <span className="info-label">
                {moment.duration(ricetta.cookTime).asMinutes()} Min
              </span>
            </div>
          )}
          {ricetta?.totalTime && (
            <div className="info-wrapper">
              <img className="info-img" src={totalTime} />
              <span className="info-label">
                {moment.duration(ricetta.totalTime).asMinutes()} Min
              </span>
            </div>
          )}
          {ricetta?.estimatedCost && (
            <div className="info-wrapper">
              <img className="info-img" src={euro} />
              <span className="info-label">{ricetta.estimatedCost.value}</span>
            </div>
          )}
        </div>
      </div>

      <div className="steps-container">
        <div className="steps-title">Procedimento:</div>
        {ricetta?.recipeInstructions.map((step, index) => (
          <div key={index} className="step-wrapper">
            <span className="step-index">{index + 1}. </span>
            <span dangerouslySetInnerHTML={{ __html: step?.text }} />
          </div>
        ))}
      </div>
    </Contenitore>
  );
}

const Contenitore = styled.div`
  margin: 0 auto 60px auto;
  width: 100%;
  max-width: 800px;
  @media only screen and (min-width: ${breakpoints.screenMobBig}) {
    width: 80%;
    padding-bottom: 60px;
  }
  .header-container {
    width: 100%;
    background-image: url(${(props) => props.imgUrl});
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
      margin: 0 auto;
      background: white;
      border-radius: 4px;
      max-width: 400px;
      min-height: 165px;
      text-align: center;
      margin-bottom: 20px;
      padding: 30px;
      box-shadow: 0px 10px 10px #0000000e;
      position: absolute;
      bottom: -120px;
      right: 0;
      left: 0;
      .btn {
        position: absolute;
        background-color: white;
        top: -25px;
        right: 0px;
        &.shopping {
          right: 53px;
        }
        &.share {
          right: 106px;
        }
        &:hover {
          background-color: white;
        }
      }
      .header-title {
        font-weight: bold;
        font-size: 18px;
        color: ${colors.mainRed};
        text-transform: capitalize;
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
    flex-direction: column;
    align-items: center;
    margin-top: 90px;
    @media only screen and (min-width: ${breakpoints.screenMobBig}) {
      justify-content: space-between;
      flex-direction: row;
      align-items: flex-start;
    }
    .ingredients-container {
      display: block;
      padding: 30px 0px;
      margin: 0px 0px;
      width: 80%;
      @media only screen and (min-width: ${breakpoints.screenMobBig}) {
        width: 50%;
      }
      .ingredient-wrapper:nth-child(odd) {
        background-color: #fcfcfc;
      }
      .ingredients-title {
        font-size: 18px;
        color: ${colors.mainRed};
        margin-bottom: 20px;
        margin-top: 20px;
        font-weight: 200;
        letter-spacing: -0.5px;
        text-align: center;
        @media only screen and (min-width: ${breakpoints.screenMobBig}) {
          margin-top: 0px;
          text-align: left;
        }
      }
      .ingredient-wrapper {
        width: 100%;
        max-width: 400px;
        border-bottom: 1px solid #eee;
        padding: 10px;
        @media only screen and (min-width: ${breakpoints.screenMobBig}) {
          width: 85%;
        }
        .ingredient-label {
          color: #555;
        }
      }
    }
    .info-container {
      display: flex;
      flex-wrap: wrap;
      margin: 40px auto 30px;
      width: 80%;
      .info-wrapper:nth-child(even) {
        border-left: 1px solid #eee;
      }
      @media only screen and (min-width: ${breakpoints.screenMobBig}) {
        text-align: left;
        width: 50%;
        display: block;
        padding: 30px;
        .info-wrapper:nth-child(even) {
          border-left: none;
        }
      }
      .info-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: ${colors.mainRed};
        padding: 15px 20px;
        font-weight: bold;
        max-width: 300px;
        width: 50%;
        margin: 0 auto;
        .info-img {
          width: 25px;
        }
        .info-label {
          margin-left: 10px;
          text-align: center;
          display: inline-block;
          width: 100%;
        }
      }
    }
  }
  .steps-container {
    margin: 20px auto;
    width: 80%;
    @media only screen and (min-width: ${breakpoints.screenMobBig}) {
      width: 100%;
    }
    .steps-title {
      text-align: center;
      font-size: 20px;
      color: ${colors.mainRed};
      font-weight: 200;
      letter-spacing: -0.5px;
      margin: 30px;
    }
    .step-wrapper {
      line-height: 26px;
      color: #333;
      text-align: justify;
      margin: 25px 0px;
      .step-index {
        color: ${colors.mainRed};
        font-weight: bold;
      }
    }
  }
`;
