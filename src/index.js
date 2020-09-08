import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

import splitSectionChildren from './helpers/splitSectionChildren'
import { getData } from './api/request'
import Slide from './components/Slide'

export const TV = ({ gonationID, plID = '1' }) => {
  // todo: convert allItems and menuLoading to be it's own piece of state
  const [allItems, setAllItems] = useState([])
  const [menuLoading, setMenuLoading] = useState(true)
  const [regularEvents, setRegularEvents] = useState({
    loading: true,
    regularEvents: []
  })
  const [recurringEvents, setRecurringEvents] = useState({
    loading: true,
    recurringEvents: []
  })

  // todo: these Carousel options should be coming from GN endpoints
  const configuration = {
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    autoPlay: true,
    interval: 5000,
    transitionTime: 0,
    infiniteLoop: true,
    stopOnHover: false
  }

  useEffect(() => {
    const menuURL = `https://data.prod.gonation.com/pl/get?profile_id=${gonationID}&powerlistId=powered-list-${plID}`
    const eventsURL = `https://data.prod.gonation.com/profile/events?profile_id=${gonationID}`
    const recurringEventsURL = `https://data.prod.gonation.com/profile/recurringevents?profile_id=${gonationID}`

    // todo: refactor the separate requests into 1 Promise.All

    // fetch Regular events and set it to state
    getData(
      eventsURL,
      ({ data }) => {
        setRegularEvents(data.events)
        setRegularEvents({
          regularEvents: data.events,
          loading: false
        })
      },
      (e) => {
        setRegularEvents({
          loading: false,
          regularEvents: []
        })
        console.log('error occurred: ', e)
      }
    )

    // fetch recurring events and set it to state
    getData(
      recurringEventsURL,
      ({ data }) => {
        setRecurringEvents({
          loading: false,
          recurringEvents: data.events
        })
      },
      (e) => {
        setRecurringEvents({
          loading: false,
          recurringEvents: []
        })
        console.log('error occurred: ', e)
      }
    )

    // fetch menu data, and run the flattenItems function
    getData(
      menuURL,
      (res) => {
        flattenItems(res.data[0])
        setMenuLoading(false)
      },
      (e) => {
        setAllItems([])
        setMenuLoading(false)
        console.log('error occurred: ', e)
      }
    )
  }, [])

  const flattenItems = (data, nested, idx) => {
    const items = data.inventory
      .filter((itm) => itm.item)
      .map(({ item }) => item)

    splitSectionChildren(data).childSections.map((childSection, idx) =>
      flattenItems(childSection, true, idx)
    )
    setAllItems((allItems) => [...allItems, ...items])
  }

  const displayTV = () =>
    allItems
      .filter((itm) => !itm.imagePrefix.includes('default'))
      .map((item) => <Slide key={item.item_id} data={item} />)

  const fetchingData = () =>
    menuLoading && recurringEvents.loading && regularEvents.loading
  // todo there is a bug where the autoplay functionality does not work unless you have the allItems.length > 3 check
  return (
    <div>
      <Carousel {...configuration}>
        {!fetchingData() && allItems.length > 3 ? displayTV() : ''}
      </Carousel>
    </div>
  )
}

const SlideWrapper = styled.div``
