import React from 'react'
import styled from 'styled-components'
import Ticker from 'react-ticker'
import dayjs from 'dayjs'

const ShoutTicker = ({ data }) => {
  const { createdAt, image, text } = data
  console.log(text)

  return (
    <div>
      <Ticker mode='await'>
        {() => <ShoutText>Recent Shout: {text}</ShoutText>}
      </Ticker>
    </div>
  )
}

export default ShoutTicker

const ShoutText = styled.h1`
  width: 100%;
  white-space: nowrap;
`
