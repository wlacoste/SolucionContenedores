/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";
import { MeshPhysicalMaterial } from "three";

function Cube(props: any) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  const material = () => {
    if (!props.esmaterial) {
      return <meshNormalMaterial opacity={0.75} transparent={true} wireframe={props.wireframe} />;
    } else {
      return (
        <meshPhysicalMaterial
          {...props}
          castShadow={true}
          color={props.color}
          ior={props.ior}
          opacity={props.opacity}
          receiveShadow={true}
          transparent={true}
          wireframe={props.wireframe}
        />
        // <meshStandardMaterial
        //   {...props}
        //   color={props.color}
        //   opacity={props.opacity}
        //   transparent={true}
        //   wireframe={props.wireframe}
        // />
      );
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onPointerOut={(event) => hover(false)}
      onPointerOver={(event) => hover(true)}
    >
      <boxGeometry args={props.scale} />

      {material()}
    </mesh>
  );
}

export default Cube;
