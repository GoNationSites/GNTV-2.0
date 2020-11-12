import React, { useContext } from 'react'
import styled from 'styled-components'

import PageSectionBlock from './PageSectionBlock'
import TVContext from '../TVContext'

const PageViewGrid = styled.div`
  background-repeat: no-repeat;
  height: calc(100% - 6rem);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  padding: 4rem;

  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
`

// grid-area: row-start / column-start / row-end / column-end
const PageView = ({ data }) => {
  const ctx = useContext(TVContext)
  const EXAMPLE_PAGES = {
    // page1: [
    //   //   {
    //   //     name: 'Breakfast',
    //   //     area: '1 / 1 / 4 / 4'
    //   //   }
    //   //   //   {
    //   //   //     name: 'Garden Salads',
    //   //   //     area: '1 / 1 / 4 / 3'
    //   //   //   },
    //   //   //   {
    //   //   //     name: 'Pasta',
    //   //   //     area: '1 / 3 / 4 / 4'
    //   //   //   }
    // ],
    // page1: [
    //   {
    //     name: 'Sandwiches',
    //     area: '1 / 1 / 3 / 2'
    //   },
    //   {
    //     name: 'Picante Tacos',
    //     area: '1 / 2 / 3 / 3'
    //   },
    //   {
    //     name: 'Family Menu',
    //     area: '1 / 3 / 3 / 4'
    //   },
    //   {
    //     name: 'Sides',
    //     area: '3 / 1 / 4 / 2'
    //   },
    //   {
    //     name: 'Beverages',
    //     area: '3 / 2 / 4 / 4',
    //     withBorder: true
    //   }
    // ],
    page2: [
      {
        name: 'Garden Salads',
        area: '1 / 1 / 4 / 3',
        withBorder: true,
        hardData: {
          title: 'Add:',
          items: [
            'Avocado',
            'Organic chicken',
            'Gulf Shrimp 6 (3 pieces) or 9( 5 pieces)',
            'Scottish Salmon (4oz) 9.5'
          ]
        }
      },
      {
        name: 'Pasta',
        area: '1 / 3 / 4 / 4',
        hardData: {
          title: 'Add:',
          items: [
            'Organic chicken 5',
            'Gulf Shrimp 6 (3 pieces) or 9( 5 pieces)',
            'Organic Salmon (4oz) 9.5'
          ]
        }
      }
    ]
  }

  const pages = Object.keys(EXAMPLE_PAGES)

  const renderGridContent = (page) =>
    EXAMPLE_PAGES[page].map(({ name, area, withBorder, hardData }) => (
      <PageSectionBlock
        sectionName={name}
        data={data.filter((itm) => itm.section === name)}
        area={area}
        hardData={hardData}
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
