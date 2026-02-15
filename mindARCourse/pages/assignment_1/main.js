import { loadGLTF, loadAudio } from "../../libs/loader.js";
import { mockWithImage } from '../../libs/camera-mock.js';
import { CSS3DObject } from '../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    mockWithImage('../../assets/mock-images/anarvistaCard.png');

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets/anarvistaCard.mind'
    });
    const { renderer, cssRenderer, scene, cssScene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const anarvista = await loadGLTF('../../assets/models/anarvista.gltf');
    anarvista.scene.scale.set(3, 3, 3);
    anarvista.scene.position.set(0, 0, 0);
    anarvista.scene.rotation.set(Math.PI / 2, 0, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(anarvista.scene);

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);

    const audioClip = await loadAudio('../../assets/sounds/hazloTuMismo.mp3');
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const audio = new THREE.PositionalAudio(listener);
    anchor.group.add(audio);
    audio.setBuffer(audioClip);
    audio.setRefDistance(100);
    audio.setLoop(true);

    anchor.onTargetFound = () => {
      audio.play();
    }
    anchor.onTargetLost = () => {
      audio.pause();
    }

    document.body.addEventListener('click', (e) => {
      // normalize to -1 to 1
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      const mouse = new THREE.Vector2(mouseX, mouseY);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let o = intersects[0].object;
        while (o.parent && !o.userData.clickable) {
          o = o.parent;
        }
        if (o.userData.clickable) {
          if (o === cssAnchor.scene) {
            sound.play();
          }
        }
      }
    });

    const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      const delta = clock.getDelta();
      anarvista.scene.rotation.set(Math.PI / 2, 0, anarvista.scene.rotation.z - 1.5 * delta);
      renderer.render(scene, camera);
      cssRenderer.render(cssScene, camera);
    });
  }
  start();
});
