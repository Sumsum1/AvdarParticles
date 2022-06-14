export const CubeClick = ({linkUrl, onPointerDown}) => {
    return(
        <mesh onPointerDown={onPointerDown}>
            <boxBufferGeometry attach="geometry" args={[6, 6, 6]} />
            <meshStandardMaterial attach="material" opacity={0.0} transparent={true}/>
        </mesh>
    )
}