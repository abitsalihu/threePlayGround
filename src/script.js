import * as THREE from "three";
import * as lil from "lil-gui";
import * as gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//? GUI

const gui = new lil.GUI();

//? SCENE

const scene = new THREE.Scene();
const canvas = document.querySelector(".web-gl");

//? sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//? OBJECTS

const axesHelper = new THREE.AxesHelper(1);

//? plane

const home = new THREE.Group();

//? main floor
const floor2 = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 0.05, 10, 10),
  new THREE.MeshStandardMaterial({ color: "blue", wireframe: false })
);

floor2.rotation.x = Math.PI / 2;
floor2.position.y = -0.925 - 0.075;
//? walls
const wallsGeometry = new THREE.BoxGeometry(1.75, 1.75, 0.15, 10, 10);
const wallsMaterial = new THREE.MeshStandardMaterial({
  wireframe: false,
  color: "brown",
});

const leftWall = new THREE.Mesh(wallsGeometry, wallsMaterial);
const rightWall = new THREE.Mesh(wallsGeometry, wallsMaterial);

//? floor

const floor = new THREE.Mesh(
  new THREE.BoxGeometry(1.75, 1.75, 0.1, 10, 10),
  wallsMaterial
);

home.add(leftWall, rightWall, floor, floor2);
home.rotation.y = -0.3;
home.castShadow = true;
home.receiveShadow = true;

//? walls rotation
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = Math.PI / -4 - 0.015;
rightWall.position.z = Math.PI / -4 - 0.015;

//? floors rotation
floor.rotation.x = Math.PI / 2;
floor.position.y = -0.925;

scene.add(home);

gui.add(leftWall.material, "wireframe");

gui.add(floor.rotation, "x").min(-5).max(5).step(0.001);
gui.add(floor.rotation, "y").min(-5).max(5).step(0.001);
gui.add(floor.rotation, "z").min(-5).max(5).step(0.001);

//? CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.set(1, 1, 3);
scene.add(camera);

//? LIGHTS
//? helper

const pointLight = new THREE.PointLight("#f5f5f5", 2);
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
pointLight.position.set(10, 10, 10);

pointLight.castShadow = true;
scene.add(pointLight, pointLightHelper);

// const directionalLight = NEW;

//? orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//? renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#f5f5f5");
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

//? window resize

window.addEventListener("resize", () => {
  //! update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //! update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //! update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//? tick function

const clock = new THREE.Clock();

const tick = () => {
  //! get elapsed time
  const elapsedTime = clock.getElapsedTime();

  //! update controls
  controls.update();

  //! start renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
