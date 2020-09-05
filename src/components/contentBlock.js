import React from 'react'
import styled from 'styled-components'

const ContentBlock = ({ item }) => {
  return (
    <Block>
      <Title>{item.name}</Title>
      <Description>{item.desc}</Description>
    </Block>
  )
}
export default ContentBlock

const Block = styled.div`
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  max-width: 600px;
  border-radius: 3px;
`

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: left;
  margin: 0 0 2rem 0;
`

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 2rem;
  text-align: left;
`
