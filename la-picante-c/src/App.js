import React from 'react'

import { TV } from 'gntv-component'
// import 'gntv-component/dist/index.css'

const App = () => {
  const listConfiguration = {
    titleColor: '#40ADC0',
    itemColor: '#FC6E06',
    textColor: '#262626',
    pages: {
      Breakfast: {
        page1: [
          {
            name: 'Breakfast',
            area: '1 / 1 / 4 / 4'
          }
        ]
      },
      'Pastas and Salads': {
        page1: [
          {
            name: 'Garden Salads',
            size: 'large',
            area: '1 / 1 / 3 / 3',

            hardData: {
              title: 'Add:',
              items: [
                'Avocado',
                'Organic chicken',
                'Gulf Shrimp 6 (3 pieces) or 9( 5 pieces)',
                'Scottish Salmon (4oz) 9.5'
              ]
            }
          },
          {
            name: 'Pasta',
            area: '1 / 3 / 4 / 4',
            hardData: {
              title: 'Add:',
              items: [
                'Organic chicken 5',
                'Gulf Shrimp 6 (3 pieces) or 9( 5 pieces)',
                'Organic Salmon (4oz) 9.5'
              ]
            }
          },
          {
            name: 'Beverages',
            area: '3 / 1 / 4 / 3',
            withBorder: true,
            darkItemText: true,
            titleTextNormal: true,
            lowercaseItems: true
          }
        ]
      },
      'Main Menu': {
        page1: [
          {
            name: 'Sandwiches',
            area: '1 / 1 / 4 / 2'
          },
          {
            name: 'Picante Tacos',
            rename: (
              <h1>
                Picante <br /> Tacos
              </h1>
            ),
            area: '1 / 2 / 4 / 3'
          },
          {
            name: 'Family Menu',
            area: '1 / 3 / 3 / 4'
          },
          {
            name: 'Sides',
            area: '3 / 3 / 4 / 4'
          }
        ]
      }
    }
  }
  return (
    <TV
      listConfig={{ listConfiguration }}
      texture='https://res.cloudinary.com/gonation/image/upload/v1605023949/GNTV/la-picante-texture.jpg'
      plID='1'
      gonationID='bzn-4LVvOm-bR2i9TE2wDplhoA'
      tvID='gntv-Qk52KxNgSoC01dOPoLBvRQ'
    />
  )
}

export default App
