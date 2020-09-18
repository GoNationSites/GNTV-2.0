import React, { useContext } from 'react'
import styled from 'styled-components'

import cloudinaryOptimize from '../helpers/cloudinaryOptimize'
import ContentBlock from './contentBlock'

import TVContext from '../TVContext'

const flyerModeEvent = ({ data }) => {
  const ctx = useContext(TVContext)
  return (
    <SlideContainer bg={ctx.texture}>
      <Columns>
        <Box width={'33%'}>
          <FlyerImage src={data.imageurl} />
        </Box>
        <Box>
          <ContentBlock item={data} isEvent />
        </Box>
      </Columns>
    </SlideContainer>
  )
}

export default flyerModeEvent

const SlideContainer = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${({ bg }) => bg});
  background-position: center;
  background-size: cover;
  padding: 4rem;
`

const Columns = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Box = styled.div`
  width: ${({ width }) => (width ? width : 'auto')};
  flex: 1 1 100%;
`

const FlyerImage = styled.img`
  width: 100%;
`
