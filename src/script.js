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

const holderDisplacementTexture = textureLoader.load(
  "/textures/holder/holderDisplacement.jpg"
);

const metalColorTexture = textureLoader.load("/textures/metal/metalColor.jpg");
const metalNormalTexture = textureLoader.load(
  "/textures/metal/metalNormal.jpg"
);
const metalRoughnessTexture = textureLoader.load(
  "/textures/metal/metalRoughness.jpg"
);
const metalMetalnessTexture = textureLoader.load(
  "/textures/metal/metalMetalness.jpg"
);

const couchColorTexture = textureLoader.load("/textures/couch/couchColor.jpg");
const couchNormalTexture = textureLoader.load(
  "/textures/couch/couchNormal.jpg"
);
const couchRoughnessTexture = textureLoader.load(
  "/textures/couch/couchRoughness.jpg"
);
const couchOpacityTexture = textureLoader.load(
  "/textures/couch/couchOpacity.jpg"
);

const woodColorTexture = textureLoader.load("/textures/box/woodColor.jpg");
const woodNormalTexture = textureLoader.load("/textures/box/woodNormal.jpg");
const woodRoughnessTexture = textureLoader.load(
  "/textures/box/woodRoughness.jpg"
);

wallColorTexture.repeat.set(2.5, 2.5);
wallNormalTexture.repeat.set(2.5, 2.5);
wallRoughnessTexture.repeat.set(2.5, 2.5);

floorColorTexture.repeat.set(2.5, 2.5);
floorNormalTexture.repeat.set(2.5, 2.5);
floorRoughnessTexture.repeat.set(2.5, 2.5);

rugColorTexture.repeat.set(2.5, 2.5);
rugNormalTexture.repeat.set(2.5, 2.5);
rugRoughnessTexture.repeat.set(2.5, 2.5);

holderColorTexture.repeat.set(2, 2);
holderNormalTexture.repeat.set(2, 2);
holderRoughnessTexture.repeat.set(2, 2);

couchColorTexture.repeat.set(0.9, 0.9);
couchNormalTexture.repeat.set(0.9, 0.9);
couchRoughnessTexture.repeat.set(0.9, 0.9);

woodColorTexture.repeat.set(0.4, 0.4);
woodNormalTexture.repeat.set(0.9, 0.9);
woodRoughnessTexture.repeat.set(0.9, 0.9);

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

wrapTextures(
  couchColorTexture,
  // wallAmbientTexture,
  couchNormalTexture,
  couchRoughnessTexture
);

wrapTextures(woodColorTexture, woodNormalTexture, woodRoughnessTexture);
//? floor textures

//? OBJECTS

//? plane

const home = new THREE.Group();

//? main homeFloor
const sceneFloor = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 0.05, 10, 10),
  new THREE.MeshStandardMaterial({ color: "#F9DEBA", wireframe: true })
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
const rightWallMiddle = new THREE.BoxGeometry(0.93, 0.6, 0.15);

const leftWall = new THREE.Mesh(wallsGeometry, wallsMaterialLeft);
const rightWall = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallRight = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallMiddleTop = new THREE.Mesh(rightWallMiddle, wallsMaterial);
const rightWallMiddleBottom = new THREE.Mesh(rightWallMiddle, wallsMaterial);

//? walls holder

const wallHolderMaterial = new THREE.MeshStandardMaterial({
  map: holderColorTexture,
  roughnessMap: holderRoughnessTexture,
  normalMap: holderNormalTexture,
});

const wallsHolder = new THREE.Mesh(
  new THREE.BoxGeometry(0.925, 0.025, 0.1),
  wallHolderMaterial
);

const wallSmallHolder = new THREE.Mesh(
  new THREE.BoxGeometry(0.275, 0.025, 0.1),
  wallHolderMaterial
);

const wallSmallHolderSecond = new THREE.Mesh(
  new THREE.BoxGeometry(0.275, 0.025, 0.1),
  wallHolderMaterial
);

const wallSmallHolderThird = new THREE.Mesh(
  new THREE.BoxGeometry(0.275, 0.025, 0.1),
  wallHolderMaterial
);

//? homeFloor

const homeFloor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 0.1, 10, 10),

  new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    roughnessMap: floorRoughnessTexture,
    normalMap: floorNormalTexture,
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
rightWallMiddleTop.position.x = -0.061;
rightWallMiddleTop.position.y = 0.7;

rightWallMiddleBottom.position.z = Math.PI / -2.92;
rightWallMiddleBottom.position.x = -0.061;
rightWallMiddleBottom.position.y = -0.7;

wallsHolder.position.z = Math.PI / -3.3;

wallsHolder.position.x = -0.065;
wallsHolder.position.y = -0.414;

