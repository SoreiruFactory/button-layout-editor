import * as THREE from 'https://unpkg.com/three@0.157/build/three.module.js';
import { STLExporter } from 'https://unpkg.com/three@0.157/examples/jsm/exporters/STLExporter.js';
import { CSG } from 'https://unpkg.com/three-csg-ts@1.0.0/build/three-csg-ts.module.js';

let scene, camera, renderer, plate;

init();
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // 四角いプレート
    const plateGeo = new THREE.BoxGeometry(10, 10, 1); // 幅10, 高さ10, 厚さ1
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    plate = new THREE.Mesh(plateGeo, plateMat);
    
    // 穴（円柱）
    const holeGeo = new THREE.CylinderGeometry(2, 2, 2, 32);
    const hole = new THREE.Mesh(holeGeo);
    hole.position.set(0, 0, 0.5); // 穴をプレートの中央に配置

    // CSG を使って穴を開ける
    const plateCSG = CSG.fromMesh(plate);
    const holeCSG = CSG.fromMesh(hole);
    const resultCSG = plateCSG.subtract(holeCSG);
    
    plate = CSG.toMesh(resultCSG, plate.matrix, plate.material);
    scene.add(plate);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// STLファイルとしてダウンロード
function downloadSTL() {
    const exporter = new STLExporter();
    const stlString = exporter.parse(plate);
    const blob = new Blob([stlString], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'plate_with_hole.stl';
    link.click();
}

// ボタンでダウンロード
const button = document.createElement('button');
button.innerText = "Download STL";
button.style.position = 'absolute';
button.style.top = '10px';
button.style.left = '10px';
button.onclick = downloadSTL;
document.body.appendChild(button);
