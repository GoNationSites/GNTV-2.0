import React, { useContext } from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'

import PageSectionBlock from './PageSectionBlock'
import TVContext from '../TVContext'

const PageViewGrid = styled.div`
  background-repeat: no-repeat;
  height: calc(100vh);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px;
  padding: 4rem;

  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
`

const Wrapper = styled.div`
  .slide {
    background: none;
    height: 100%;
  }
`

// grid-area: row-start / column-start / row-end / column-end
const PageView = ({ data }) => {
  const ctx = useContext(TVContext)
  console.log('ctx is: ', ctx)
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
    ],
    page2: [
      {
        name: 'Garden Salads',
        rename: (
          <h1>
            Fresh & <br /> Organic <br /> Salads
          </h1>
        ),
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

  let configuration = {
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    autoPlay: true,
    interval: ctx.config.slideDuration ? ctx.config.slideDuration : 5000,
    transitionTime: 0,
    infiniteLoop: true,
    stopOnHover: false,
    showThumbs: false
  }

  const renderGridContent = (page) =>
    EXAMPLE_PAGES[page].map((pageData) => (
      <PageSectionBlock
        pageData={pageData}
        data={data.filter((itm) => itm.section === pageData.name)}
      />
    ))

  return (
    <Wrapper>
      <Carousel
        {...configuration}
        autoPlay={true}
        className='page-view-carousel'
      >
        {pages.map((page) => (
          <PageViewGrid>{renderGridContent(page)}</PageViewGrid>
        ))}
      </Carousel>
    </Wrapper>
  )
}

export default PageView
