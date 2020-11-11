import React, { useContext } from 'react'
import styled from 'styled-components'

import PageSectionBlock from './PageSectionBlock'
import TVContext from '../TVContext'

const PageViewGrid = styled.div`
  background: ${({ texture }) => `url(${texture})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
`

// grid-area: row-start / column-start / row-end / column-end
const PageView = ({ data }) => {
  const ctx = useContext(TVContext)
  const EXAMPLE_PAGES = {
    page1: [
      //   {
      //     name: 'Breakfast',
      //     area: '1 / 1 / 4 / 4'
      //   }
      //   //   {
      //   //     name: 'Garden Salads',
      //   //     area: '1 / 1 / 4 / 3'
      //   //   },
      //   //   {
      //   //     name: 'Pasta',
      //   //     area: '1 / 3 / 4 / 4'
      //   //   }
    ],
    page1: [
      {
        name: 'Sandwiches',
        area: '1 / 1 / 3 / 2'
      },
      {
        name: 'Picante Tacos',
        area: '1 / 2 / 3 / 3'
      },
      {
        name: 'Family Menu',
        area: '1 / 3 / 3 / 4'
      },
      {
        name: 'Sides',
        area: '3 / 1 / 4 / 2'
      },
      {
        name: 'Beverages',
        area: '3 / 2 / 4 / 4',
        withBorder: true
      }
    ]
  }

  const pages = Object.keys(EXAMPLE_PAGES)

  const renderGridContent = (page) =>
    EXAMPLE_PAGES[page].map(({ name, area, withBorder }) => (
      <PageSectionBlock
        sectionName={name}
        data={data.filter((itm) => itm.section === name)}
        area={area}
        withBorder={withBorder ? withBorder : false}
      />
    ))

  return (
    <PageViewGrid texture={ctx.texture}>
      {pages.map((page) => renderGridContent(page))}
      {/* <PageSectionBlock data={{}} area={`1 / 1 / 4 / 3`} />
      <PageSectionBlock data={{}} area={`1 / 3 / 4 / 4`} /> */}
    </PageViewGrid>
  )
}

export default PageView
