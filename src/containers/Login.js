import React, { useContext } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";

import * as walking from '../assets/lottie/walking.json';
import * as party from '../assets/lottie/party.json';
import { Button } from "@material-ui/core";
import { colors, breakpoints } from "../global-styles";
import { UtenteContext } from "./App";

export default function Login(props) {
  const utenteContesto = useContext(UtenteContext);

  const configAnimazioneLoggato = {
    loop: true,
    autoplay: true,
    animationData: party.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    }
  };

  const configAnimazioneNonLoggato = {
    loop: true,
    autoplay: true,
    animationData: walking.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    }
  };

  if(utenteContesto.utente?.loggato) {
    return (
      <Contenitore>
        <div className="login-header">
          Benvenuti in Cibum!
          <div className="login-subheader">
            Naviga e scopri le ricette che fanno al caso tuo!
          </div>
        </div>
        <Lottie 
          options={configAnimazioneLoggato}
          height={400}
          width={600}
        />
      </Contenitore>
    )
  }

  return (
    <Contenitore>
      <div className="login-header">
        Registrati per avere sempre le tue ricette con te:
      </div>
      {!utenteContesto.utente?.loggato && (
        <Button className="sign-in" onClick={() => props.loggatiConGoogle()}>
          Registrati con Google
        </Button>
      )}
      <Lottie 
        options={configAnimazioneNonLoggato}
        height={400}
        width={600}
      />
    </Contenitore>
  )

};

const Contenitore = styled.div`
 margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${breakpoints.screenMobBig}) {
    width: 80%;
    max-width: 1280px;
  }
  .login-header {
    margin: 30px 20px;
    font-size: 36px;
    color: ${colors.mainRed};
    text-align: center;
    font-weight: 200;

    @media only screen and (min-width: ${breakpoints.screenMobBig}) {
      margin: 50px auto;
    }
    .login-subheader {
      color: #aaaaaa;
      font-size: 18px;
    }
  }
`;