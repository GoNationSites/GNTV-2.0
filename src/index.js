import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

import splitSectionChildren from './helpers/splitSectionChildren'
import { getData } from './api/request'
import Slide from './components/Slide'

import TVContext from './TVContext'

export const TV = ({ gonationID, plID = '1', texture }) => {
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
    autoPlay: false,
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

  useEffect(() => {
    if (!regularEvents.loading && !recurringEvents.loading) {
      createEventsCollection()
    }
  }, [regularEvents.regularEvents, recurringEvents.recurringEvents])

  const createEventsCollection = () => {
    console.log(regularEvents.regularEvents, recurringEvents.recurringEvents)
    const allEvents = regularEvents.regularEvents.concat(
      recurringEvents.recurringEvents
    )
    setAllItems((allItems) => [...allItems, ...allEvents])
  }

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
      .filter((itm) =>
        !itm.starts ? !itm.imagePrefix.includes('default') : itm
      )
      .map((item) => (
        <Slide key={item._id ? item._id : item.item_id} data={item} />
      ))

  const fetchingData = () =>
    menuLoading && recurringEvents.loading && regularEvents.loading

  const renderLoading = () => (
    <SlideWrapper>
      <h1>Loading GoNation Content...</h1>
    </SlideWrapper>
  )

  // todo there is a bug where the autoplay functionality does not work unless you have the allItems.length > 3 check
  return (
    <TVContext.Provider value={texture}>
      <div>
        <Carousel {...configuration}>
          {!fetchingData() && allItems.length > 3
            ? displayTV()
            : renderLoading()}
        </Carousel>
      </div>
    </TVContext.Provider>
  )
}

const SlideWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;

  background: #20bed6;
  transition: all 0.75s;
  h1 {
    color: white;
    font-size: 3rem;
  }
`
