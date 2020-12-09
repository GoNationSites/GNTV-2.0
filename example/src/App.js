import React from 'react'

import { TV } from 'gntv-component'
// import 'gntv-component/styles.module.css'

const App = () => {
  const listConfiguration = {
    titleColor: '#fff',
    itemColor: '#fff',
    textColor: '#fff',
    descriptionColor: 'rgba(186, 186, 186)',
    columns: `1fr 1fr`,
    displayVariants: true,
    pages: {
      Pizzas: {
        page1: [
          {
            name: 'Artisan Pizza',
            area: '1 / 1 / 4 / 4'
          }
        ]
      }
    }
  }
  return (
    <TV
      listConfig={{ listConfiguration }}
      texture='https://res.cloudinary.com/gonation/image/upload/v1606923661/GNTV/RomeTV4.jpg'
      plID='5'
      gonationID='bzn-Yi5jWTSiR1qvn3_7S2aYsg'
      tvID='gntv-f0AaWlIlRu_ktuCEr0q89A'
      wrapperClassName='romanacci-pizza'
    />
  )
}

export default App
