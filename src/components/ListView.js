import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link, Element, Events, animateScroll as scroll } from 'react-scroll'

import TVContext from '../TVContext'
import cloudinaryOptimize from '../helpers/cloudinaryOptimize'

import splitSectionChildren from '../helpers/splitSectionChildren'
import ListMenuItem from './ListMenuItem'

const ListView = ({ data, config }) => {
  const [status, setStatus] = useState({
    first: true,
    pos: ''
  })
  const ctx = useContext(TVContext)
  const refContainer = useRef()

  const defaultDuration = 400000

  const scrollUp = () => {
    setTimeout(() => {
      scroll.scrollToTop({
        containerId: 'containerElement',
        duration: 1000,
        smooth: true,
        isDynamic: true
      })
    }, 2000)
  }

  const scrollDown = () => {
    setTimeout(() => {
      scroll.scrollToBottom({
        containerId: 'containerElement',
        duration: config.otherOptions.listViewDuration,
        smooth: 'linear',
        offSet: 9000,
        isDynamic: true
      })
    }, 2000)
  }

  useEffect(() => {
    scrollDown()
  }, [])

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      scrollUp()
    } else if (e.target.scrollTop === 0) {
      scrollDown()
    }
  }

  const renderMenu = (menu, nested, idx) => {
    const { section } = menu
    const parsedSection = splitSectionChildren(menu)

    const hasParentRoot = () => section.parent_id === '_root'

    return (
      <Wrapper>
        {section.name === '' ? (
          ''
        ) : (
          <React.Fragment>
            <div>
              <SectionTitle>{section.name}</SectionTitle>

              <SectionDescription>{section.desc}</SectionDescription>
              <ItemsContainer>
                {parsedSection.childItems.map(({ item }) => {
                  return <ListMenuItem item={item} />
                })}
              </ItemsContainer>
            </div>
          </React.Fragment>
        )}

        {/* child sections */}
        {parsedSection.childSections.map((childSection, idx) =>
          renderMenu(childSection, true, idx)
        )}
      </Wrapper>
    )
  }

  return (
    <ListViewContainer bg={ctx.texture}>
      <div onScroll={handleScroll} ref={refContainer} id='containerElement'>
        {renderMenu(data)}
        {/* <Element name='test'>Hello...</Element> */}
      </div>
    </ListViewContainer>
  )
}

export default ListView

const ListViewContainer = styled.div`
  position: relative;
  height: 100vh;
  background: white;
  background-image: url(${({ bg }) => bg});
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    max-width: 85%;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.6);
    /* box-shadow: 0 0 30px rgba(0, 0, 0, 0.3); */
    padding: 2rem;
    height: calc(100% - 300px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }

  h1,
  h2,
  h3 {
    margin: 0;
  }
`

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 2.5rem;
`

const SectionDescription = styled.p`
  text-align: center;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Wrapper = styled.div`
  color: white;
  padding: 2rem 0;
`
