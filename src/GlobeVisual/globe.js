/**
 * dat.globe Javascript WebGL Globe Toolkit
 * https://github.com/dataarts/webgl-globe
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
 import * as THREE from 'three';


var Globe = function(container, opts) {
  var _points;
  var _in = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 1), new THREE.MeshBasicMaterial({color: 0x1e5c16}) );
  _in.name = 'inter';



  opts = opts || {};

  var colorFn = opts.colorFn || function(x) {
    var c = new THREE.Color();
    c.setHSL( ( 0.6 - ( x * 0.5 ) ), 0.4, 0.4 ); // r,g,b
    // console.log(c);
    return c;
  };

  // globe background
  var imgDir = opts.imgDir || '/globe/';

  var Shaders = {
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

  var camera, scene, renderer, w, h;

  var mesh, atmosphere, point;

  var raycaster = new THREE.Raycaster(),
      raycaster_mouse = new THREE.Vector2();

  var overRenderer;

  var curZoomSpeed = 0;
  var zoomSpeed = 50;

  var mouse = { x: 0, y: 0 }, mouseOnDown = { x: 0, y: 0 };
  var rotation = { x: 0, y: 0 },
      target = { x: Math.PI*3/2, y: Math.PI / 6.0 },
      targetOnDown = { x: 0, y: 0 };

  var distance = 100000, distanceTarget = 100000;
  var padding = 40;
  var PI_HALF = Math.PI / 2;


  function init() {





    var shader, uniforms, material;
    w = container.offsetWidth || window.innerWidth;
    h = container.offsetHeight || window.innerHeight;

    camera = new THREE.PerspectiveCamera(30, w / h, 1, 10000);
    camera.position.z = distance;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x111116 );

    //if segments are less, the line will go off the surface of the geometry
    var geometry = new THREE.SphereGeometry(200, 100, 100);

    shader = Shaders['earth'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    console.log(imgDir+'world.jpg');
    uniforms['texture'].value = THREE.ImageUtils.loadTexture(imgDir+'world.jpg');


    material = new THREE.ShaderMaterial({

          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader

        });

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI;
    scene.add(mesh);

    // switch to "atomosphere"
    shader = Shaders['atmosphere'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);


    material = new THREE.ShaderMaterial({

          uniforms: uniforms,
          vertexShader: shader.vertexShader,
          fragmentShader: shader.fragmentShader,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          transparent: true

        });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set( 1.1, 1.1, 1.1 );
    scene.add(mesh);

    //data points
    geometry = new THREE.BoxGeometry(0.75, 0.75, 1);
    // 为了让数据条不往里纵深， 因为boxGeometry在基平面两侧延伸？
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    point = new THREE.Mesh(geometry);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(w, h);


    container.appendChild(renderer.domElement);

    container.addEventListener('mousedown', onMouseDown, false);

    container.addEventListener('mousewheel', onMouseWheel, false);

    document.addEventListener('keydown', onDocumentKeyDown, false);

    window.addEventListener('resize', onWindowResize, false);

    container.addEventListener('mouseover', function() {

      overRenderer = true;
    }, false);

    container.addEventListener('mouseout', function() {
      overRenderer = false;
    }, false);

    //raycast mouse location
    scene.add(_in);
    container.addEventListener('mousemove',(e) =>{
      e.preventDefault();
      // // raycasting
      raycaster_mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
      raycaster_mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    }, false)

  } //init

  function addData(data, opts) {

    var lat, lng, size, color, i, step, colorFnWrapper;

    opts.animated = opts.animated || false;
    this.is_animated = opts.animated;
    opts.format = opts.format || 'magnitude'; // other option is 'legend'
    if (opts.format === 'magnitude') {
      step = 3;
      colorFnWrapper = function(data, i) { return colorFn(data[i+2]); }
    } else if (opts.format === 'legend') {
      step = 4;

      colorFnWrapper = function(data, i) { return colorFn(data[i+2]); }
    } else {
      throw('error: format not supported: '+opts.format);
    }

    if (opts.animated) {

      if (this._baseGeometry === undefined) {

        this._baseGeometry = new THREE.Geometry();
        for (i = 0; i < data.length; i += step) {
          lat = data[i];
          lng = data[i + 1];
          color = colorFnWrapper(data,i);
          // baseGeo 没有高度
          // merge point to _baseGeometry(_baseGeometry is the one we using to do animation, data bar etc)
          addPoint(lat, lng, null, color, this._baseGeometry);
        }
      }

    }



    var subgeo = new THREE.Geometry();

    for (i = 0; i < data.length; i += step) {
      lat = data[i];
      lng = data[i + 1];
      color = colorFnWrapper(data,i);
      size = data[i + 2];
      // set size of the bar
      size = size*200;
      addPoint(lat, lng, size, color, subgeo);
    }
    if (opts.animated) {

      // morphTargets use to do animation
      // target to the data contains height value (第一步的addPoint是没高度数据的，第二步的subgeo是有高度数据的)

      this._baseGeometry.morphTargets.push({'name': opts.name, vertices: subgeo.vertices});

    }
    // else {
    //   this._baseGeometry = subgeo;
    // }

  };

  // called outside lib
  function createPoints(userData) {

    // _baseGeometry is then transform to 'points' to do visualization
    if (this._baseGeometry !== undefined) {
      if (this.is_animated === false) {
        //
        // this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
        //       color: 0xffffff,
        //       vertexColors: THREE.FaceColors,
        //       morphTargets: false
        //     }));
      } else {
        if (this._baseGeometry.morphTargets.length < 8) {
          console.log('t l',this._baseGeometry.morphTargets.length);

          var padding = 8-this._baseGeometry.morphTargets.length;
          console.log('padding', padding);
          for(var i=0; i<=padding; i++) {
            console.log('padding',i);
            // don't know the reason for padding
            // this._baseGeometry.morphTargets.push({'name': 'morphPadding'+i, vertices: this._baseGeometry.vertices});
          }

        }else{ console.log( "maybe too many data?" ); }

        // points is the ultimate thing used to do visualization
        this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
              color: 0xffffff,
              vertexColors: THREE.FaceColors,
              // animation
              morphTargets: true,
            }));
        this.points.userData =  {'userData': userData}
      }

      _points = this.points
      scene.add(this.points);
    }
  }

  function addPoint(lat, lng, size, color, subgeo) {

    // equirectangular map projection
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lng) * Math.PI / 180;
    //make point at the surface, but lengh will be extend to both side if no matrix transformation
    point.position.x = 200 * Math.sin(phi) * Math.cos(theta);
    point.position.y = 200 * Math.cos(phi);
    point.position.z = 200 * Math.sin(phi) * Math.sin(theta);
    // point.custom_filed = 'aaa';

    // Rotates the geometry to face point in space
    point.lookAt(mesh.position);

    point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix

    // point.updateMatrix();

    for (var i = 0; i < point.geometry.faces.length; i++) {
      // color for every faces
      point.geometry.faces[i].color = color;
    }
    if(point.matrixAutoUpdate){
      point.updateMatrix();
    }


    subgeo.merge(point.geometry, point.matrix);


  }

  function onMouseDown(event) {
    event.preventDefault();

    container.addEventListener('mousemove', onMouseMove, false);
    container.addEventListener('mouseup', onMouseUp, false);
    container.addEventListener('mouseout', onMouseOut, false);

    mouseOnDown.x = - event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    container.style.cursor = 'move';
  }

  function onMouseMove(event) {

    // default
    mouse.x = - event.clientX;
    mouse.y = event.clientY;

    var zoomDamp = distance/1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;
    console.log(target.x + '| '+target.y);
    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < - PI_HALF ? - PI_HALF : target.y;

  }

  function onMouseUp(event) {

    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
    container.style.cursor = 'auto';
  }

  function onMouseOut(event) {
    container.removeEventListener('mousemove', onMouseMove, false);
    container.removeEventListener('mouseup', onMouseUp, false);
    container.removeEventListener('mouseout', onMouseOut, false);
  }

  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        zoom(100);
        event.preventDefault();
        break;
      case 40:
        zoom(-100);
        event.preventDefault();
        break;
    }
  }

  function onWindowResize( event ) {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  }

  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
    distanceTarget = distanceTarget < 450 ? 450 : distanceTarget;
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {

    zoom(curZoomSpeed);

    //旋转时候的缓冲
    rotation.x += (target.x - rotation.x) * 0.1;
    rotation.y += (target.y - rotation.y) * 0.1;
    distance += (distanceTarget - distance) * 0.1;

    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);


    // camera.lookAt() position.x += (3000 - camera.target.position.x)*0.005;


    camera.lookAt(mesh.position);

    //raycast
    raycaster.setFromCamera( raycaster_mouse, camera );
    var intersects = raycaster.intersectObject( _points );

    if ( intersects.length > 0 ) {

      var intersect = intersects[ 0 ];

      var face = intersect.face;

      var dataIndex = Math.floor(intersect.faceIndex / 12);

      console.log("Faceindex: " + intersect.faceIndex);
      console.log("dataIndex: " + dataIndex);
      console.log("-------");

      console.log(
        _points.userData.userData[0][1] [ (dataIndex*4) + 3]
      );
      _in.position.x = intersect.point.x;
      _in.position.y = intersect.point.y;
      _in.position.z = intersect.point.z;

      _in.lookAt(mesh.position);

    }
    //
    renderer.render(scene, camera);
  }

  init();

  this.setTarget = function(rot, distance,lat,lng) {
       target.x = rot[0];
       target.y = rot[1]
       distanceTarget = distance;
       var zoomDamp = distance/1000;
  }



  this.animate = animate;
  this.addData = addData;
  this.createPoints = createPoints;
  this.render = render;


  this.renderer = renderer;

  this.scene = scene;
  return this;
};


export default Globe;
