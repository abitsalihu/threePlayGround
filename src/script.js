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

//? Texture Loader

const textureLoader = new THREE.TextureLoader();

//? wrap textures function

const wrapTextures = (fTexture, sTexture, thTexutre, foTexture) => {
  fTexture.wrapS = THREE.RepeatWrapping;
  sTexture.wrapS = THREE.RepeatWrapping;
  thTexutre.wrapS = THREE.RepeatWrapping;
  // foTexture.wrapS = THREE.RepeatWrapping;

  fTexture.wrapT = THREE.RepeatWrapping;
  sTexture.wrapT = THREE.RepeatWrapping;
  thTexutre.wrapT = THREE.RepeatWrapping;
  // foTexture.wrapT = THREE.RepeatWrapping;
};

//? wall textures

const wallColorTexture = textureLoader.load(
  "/textures/concrete/plasterColor.jpg"
);
const wallNormalTexture = textureLoader.load(
  "/textures/concrete/plasterNormal.jpg"
);
const wallRoughnessTexture = textureLoader.load(
  "/textures/concrete/plasterRoughness.jpg"
);

const wallColorTextureLeft = textureLoader.load("/textures/concrete/Color.jpg");
const wallNormalTextureLeft = textureLoader.load(
  "/textures/concrete/Normal.jpg"
);
const wallRoughnessTextureLeft = textureLoader.load(
  "/textures/concrete/Roughness.jpg"
);

const floorColorTexture = textureLoader.load(
  "/textures/concrete/plasterColor.jpg"
);
// const floorAmbientTexture = textureLoader.load(
//   "/textures/concrete/concreteAmbient.jpg"
// );
const floorNormalTexture = textureLoader.load(
  "/textures/concrete/plasterNormal.jpg"
);
const floorRoughnessTexture = textureLoader.load(
  "/textures/concrete/plasterRoughness.jpg"
);
// const floorAmbientTexture = textureLoader.load(
//   "textures/floor/floorAmbient.jpg"
// );

const rugColorTexture = textureLoader.load("/textures/rug/rugColor.jpg");
const rugNormalTexture = textureLoader.load("/textures/rug/rugNormal.jpg");
const rugRoughnessTexture = textureLoader.load(
  "/textures/rug/rugRoughness.jpg"
);
const rugDisplacementTexture = textureLoader.load(
  "textures/rug/rugDisplacement.jpg"
);

const holderColorTexture = textureLoader.load(
  "/textures/holder/holderColor.jpg"
);
const holderNormalTexture = textureLoader.load(
  "/textures/holder/holderNormal.jpg"
);
const holderRoughnessTexture = textureLoader.load(
  "/textures/holder/holderRoughness.jpg"
);

wallColorTexture.repeat.set(2.5, 2.5);
wallNormalTexture.repeat.set(2.5, 2.5);
wallRoughnessTexture.repeat.set(2.5, 2.5);

floorColorTexture.repeat.set(2.5, 2.5);
floorNormalTexture.repeat.set(1.05, 1.05);
floorRoughnessTexture.repeat.set(1.05, 1.05);

rugColorTexture.repeat.set(2.5, 2.5);
rugNormalTexture.repeat.set(1.05, 1.05);
rugRoughnessTexture.repeat.set(1.05, 1.05);

holderColorTexture.repeat.set(0.1, 0.1);
holderNormalTexture.repeat.set(0.5, 0.5);
holderRoughnessTexture.repeat.set(0.5, 0.5);

wrapTextures(
  wallColorTexture,
  // wallAmbientTexture,
  wallNormalTexture,
  wallRoughnessTexture
);

wrapTextures(rugColorTexture, rugNormalTexture, rugRoughnessTexture);

wrapTextures(
  floorColorTexture,
  // floorAmbientTexture,
  floorNormalTexture,
  floorRoughnessTexture
);

wrapTextures(
  holderColorTexture,
  // wallAmbientTexture,
  holderNormalTexture,
  holderRoughnessTexture
);
//? floor textures

//? OBJECTS

//? plane

const home = new THREE.Group();

//? main homeFloor
const sceneFloor = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 0.05, 10, 10),
  new THREE.MeshStandardMaterial({ color: "#3F72AF" })
);

