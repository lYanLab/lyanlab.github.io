const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("three-bg"),
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // softer on high-dpi

camera.position.z = 40;

// Helper: create star layer
function createStars(count, size, color, speed) {
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 200;
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({
    size,
    color,
    transparent: true,
    opacity: 0.9,
  });
  const points = new THREE.Points(geo, mat);
  points.userData.speed = speed;
  scene.add(points);
  return points;
}

const starsFar = createStars(12000, 0.04, 0xe0e0ff, 0.00002);
const starsMid = createStars(5000, 0.08, 0xc375ff, 0.00004);
const starsNear = createStars(2000, 0.14, 0x5229a3, 0.00008);

// Soft nebula (reduced count for snappiness)
const nebulaGeo = new THREE.BufferGeometry();
const nebulaCount = 1800;
const nebulaPos = new Float32Array(nebulaCount * 3);
const nebulaColors = new Float32Array(nebulaCount * 3);
for (let i = 0; i < nebulaCount * 3; i += 3) {
  nebulaPos[i] = (Math.random() - 0.5) * 120;
  nebulaPos[i + 1] = (Math.random() - 0.5) * 60 - 10;
  nebulaPos[i + 2] = (Math.random() - 0.5) * 120 - 30;
  const intensity = Math.random() * 0.6 + 0.4;
  nebulaColors[i] = 0.5 + intensity * 0.3;
  nebulaColors[i + 1] = 0.3 + intensity * 0.3;
  nebulaColors[i + 2] = 0.7 + intensity * 0.2;
}
nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPos, 3));
nebulaGeo.setAttribute("color", new THREE.BufferAttribute(nebulaColors, 3));
const nebulaMat = new THREE.PointsMaterial({
  size: 0.8,
  vertexColors: true,
  transparent: true,
  opacity: 0.18,
  blending: THREE.AdditiveBlending,
});
scene.add(new THREE.Points(nebulaGeo, nebulaMat));

// Aurora layers (reduced opacity/count)
const auroraLayers = [];
for (let i = 0; i < 4; i++) {
  const geo = new THREE.PlaneGeometry(140, 60);
  const mat = new THREE.MeshBasicMaterial({
    color: i < 2 ? 0xc375ff : 0x5229a3,
    transparent: true,
    opacity: 0.07 - i * 0.015,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geo, mat);
  plane.position.set(0, 10 - i * 8, -40 + i * 5);
  plane.rotation.x = -0.8;
  scene.add(plane);
  auroraLayers.push(plane);
}

function animate() {
  requestAnimationFrame(animate);
  starsFar.rotation.y += starsFar.userData.speed;
  starsMid.rotation.y += starsMid.userData.speed;
  starsNear.rotation.y += starsNear.userData.speed;

  auroraLayers.forEach((p, i) => {
    p.rotation.z = Math.sin(Date.now() * 0.0002 + i) * 0.03;
  });

  renderer.render(scene, camera);
}
animate();

// Proper resize handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
