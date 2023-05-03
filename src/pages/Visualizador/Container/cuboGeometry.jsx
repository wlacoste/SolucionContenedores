/* eslint-disable react/no-unknown-property */
import { useRef, useState } from "react";

function Cube(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  const material = () => {
    if (!props.wireframe) {
      return <meshNormalMaterial opacity={0.75} transparent={true} wireframe={props.wireframe} />;
    } else {
      return <meshStandardMaterial color={hovered ? "red" : "black"} wireframe={props.wireframe} />;
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      rotateOnAxis={(event) => rotate(y, 90)}
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
