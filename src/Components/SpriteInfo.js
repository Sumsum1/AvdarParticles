export const SpriteInfo = ({map}) => {
    return(
        <sprite>
            <spriteMaterial attach="material" map={map} transparent />
         </sprite>
    )
}