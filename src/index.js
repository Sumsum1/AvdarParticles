import { render } from 'react-dom'
import { Stats } from '@react-three/drei'
import './style.css'
import App from './App'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Loader } from './Components/Loader';

render(
  <>

      <Suspense fallback={<Loader />}>
          <App />
      </Suspense> 
      {/* <Stats /> */}
  </>,
  document.getElementById('root'),
)
