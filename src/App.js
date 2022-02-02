import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { MeshPhysicalMaterial, MeshBasicMaterial } from 'three'

const color = new THREE.Color()
const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
const randomData = Array.from({ length: 1000 }, (r = 100) => ({ random: Math.random(), position: randomVector(r), rotation: randomEuler() }))

export default function App() {
  const { range } = useControls({ range: { value: 100, min: 0, max: 1000, step: 10 } })
  const [rotatinY, setRotationY] = useState(0);
  const groupRef = useRef();





  const switchMetals = () => {
    //groupRef.current.rotation = groupRef.current.rotation.Y += 45; 
    console.log('groupRef: ' ,groupRef.current);

  }

  console.log('Orbit: ', OrbitControls)
  return (
    <div className='canvasContainer'>
      <Canvas camera={{ position: [0, 10, -50], fov: 60 }} performance={{ min: 0.1 }}>
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.6} position={[5, 25, 20]} />
          <directionalLight intensity={0.6} position={[0, -20, 0]} color={'red'}/>
          
          <group ref={groupRef} rotation={[0,rotatinY, 0] }  >

          
                <Suspense fallback={null}>
                  <group position={[-30, 0, 0]}>
                      <mesh onPointerDown={switchMetals}>
                        <boxBufferGeometry attach="geometry" args={[11, 11, 11]} />
                        <meshStandardMaterial attach="material" opacity={0.0} transparent={true}/>
                      </mesh>
                      <ModelsH range={15}   />
                      {/* <Environment preset="city" /> */}
                  </group>
                </Suspense>

              

              <Suspense fallback={null}>
                <group position={[25, 0, -20]}>
                      <mesh onPointerDown={switchMetals}>
                        <boxBufferGeometry attach="geometry" args={[6, 6, 6]} />
                        <meshStandardMaterial attach="material" opacity={0.0} transparent={true}/>
                      </mesh>
                      <ModelsCoil range={10} />
                {/* <Environment preset="city" /> */}
                </group>
              </Suspense>

              <Suspense fallback={null}>
                <group position={[5, 0, 30]}>
                      <mesh onPointerDown={switchMetals}>
                        <boxBufferGeometry attach="geometry" args={[11, 11, 11]} />
                        <meshStandardMaterial attach="material" opacity={0.0} transparent={true}/>
                      </mesh>
                      <ModelsTube range={15} />
                {/* <Environment preset="city" /> */}
                </group>   
              </Suspense>
          </group>
          

          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0} 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
          <axesHelper />
      </Canvas>
    </div>
    
  )
}


// H profile-------------------------------------------------------------------------
function ModelsH({ range, position }) {
  const text = useLoader(
    THREE.TextureLoader,
    './HMap.jpg',
  )
  text.flipY = false;
  text.encoding = THREE.sRGBEncoding;

  const matH = new MeshPhysicalMaterial({
    map: text,
  })
  
  const { nodes  } = useGLTF('/HCenter.glb')
  console.log('mat', matH)
  console.log('node', nodes)
  return (
    <Instances range={range} material={matH} geometry={nodes.HCenter.geometry} scale={[0.1, 0.1, 0.1]} position={position}>
      {randomData.map((props, i) => (
        <ModelH key={i} {...props} />
      ))}
    </Instances>
  )
}

function ModelH({ random, ...props }) {
  const ref = useRef()
  const [hovered, setHover] = useState(false)

  const onPointerOver = (e) => {
    e.stopPropagation()
    setHover(true)
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000
    ref.current.rotation.set(Math.cos(t / 4) / 6, Math.sin(t / 4) / 6, Math.cos(t / 1.5) / 6)
    ref.current.position.y = Math.sin(t / 1.5) / 6
    ref.current.scale.x = ref.current.scale.y = ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1)
    ref.current.color.lerp(color.set(hovered ? 'red' : 'white'), hovered ? 1 : 0.1)
  })
  return (
    <group {...props}>
      {/* <Instance ref={ref} onPointerOver={(e) => (e.stopPropagation(), setHover(true))} onPointerOut={(e) => setHover(false)} /> */}
      <Instance ref={ref} onPointerOver={onPointerOver} onPointerOut={(e) => setHover(false)} />
    </group>
  )
}
// H profile--------------------------------------------------------------------------



// Coil--------------------------------------------------------------------------
function ModelsCoil({ range, position }) {
  const textCoil = useLoader(
    THREE.TextureLoader,
    './CoilMap.jpg',
  )
  textCoil.flipY = false;
  textCoil.encoding = THREE.sRGBEncoding;

  const matCoil = new MeshPhysicalMaterial({
    map: textCoil,
  })
  
  const { nodes  } = useGLTF('/CoilCenter.glb')
  console.log('mat', matCoil)
  console.log('node coil', nodes)
  return (
    <Instances range={range} material={matCoil} geometry={nodes.Torus003.geometry} scale={[0.1, 0.1, 0.1]} position={position}>
      {randomData.map((props, i) => (
        <ModelCoil key={i} {...props} />
      ))}
    </Instances>
  )
}

function ModelCoil({ random, ...props }) {
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
// Coil--------------------------------------------------------------------------


// Tube--------------------------------------------------------------------------
function ModelsTube({ range, position }) {
  const textTube = useLoader(
    THREE.TextureLoader,
    './tubeMap.jpg',
  )
  textTube.flipY = false;
  textTube.encoding = THREE.sRGBEncoding;

  const matTube = new MeshPhysicalMaterial({
    map: textTube,
  })
  
  const { nodes } = useGLTF('/TubeCenter.glb')
  console.log('mat', matTube)
  console.log('node tube', nodes)
  return (
    <Instances range={range} material={matTube} geometry={nodes.TubeCenter.geometry} scale={[0.1, 0.1, 0.1]} position={position}>
      {randomData.map((props, i) => (
        <ModelTube key={i} {...props} />
      ))}
    </Instances>
  )
}

function ModelTube({ random, ...props }) {
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
// Tube--------------------------------------------------------------------------