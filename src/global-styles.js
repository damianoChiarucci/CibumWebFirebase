import { createGlobalStyle } from 'styled-components';

export const colors = {
   mainRed : '#f44336',
   primaryGreen : '#4eb87b',
   secondaryGreen : '#68f6a4',
};

export const breakpoints = {
   screenMobXSmall: '320px',
   screenMobSmall: '375px',
   screenMobMid: '411px',
   screenMobMedium: '600px',
   screenMobBig: '768px',
   screenDeskSmall: '960px',
   screenDeskMid: '1300px',
};

const GlobalStyles = createGlobalStyle`
 .bgOrange {
    background-color: orange !important;
 }
 .MuiList-padding {
      padding-left: 8px !important;
      padding-right: 8px !important;
      .share-btn {
         margin-right: 4px;
         margin-left: 4px;
      }
   }
`;

export default GlobalStyles;