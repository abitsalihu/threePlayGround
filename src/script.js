import * as THREE from "three";
import * as lil from "lil-gui";
import * as gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// //? GUI

const gui = new lil.GUI();

// //? SCENE

const scene = new THREE.Scene();
const canvas = document.querySelector(".web-gl");

// //? sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// //? Texture Loader

const textureLoader = new THREE.TextureLoader();

// //? wrap textures function

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

// //! wall textures

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

//! floor tiles

const floorColorTexture = textureLoader.load(
  "/textures/concrete/plasterColor.jpg"
);

const floorNormalTexture = textureLoader.load(
  "/textures/concrete/plasterNormal.jpg"
);
const floorRoughnessTexture = textureLoader.load(
  "/textures/concrete/plasterRoughness.jpg"
);

// //! rug

const rugColorTexture = textureLoader.load("/textures/rug/rugColor.jpg");
const rugNormalTexture = textureLoader.load("/textures/rug/rugNormal.jpg");
const rugRoughnessTexture = textureLoader.load(
  "/textures/rug/rugRoughness.jpg"
);
const rugDisplacementTexture = textureLoader.load(
  "textures/rug/rugDisplacement.jpg"
);

//! wall holders

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

//! metal

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

//! metal

const couchColorTexture = textureLoader.load("/textures/couch/couchColor.jpg");
const couchNormalTexture = textureLoader.load(
  "/textures/couch/couchNormal.jpg"
);
const couchRoughnessTexture = textureLoader.load(
  "/textures/couch/couchRoughness.jpg"
);
// const couchOpacityTexture = textureLoader.load(
//   "/textures/couch/couchOpacity.jpg"
// );

//! wood

const woodColorTexture = textureLoader.load("/textures/box/woodColor.jpg");
const woodNormalTexture = textureLoader.load("/textures/box/woodNormal.jpg");
const woodRoughnessTexture = textureLoader.load(
  "/textures/box/woodRoughness.jpg"
);

//! crate

const crateColorTexture = textureLoader.load("/textures/crate/crateColor.jpg");
const crateNormalTexture = textureLoader.load(
  "/textures/crate/crateNormal.jpg"
);
const crateRoughnessTexture = textureLoader.load(
  "/textures/crate/crateRoughness.jpg"
);
const crateHeight = textureLoader.load("/textures/crate/crateHeight.png");
const crateMetalness = textureLoader.load("/textures/crate/crateMetallic.jpg");
const crateAo = textureLoader.load("textures/crate/crateAo.jpg");

//! window

const windowColorTexture = textureLoader.load(
  "/textures/window/windowColor.jpg"
);
const windowNormalTexture = textureLoader.load(
  "/textures/window/windowNormal.jpg"
);
const windowRoughnessTexture = textureLoader.load(
  "/textures/window/windowRoughness.jpg"
);
const windowHeight = textureLoader.load("/textures/window/windowHeight.png");
const windowMetalness = textureLoader.load(
  "/textures/window/windowMetalness.jpg"
);
const windowAo = textureLoader.load("textures/window/windowAo.jpg");
const windowOpacity = textureLoader.load("textures/window/windowOpacity.jpg");

//! xbox

const xboxColorTexture = textureLoader.load("/textures/xbox/xboxColor.jpg");
const xboxNormalTexture = textureLoader.load("/textures/xbox/xboxNormal.jpg");
const xboxRoughnessTexture = textureLoader.load(
  "/textures/xbox/xboxRoughness.jpg"
);
const xboxHeight = textureLoader.load("/textures/xbox/xboxHeight.png");
const xboxMetalness = textureLoader.load("/textures/xbox/xboxMetalness.jpg");
const xboxAo = textureLoader.load("textures/xbox/xboxAo.jpg");

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
woodNormalTexture.repeat.set(0.4, 0.4);
woodRoughnessTexture.repeat.set(0.4, 0.4);

crateColorTexture.repeat.set(1, 1);
crateNormalTexture.repeat.set(0.4, 0.4);
crateRoughnessTexture.repeat.set(0.4, 0.4);

windowColorTexture.repeat.set(0.4, 0.4);
windowNormalTexture.repeat.set(0.65, 0.65);
windowRoughnessTexture.repeat.set(0.65, 0.65);

