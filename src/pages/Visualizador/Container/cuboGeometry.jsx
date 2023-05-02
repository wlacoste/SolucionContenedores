/* eslint-disable react/no-unknown-property */
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Cube(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame

  const faceColors = ["0xff0000", "0x049ef4", "0x049ef4", "0x049ef4", "0x049ef4", "0x00ffff"]; // Define an array of face colors
  // Return the view, these are regular Threejs elements expressed in JSX
  const materials = faceColors.map((color) => {
    return new THREE.MeshBasicMaterial({ color: color, opacity: 0.8, transparent: true });
  });

  const geometry = new THREE.BoxGeometry(...props.scale);
  const material = () => {
    if (!props.wireframe) {
      return <meshNormalMaterial opacity={0.75} transparent={true} wireframe={props.wireframe} />;
    } else {
      return (
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} wireframe={props.wireframe} />
      );
    }
  };

  return (
    <mesh
      {...props}
      ref={ref}
      rotateOnAxis={(event) => rotate(y, 90)}
      scale={1}
      onClick={(event) => click(!clicked)}
      onPointerOut={(event) => hover(false)}
      onPointerOver={(event) => hover(true)}
    >
      {/* <cylinderGeometry args={[1, 1, 1]} /> */}
      <boxGeometry args={props.scale} />
      {/* <bufferGeometry attach="geometry" {...geometry} /> */}
      {/* <meshStandardMaterial color={hovered ? "hotpink" : "orange"} wireframe={props.wireframe} /> */}
      {/* <meshPhongMaterial transparent color="#ff0000" opacity={0.3} /> */}
      {/* <meshPhongMaterial material={materials} /> */}
      {/* <meshNormalMaterial opacity={0.75} transparent={true} wireframe={props.wireframe} /> */}

      {material()}
    </mesh>
  );
}

export default Cube;
