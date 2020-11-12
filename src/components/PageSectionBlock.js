import React, { useContext } from 'react'
import styled from 'styled-components'
import TVContext from '../TVContext'

const MenuBlock = styled.div`
  grid-area: ${({ area }) => area};

  display: flex;
  flex-direction: column;
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
    justify-content: center;
    align-items: center;
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
    font-size: 1.8rem;
    font-weight: bold;
    line-height: normal;
  }

  > div,
  h1 {
    width: ${({ area }) => getWidth(area)};
    padding: 0.5rem 1rem;
    box-sizing: border-box;
  }
  h1 {
    font-size: 3.5rem;
    font-family: 'Playfair Display SC', serif;
    color: ${({ configuration }) => configuration.titleColor};
    line-height: 1;
  }
  h4 {
    color: ${({ configuration }) => configuration.itemColor};
  }
  h5 {
    color: ${({ configuration }) => configuration.titleColor};
  }
  p {
    font-size: 1rem;
    font-weight: 600;
    max-width: 450px;
  }
  .hard-item {
    margin-bottom: 0.75rem;
  }
  .Cola3 {
    margin-top: 72px;
  }
`

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
      return '25%'
    default:
      return '50%;'
  }
}

const PageSectionBlock = ({ data, pageData }) => {
  const { hardData, area, withBorder, rename, name } = pageData
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

  return (
    <MenuBlock
      area={area}
      configuration={ctx.listConfiguration}
      withBorder={withBorder}
      isEntireScreen={isEntireScreen}
    >
      {rename ? rename : <h1>{name}</h1>}
      {data.map((itm, idx) => (
        <div className={`${itm.name}${idx}`}>
          <h4>
            {itm.name} ${itm.variants[0].price}
          </h4>
          <p>{itm.desc}</p>
        </div>
      ))}
      <div>
        {hardData && hardData.items.length ? renderHardcodedElements() : ''}
      </div>
    </MenuBlock>
  )
}

export default PageSectionBlock
