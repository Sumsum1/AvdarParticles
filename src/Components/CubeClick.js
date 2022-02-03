export const CubeClick = ({linkUrl}) => {
    return(
        <mesh onPointerDown={() => window.open({linkUrl})}>
            <boxBufferGeometry attach="geometry" args={[6, 6, 6]} />
            <meshStandardMaterial attach="material" opacity={0.0} transparent={true}/>
        </mesh>
    )
}