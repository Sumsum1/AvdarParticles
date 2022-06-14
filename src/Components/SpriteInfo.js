export const SpriteInfo = ({map, scale, position, attach}) => {
    return(
        <sprite>
            <spriteMaterial attach={attach} map={map} scale={scale} position={position} transparent />
         </sprite>
    )
}