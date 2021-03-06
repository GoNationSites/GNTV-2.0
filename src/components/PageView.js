import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Carousel } from 'react-responsive-carousel'

import PageSectionBlock from './PageSectionBlock'
import TVContext from '../TVContext'

const PageViewGrid = styled.div`
  background-repeat: no-repeat;
  height: calc(100vh);
  display: grid;
  ${({ config }) =>
    config.columns
      ? `
      grid-template-columns: ${config.columns};
    grid-template-rows: 1fr;  
      `
      : `
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  `}

  gap: 0px;
  padding: 2rem 2rem 4rem 2rem;

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
  const { config, listConfiguration } = ctx
  const potentialPages = Object.keys(config.otherOptions.pageViewData)
  const [activeDataForPageView, setActiveDataForPageView] = useState(
    potentialPages[0]
  )

  useEffect(() => {
    potentialPages.forEach((page) => {
      if (config.otherOptions.pageViewData[page] === true) {
        setActiveDataForPageView(page)
      }
    })
  }, [config.otherOptions.pageViewData])

  const pages = Object.keys(listConfiguration.pages[activeDataForPageView])

  let configuration = {
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    autoPlay: true,
    interval: config.slideDuration ? config.slideDuration : 5000,
    transitionTime: 0,
    infiniteLoop: true,
    stopOnHover: false,
    showThumbs: false
  }

  const renderGridContent = (page) =>
    listConfiguration.pages[activeDataForPageView][page].map((pageData) => (
      <PageSectionBlock
        pageData={pageData}
        data={data.filter((itm) => itm.section === pageData.name)}
      />
    ))

  return (
    <Wrapper>
      <Carousel {...configuration} className='page-view-carousel'>
        {pages.map((page) => (
          <PageViewGrid config={listConfiguration} className='page-view-grid'>
            {renderGridContent(page)}
          </PageViewGrid>
        ))}
      </Carousel>
    </Wrapper>
  )
}

export default PageView
