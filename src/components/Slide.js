import React from 'react'
import styled from 'styled-components'

import cloudinaryOptimize from '../helpers/cloudinaryOptimize'
import ContentBlock from '../components/contentBlock'
import FlyerModeEvent from '../components/flyerModeEvent'
import ShoutSlide from './ShoutSlide'

const Slide = ({ data }) => {
  const determineLeftOrRight = () =>
    Math.random() < 0.5 ? 'flex-start' : 'flex-end'

  if (data.starts) {
    return <FlyerModeEvent data={data} />
  } else if (data.text) {
    return <ShoutSlide data={data} />
  } else if (data.caption !== undefined) {
    return <SlideContainer bg={data.imageUrl}></SlideContainer>
  } else {
    return (
      <SlideContainer bg={data.imageUrl}>
        <ContentBlockWrapper justifyPosition={determineLeftOrRight()}>
          <ContentBlock item={data} />
        </ContentBlockWrapper>
      </SlideContainer>
    )
  }
}

export default Slide

const SlideContainer = styled.div`
  position: relative;
  height: 100vh;
  background: gray;
  background-image: url(${({ bg }) => cloudinaryOptimize(bg, 500)});
  background-position: center;
  background-size: cover;
`

const ContentBlockWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyPosition }) => justifyPosition};
`