xboxColorTexture.repeat.set(0.1, 0.1);
xboxNormalTexture.repeat.set(0.65, 0.65);
xboxRoughnessTexture.repeat.set(0.65, 0.65);

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

wrapTextures(
  xboxColorTexture,
  // wallAmbientTexture,
  xboxNormalTexture,
  xboxRoughnessTexture
);

wrapTextures(woodColorTexture, woodNormalTexture, woodRoughnessTexture);

wrapTextures(
  crateColorTexture,
  crateAo,
  crateNormalTexture,
  crateRoughnessTexture
);

wrapTextures(
  windowColorTexture,
  windowAo,
  windowNormalTexture,
  windowRoughnessTexture
);
// //? floor textures

// //? OBJECTS

// //? plane

const home = new THREE.Group();

//? main homeFloor
const sceneFloor = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 0.05, 10, 10),
  new THREE.MeshStandardMaterial({ color: "#576CBC", wireframe: false })
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

const rightWallSides = new THREE.BoxGeometry(0.62, 2, 0.15);
const rightWallMiddle = new THREE.BoxGeometry(0.93, 0.6, 0.15);

const leftWall = new THREE.Mesh(wallsGeometry, wallsMaterialLeft);
const rightWall = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallRight = new THREE.Mesh(rightWallSides, wallsMaterial);
const rightWallMiddleTop = new THREE.Mesh(rightWallMiddle, wallsMaterial);
const rightWallMiddleBottom = new THREE.Mesh(rightWallMiddle, wallsMaterial);

rightWallRight.receiveShadow = true;
leftWall.receiveShadow = true;

// //? walls holder

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

wallsHolder.castShadow = true;
wallsHolder.receiveShadow = true;

wallSmallHolder.castShadow = true;
wallsHolder.receiveShadow = true;

wallSmallHolderSecond.castShadow = true;
wallSmallHolderSecond.receiveShadow = true;

wallSmallHolderThird.castShadow = true;
wallSmallHolderThird.receiveShadow = true;

// //? homeFloor

const homeFloor = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 0.1, 10, 10),

  new THREE.MeshStandardMaterial({
    // map: floorColorTexture,
    // roughnessMap: floorRoughnessTexture,
    // normalMap: floorNormalTexture,
    color: "#4E6E81",
  })
);

homeFloor.castShadow = true;
homeFloor.receiveShadow = true;

leftWall.receiveShadow = true;
rightWall.receiveShadow = true;

rightWallRight.castShadow = true;
rightWallMiddleBottom.receiveShadow = true;
rightWallMiddleBottom.castShadow = true;

home.rotation.y = -0.3;

//? walls rotation
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = Math.PI / -2.96;
rightWall.position.z = Math.PI / -2.92;
rightWall.position.x = -0.825;

rightWallRight.position.z = Math.PI / -2.92;
rightWallRight.position.x = 0.72;

rightWallMiddleTop.position.z = Math.PI / -2.92;
rightWallMiddleTop.position.x = -0.055;
rightWallMiddleTop.position.y = 0.7;

rightWallMiddleBottom.position.z = Math.PI / -2.92;
rightWallMiddleBottom.position.x = -0.055;
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
homeFloor.position.x = 0.012;

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
circleRug.position.set(-0.2, -0.903, 0);
circleRug.castShadow = true;
circleRug.receiveShadow = true;

// //? drawer
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
  // color: "#f5f5f5",
});
const drawerLegGeometry = new THREE.BoxGeometry(0.065, 0.07, 0.065);

const drawer = new THREE.Mesh(
  new THREE.BoxGeometry(0.325, 0.36, 1.5),
  wallHolderMaterial
  // new THREE.MeshStandardMaterial({ color: "grey" })
);

const drawerLegF = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegS = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegTh = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegFo = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);

const drawerLegSi = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);
const drawerLegSe = new THREE.Mesh(drawerLegGeometry, draweLegMaterial);

const drawerBox = new THREE.Mesh(
  new THREE.PlaneGeometry(0.36, 0.13, 20, 20),
  drawerBoxMaterial
);

