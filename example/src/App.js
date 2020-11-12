import React from 'react'

import { TV } from 'gntv-component'
// import 'gntv-component/styles.module.css'

const App = () => {
  const listConfiguration = {
    titleColor: '#40ADC0',
    itemColor: '#FC6E06',
    textColor: '#262626'
  }
  return (
    <TV
      // gonationID='bzn-XaUXGg1OScOoINf6ICrrUA'
      listConfig={{ listConfiguration }}
      texture='https://res.cloudinary.com/gonation/image/upload/v1605023949/GNTV/la-picante-texture.jpg'
      plID='1'
      // tvID='gntv--MzCwN76Qu6-yX4CDOREcg'

      gonationID='bzn-4LVvOm-bR2i9TE2wDplhoA'
      tvID='gntv-4KWUjwOhQa_naAluFGOIiA'
    />
  )
}

export default App
