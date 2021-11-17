import * as THREE from '../three.js-master/build/three.module.js'
import { GLTFLoader } from '../three.js-master/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from '../three.js-master/examples/jsm/controls/OrbitControls.js'
import * as TESTE from '../js/darkModeController.js'
let controls, renderer, scene, camera, loader

function showModels(modeloSelected) {
    showElements(modeloSelected);

    `Para carregar qualquer modelo 3D utilizando o Three é necessário três elementos principais, scene, camera e o render`
    //set a new scene
    scene = new THREE.Scene()

    //GLTFLoader carrega o modelo 3D
    carregarModelo(modeloSelected)

    

    //tamanho do elemento html usado para renderizar o objeto, neste caso esta usando toda a janela
    let box = document.querySelector('#colCanvas');
    const size = {
        width: box.clientWidth,//window.innerWidth,
        height: box.clientWidth * 1.1 //window.innerHeight
    }


    //informar a classe de referencia ao elemento canvas no html para reiderizar o modelo 3d
    const canvas = document.querySelector('.showModel')

    //instanciar a classe render co alguns atributos (antialias= melhorar a img, 
    //alpha=retira a cor de fundo add o aplha, canvas=informa que sera usado o elemento html 
    //canvas para reiderizar)
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvas
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(size.width, size.height);
    renderer.shadowMap.enable = true

    //definiar a camera
    camera = new THREE.PerspectiveCamera(50, size.width / size.height, 0.1, 1000);
    //difinir o controle da camera orbital
    controls = new OrbitControls(camera, renderer.domElement);
    //posição default da camera (x,y,z)
    camera.position.set(0, 1, 2)
    controls.update()
    //add a camera no cenario
    scene.add(camera)

    //definir a iluminação no objeto 3dmodel e no ambiente
    // ambient
    scene.add(new THREE.AmbientLight(0xffffff, 0.4)); // optional

    // light
    var light = new THREE.PointLight(0xffffff, 1);
    camera.add(light);

    animate()
}

//a função animação permite controlar a camera, ações para o objeto3D etc...
function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
}
//função para carregar os modelos, add a scene e continuar o loading da função showModels
function carregarModelo(modeloSelected) {
    var model3d = new THREE.Object3D()
    loader = new GLTFLoader();

    loader.load(modeloSelected, function (gltf) {
        //criar o objeto3d
        model3d = gltf.scene
        //define o tamanho "scala"
        model3d.scale.set(0.05, 0.05, 0.05)
        //centralizar o objeto na tela
        const box3 = new THREE.Box3().setFromObject(model3d);
        const vector = new THREE.Vector3();
        box3.getCenter(vector);
        model3d.position.set(-vector.x, -vector.y, -vector.z);

        //add o objeto ao cenário
        scene.add(model3d)
    }, function (xhr) {
        $('#progressBar').append(`<div class="progress-bar bg-primary" role="progressbar"
        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: `+ (xhr.loaded / xhr.total * 100).toFixed(2) + `%">
    </div>`)
        //console.error((xhr.loaded / xhr.total * 100).toFixed(0) + '% loaded');
    }, function (err) {
        console.log('An error')
    });

}
//coletar o nome dos diretório + arquivos e disponibilizar no dropdown na tela viewModel
function getModelDir() {
    let folderName = []

    $.getJSON('../static/3dModels', folders => {
        $.each(folders, function (i, direcotry) {
            folderName.push(direcotry);
            $.getJSON('../static/3dModels/' + direcotry, function (folder) {
                $.each(folder, function (x, file) {
                    if (file.split('.').pop() == 'glb' || file.split('.').pop() == 'gltf') {
                        $('#modelsAvalible').append($('<option>', {
                            value: '../static/3dModels/' + folderName[i] + '/' + file,
                            text: file.split('.').shift().toUpperCase()
                        }));
                    }

                });
            });
        });
    });
    
}

function showElements(nomeModelo) {
        
    $('#showCanvas').append('<canvas class="showModel"></canvas>');
    $('#accordion').css('display', 'initial');
    $('#detalhes').append(`<div class="card-body">
    <p><b>Nome modelo:</b>`+nomeModelo+`</p><br>
    <p><b>Data Criação:</b>2020-04-03</p><br>
    <p><b>Criador:</b>Robert</p><br>                                     
    </div>`);
    $('#info').append(`<div class="card-body">
    <p>Licença Free</p>                                  
    </div>`);
}

$(function () {

    getModelDir();

    $('#formSelectModels').click(function () {
        const modelSelect = $('#formSelectModels').find(":selected").val()
        if (modelSelect == '') {
            $('#showCanvas').empty()
            $('#progressBar').empty()
            $('#detalhes').empty()
            $('#info').empty()

            alert('Selecione um Modelo')
        } else {
            try {
                $('#detalhes').empty()
                $('#info').empty()
                $('#showCanvas').empty()
                $('#progressBar').empty()
            }
            finally {
                showModels(modelSelect)
            }
        }
    })
})
