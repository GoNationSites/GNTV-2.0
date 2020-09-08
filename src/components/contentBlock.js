import React from 'react'
import styled from 'styled-components'

const ContentBlock = ({ item }) => {
  const price = item.variants.length ? item.variants[0].price : 0
  // todo: render price variants. ATM we only render the first price inside of the variants array
  const renderPrice = () => (price ? price : '')
  return (
    <Block>
      <Title>{item.name}</Title>
      <Description>{item.desc}</Description>
      <Price>{renderPrice()}</Price>
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

const Price = styled.p`
  font-size: 1.25rem;
  text-align: left;
`
