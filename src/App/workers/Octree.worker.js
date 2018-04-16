// importScripts('../THREEJSScript/Octree');
import THREE from '../THREEJSScript/Octree';



const sayHello = () => {
  self.postMessage({ message: 'test' });
};

self.addEventListener('message', event => {
  // console.log(event);
  // console.log(THREE);
  const octree = new THREE.Octree( {
    // scene: this.scene,
    undeferred: false,
    depthMax: Infinity,
    objectsThreshold: 8,
    overlapPct: 0.15
  } );
  // console.log(octree);
  self.postMessage(octree );
});
