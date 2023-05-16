/* eslint-disable react/no-unknown-property */
import { useControls } from "leva";
import { useMemo, useRef, useState } from "react";

function Cube(props: any) {
  const ref = useRef();
  const [hovered, hover] = useState(false);

  const material = () => {
    if (!props.esmaterial) {
      return <meshNormalMaterial opacity={0.75} transparent={true} wireframe={props.wireframe} />;
    } else {
      return (
        <meshPhysicalMaterial
          key={props.ikey + props.ikey}
          {...props}
          castShadow={true}
          receiveShadow={true}
          transparent={true}
        />
      );
    }
  };

  return (
    <mesh
      {...props}
      key={props.ikey + "C"}
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