const drawerBoxBottom = new THREE.Mesh(
  new THREE.PlaneGeometry(0.36, 0.13, 20, 20),
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

//? drawer shadows

drawer.castShadow = true;
drawer.receiveShadow = true;

// drawerBox.castShadow = true;
// drawerBox.receiveShadow = true;

drawer.position.set(-0.83, -0.66, 0.19);
drawerLegF.position.set(-0.94, -0.866, 0.88);
drawerLegS.position.set(-0.94, -0.866, 0.55);
drawerLegTh.position.set(-0.72, -0.866, 0.88);
drawerLegFo.position.set(-0.72, -0.866, 0.55);
drawerLegSi.position.set(-0.72, -0.866, -0.45);
drawerLegSe.position.set(-0.94, -0.866, -0.45);

drawerBox.rotation.y = Math.PI / 2;
drawerBox.position.set(-0.667, -0.575, 0.725);

drawerBoxBottom.rotation.y = Math.PI / 2;
drawerBoxBottom.position.set(-0.667, -0.73, 0.725);

drawerBoxHandle.position.set(-0.659, -0.575, 0.745);
drawerBoxHandleBottom.position.set(-0.659, -0.73, 0.745);

drawerGroup.position.set(0, 0, 0.03);

drawerGroup.add(
  drawer,
  drawerLegF,
  drawerLegS,
  drawerLegTh,
  drawerLegFo,
  drawerLegSi,
  drawerLegSe,
  drawerBox,
  drawerBoxBottom,
  drawerBoxHandle,
  drawerBoxHandleBottom,
  wallSmallHolderThird
);

// //? COUCH

const couchGroup = new THREE.Group();
const couchMaterial = new THREE.MeshStandardMaterial({
  map: couchColorTexture,
  roughnessMap: couchRoughnessTexture,
  normalMap: couchNormalTexture,
  // opacity: couchOpacityTexture,
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

//? couch shadows

couchBase.castShadow = true;
couchBehind.castShadow = true;
couchSideL.castShadow = true;
couchSideR.castShadow = true;

couchBase.receiveShadow = true;
couchBehind.receiveShadow = true;
couchSideL.receiveShadow = true;
couchSideR.receiveShadow = true;

couchBase.position.set(0.1, -0.7, 0);
couchBehind.position.set(0.375, -0.67, 0.0125);

couchSideL.position.set(0.0875, -0.73, 0.5);
couchSideR.position.set(0.0875, -0.73, -0.5);
couchGroup.scale.set(0.95, 0.95, 0.95);
couchGroup.position.set(0, -0.05, 0);

couchGroup.add(couchBase, couchSideL, couchSideR, couchBehind);

const tv = new THREE.Mesh(
  new THREE.PlaneGeometry(0.9, 0.5),
  new THREE.MeshStandardMaterial({ color: "#000000" })
);

const tvScreen = new THREE.Mesh(
  new THREE.PlaneGeometry(0.8, 0.4),
  new THREE.MeshStandardMaterial({ color: "#f5f5f5" })
);

tv.castShadow = true;
tv.receiveShadow = true;

tv.position.set(-0.98, 0.15, 0);
tv.rotation.y = Math.PI / 2;

tvScreen.rotation.y = Math.PI / 2;
tvScreen.position.set(-0.97, 0.15, 0);

// //? crate

const crate = new THREE.Mesh(
  new THREE.BoxGeometry(0.5, 0.35, 0.25),
  new THREE.MeshStandardMaterial({
    map: crateColorTexture,
    aoMap: crateAo,
    normalMap: crateNormalTexture,
    roughness: crateRoughnessTexture,

    metalnessMap: crateMetalness,
  })
);

crate.position.set(0.7, -0.73, -0.875);

//? in room lIGHTS

const standingLightGroup = new THREE.Group();

const standingLight = new THREE.Mesh(
  new THREE.BoxGeometry(0.32, 0.32, 0.32),
  draweLegMaterial
);

standingLight.castShadow = true;
// standingLight.receiveShadow = true;

const lightPole = new THREE.Mesh(
  new THREE.BoxGeometry(0.04, 0.8, 0.04),
  new THREE.MeshBasicMaterial({ color: "#f5f5f5" })
);

standingLight.position.set(-0.82, -0.72, -0.75);

lightPole.position.set(-0.82, -0.15, -0.75);

standingLightGroup.add(standingLight, lightPole);

const counterLight = new THREE.Group();

const counterLightBox = new THREE.Mesh(
  new THREE.BoxGeometry(0.15, 0.15, 0.15),
  // new THREE.MeshStandardMaterial({ color: "red" })
  draweLegMaterial
);

counterLightBox.castShadow = true;
counterLightBox.receiveShadow = true;
const counterLightBoxPole = new THREE.Mesh(
  new THREE.BoxGeometry(0.025, 0.1, 0.025),
  new THREE.MeshStandardMaterial({ color: "#000000" })
);

counterLightBoxPole.castShadow = true;
const counterLightBoxCone = new THREE.Mesh(
  new THREE.ConeGeometry(0.09, 0.09, 32),
  new THREE.MeshBasicMaterial({ color: "#f5f5f5" })
);

counterLightBoxCone.position.set(0, 0.21, 0);
counterLightBoxPole.position.set(0, 0.11, 0);

counterLight.position.set(-0.825, -0.4, 0.775);
counterLight.add(counterLightBox, counterLightBoxPole, counterLightBoxCone);

// //? window

const homeWindow = new THREE.Mesh(
  new THREE.PlaneGeometry(0.95, 0.8),
  new THREE.MeshStandardMaterial({
    map: windowColorTexture,
    normalMap: windowNormalTexture,
    aoMap: windowAo,
    metalnessMap: windowMetalness,
    transparent: true,
    roughnessMap: windowRoughnessTexture,
    alphaMap: windowOpacity,
  })
);

homeWindow.receiveShadow = true;

homeWindow.position.set(-0.065, -0.002, -1.08);

//? desk appliances

const xboxConsole = new THREE.Group();
const xbox = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 0.24, 0.17),
  new THREE.MeshStandardMaterial({
    map: xboxColorTexture,
    normalMap: xboxNormalTexture,
    aoMap: xboxAo,
    metalnessMap: xboxMetalness,
    roughnessMap: xboxRoughnessTexture,
  })
);

xbox.castShadow = true;

const xboxLogo = new THREE.Mesh(
  new THREE.CapsuleGeometry(0.007, 0, 40, 80),
  new THREE.MeshStandardMaterial({ color: "#000000" })
);

const xboxCD = new THREE.Mesh(
  new THREE.BoxGeometry(0.01, 0.1, 0.01),
  new THREE.MeshStandardMaterial({ color: "#000000" })
);

xbox.position.set(-0.8, -0.359, -0.35);
xbox.rotation.y = -0.3;
xboxLogo.rotateOnAxis.y = -0.03;
xboxLogo.position.set(-0.745, -0.27, -0.28);
xboxCD.rotateOnAxis.y = -0.03;
xboxCD.position.set(-0.745, -0.4, -0.28);

xboxConsole.add(xbox, xboxLogo, xboxCD);
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
  wallSmallHolderSecond,
  tv,
  standingLightGroup,
  homeWindow,
  xboxConsole,
  counterLight,
  crate
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

const boxPointLight = new THREE.PointLight("#F5F5F5", 2, 3);
const pointlightHelper = new THREE.PointLightHelper(boxPointLight);

const standingPointLight = new THREE.PointLight("#F5F5F5", 2, 4);
const standingpointlightHelper = new THREE.PointLightHelper(standingPointLight);
const standingPointCamera = new THREE.Camera();
boxPointLight.scale.set(0.085, 0.085, 0.085);
boxPointLight.position.set(-0.55, -0.21, 0.985);

standingPointLight.scale.set(0.02, 0.4, 0.02);
standingPointLight.position.set(-0.95, -0.1, -0.48);

standingPointLight.shadow.mapSize.width = 256 * 2;
standingPointLight.shadow.mapSize.height = 256 * 2;

standingPointLight.castShadow = true;

const scenePointLight = new THREE.PointLight("#F5F5F5", 5.5, 4);
const scenePointLightHelper = new THREE.PointLightHelper(scenePointLight);
scenePointLight.position.set(0, 0.821, 0);
gui.add(camera.position, "x").min(-4).max(5).step(0.001);
gui.add(camera.position, "y").min(-4).max(5).step(0.001);
gui.add(camera.position, "z").min(-4).max(5).step(0.001);
home.add(standingPointLight, scenePointLight, boxPointLight);
//? ambientlight

//? monlight

//? orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//? renderer

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#A5D7E8");
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
