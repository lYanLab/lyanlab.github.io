const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

camera.position.z = 35;

// Deep multi-layer starfield
const createStars = (count, size, color, speed) => {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 140;
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity: 0.95,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.speed = speed;
  scene.add(points);
  return points;
};

const stars1 = createStars(15000, 0.06, 0xe0e0ff, 0.00004);
const stars2 = createStars(7000, 0.11, 0xc375ff, 0.00007);
const stars3 = createStars(3500, 0.17, 0x5229a3, 0.00011);

// Soft colored nebula
const nebulaGeo = new THREE.BufferGeometry();
const nebulaCount = 3200;
const nebulaPos = new Float32Array(nebulaCount * 3);
const nebulaColors = new Float32Array(nebulaCount * 3);
for (let i = 0; i < nebulaCount * 3; i += 3) {
  nebulaPos[i] = (Math.random() - 0.5) * 90;
  nebulaPos[i + 1] = (Math.random() - 0.5) * 50 - 10;
  nebulaPos[i + 2] = (Math.random() - 0.5) * 90 - 25;
  const intensity = Math.random();
  nebulaColors[i] = 0.55 + intensity * 0.45;
  nebulaColors[i + 1] = 0.35 + intensity * 0.45;
  nebulaColors[i + 2] = 0.75 + intensity * 0.25;
}
nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));
const nebulaMat = new THREE.PointsMaterial({
  size: 0.65,
  vertexColors: true,
  transparent: true,
  opacity: 0.22,
  blending: THREE.AdditiveBlending,
});
const nebula = new THREE.Points(nebulaGeo, nebulaMat);
scene.add(nebula);

// Multi-layer slow aurora
const auroraLayers = [];
for (let i = 0; i < 5; i++) {
  const geo = new THREE.PlaneGeometry(110, 45);
  const mat = new THREE.MeshBasicMaterial({
    color: i < 2 ? 0xc375ff : i < 4 ? 0x5229a3 : 0x392e9e,
    transparent: true,
    opacity: 0.09 - i * 0.012,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const a = new THREE.Mesh(geo, mat);
  a.position.set(0, 15 - i * 6, -30 + i * 3);
  a.rotation.x = -0.75;
  scene.add(a);
  auroraLayers.push(a);
}

function animate() {
  requestAnimationFrame(animate);

  stars1.rotation.y += stars1.userData.speed;
  stars2.rotation.y += stars2.userData.speed;
  stars3.rotation.y += stars3.userData.speed;
  nebula.rotation.y += 0.000025;

  auroraLayers.forEach((a, i) => {
    a.rotation.z = Math.sin(Date.now() * 0.00025 + i * 1.2) * 0.035;
  });

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
