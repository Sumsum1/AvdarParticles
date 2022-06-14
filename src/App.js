
import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Instances, Instance, OrbitControls, useGLTF, Stats } from '@react-three/drei'
import { MeshStandardMaterial, TextureLoader } from 'three'
import { Environment } from '@react-three/drei'
import { CubeClick } from './Components/CubeClick'
import { SpriteInfo } from './Components/SpriteInfo'



const color = new THREE.Color()
const randomVector = (r) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]
const randomData = Array.from({ length: 1000 }, (r = 100) => ({ random: Math.random(), position: randomVector(r), rotation: randomEuler() }))

export default function App() {
  //const { range } = useControls({ range: { value: 100, min: 0, max: 1000, step: 10 } })
  const [rotatinY, setRotationY] = useState(2.9);
  const groupRef = useRef();



  const selectHRef = useRef();

  const openUrl = (e, url) => {
    //groupRef.current.rotation = groupRef.current.rotation.Y += 45; 
    console.log('groupRef: ' ,groupRef.current);
    console.log('userData: ' ,selectHRef.current.userData);
    window.open(selectHRef.current.userData.url);
  }

  console.log('Orbit: ', OrbitControls)

  const infoTubes = useLoader(
    THREE.TextureLoader,
    './hollo.png'
  )


  const holloSprite = useLoader(TextureLoader, './hollo.png');
  const flatSprite = useLoader(TextureLoader, './flat-products.png');
  const profetionalSprite = useLoader(TextureLoader, './profetional-section.png');

  

  return (
    <div className='canvasContainer'>
          <Canvas camera={{ position: [0, 10, -50], fov: 60 }} performance={{ min: 0.1 }}>
          <Stats />
          <ambientLight intensity={0.2} />
          <directionalLight intensity={1} position={[5, 25, 20]} />
          <directionalLight intensity={0.6} position={[0, -20, 0]} color={'red'}/>
          
          <group ref={groupRef} rotation={[0,rotatinY, 0] }  >

                <Suspense fallback={null}>
                  <group position={[-30, -2, 0]}>
                      <sprite scale={[14, 5.5, 1]}  position={[0, 0, 15]}>
                        <spriteMaterial attach="material" map={profetionalSprite} transparent />
                      </sprite>
                      //<SpriteInfo attach={"material"} scale={[14, 5.5, 1]}  position={[0, 0, 15]} map={profetionalSprite} />
                      <CubeClick onPointerDown={() => window.open("https://a-albo.kpd.co.il/products/professional-sections/")} />
                      <ModelsH range={15} />
                  </group>
                </Suspense>

              <Suspense fallback={null}>
                <group position={[25, 0, -20]}>
                <sprite scale={[10, 4, 1]}  position={[0, -1, -11]}>
                          <spriteMaterial attach="material" map={flatSprite} transparent />
                      </sprite>
                      
                      <CubeClick onPointerDown={() => window.open("https://a-albo.kpd.co.il/products/flat-product/")} />
                      <ModelsCoil range={10} />
                </group>
              </Suspense>

              <Suspense fallback={null}>
                <group position={[5, 0, 30]}>
                      <sprite scale={[13, 6.5, 1]}  position={[12, 0, 1]}>
                        <spriteMaterial attach="material" map={holloSprite} transparent />
                      </sprite>
                      <CubeClick onPointerDown={() => window.open("https://a-albo.kpd.co.il/products/hollow-sections-and-pipes/")} />
                      <ModelsTube range={15} />
                </group>   
              </Suspense>
          </group>
          
          <Environment preset="city" />
          <OrbitControls 
            autoRotate 
            autoRotateSpeed={0} 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 2.1}
            maxPolarAngle={Math.PI / 2.1}
          />
          {/* <axesHelper /> */}
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

  const matH = new MeshStandardMaterial({
    map: text,
    // color: 'gray',
    metalness: 1,
    reflectivity: 0.3,
    roughnessMap : text
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

  const matCoil = new MeshStandardMaterial({
    map: textCoil,
    metalness: 1,
    reflectivity: 0.3,
    roughnessMap : textCoil
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

  const matTube = new MeshStandardMaterial({
    map: textTube,
    metalness: 1,
    reflectivity: 0.3,
    roughnessMap : textTube
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