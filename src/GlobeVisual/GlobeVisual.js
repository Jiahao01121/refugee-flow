import React from 'react';

import * as d3 from 'd3';
import * as THREE from 'three';


class GlobeVisual extends React.Component{
  constructor(props){
    super(props);

    // this.init = this.init.bind(this);
    this.animate = this.animate.bind(this);


  }

  componentDidMount(){
    // var _points;
    // var _in = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 1), new THREE.MeshBasicMaterial({color: 0x1e5c16}) );
    // _in.name = 'inter';
    console.log("%c Did mount!!!", 'background:#000; color: white; size: 20px');
    const opts = this.props.opts || {
      imgDir : './globe/',
      colorFn: (x) => {
        const c = new THREE.Color();
        c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
        // console.log(c);
        return c;
      }
    };
    this.opts = opts;

    const Shaders = {
        'earth' : {
          uniforms: {
            'texture': { type: 't', value: null }
          },
          vertexShader: [
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
              'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
              'vNormal = normalize( normalMatrix * normal );',
              // UV简单的说就是贴图在模型上的坐标位置
              // example: https://threejs.org/examples/?q=uv#misc_uv_tests
              'vUv = uv;',
            '}'
          ].join('\n'),
          fragmentShader: [
            'uniform sampler2D texture;',
            'varying vec3 vNormal;',
            'varying vec2 vUv;',
            'void main() {',
              //diffuse is actually apply texture(apply globe img to geometry)
              'vec3 diffuse = texture2D( texture, vUv ).xyz;',
              // intensity provide lighting
              'float intensity = 1.02 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );',
              // color of atmosphere
              'vec3 atmosphere = vec3( 0.423, 0.423, 0.654 ) * pow( intensity, 3.0 );',
              // 这里的atomosphere指的是地球内发光
              'gl_FragColor = vec4( diffuse + atmosphere, 1.0 );',
            '}'
          ].join('\n')
        },

        'atmosphere' : {
          uniforms: {},
          vertexShader: [
            'varying vec3 vNormal;',
            'void main() {',
              'vNormal = normalize( normalMatrix * normal );',
              'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
            '}'
          ].join('\n'),
          fragmentShader: [
            'varying vec3 vNormal;',
            'void main() {',
              //  0.75 provide the best shading (maybe)
              // LAST value 缩小光晕
              'float intensity = pow( 0.75 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 14.0 );',
              // vec4 is the color
              'gl_FragColor = vec4( 0.254, 0.929, 0.721, 1.0 ) * intensity;',

            '}'
          ].join('\n')
        }
      };
    this.Shaders = Shaders;

    // TODO: raycast
    // overRenderer
    this.curZoomSpeed = 0;
    this.zoomSpeed = 50;

    this.mouse = { x: 0, y: 0 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.target = { x: Math.PI*3/2, y: Math.PI / 6.0 }
    this.targetOnDown = { x: 0, y: 0 };

    // var PI_HALF = Math.PI / 2;


    this.distance = 100000
    this.distanceTarget = 100000;

    this.init()


  }




  componentWillUnmount() {
    // TODO: delete stuff after unmount
  }

  init() {
    var shader, uniforms, material;

    const w = this.mount.offsetWidth || window.innerWidth;
    const h = this.mount.offsetHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);

    this.camera.position.z = this.distance;


    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x111116 );

    //if segments are less, the line will go off the surface of the geometry
    var geometry = new THREE.SphereGeometry(200, 100, 100);

    //construct globe
    shader = this.Shaders['earth'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms['texture'].value = THREE.ImageUtils.loadTexture(this.opts.imgDir+'world.jpg');
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.y = Math.PI;
    this.scene.add(this.mesh);

    // switch to "atomosphere"
    shader = this.Shaders['atmosphere'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true
        });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.set( 1.1, 1.1, 1.1 );
    this.scene.add(this.mesh);

    //switch to "data points"
    geometry = new THREE.BoxGeometry(0.75, 0.75, 1);
    // 为了让数据条不往里纵深， 因为boxGeometry在基平面两侧延伸？
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    this.point = new THREE.Mesh(geometry);


    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(w, h);
    this.mount.appendChild(this.renderer.domElement);






  }



  componentWillReceiveProps(e) {
    // console.log(e);
    //
    // this.cube.material = new THREE.MeshBasicMaterial({ color: e.ss });

  }



  animate() {

    this.renderer.render(this.scene, this.camera);
    // get frameID, frameID is for cancelling when unmount
    this.frameId = window.requestAnimationFrame(this.animate)

  }



  render() {

    console.log("%c render globe", 'background: #222; color: #bada55');
    console.log(this.opts);
    return(
      <div id="globe"
        style={{ width: window.innerWidth, height: window.innerHeight, backgroundColor: 'red'}}
        ref={(mount) => {return this.mount = mount }}
      />
    )
  }
}

export default GlobeVisual
