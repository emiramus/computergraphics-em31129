import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(30, 30, 30);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const groundGeo = new THREE.PlaneGeometry(80, 50, 34);
const groundMat = new THREE.MeshBasicMaterial({ color: 0x2ecc71, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

const mainRoadGeo = new THREE.PlaneGeometry(80, 7);
const mainRoadMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const mainRoad = new THREE.Mesh(mainRoadGeo, mainRoadMat);
mainRoad.rotation.x = -Math.PI / 2;
mainRoad.position.set(0, 0.01, -6);
scene.add(mainRoad);

const sideRoadGeo = new THREE.PlaneGeometry(7, 32); 
const sideRoadMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const sideRoad = new THREE.Mesh(sideRoadGeo, sideRoadMat);
sideRoad.rotation.x = -Math.PI / 2;
sideRoad.position.set(0, 0.01, 9); 
scene.add(sideRoad);

const parkingWidth = 40;
const parkingHeight = 32;
const borderMargin = 0.5;

const parkingGeo = new THREE.PlaneGeometry(parkingWidth, parkingHeight);
const parkingMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const parking = new THREE.Mesh(parkingGeo, parkingMat);
parking.rotation.x = -Math.PI / 2;
parking.position.set(-20, 0.07, 9);
scene.add(parking);

const frameGeo = new THREE.PlaneGeometry(parkingWidth - borderMargin * 40, parkingHeight - borderMargin * 10); 
const edges = new THREE.EdgesGeometry(frameGeo)
const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
const edgeFrame = new THREE.LineSegments(edges, edgeMat);
edgeFrame.rotation.x = -Math.PI / 2;
edgeFrame.position.set(-25, 0.1, 10); 
scene.add(edgeFrame);

function createCar(color, x, z, customDimensions = null) {
    const carGeo = customDimensions 
        ? new THREE.BoxGeometry(customDimensions.width, customDimensions.height, customDimensions.depth)
        : new THREE.BoxGeometry(3, 1, 6);
    const carMat = new THREE.MeshBasicMaterial({ color: color });
    const car = new THREE.Mesh(carGeo, carMat);
    car.position.set(x, carGeo.parameters.height / 2, z); 
    car.rotation.y = Math.PI / 2;
    scene.add(car);
    return car;
}

createCar(0xffff00, -30, 6);   
createCar(0x00ff00, -30, 18);  
createCar(0x0000ff, -30, 12);  

const movingCar1 = createCar(0xff0000, -5, 0, { width: 6, height: 1, depth: 3 });

let car1Speed = 0.1;

const faculty1Geo = new THREE.BoxGeometry(20, 8, 10);
const faculty1Mat = new THREE.MeshBasicMaterial({ color: 0x3498db });
const faculty1 = new THREE.Mesh(faculty1Geo, faculty1Mat);
faculty1.position.set(0, 2, -17);
scene.add(faculty1);

const faculty2Geo = new THREE.BoxGeometry(10, 6, 12);
const faculty2Mat = new THREE.MeshBasicMaterial({ color: 0x3498db });
const faculty2 = new THREE.Mesh(faculty2Geo, faculty2Mat);
faculty2.position.set(11, 2, 10);
scene.add(faculty2);

function createTree(x, z) {
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.3, 3);
    const trunkMat = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.set(x, 1.5, z);
    scene.add(trunk);

    const crownGeo = new THREE.SphereGeometry(1.5, 16, 16);
    const crownMat = new THREE.MeshBasicMaterial({ color: 0x228B22 });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.set(x, 3.5, z);
    scene.add(crown);
}

createTree(-30, -20);
createTree(-25, -12);
createTree(25, -12);
createTree(30, -20);
createTree(30, 2);
createTree(35, 11);
createTree(22, 19);

function createLamp(x, z) {
    const poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 5);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(x, 2.5, z);
    scene.add(pole);

    const lightGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const lamp = new THREE.Mesh(lightGeo, lightMat);
    lamp.position.set(x, 5, z);
    scene.add(lamp);
}

createLamp(-13, -10);
createLamp(13, -10);
createLamp(4, 2);
createLamp(4, 18);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(20, 30, 10);
scene.add(dirLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update();

    movingCar1.position.z += car1Speed;
    if (movingCar1.position.z > 20) movingCar1.position.z = 20;

    renderer.render(scene, camera);
}
animate();

document.body.appendChild(renderer.domElement);
