import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';



export function NavigationButton({ position, navigateTo, rotation, children }) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);


  const handleClick = () => {
      navigate(navigateTo);     
      console.log("Clicked to: ", navigateTo);
       
  };
    
    
    return (
      <group rotation={[0, 0, 0]}>
        <Text
            onClick={handleClick}
            castShadow
            receiveShadow
            position={position}
            rotation={rotation}
            scale={.11}
            font={"/TOSKU_BebasNeue-Regular.ttf"}
            fontSize={2}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            color={hovered ? 'gray' : 'white'}
            outlineWidth={hovered ? 0.1 : 0}
            outlineColor="white"
            letterSpacing={0.2}
            >
            { children }
        </Text>
    </group>
  );
    
}


