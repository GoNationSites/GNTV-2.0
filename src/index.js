import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

import splitSectionChildren from './helpers/splitSectionChildren'
import { getData } from './api/request'
import Slide from './components/Slide'
import ShoutTicker from './components/ShoutTicker'
import shuffle from './helpers/shuffle'

import TVContext from './TVContext'
import ListView from './components/ListView'

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
  const [showShoutTrigger, setShoutTrigger] = useState(true)
  const [config, setConfig] = useState({
    loading: true,
    config: {}
  })
  const [rawMenuData, setRawMenuData] = useState(null)

  const baseURL = 'https://data.prod.gonation.com'

  useEffect(() => {
    const menuURL = `${baseURL}/pl/get?profile_id=${gonationID}&powerlistId=powered-list-${plID}`
    const eventsURL = `${baseURL}/profile/events?profile_id=${gonationID}`
    const recurringEventsURL = `${baseURL}/profile/recurringevents?profile_id=${gonationID}`
    const shoutURL = `${baseURL}/profile/shoutsnew/${gonationID}`
    const configurationURL = `${baseURL}/profile/gntv/${tvID}?profile_id=${gonationID}`

    // todo: refactor the separate requests into 1 Promise.All

    // fetch TV configuration settings
    getData(
      configurationURL,
      ({ data }) => {
        setConfig({
          loading: false,
          config: data
        })
      },
      (e) => {
        setConfig({
          loading: false,
          config: false
        })
      }
    )

    // fetch shout and set it to state
    getData(
      shoutURL,
      ({ data }) => {
        setShout({
          loading: false,
          shoutData: data.shout
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
        setRawMenuData(res.data[0])

        setMenuLoading(false)
      },
      (e) => {
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

  useEffect(() => {
    const configurationURL = `${baseURL}/profile/gntv/${tvID}?profile_id=${gonationID}`
    function getAlerts() {
      getData(
        configurationURL,
        ({ data }) => {
          const lastUpdatedConfig = data.lastUpdatedAt
          if (lastUpdatedConfig !== config.config.lastUpdatedAt) {
            setConfig({
              loading: false,
              config: data
            })
          }
        },
        (e) => {
          console.log(e, 'error occurred when fetching config')
        }
      )
    }
    if (config.config.lastUpdatedAt) {
      getAlerts()
    }
    const interval = setInterval(() => getAlerts(), 100000)

    return () => {
      clearInterval(interval)
    }
  }, [config])

  // BEGIN FUNCTIONS
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

    splitSectionChildren(data).childSections.map((childSection, idx) => {
      // console.log(childSection)
      return flattenItems(childSection, true, idx)
    })

    setAllItems((allItems) => [...allItems, ...items])
  }

  const getKey = (itm) => {
    if (itm.starts) {
      return itm._id
    }
    if (itm.item_id) {
      return itm.item_id
    }
    return itm.id
  }

  const filterFunction = (itm) => {
    const filteredInSections = config.config.activeTypes.list1
    console.log(itm)

    // if filteredInSections does NOT include menu, filter out all menu items
    if (!filteredInSections.includes('items') && itm.item_id) {
      console.log('here')
      return false
    }

    if (!filteredInSections.includes('events') && itm.starts) {
      return false
    }

    if (!filteredInSections.includes('shout') && itm.text) {
      return false
    }

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
    shuffle(
      allItems
        .filter((itm) => filterFunction(itm))
        .map((item) => <Slide key={getKey(item)} data={item} />)
    )

  const fetchingData = () =>
    menuLoading &&
    recurringEvents.loading &&
    regularEvents.loading &&
    shout.loading &&
    config.loading

  const renderLoading = () => (
    <SlideWrapper>
      <h1>Loading GoNation Content...</h1>
    </SlideWrapper>
  )

  let configuration = {
    showArrows: false,
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    autoPlay: true,
    interval: config.config.slideDuration ? config.config.slideDuration : 5000,
    // interval: 5000,
    transitionTime: 0,
    infiniteLoop: true,
    stopOnHover: false,
    showThumbs: false
    // axis: 'vertical'
  }

  const isListMode = () =>
    config.config.displayType && config.config.displayType.type === 'list'
      ? true
      : false

  const decideLoadingOrList = () => {
    if (isListMode() && rawMenuData) {
      return <ListView data={rawMenuData} />
    }
    return renderLoading()
  }

  return (
    <TVContext.Provider
      value={{
        ...config,
        texture
      }}
    >
      <CarouselContainer>
        {!fetchingData() && allItems.length > 5 && !isListMode() ? (
          <Carousel {...configuration}>{displayTV()}</Carousel>
        ) : (
          decideLoadingOrList()
        )}
        <PoweredByContainer>
          <img
            src='https://www.gonationsites.com/GNSE/gn-sites/images/gn-power-white.svg'
            alt='GoNation'
          />
        </PoweredByContainer>

        {shout.shoutData.text && config.config.showTicker ? (
          <ShoutTickerWrapper>
            <ShoutTicker data={shout.shoutData} />
          </ShoutTickerWrapper>
        ) : (
          ''
        )}
      </CarouselContainer>
    </TVContext.Provider>
  )
}

const ShoutTickerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  left: 0;
  width: 100%;
  bottom: 4rem;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.75rem 1.5rem;
  color: white;
`

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
