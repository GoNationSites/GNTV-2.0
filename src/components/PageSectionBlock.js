import React, { useContext } from 'react'
import styled from 'styled-components'
import TVContext from '../TVContext'

const MenuBlock = styled.div`
  grid-area: ${({ area }) => area};
  display: flex;
  flex-direction: column;
  ${({ sectionName }) =>
    sectionName === 'Beverages'
      ? `
    flex-direction: row;
    align-items: center;
  `
      : ``}
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Oswald', sans-serif;
  border: ${({ withBorder, configuration }) =>
    withBorder ? `5px solid ${configuration.titleColor}` : ''};
  border-radius: 3px;
  padding: 1rem;
  text-align: left;
  ${({ isEntireScreen }) =>
    isEntireScreen
      ? `
    justify-content: flex-start;
    align-items: flex-start;
    // flex-direction: row;
    flex-wrap: wrap;
    
  `
      : ''}

  h1,
  h4,
  h5,
  p {
    margin: 0;
  }

  h4,
  h1 {
    text-transform: uppercase;
  }

  h4,
  h5 {
    font-weight: bold;
    line-height: normal;
    font-size: ${({ isEntireScreen, sectionName }) =>
      isEntireScreen ? '4rem' : getItemFontSize(sectionName)};
    font-family: 'Oswald', sans-serif;
  }

  > div,
  h1 {
    width: ${({ area }) => getWidth(area)};
    box-sizing: border-box;
    padding: ${({ area }) => getPadding(area)};
  }
  > div {
    ${({ sectionName }) => (sectionName === 'Beverages' ? 'width: auto' : '')};
  }
  h1 {
    font-size: ${({ isEntireScreen, sectionName }) =>
      isEntireScreen ? '8rem' : getHeadingFontSize(sectionName)};
    font-family: 'Playfair Display SC', serif;
    color: ${({ configuration }) => configuration.titleColor};
    line-height: 1;
    /* width: ${({ isEntireScreen }) => (isEntireScreen ? '100%' : 'auto')}; */
    text-align: ${({ isEntireScreen }) => (isEntireScreen ? 'center' : 'left')};
    font-weight: bold;
    width: ${({ sectionName, isEntireScreen }) =>
      sectionName === 'Beverages' || isEntireScreen ? '100%' : 'auto'};
  }
  h4 {
    color: ${({ configuration, darkItemText }) =>
      darkItemText ? '#000' : configuration.itemColor};
    text-transform: ${({ lowercaseItems }) =>
      lowercaseItems ? 'capitalize' : 'uppercase'};
    max-width: ${({ area }) => (area === '1 / 1 / 4 / 3' ? '525px' : 'none')};
    font-family: 'Oswald', sans-serif;
  }
  h5 {
    color: ${({ configuration }) => configuration.titleColor};
  }
  p {
    font-size: ${({ isEntireScreen }) => (isEntireScreen ? '2rem' : '1.5rem')};
    font-weight: 600;
    max-width: ${({ isEntireScreen }) => (isEntireScreen ? 'none' : '570px')};
    font-family: 'Oswald', sans-serif;
  }
  .hard-item {
    margin-bottom: 0.75rem;
    font-family: 'Oswald', sans-serif;
  }
  .section-desc {
    padding-left: 1rem;
    ${({ sectionName }) =>
      sectionName === 'Breakfast' ? 'text-align: center;' : ''}
  }
  .Fries3 {
    padding-top: 4.75rem;
  }
  /* .Sides > div {
    width: 49%;
  } */
  > div {
    ${({ sectionName }) => console.log(sectionName)};
    ${({ sectionName }) => (sectionName === 'Sides' ? 'width: 49%' : '')};
  }
  /* .Cola3 {
    margin-top: 72px;
  } */
`

const SingleSectionBlock = styled.div`
  font-family: 'Oswald', sans-serif;
  grid-area: ${({ area }) => area};
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
    text-align: left;
  }
  h1 {
    font-size: ${({ isEntireScreen }) => (isEntireScreen ? '8rem' : '4rem')};
    font-family: 'Playfair Display SC', serif;
    color: ${({ configuration }) => configuration.titleColor};
    line-height: 1;
    width: ${({ isEntireScreen }) => (isEntireScreen ? '100%' : 'auto')};
    text-align: ${({ isEntireScreen }) => (isEntireScreen ? 'center' : 'left')};
    text-transform: uppercase;
  }
  h4 {
    color: ${({ configuration }) => configuration.itemColor};
  }
  h5 {
    color: ${({ configuration }) => configuration.titleColor};
  }
  p {
    font-size: ${({ isEntireScreen }) => (isEntireScreen ? '2rem' : '1.5rem')};
    font-weight: 600;
    max-width: ${({ isEntireScreen }) => (isEntireScreen ? 'none' : '450px')};
  }
  h4,
  h5 {
    font-weight: bold;
    text-transform: uppercase;
    line-height: normal;
    font-size: ${({ isEntireScreen }) => (isEntireScreen ? '3rem' : '1.8rem')};
    margin: 0;
  }
  .section-desc {
    padding-left: 1rem;
  }
  .section-desc {
    padding-left: 1rem;
    ${({ sectionName }) =>
      sectionName === 'Breakfast' ? 'text-align: center;' : ''}
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  justify-content: flex-start;
  padding-top: 2.5rem;
  .Frittata5 {
    padding-bottom: 3rem;
    margin: auto;
  }
  > div {
    width: 50%;
    padding: 1rem 2rem;
  }
`

