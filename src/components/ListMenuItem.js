import React from 'react'
import styled from 'styled-components'

const ListMenuItem = ({ item }) => {
  const isDefaultImg = () =>
    item.imagePrefix.includes('default') ? true : false
  return (
    <MenuItemWrapper>
      {!isDefaultImg() ? (
        <ImgWrap>
          <MenuItemImage src={item.imageUrl} />
        </ImgWrap>
      ) : (
        ''
      )}
      <ItemContentWrap addPadding={!isDefaultImg()}>
        <ItemTitle>{item.name}</ItemTitle>
        <ItemDescription>{item.desc}</ItemDescription>
      </ItemContentWrap>
    </MenuItemWrapper>
  )
}

export default ListMenuItem

const MenuItemWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  padding: 2rem 0;
`

const MenuItemImage = styled.img`
  width: 100%;
`

const ImgWrap = styled.div`
  width: 33%;
`

const ItemContentWrap = styled.div`
  flex: 1;
  padding: ${({ addPadding }) => addPadding && '0 1.5rem'};
`

const ItemTitle = styled.p`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  margin: 0 0 1.5rem 0;
`

const ItemDescription = styled.p`
  font-size: 1.25rem;
  margin-top: 1rem;
`
