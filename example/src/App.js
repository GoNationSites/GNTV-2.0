import React from 'react'

import { TV } from 'gntv-component'
// import 'gntv-component/styles.module.css'

const App = () => {
  const listConfiguration = {
    titleColor: '#40ADC0',
    itemColor: '#FC6E06',
    textColor: '#262626',
    pages: {
      Pizzas: {
        page1: [
          {
            name: 'Red Artisan Pinsa',
            area: '1 / 1 / 4 / 4'
          }
        ]
      }
    }
  }
  return (
    <TV
      listConfig={{ listConfiguration }}
      texture='https://res.cloudinary.com/gonation/image/upload/v1606833159/GNTV/RomeTV5.jpg'
      plID='1'
      gonationID='bzn-Yi5jWTSiR1qvn3_7S2aYsg'
      tvID='gntv-GHSkZrPaTq2vGkmL07RskQ'
    />
  )
}

export default App
