import * as THREE from '../three.js-master/build/three.module.js'
import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js'


`Para carregar qualquer modelo 3D utilizando o Three é necessário três elementos principais, scene, camera e o render`
//set a new scene
const scene = new THREE.Scene();

//GLTFLoader carrega o modelo 3D
const loader = new GLTFLoader();
loader.load('../static/3dModels/f16/F-16D.gltf', function (gltf) {
    console.log(gltf)
    const model3d = gltf.scene
    model3d.scale.set(0.08, 0.08, 0.08)
    scene.add(model3d);
}, function (xhr) {
    console.error((xhr.loaded / xhr.total * 100).toFixed(0) + '% loaded');
}, function (err) {
    console.log('An error')
});

//set a light over 3dmodel object
const light = new THREE.DirectionalLight(0xFFFFFF,1);
light.position.set(2, 2, 5)
scene.add(light)


//Bolier Plate Code -> tamanho para renderizar o objeto
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

//set canvas element on html file
const canvas = document.querySelector('.showModel')

//set a render
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
});
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enable = true


//set a camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 2)
controls.update()
scene.add(camera)


function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}

animate()