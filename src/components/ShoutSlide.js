import React, { useContext } from 'react'
import styled from 'styled-components'

import TVContext from '../TVContext'
import cloudinaryOptimize from '../helpers/cloudinaryOptimize'
import ContentBlock from './contentBlock'

const ShoutSlide = ({ data }) => {
  const ctx = useContext(TVContext)
  const isDefaultImage = data.image.isDefault
  const imageURL = `https://res.cloudinary.com/gonation/${data.image.image.cloudinaryId}`
  return (
    <SlideContainer bg={ctx.texture}>
      <Columns>
        {!isDefaultImage ? (
          <Box width={'33%'}>
            <FlyerImage src={imageURL} />
          </Box>
        ) : (
          ''
        )}

        <Box>
          <ContentBlock item={data} isShout isDefault={isDefaultImage} />
        </Box>
      </Columns>
    </SlideContainer>
  )
}

export default ShoutSlide

const SlideContainer = styled.div`
  position: relative;
  height: 100vh;
  background-image: url(${({ bg }) => cloudinaryOptimize(bg, 2000)});
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
