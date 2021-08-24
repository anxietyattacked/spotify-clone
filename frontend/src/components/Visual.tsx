import React, { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";
import styles from "../styles/Viz.module.css";
import img from "./text.png";
import img1 from "./frame1.png";
import img2 from "./frame2.png";
import img3 from "./frame3.png";
import img4 from "./frame4.png";
import img5 from "./frame5.png";
import img6 from "./1.png";
import img7 from "./basketball.png";
import { BackSide, UniformsLib } from "three";

// varying vec3 vertexNormal;
// uniform float uTime;
// uniform float uData;
// varying vec2 vUv;

// void main() {
// vertexNormal = normal;
// vUv = uv;
// vec3 scale = vec3(uData /50.0, uData / 50.0, uData / 50.0);
// gl_Position = projectionMatrix * modelViewMatrix * vec4(position * scale , 1.0);

// varying vec3 vertexNormal;
// uniform vec3 uColor;
// varying vec2 vUv;
// void main()
// {
//   // float intensity = pow(0.25 - dot(vertexNormal, vec3(0.0, 0, 1.0)), 8.0);
//     gl_FragColor = vec4(uColor, 0.02);
// }

interface Props {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  listenerRef: any;
  soundRef: any;
}

const Visual: React.FC<Props> = ({
  isPlaying,
  audioRef,
  soundRef,
  listenerRef,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const analyser = useRef(new THREE.AudioAnalyser(soundRef.current, 128));

  useEffect(() => {
    if (mountRef.current) {
      // scene

      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(
        75,
        mountRef.current.clientWidth / mountRef.current.clientHeight,
        0.1,
        1000
      );
      var renderer = new THREE.WebGLRenderer();
      // renderer
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
      mountRef.current.appendChild(renderer.domElement);

      //   Audio

      camera.add(listenerRef.current);
      // texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("Frame7.png");
      texture.minFilter = THREE.NearestFilter;
      console.log(texture);
      //   Geometry, Mat, Mesh
      const geometry = new THREE.SphereBufferGeometry(1, 28, 28);
      const material = new THREE.ShaderMaterial({
        vertexShader: `
    
varying vec2 vUv;
uniform float uTime;
uniform float uData;

void main() {
  vUv = uv;

  float time = uTime * 1.0;
  vec3 scale = vec3(uData /50.0, uData / 50.0, uData / 50.0);
  vec3 transformed = position * scale;
  // transformed.z += sin(position.y + uData * 0.05);
  // transformed.z += sin(position.y + uData * 0.05);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
    `,
        fragmentShader: `
        varying vec2 vUv;
uniform float uTime;
uniform float uData;
uniform vec3 uColor;
uniform sampler2D uTexture;

void main() {
  float time = uTime;

  vec2 uv = vUv;
  uv.x += sin(uv.y * 0.25);
  uv.x += cos(uv.y * 0.25);
  vec2 repeat = vec2(8.0, 24.0);
  uv = fract(uv * repeat + vec2(0.0, time));
  
  vec4 color = texture2D(uTexture, uv);
  vec4 gray = vec4( vec3( color.r * 0.6 + color.g * 0.59 + color.b * 0.11 ),  .6);
  gl_FragColor = gray * vec4(uColor, 1);
}
    `,
        uniforms: {
          uColor: { value: new THREE.Color(0x1db954) },
          uData: { value: 0 },
          uTexture: { value: texture },
          uAmp: { value: 1.0 },
          uTime: { value: 0 },
        },
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
      });

      const sphere = new THREE.Mesh(geometry, material);

      scene.add(sphere);
      camera.position.z = 5;
      const clock = new THREE.Clock();
      //   Animate
      const animate = function () {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();
        const data1 = analyser.current.getAverageFrequency();
        // sphere.rotation.x += data1;
        material.uniforms.uData.value = data1;
        material.uniforms.uTime.value = time;
        sphere.rotation.y += (data1 * Math.random()) / 100000;
        sphere.rotation.x += (data1 * Math.random()) / 100000;
        material.uniforms.uColor.value.offsetHSL(0.0005, 0.0005, 0);

        // for (let i = 0; i < displacement.length; i++) {
        //   displacement[i] = Math.sin(0.1 * i + time);

        //   noise[i] += 0.5 * (0.5 - data1);
        //   noise[i] = THREE.MathUtils.clamp(noise[i], -5, 5);

        //   displacement[i] += noise[i];
        // }

        // sphere.geometry.attributes.displacement.needsUpdate = true;

        renderer.render(scene, camera);
      };

      let onWindowResize = function () {
        if (mountRef.current) {
          camera.aspect =
            mountRef.current.clientWidth / mountRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(
            mountRef.current.clientWidth,
            mountRef.current.clientHeight
          );
        }
      };

      window.addEventListener("resize", onWindowResize, false);
      // audio.play();
      animate();
    }

    return () => {
      if (mountRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [
    mountRef.current?.clientWidth,
    mountRef.current?.clientHeight,
    audioRef,
    analyser,
  ]);

  return <div className={styles.vizContainer} ref={mountRef}></div>;
};

export default Visual;
