import { render } from 'react-dom'
import { Stats } from '@react-three/drei'
import './style.css'
import App from './App'
import { Suspense } from 'react'

render(
  <>

      <Suspense fallback={null}>
          <App />
      </Suspense> 
      <Stats />

  
  </>,
  document.getElementById('root'),
)
