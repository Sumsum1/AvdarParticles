import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { MeshStandardMaterial, MeshPhysicalMaterial } from 'three'

const color = new THREE.Color()
const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
const randomData = Array.from({ length: 1000 }, (r = 100) => ({ random: Math.random(), position: randomVector(r), rotation: randomEuler() }))

export default function App() {
  const { range } = useControls({ range: { value: 100, min: 0, max: 1000, step: 10 } })
  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }} performance={{ min: 0.1 }}>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={0.6} position={[5, 25, 20]} />
      <Suspense fallback={null}>
        <Shoes range={25} position={[0, 0, 0]}/>
        {/* <Environment preset="city" /> */}
      </Suspense>

      {/* <Suspense fallback={null}>
        <Shoes range={5} position={[7, 0, 7]}/>
      </Suspense> */}

      <OrbitControls autoRotate autoRotateSpeed={1} />
    </Canvas>
  )
}

function Shoes({ range, position }) {
  const text = useLoader(
    THREE.TextureLoader,
    './HMap.jpg',
  )
  text.flipY = false;
  text.encoding = THREE.sRGBEncoding;

  const mat = new MeshPhysicalMaterial({
    map: text,
  })
  
  const { nodes, materials } = useGLTF('/HCenter.glb')
  console.log('mat', mat)
  console.log('node', nodes)
  return (
    <Instances range={range} material={mat} geometry={nodes.HCenter.geometry} scale={[0.1, 0.1, 0.1]} position={position}>
      {randomData.map((props, i) => (
        <Shoe key={i} {...props} />
      ))}
    </Instances>
  )
}

function Shoe({ random, ...props }) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000
    ref.current.rotation.set(Math.cos(t / 4) / 6, Math.sin(t / 4) / 6, Math.cos(t / 1.5) / 6)
    ref.current.position.y = Math.sin(t / 1.5) / 6
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1)
    ref.current.color.lerp(color.set(hovered ? 'red' : 'white'), hovered ? 1 : 0.1)
  })
  return (
    <group {...props}>
      <Instance ref={ref} onPointerOver={(e) => (e.stopPropagation(), setHover(true))} onPointerOut={(e) => setHover(false)} />
    </group>
  )
}