const getItemFontSize = (name) => {
  switch (name) {
    case 'Garden Salads':
      return '2.2rem;'
    case 'Pasta':
      return '2.2rem'
    default:
      return '1.8rem'
  }
}

const getHeadingFontSize = (name) => {
  switch (name) {
    case 'Garden Salads':
      return '4.75rem;'
    case 'Pasta':
      return '4.75rem'
    default:
      return '4rem'
  }
}

const getPadding = (area) => {
  switch (area) {
    case '3 / 1 / 4 / 2':
      return '4px 0'
    case '3 / 2 / 4 / 4':
      return '.5rem 1rem'
    case '1 / 1 / 4 / 3':
      return '1.25rem 1rem'
    default:
      return '.25rem 1rem'
  }
}

const getWidth = (area) => {
  switch (area) {
    case '1 / 1 / 3 / 2':
      return '100%'
    case '1 / 2 / 3 / 3':
      return '100%'
    case '1 / 1 / 4 / 4':
      return '50%'
    case '1 / 1 / 4 / 4':
      return '25%'
    case '3 / 2 / 4 / 4':
      return '24%'
    case '1 / 3 / 3 / 4':
      return '100%'
    case '3 / 1 / 4 / 2':
      return '100%'
    case '1 / 3 / 4 / 4':
      return '100%'
    case '1 / 1 / 4 / 2':
      return '100%'
    case '1 / 2 / 4 / 3':
      return '100%'
    default:
      return '50%;'
  }
}

const PoweredByContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

  img {
    max-width: 200px;
    margin: auto;
    padding: 0rem 1rem 0.5rem 1rem;
    background: black;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
`

const PageSectionBlock = ({ data, pageData }) => {
  const {
    hardData,
    area,
    withBorder,
    rename,
    name,
    darkItemText,
    titleTextNormal,
    lowercaseItems
  } = pageData
  const ctx = useContext(TVContext)

  const isEntireScreen = area === '1 / 1 / 4 / 4'

  const renderHardcodedElements = () => (
    <React.Fragment>
      <h5>{hardData.title}</h5>
      {hardData.items.map((itm) => (
        <p className='hard-item'>{itm}</p>
      ))}
    </React.Fragment>
  )

  return isEntireScreen ? (
    <SingleSectionBlock
      area={area}
      configuration={ctx.listConfiguration}
      withBorder={withBorder}
      isEntireScreen={isEntireScreen}
      className={name}
      sectionName={name}
    >
      {rename ? rename : <h1>{name}</h1>}
      {data.length && data[0].sectionDescription ? (
        <p className='section-desc'>{data[0].sectionDescription}</p>
      ) : (
        ''
      )}

      <Box>
        {data.map((itm, idx) => (
          <div className={`${itm.name}${idx}`}>
            <h4>
              {itm.name} {itm.variants[0].price}
            </h4>
            {itm.desc ? <p>{itm.desc}</p> : ''}
          </div>
        ))}
      </Box>
      <PoweredByContainer>
        <img
          src='https://www.gonationsites.com/GNSE/gn-sites/images/gn-power-white.svg'
          alt='GoNation'
        />
      </PoweredByContainer>
    </SingleSectionBlock>
  ) : (
    <React.Fragment>
      <MenuBlock
        area={area}
        configuration={ctx.listConfiguration}
        withBorder={withBorder}
        isEntireScreen={isEntireScreen}
        darkItemText={darkItemText}
        titleTextNormal={titleTextNormal}
        lowercaseItems={lowercaseItems}
        sectionName={name}
        className={name}
      >
        {rename ? rename : <h1>{name}</h1>}

        {data.length && data[0].sectionDescription ? (
          <p className='section-desc'>{data[0].sectionDescription}</p>
        ) : (
          ''
        )}
        {console.log(data)}
        {data.map((itm, idx) => (
          <div className={`${itm.name}${idx}`}>
            <h4>
              {itm.name} {itm.variants[0].price}
            </h4>
            <p>{itm.desc}</p>
          </div>
        ))}
        <div>
          {hardData && hardData.items.length ? renderHardcodedElements() : ''}
        </div>
      </MenuBlock>
      <PoweredByContainer>
        <img
          src='https://www.gonationsites.com/GNSE/gn-sites/images/gn-power-white.svg'
          alt='GoNation'
        />
      </PoweredByContainer>
    </React.Fragment>
  )
}

export default PageSectionBlock
