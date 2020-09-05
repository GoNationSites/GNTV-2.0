import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styled from 'styled-components'

import splitSectionChildren from './helpers/splitSectionChildren'
import { getData } from './api/request'
import Slide from './components/Slide'

export const TV = ({ gonationID, plID = '1' }) => {
  const [allItems, setAllItems] = useState([])
  const [loading, setLoading] = useState({
    menu: true
  })

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
    const url = `https://data.prod.gonation.com/pl/get?profile_id=${gonationID}&powerlistId=powered-list-${plID}`

    getData(
      url,
      (res) => {
        setLoading({
          menu: false
        })
        flattenItems(res.data[0])
      },
      (e) => {
        setLoading({
          menu: false
        })
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

  return (
    <div>
      <Carousel {...configuration}>
        {!loading.menu && allItems.length > 3 ? displayTV() : ''}
      </Carousel>
    </div>
  )
}

const SlideWrapper = styled.div``
