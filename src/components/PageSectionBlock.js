import React, { useContext } from 'react'
import styled from 'styled-components'
import TVContext from '../TVContext'

const MenuBlock = styled.div`
  height: 100%;
  /* grid-area: ${({ area }) => area}; */
  grid-area: ${({ area }) => area};

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  box-sizing: border-box;
  font-family: 'Oswald', sans-serif;
  /* padding: 16px 16px 32px 16px; */
  border: ${({ withBorder, configuration }) =>
    withBorder ? `5px solid ${configuration.titleColor}` : ''};
  border-radius: 3px;
  position: relative;
  padding-top: 150px;

  > div,
  h1 {
    width: ${({ area }) =>
      area === '1 / 1 / 4 / 4' || area === '3 / 2 / 4 / 4' ? '25%' : '50%'};

    padding: 1rem 1rem;
    box-sizing: border-box;
  }
  h1 {
    width: auto;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 6rem;
    margin: 0;
    font-family: 'Playfair Display SC', serif;
    color: ${({ configuration }) => configuration.titleColor};
  }
  h4 {
    font-size: 2.5rem;
    margin: 0;
    text-transform: uppercase;
    color: ${({ configuration }) => configuration.itemColor};
  }
  p {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0;
  }
`

const PageSectionBlock = ({ data, area, sectionName, withBorder }) => {
  const ctx = useContext(TVContext)
  console.log('PageSectionBlock -> ctx', ctx)

  return (
    <MenuBlock
      area={area}
      configuration={ctx.listConfiguration}
      withBorder={withBorder}
    >
      <h1>{sectionName}</h1>
      {data.map((itm) => (
        <div>
          <h4>{itm.name}</h4>
          <p>{itm.desc}</p>
        </div>
      ))}
    </MenuBlock>
  )
}

export default PageSectionBlock
