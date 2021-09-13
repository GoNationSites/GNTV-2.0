import React, { useContext } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import TVContext from '../TVContext'
import formatEventDays from '../helpers/formatEventDays'

const ContentBlock = ({ item, isEvent, isShout, isDefault }) => {
  const ctx = useContext(TVContext)
  const price =
    item.variants && item.variants.length ? item.variants[0].price : 0
  // todo: render price variants. ATM we only render the first price inside of the variants array
  const renderPrice = () => (price ? price : '')
  const renderEventTime = () => {
    if (item.eventDays) {
      const eventDays = Object.keys(item.eventDays)
      return (
        <p>
          <span>Happening Every {formatEventDays(eventDays)}</span> at{' '}
          {dayjs(item.starts).format('h:mm a')}
        </p>
      )
    }
    return (
      <React.Fragment>
        <p>
          <span>Starts:</span>{' '}
          {dayjs(item.starts).format('dddd, MMMM D h:mm A')}{' '}
        </p>
        <p>
          <span>Ends:</span> {dayjs(item.ends).format('dddd, MMMM D hh:mm A')}
        </p>
      </React.Fragment>
    )
  }

  const renderShoutedAt = () => {
    return (
      <p>
        <span>Shouted </span>
        {dayjs(item.starts).format('dddd, MMMM D h:mm A')}
      </p>
    )
  }

  if (isShout) {
    return (
      <Block
        className='content-block content-block__shout'
        isDefault={isDefault}
        pushRight={isDefault ? false : true}
      >
        <Title>Recent Shout</Title>
        <Description>{item.text}</Description>
        <EventTime>{renderShoutedAt()}</EventTime>
      </Block>
    )
  }
  if (isEvent) {
    return (
      <Block className='content-block content-block__event' pushRight>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
        <EventTime>{renderEventTime()}</EventTime>
      </Block>
    )
  }
  return (
    <Block className='content-block content-block__default'>
      <Title>{item.name}</Title>
      <Description>{item.desc}</Description>
      {ctx.config.showPrices ? <Price>{renderPrice()}</Price> : ''}
    </Block>
  )
}
export default ContentBlock

const Block = styled.div`
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  min-width: 500px;
  max-width: 600px;
  border-radius: 3px;

  margin: ${({ pushRight, isDefault }) =>
    !pushRight && isDefault ? 'auto' : ''};
  margin-left: ${({ pushRight }) => (pushRight ? 'auto' : '')};
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

const EventTime = styled.div`
  text-align: left;
  span {
    font-weight: bold;
  }
`
