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
  padding: 1.25rem;
  text-align: left;

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
    font-size: 2.5rem;
    font-weight: bold;
  }

  > div,
  h1 {
    width: ${({ area }) =>
      area === '1 / 1 / 4 / 4' || area === '3 / 2 / 4 / 4' ? '25%' : '50%'};
    padding: 1rem 1rem;
    box-sizing: border-box;
  }
  h1 {
    font-size: 6rem;
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
    font-size: 1.75rem;
    font-weight: 600;
    line-height: 2.5rem;
  }
  .hard-item {
    margin-bottom: 0.75rem;
  }
`

const PageSectionBlock = ({ data, pageData }) => {
  const { hardData, area, withBorder, rename, name } = pageData
  const ctx = useContext(TVContext)

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
    >
      {rename ? rename : <h1>{name}</h1>}
      {data.map((itm) => (
        <div>
          <h4>{itm.name}</h4>
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
