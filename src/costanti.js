export const ROTTE = {
  HOME: '/',
  RICETTE: '/ricette',
  LISTA_DELLA_SPESA: '/lista-della-spesa',
  DETTAGLIO_RICETTA: '/dettaglio-ricetta',
  PREFERITI: '/preferiti',
  LOGIN: '/login',
};

export const FILTRI = {
  CATEGORIA: [
    {
      label: 'Antipasti',
      value: 'antipasti'
    },
    {
      label: 'Primi Piatti',
      value: 'primi'
    },
    {
      label: 'Secondi Piatti',
      value: 'secondi'
    },
    {
      label: 'Dolci',
      value: 'dolci'
    },
    {
      label: 'Altro',
      value: 'altro'
    },
  ],
  COSTO: [
    {
      label: 'Economico',
      value: '15',
      valueInterval: [0, 15],
    },
    {
      label: 'Nella Media',
      value: '30',
      valueInterval: [15, 45],
    },
    {
      label: 'Costoso',
      value: '45',
      valueInterval: [45, 1000],
    },
  ],
  DURATA: [
    {
      label: 'Molto Veloce',
      value: '15',
      valueInterval: [0, 15],
    },
    {
      label: 'Veloce',
      value: '30',
      valueInterval: [15, 30],
    },
    {
      label: 'Lunga',
      value: '45',
      valueInterval: [45, 10000],
    },
  ],
}