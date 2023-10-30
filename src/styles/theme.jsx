/* Приклад користування:

const SomeName = styled.div`
  color: ${({theme}) => theme.color.white};
  background-color: ${({theme}) => theme.color.input};
  

  &:hover, &:focus {
    color: ${({theme}) => theme.color.orangeFirst};
    background-color: ${({theme}) => theme.color.inputActive};
  }

  @media screen and (min-width: ${theme.breakpoint.tablet}) {
    color: ${({theme}) => theme.color.black};
    background-color: ${({theme}) => theme.color.orangeThird};
  }
`
*/

export const theme = {
  // Кольори
  color: {
    black: '#040404',
    white: '#EFEDE8',

    grayDisabled: 'rgba(239, 237, 232, 0.2)',
    grayFirst: 'rgba(239, 237, 232, 0.30)',
    graySecond: 'rgba(239, 237, 232, 0.65)',
    grayBackground: 'rgba(239, 237, 232, 1)',

    orangeFirst: '#E6533C',
    orangeSecond: '#EF8964',
    orangeThird: '#EFA082',

    border: 'rgba(239, 237, 232, 0.30)',

    // Ховери
    hover: '#EF8964',
    hoverBorder: '#E6533C',

    // Кольори таблиць
    tableLabel: '#EF8964',
    circleGreen: '#419B09',
    circleRed: '#E9101D',

    // Кольори форм
    label: 'rgba(239, 237, 232, 0.50)',
    input: 'rgba(239, 237, 232, 0.30)',
    inputActive: '#E6533C',
    inputSuccess: '#3CBF61',
    inputError: '#D80027',

    // Step indicator color
    default: '#303030',
  },

  // Точки адаптивної верстки
  breakpoint: {
    firstMobile: '320px',
    mobile: '375px',
    tablet: '768px',
    desktop: '1440px',
  },

  // Анімація (transition) при ховері фокусі
  transition: {
    main: '250ms cubic-bezier(0.165, 0.84, 0.44, 1.03)',
  },

  // box-shadow
  boxShadow: {
    calendarButton: '0 0 5px 0.5px #EFEDE8, inset 0 0 5px 0px #EFEDE8',
    dataIndicator: '0px 1px 10px 0px rgba(230, 83, 60, 0.80)',
  },
};
