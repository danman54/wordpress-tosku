import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, Html} from '@react-three/drei'
import WaterEffect from './WaterEffect.jsx'
import { useNavigate } from "react-router-dom";
import { useThree } from '@react-three/fiber';
import axios from 'axios';
import * as THREE from 'three';


const ThumbnailItemAbout = ({ index, mediaId, slug, data, id, item }) => { 
  const { nodes, materials } = useGLTF('/TOSKU_Featured_compressed.glb')
  const [mediaData, setMediaData] = useState(null);
  const navigate = useNavigate();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const posX = [-2.218, -0.018];
  const posY = [3.39, 2.09, 0.79];
  const offsetX = posX[index % 2];
  const offsetY = posY[Math.floor(index / 2)];

  const { camera } = useThree();

  const vec = new THREE.Vector3();

  const handleMouseMove = (event) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  const handleClick = (slug, index) => {
    console.log('index: ', index);
    navigate(`/about/${slug}`)
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    //WP REST API endpoint
    const { hostname, protocol } = window.location;
    const url = `${protocol}//toskuone.local/wp-json/wp/v2/media/${mediaId}`

    axios.get(url)
      .then(response => {
        setMediaData(response.data);
      })
      .catch(error => {
        setError(error);
      });
    
    if (item != null && (index % 2 == 0)) { 
      camera.position.lerp(vec.set(20, 2,  2), .1)

    }
    
  }, []);

  return (
    <>
      <group
        position={[offsetX, offsetY, -24.846]}
        rotation={[0, 0, 0]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
           geometry={nodes.Cube093.geometry} 
          material={materials['Black Borders']}>
          </mesh>
          
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube093_1.geometry} 
          material={materials['Screen Placeholder']}>
          {mediaData && 
          <Html occlude center transform distanceFactor={4.5} position={[0, 0, 0]} >
            <div onClick={() => handleClick(slug, index)} style={{ backgroundColor:'black', color:'white', padding:'10px', borderRadius:'10px', display:'block' }}>
              <img style={{ borderRadius: '10px', margin:'auto', marginTop:'0', marginBottom:'0', width: '300px' }} src={mediaData.media_details.sizes.medium.source_url} alt={mediaData.title.rendered} />
            </div>
          </Html>
        }
        </mesh>
      </group>
    
    </>
  )
}

const ThumbnailDisplayAbout = ({ data, item, view, aboutMaterials, aboutNodes }) => { 
  console.log(data);
  

  return (
    <>
      {data.map((featured, index) => (
        <ThumbnailItemAbout key={index} index={index} id={featured.id} mediaId={featured.featured_media} slug={featured.slug} data={data} item={item}  />
      ))
      }
    </>
  )
}

const About = (props) => {
    const { nodes, materials } = useGLTF('/TOSKU_Featured_compressed.glb')
    const { nodes: aboutNodes , materials: aboutMaterials } = useGLTF('/TOSKU_About_compr.glb')
    const [data, setData] = useState([]);
    const [error, setError] = useState();
  
    useEffect(() => {
    //WP REST API endpoint
    const { hostname, protocol } = window.location;
    const url = `${protocol}//toskuone.local/wp-json/wp/v2/members`

    if (data.length <= 0) {
      axios.get(url)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          setError(error);
        })
    }
    }, [data]);
  
  
  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]}>
      {(data.length > 0) && <ThumbnailDisplayAbout data={data} item={props.item} aboutNodes={aboutNodes} aboutMaterials={aboutMaterials}  />}
       <mesh
        castShadow
        receiveShadow
        geometry={aboutNodes.BuildingAbout.geometry}
        material={aboutMaterials['Cracked Concrete About Texture']}
        scale={1}
        position={[0, 0, .1]}
      
      />
      <mesh
        castShadow
        receiveShadow
        geometry={aboutNodes.Team_Bio_Large_Screen_Wires.geometry}
        material={aboutMaterials['Sci-Fi Metal Greeble (Small)']}
        position={[4.484, 2.885, -23.1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.024}
      >
          <meshBasicMaterial color={"pink"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={aboutNodes.Team_Bio_Large_Screen_Wires_2.geometry}
        material={aboutMaterials['Sci-Fi Metal Greeble (Small) About Baked']}
        position={[-4.482, 2.885, -17.784]}
        rotation={[Math.PI / 2, 0, Math.PI]}
        scale={0.024}
      />
    {/* <WaterEffect position={[-0.017, -0.126, -20.491]}/> */}
      {/* <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.017, -0.126, 20.491]}
        scale={4.865}
      /> */}
      <mesh
        rotation={[ 0, Math.PI, 0]}
        castShadow
        receiveShadow
        geometry={nodes.BuildingFeatured.geometry}
        material={materials['Cracked Concrete Featured Texture']}
      />
      
      {/* //first right Columb */}
            <group
        position={[-0.018, 3.393, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube090.geometry}
          material={materials['Black Borders']}/>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube090_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>

      {/* //Second right Columb */}

      <group
        position={[-0.018, 2.096, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube087.geometry}
          material={materials['Black Borders']}>
          


        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube087_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      {/* Bottom Right Columb  */}
      <group
        position={[-0.018, 0.794, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube086.geometry}
          material={materials['Black Borders']}>
          
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube086_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>

      {/* Left Top  */}
      
      <group
        position={[-2.218, 3.393, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube093.geometry}
          material={materials['Black Borders']}>

        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube093_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-2.218, 2.096, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092.geometry}
          material={materials['Black Borders']}>

        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-2.218, 0.794, -24.846]}
        rotation={[0, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube091.geometry}
          material={materials['Black Borders']}
        >

        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube091_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Featured_Work_Thumbnail_Screen_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Small) Texture']}
        position={[-3.58, 2.8, -24.875]}
        rotation={[Math.PI / 2, 0,  3 * Math.PI/ 2]}
        scale={[0.024,0.0222,0.024] }/>
      
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Featured_Work_Large_Screen_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Small) Texture']}
        position={[-4.48, 2.888, 17.681]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={-0.024}>
          <meshBasicMaterial color={"green"} />
      </mesh>
      <group
        position={[-4.332, 2.257, -23.395]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials['Black Borders']}>
          <meshBasicMaterial color={"pink"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[4.332, 2.387, -17.455]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials['Black Borders']}>
          <meshBasicMaterial color={"green"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-4.332, 2.257, -19.354]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials['Black Borders']}>
          <meshBasicMaterial color={"blue"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[4.332, 2.387, -21.474]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials['Black Borders']}>
          <meshBasicMaterial color={"pink"} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group position={[-4.477, 2.427, -22.454]} rotation={[-Math.PI / 2, 0, 0]} scale={0.024}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).009']}
        >
          <meshBasicMaterial color={"blue"} />
      </mesh>
          
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_1.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).010']}
        >
          <meshBasicMaterial color={"blue"} />
      </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_2.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).011']}
        >
          <meshBasicMaterial color={"blue"} />
      </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_3.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).012']}
        >
          <meshBasicMaterial color={"blue"} />
      </mesh>
      </group>
      <group position={[4.477, 2.427, -18.454]} rotation={[-Math.PI / 2, 0, 0]} scale={0.024}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).009']}
        >
          <meshBasicMaterial color={"pink"} />
      </mesh>
          
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_1.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).010']}
        >
          <meshBasicMaterial color={"pink"} />
      </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_2.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).011']}
        >
          <meshBasicMaterial color={"blue"} />
      </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_3.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).012']}
        >
          <meshBasicMaterial color={"pink"} />
      </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/TOSKU_Featured_compressed.glb')

export default About