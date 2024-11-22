import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import WaterEffect from './WaterEffect.jsx';
import { useLoader } from '@react-three/fiber';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import * as THREE from 'three';

const VideoScreen = ({ videoStart, url }) => { 
    const video = document.createElement('video');
  const videoMeshRef = useRef();
  useEffect(() => {
      
      video.src = url;
      video.crossOrigin = 'anonymous';
      video.load();
      if(videoStart) video.play()
      video.loop = true;
         // Ensure video is muted to avoid autoplay issues
        
      const videoTexture = new THREE.VideoTexture(video);
     /*    videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter; */
        videoTexture.format = THREE.RGBFormat;
        videoTexture.encoding = THREE.sRGBEncoding;
        videoTexture.needsUpdate = true;
        videoMeshRef.current.material.map = videoTexture;
        
  }, []);

  return (
     <mesh
          ref={videoMeshRef}
      rotation={[0, -Math.PI, 0]}
      scale={.21}
          >
          <planeGeometry args={[16.25,9]} />
          {/* <meshBasicMaterial/>  */}
      </mesh>
  )
}

const ThumbnailItem = ({ index, mediaId, slug, data, id }) => {
  const { nodes, materials } = useGLTF('/TOSKU_Featured_compressed.glb')
  const [mediaData, setMediaData] = useState(null);
  const [error, setError] = useState();
  const [hovered, setHovered] = useState(false);
  const linkSlug = `/featured/${slug}`;
  const navigate = useNavigate();

  
  const firstRowDisplay = [2.206, -0.018, -2.218];
  const firstRow = firstRowDisplay[index % 3]; 
  const secondRowDown = [3.493, 2.196, 0.894];
  const secondRow = secondRowDown[Math.floor(index / 3)];
  

  const handleClick = (slug) => {

    navigate(`/featured/${slug}`)
  };

  useEffect(() => {
    //WP REST API endpoint
    const { hostname, protocol } = window.location;
    const url = `${protocol}//${hostname}/wp-json/wp/v2/media/${mediaId}`


    axios.get(url)
      .then(response => {
        setMediaData(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
    <group
        position={[firstRow, secondRow, 24.846]}
      rotation={[Math.PI, 0, Math.PI]}
      scale={[0.552, 0.552, 0.046]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube090.geometry}
        material={materials['Black Borders']}
      />
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        geometry={nodes.Cube090_1.geometry}
        material={materials['Screen Placeholder']}
      > {mediaData && 
          <Html occlude center transform distanceFactor={4.5} position={[0, 0, 0]} >
            <div onClick={() => handleClick(slug)} style={{ backgroundColor:'black', color:'white', padding:'10px', borderRadius:'10px', display:'block' }}>
              <img style={{ borderRadius: '10px', margin:'auto', marginTop:'0', marginBottom:'0', width: '300px' }} src={mediaData.media_details.sizes.medium.source_url} alt={mediaData.title.rendered} />
             
            </div>
          </Html>
        }
      </mesh>
    </group>
      </>
  );
}

const ThumbnailDisplay = ({ data, item, view, nodes, materials }) => { 
    const [description, setDescription] = useState(""); //single featured video 
    const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [indexFnd, setIndexFnd] = useState(0);
  
  useEffect(() => {
    console.log("featured item: ", item);
    console.log("featured: view", view);
    
    if (item != undefined && view == "featured") {
      const findIndexFc = (element) => element.slug == item;
      const indexFnd = data.findIndex(findIndexFc);
      setIndexFnd(indexFnd);
      const parser = new DOMParser();
      const doc = parser.parseFromString(data[indexFnd].content.rendered, 'text/html');
      const pTags = doc.querySelectorAll('p');
      const iFrameTag = doc.querySelectorAll('iframe'); //Return NodeList
      const iFrameArray = Array.from(iFrameTag).map(node => node.outerHTML); // Convert NodeList to an Array and then to a string
      const pArray = Array.from(pTags).map(p => `<p>${p.textContent.trim()}</p>`);
      const pString = pArray.join('');
      const iFrameString = iFrameArray.join('');

      setDescription(pString);
      setTitle(data[indexFnd].title.rendered);
      setVideo(iFrameString);
    }
  }, [item]);
  console.log(data);

  return (
    <>
      {data.map((featured, index) => (
        <ThumbnailItem key={index} index={index} id={featured.id} mediaId={featured.featured_media} slug={featured.slug} data={data} />
      ))
      }
        <group
        position={[-4.332, 2.427, 21.454]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_1.geometry}
          material={materials['Screen Placeholder']}
        >{data && item &&
          <VideoScreen videoStart={true} url={ data[indexFnd].custom_featured_url_meta } />
          }
        </mesh>
      </group>
       <group
        position={[-4.332, 2.427, 17.465]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
          {data && item &&
            <Html transform sprite rotation={[0, 0, 0]} scale={.9} position={[.2,0,0]} distanceFactor={3}>
              <div className="featured-item">
                  <div className="featured-video" dangerouslySetInnerHTML={{ __html: video }}></div>
                <div className='featured-aside'>
                  <h1 className='featured-title'>{title}</h1>
                    <div className="featured-description" dangerouslySetInnerHTML={{ __html: description }}></div>
                </div>
              </div>
            </Html>
          }
        </group>
        
    </>
  )
}

const Featured = (props) => {
  const { nodes, materials } = useGLTF('/TOSKU_Featured_compressed.glb');
  const [data, setData] = useState([]); // all featured videos returned
  const [error, setError] = useState();

  useEffect(() => {
    //WP REST API endpoint
    const { hostname, protocol } = window.location;
    const url = `${protocol}//${hostname}/wp-json/wp/v2/featured`

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
    <group {...props} dispose={null} rotation={[0, 0, 0]}>
     {/*  <axesHelper args={[2]} position={[-22, 0, 0]}/> */}
      {/* <WaterEffect position={[-0.017, -0.126, 20.491]} />  */}
      
    
      {/* <mesh 
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[-0.017, -0.126, 20.491]}
        scale={4.865}
      /> */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        {(data.length > 0) && <ThumbnailDisplay data={data} item={props.item} view={props.view} nodes={nodes} materials={ materials} />}

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BuildingFeatured.geometry}
        material={materials['Cracked Concrete Featured Texture']}
      />

      <group
        position={[2.206, 2.196, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
   
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube084.geometry}
        material={materials['Black Borders']}
      />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube083_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[2.206, 0.894, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube084.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube084_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-0.018, 3.493, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube090.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube090_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-0.018, 2.196, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube087.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube087_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-0.018, 0.894, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube086.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube086_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-2.218, 3.493, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube093.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube093_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-2.218, 2.196, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube092_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group
        position={[-2.218, 0.894, 24.846]}
        rotation={[Math.PI, 0, Math.PI]}
        scale={[0.552, 0.552, 0.046]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube091.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube091_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
    
        {/* Text Aside  */}
    <group
        position={[-4.332, 2.427, 17.465]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019_1.geometry}
          material={materials['Screen Placeholder']}
          >
            <meshBasicMaterial color={"black"} />
        </mesh>
        </group> 
        
        {/* Main Video Aside  */}
      <group
        position={[-4.332, 2.427, 21.454]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.563, 1.563, 0.129]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials['Black Borders']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018_1.geometry}
          material={materials['Screen Placeholder']}
        />
      </group>
      <group position={[-4.477, 2.427, 18.454]} rotation={[-Math.PI / 2, 0, 0]} scale={0.024}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).009']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_1.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).010']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_2.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).011']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder009_3.geometry}
          material={materials['Sci-Fi Metal Greeble (Small).012']}
        />
        </group>
          <mesh
        castShadow
        receiveShadow
        geometry={nodes.Featured_Work_Large_Screen_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Small) Texture']}
        position={[-4.48, 2.888, 17.681]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={-0.024}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Featured_Work_Thumbnail_Screen_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Small) Texture']}
        position={[3.562, 2.88, 24.889]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        scale={0.024}
        />
        </group>
    </group>
  )
}

useGLTF.preload('/TOSKU_Featured_compressed.glb')

export default Featured