wallSmallHolder.position.z = Math.PI / -3.3;
wallSmallHolder.position.x = 0.7;
wallSmallHolder.position.y = 0.2;

wallSmallHolderSecond.position.z = Math.PI / -3.3;
wallSmallHolderSecond.position.x = 0.7;
wallSmallHolderSecond.position.y = 0.0;

wallSmallHolderThird.position.z = Math.PI / -3.2;
wallSmallHolderThird.position.x = 0.7;
wallSmallHolderThird.position.y = -0.2;
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
    displacementMap: rugDisplacementTexture,
    displacementScale: 0.01,
  })
);

circleRug.rotation.x = Math.PI / -2;
circleRug.position.set(0.2, -0.903, 0.2);
circleRug.castShadow = true;
circleRug.receiveShadow = true;

//? drawer

const drawerGroup = new THREE.Group();

const draweLegMaterial = new THREE.MeshStandardMaterial({
  map: metalColorTexture,
  roughnessMap: metalRoughnessTexture,
  normalMap: metalNormalTexture,
  metalnessMap: metalMetalnessTexture,
});
const drawerBoxMaterial = new THREE.MeshStandardMaterial({
  map: woodColorTexture,
  roughnessMap: woodRoughnessTexture,
  normalMap: woodNormalTexture,
  color: "#F9DEBA",
});
const drawerLegGeometry = new THREE.BoxGeometry(0.065, 0.07, 0.065);

const drawer = new THREE.Mesh(
  new THREE.BoxGeometry(0.325, 0.36, 0.4),
  wallHolderMaterial
);

const drawerLegF = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegS = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegTh = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegFo = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);

const drawerBox = new THREE.Mesh(
  new THREE.PlaneGeometry(0.32, 0.13, 20, 20),
  drawerBoxMaterial
);

const drawerBoxBottom = new THREE.Mesh(
  new THREE.PlaneGeometry(0.32, 0.13, 20, 20),
  drawerBoxMaterial
);

const drawerBoxHandle = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.015, 0, 40, 80),
  wallHolderMaterial
);

const drawerBoxHandleBottom = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.015, 0, 40, 80),
  wallHolderMaterial
);

drawer.position.set(-0.83, -0.66, 0.75);
drawerLegF.position.set(-0.94, -0.866, 0.88);
drawerLegS.position.set(-0.94, -0.866, 0.625);
drawerLegTh.position.set(-0.72, -0.866, 0.88);
drawerLegFo.position.set(-0.72, -0.866, 0.625);

drawerBox.rotation.y = Math.PI / 2;
drawerBox.position.set(-0.667, -0.575, 0.745);

drawerBoxBottom.rotation.y = Math.PI / 2;
drawerBoxBottom.position.set(-0.667, -0.73, 0.745);

drawerBoxHandle.position.set(-0.659, -0.575, 0.745);
drawerBoxHandleBottom.position.set(-0.659, -0.73, 0.745);

drawerGroup.position.set(0, 0, 0.03);

drawerGroup.add(
  drawer,
  drawerLegF,
  drawerLegS,
  drawerLegTh,
  drawerLegFo,
  drawerBox,
  drawerBoxBottom,
  drawerBoxHandle,
  drawerBoxHandleBottom,
  wallSmallHolderThird
);

//? COUCH

const couchGroup = new THREE.Group();
const couchMaterial = new THREE.MeshStandardMaterial({
  map: couchColorTexture,
  roughnessMap: couchRoughnessTexture,
  normalMap: couchNormalTexture,
  opacity: couchOpacityTexture,
});
const couchBase = new THREE.Mesh(
  new THREE.BoxGeometry(0.425, 0.1, 0.9),
  couchMaterial
);

const couchBehind = new THREE.Mesh(
  new THREE.BoxGeometry(0.125, 0.45, 1.1),
  couchMaterial
);

const couchSideL = new THREE.Mesh(
  new THREE.BoxGeometry(0.45, 0.33, 0.125),
  couchMaterial
);
const couchSideR = new THREE.Mesh(
  new THREE.BoxGeometry(0.45, 0.33, 0.125),
  couchMaterial
);

couchBase.position.set(0.1, -0.7, 0);
couchBehind.position.set(0.375, -0.67, 0.0125);

couchSideL.position.set(0.0875, -0.73, 0.5);
couchSideR.position.set(0.0875, -0.73, -0.5);
couchGroup.scale.set(0.95, 0.95, 0.95);
couchGroup.position.set(0, -0.05, 0);

couchGroup.add(couchBase, couchSideL, couchSideR, couchBehind);
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
  wallsHolder,
  drawerGroup,
  couchGroup,
  wallSmallHolder,
  wallSmallHolderSecond
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

//? ambientlight

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.6);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

//? monlight

const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

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