sceneFloor.receiveShadow = true;
// sceneFloor.castShadow = true;

sceneFloor.rotation.x = Math.PI / 2;
sceneFloor.position.y = -0.925 - 0.075;

//? walls
const wallsGeometry = new THREE.BoxGeometry(2, 2, 0.15);
const wallsMaterial = new THREE.MeshStandardMaterial({
  map: wallColorTexture,
  roughnessMap: wallRoughnessTexture,
  normalMap: wallNormalTexture,
  color: "#0B2447",
});

const wallsMaterialLeft = new THREE.MeshStandardMaterial({
  map: wallColorTextureLeft,
  roughnessMap: wallRoughnessTextureLeft,
  normalMap: wallNormalTextureLeft,
  color: "#0B2447",
});

const rightWallSides = new THREE.BoxGeometry(0.6, 2, 0.15);
const rightWallMiddle = new THREE.BoxGeometry(1.1, 0.6, 0.15);

const leftWall = new THREE.Mesh(wallsGeometry, wallsMaterialLeft);
const rightWall = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallRight = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallMiddleTop = new THREE.Mesh(rightWallMiddle, wallsMaterial);
const rightWallMiddleBottom = new THREE.Mesh(rightWallMiddle, wallsMaterial);

//? walls holder

const wallsHolder = new THREE.Mesh(
  new THREE.BoxGeometry(0.925, 0.025, 0.1),
  new THREE.MeshStandardMaterial({
    map: holderColorTexture,
    roughnessMap: holderRoughnessTexture,
    normalMap: holderNormalTexture,
  })
);

wallsHolder.castShadow = true;
//? homeFloor

const homeFloor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 0.1, 10, 10),
  //   new THREE.PlaneGeometry(1.75, 1.75, 50, 50),

  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    roughnessMap: floorRoughnessTexture,
    normalMap: floorNormalTexture,
    // aoMap: floorAmbientTexture,
    color: "#4E6E81",
  })
);

leftWall.castShadow = true;
rightWall.castShadow = true;

rightWallRight.castShadow = true;
rightWallMiddleBottom.receiveShadow = true;
rightWallMiddleBottom.castShadow = true;

home.rotation.y = -0.3;

//? walls rotation
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = Math.PI / -3;
rightWall.position.z = Math.PI / -2.92;
rightWall.position.x = -0.825;

rightWallRight.position.z = Math.PI / -2.92;
rightWallRight.position.x = 0.7;

rightWallMiddleTop.position.z = Math.PI / -2.92;
rightWallMiddleTop.position.x = -0.14;
rightWallMiddleTop.position.y = 0.7;

rightWallMiddleBottom.position.z = Math.PI / -2.92;
rightWallMiddleBottom.position.x = -0.14;
rightWallMiddleBottom.position.y = -0.7;

wallsHolder.position.z = Math.PI / -3.3;

wallsHolder.position.x = -0.065;
wallsHolder.position.y = -0.414;

//? floors rotation
homeFloor.rotation.x = Math.PI / 2;
homeFloor.position.y = -0.95;

//? carpet

const circleRug = new THREE.Mesh(
  new THREE.CircleGeometry(0.6, 90, 50, 10),

  new THREE.MeshStandardMaterial({
    map: rugColorTexture,
    normalMap: rugNormalTexture,
    roughnessMap: rugRoughnessTexture,
    // metalnessMap: rugMetalnessTexture,
    displacementMap: rugDisplacementTexture,
    displacementScale: 0.01,
    // color: "#E21818",
  })
);

circleRug.rotation.x = Math.PI / -2;
circleRug.position.set(0.2, -0.903, 0.2);
circleRug.castShadow = true;
circleRug.receiveShadow = true;

//? add to scene
home.add(
  leftWall,
  rightWall,
  rightWallRight,
  homeFloor,
  circleRug,
  sceneFloor,
  rightWallMiddleTop,
  rightWallMiddleBottom,
  wallsHolder
);

scene.add(home);

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

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);

pointLight.position.set(1.25, 2, 1.25);
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 3.5;
pointLight.target = homeFloor;

home.add(pointLight);
pointLight.castShadow = true;

const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera);
// scene.add(pointLightHelper);

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
