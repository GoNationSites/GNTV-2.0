import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

import splitSectionChildren from './helpers/splitSectionChildren'
import { getData } from './api/request'
import Slide from './components/Slide'

import TVContext from './TVContext'

export const TV = ({ gonationID, plID = '1', texture, tvID }) => {
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
  const [shout, setShout] = useState({
    loading: true,
    shoutData: {}
  })
  const [configuration, setConfiguration] = useState({
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    autoPlay: false,
    interval: 5000,
    transitionTime: 0,
    infiniteLoop: true,
    stopOnHover: false,
    showThumbs: false
  })

  useEffect(() => {
    const menuURL = `https://data.prod.gonation.com/pl/get?profile_id=${gonationID}&powerlistId=powered-list-${plID}`
    const eventsURL = `https://data.prod.gonation.com/profile/events?profile_id=${gonationID}`
    const recurringEventsURL = `https://data.prod.gonation.com/profile/recurringevents?profile_id=${gonationID}`
    const shoutURL = `https://data.prod.gonation.com/profile/shoutsnew/${gonationID}`
    const configurationURL = `https://data.prod.gonation.com/profile/gntv/${tvID}?profile_id=${gonationID}`

    // todo: refactor the separate requests into 1 Promise.All

    // fetch TV configuration settings
    getData(
      configurationURL,
      (res) => {
        console.log('config res: ', res)
      },
      (e) => {
        console.log('error occurred: ', e)
      }
    )

    // fetch shout and set it to state
    getData(
      shoutURL,
      ({ data }) => {
        setShout({
          loading: false
        })
        injectShout(data.shout)
      },
      (e) => {
        setShout({
          loading: false,
          shoutData: {}
        })
        console.log('error occurred: ', e)
      }
    )

    // fetch Regular events and set it to state
    getData(
      eventsURL,
      ({ data }) => {
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

  const injectShout = (shout) => {
    setAllItems((allItems) => [...allItems, shout])
  }

  const createEventsCollection = () => {
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

  const filterFunction = (itm) => {
    if (itm.text) {
      return itm
    }
    if (itm.starts) {
      return itm
    } else if (!itm.imagePrefix.includes('default')) {
      return itm
    }
  }

  const displayTV = () =>
    allItems
      .filter((itm) => filterFunction(itm))
      .map((item) => (
        <Slide key={item._id ? item._id : item.item_id} data={item} />
      ))

  const fetchingData = () =>
    menuLoading &&
    recurringEvents.loading &&
    regularEvents.loading &&
    shout.loading

  const renderLoading = () => (
    <SlideWrapper>
      <h1>Loading GoNation Content...</h1>
    </SlideWrapper>
  )

  // todo there is a bug where the autoplay functionality does not work unless you have the allItems.length > 3 check
  return (
    <TVContext.Provider value={texture}>
      <CarouselContainer>
        <Carousel {...configuration}>
          {!fetchingData() && allItems.length > 3
            ? displayTV()
            : renderLoading()}
        </Carousel>
        <PoweredByContainer>
          <img
            src='https://www.gonationsites.com/GNSE/gn-sites/images/gn-power-white.svg'
            alt='GoNation'
          />
        </PoweredByContainer>
      </CarouselContainer>
    </TVContext.Provider>
  )
}

const CarouselContainer = styled.div`
  position: relative;
`

const PoweredByContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;

  img {
    max-width: 600px;
    margin: auto;
    padding: 1rem 1rem 0.5rem 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
`

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
