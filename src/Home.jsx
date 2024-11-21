import { useRef, useEffect, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";



const Home = (props) => {
  const { nodes, materials } = useGLTF('/TOSKU_Home_Textured_Test.glb')
  const { nodes: nodesLogo } = useGLTF('/TOSKU_Logo.glb')

    
    const homeRearLights = useRef();
    const [intensity, setIntensity] = useState(5);

    useEffect(() => {
      const interval = setInterval(() => {
      setIntensity(3 + Math.random() * 3); // flickers between 1 and 5 intensity
      }, 100); // flickering speed

      return () => clearInterval(interval);
      
    }, []);
  
  
  const rectAreaLightRef = useRef(null);
    useFrame(() => {
    if (rectAreaLightRef.current) {
      rectAreaLightRef.current.intensity = intensity;
    }
  });
 
        return (
            <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]} position={[0,0,0]}>
                {/*Home Behind Screen  intensity  */}
            <rectAreaLight ref={ homeRearLights } args={['#606c7c', 1.5, 10, 5]} position={[-5, 2, 0]} rotation-y={-Math.PI / 2} />
      
                {/*Home behind camera  */}
                <rectAreaLight args={['#606c7c', 8, 10, 5]} position={[6, 2, 0]} rotation-y={Math.PI / 2} />

                {/*Home Hall to About 2.5 intensity  */}
                <rectAreaLight ref={rectAreaLightRef}  args={['#606c7c', 8, 10, 5]} position={[0, 5, -10]} rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} />

                {/*Home Hall to Featured 2.5 intensity  */}
                <rectAreaLight args={['#606c7c', 8, 10,5]} position={[0, 5, 10]} rotation-x={-Math.PI / 2} rotation-z={Math.PI / 2} />
        <pointLight // Main Home light
        intensity={1}
        decay={1}
        color="#cbebff"
        //color="#ff002f"
        position={[2.187, 1.501, 3.63]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[1, 2.258, 1]}
      />
            <mesh
          scale={.6}
          position={[-1.47, 2, -2.45]}
          rotation={[0, Math.PI / 2,0]}
          castShadow
          receiveShadow
          geometry={nodesLogo.logo.geometry}
        />
  
         <mesh
        castShadow
        receiveShadow
        geometry={nodes.BuildingHome.geometry}
        material={materials['Cracked Concrete Baked']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BuildingHomeFloor.geometry}
        material={materials['Cracked Concrete Baked']}
            >
             
    </mesh> 
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Homepage_Large_Screen_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Homepage) Baked']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Home_Screen_Boarder.geometry}
        material={materials['Black Borders.004']}
      />
               
           </group>
  )
}

useGLTF.preload('/TOSKU_Home_Textured_Test.glb')
useGLTF.preload('/TOSKU_Logo.glb')

export default Home;


