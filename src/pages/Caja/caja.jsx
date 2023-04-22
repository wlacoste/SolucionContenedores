/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

function Cube(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}
      onClick={(event) => click(!clicked)}
      onPointerOut={(event) => hover(false)}
      onPointerOver={(event) => hover(true)}
    >
      {/* <cylinderGeometry args={[1, 1, 1]} /> */}
      <boxGeometry args={props.scale} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} wireframe={props.wireframe} />
    </mesh>
  );
}

export default Cube;
