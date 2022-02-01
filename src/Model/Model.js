import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, Environment, useGLTF } from '@react-three/drei'


export function Models({ range, material , geometry, position, gltf }) {

  const color = new THREE.Color()
  const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
  const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
  const randomData = Array.from({ length: 1000 }, (r = 100) => ({ random: Math.random(), position: randomVector(r), rotation: randomEuler() }))

  const { nodes, materials } = useGLTF({gltf})
  return (
    <Instances range={range} material={material} geometry={geometry} scale={[0.1, 0.1, 0.1]} position={position}>
      {randomData.map((props, i) => (
        <Model key={i} {...props} />
      ))}
    </Instances>
  )
}

