import React from 'react';
// import style from './GlobeVisual.css'
import * as d3 from 'd3';
import * as _ from 'underscore';
import THREE from '../THREEJSScript/Octree';

// import OctreeWorker from '../workers/Octree.worker.js';
import GlobeTooltips from './GlobeTooltips'; //child component
const mousetrap = require('mousetrap');

const country_borderLine = require('../data/countries_states.json');

class GlobeVisual extends React.Component{
  constructor(props){
    super(props);

    // this.init = this.init.bind(this);
    this.raycast_listener = this.raycast_listener.bind(this);
    this.animate = this.animate.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.zoom = this.zoom.bind(this);
    this.rotateGlobe = this.rotateGlobe.bind(this);
    this.drawThreeGeo = this.drawThreeGeo.bind(this);
    this.tooltips_onexit = this.tooltips_onexit.bind(this);

    this.rotatePause = this.props.rotatePause;
    this.state = {
      mv_show: false,
      mv_tooltips: Array(7).fill(0),
      tooltips_clicked_id : 0,
      tooltips_clicked: false,
      tooltips_expendInfo:[],
    }
  }

  componentDidMount(){

    // opts, also passed in on .adddata() from other component
    this.opts = this.props.opts

    // shader collection
    this.Shaders = {
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
              // 0.074, 0.996, 0.992 - blueish color
              // 0.254, 0.929, 0.721 - green-ish color

            '}'
          ].join('\n')
        }
      };

    //
    this.curZoomSpeed = 0;
    this.zoomSpeed = 50;

    //
    this.mouse = { x: 0, y: 0 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: 0, y: 0 };
    this.target = { x: Math.PI*3/2, y: Math.PI / 6.0 }
    this.targetOnDown = { x: 0, y: 0 };

    //
    this.distance = 100000
    this.distanceTarget = 100000;
    this.padding = 40;

    //
    this.PI_HALF = Math.PI / 2;;

    //
    this.scaler = undefined;

    //register octree worker
    // this.OctreeWorker = new OctreeWorker();

    //
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
    this.globeRadius = 200;
    var geometry = new THREE.SphereGeometry(this.globeRadius, 100, 100);

    //construct globe
    shader = this.Shaders['earth'];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);
    uniforms['texture'].value = new THREE.TextureLoader().load(this.opts.imgDir+'world.jpg');
    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.y = Math.PI;
    this.mesh.name = 'earth';

    // draw country country borderline
    this.drawThreeGeo(country_borderLine,this.globeRadius + 0.5,'sphere',{
      color:  0x245454,
      transparent: true,
      linewidth: 10,
      opacity: 0.6,
      dashSize: 1,
      gapSize: 5,
    }, this.mesh);
    this.scene.add(this.mesh);
    this.borderLine = this.mesh.children;

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
    this.mesh.name = 'atmosphere'
    this.scene.add(this.mesh);

    //switch to "data points"
    geometry = new THREE.BoxGeometry(0.75, 0.75, 1);
    // 为了让数据条不往里纵深,因为boxGeometry在基平面两侧延伸？
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    this.point = new THREE.Mesh(geometry);

    // raycasting
    this.raycaster = new THREE.Raycaster();
    this.raycasterMouse = new THREE.Vector2();
    this.interscted = undefined;

    const tooltips_mouseoverFeedback_geo = new THREE.BoxGeometry(2.5, 2.5, 1);
    tooltips_mouseoverFeedback_geo.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-0.5));
    const tooltips_mouseoverFeedback_mat = new THREE.ShaderMaterial({
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
              'float intensity = pow( 2.75 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 54.0 );',
              // vec4 is the color
              'gl_FragColor = vec4( 0.254, 0.929, 1., 1.0 ) * intensity;',

            '}'
          ].join('\n'),
          side: THREE.BackSide
        })
    this.tooltips_mouseoverFeedback = new THREE.Mesh(tooltips_mouseoverFeedback_geo,tooltips_mouseoverFeedback_mat);
    this.tooltips_mouseoverFeedback.name = 'raycast-mouseover';
    this.octree = new THREE.Octree({
      // scene: this.scene,
      undeferred: false,
      depthMax: Infinity,
      objectsThreshold: 4,
      overlapPct: 0.15
    });
    this.scene.add(this.tooltips_mouseoverFeedback);

    // debounced interaction listener little bigger than 60fps.
    const debounced = _.debounce(this.raycast_listener, 1000/65);
    this.mount.addEventListener('mousemove',debounced,false);

    //
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(w * 1.5, h* 1.5);
    this.mount.appendChild(this.renderer.domElement);

    //
    this.mount.addEventListener('mousedown', this.onMouseDown, false);
    this.mount.addEventListener('mousewheel', this.onMouseWheel, false);
    this.mount.addEventListener('keydown', this.onDocumentKeyDown, false);
    this.mount.addEventListener('mouseover', () => { this.overRenderer = true  }, false);
    this.mount.addEventListener('mouseout', ()=>   { this.overRenderer = false }, false);

    //
    mousetrap.bind('esc', () => this.state.tooltips_clicked && this.tooltips_onexit(), 'keyup');
  } // init

  addData(data, _opts) {

    var lat, lng, size, color, step, colorFnWrapper;

    this.opts.animated = _opts.animated;
    this.is_animated = _opts.animated;
    this.opts.format = _opts.format || 'magnitude'; // other option is 'legend'
    this.opts.name = _opts.name;


    if(this.opts.format === 'magnitude'){
      step = 3;
      colorFnWrapper = (data,i) => this.opts.colorFn(data[i+2])
    } else if ( this.opts.format === 'legend') {
      step = 4;
      colorFnWrapper = (data, i) => this.opts.colorFn(data[i+3].fat, data[i+3]);
    } else {
      throw('error: format not supported: '+ this.opts.format);
    }

    if(this.opts.animated) {

      if(this._baseGeometry === undefined) {

        this._baseGeometry = new THREE.Geometry();
        for (let i = 0; i < data.length; i+= step) {
          lat = data[i];
          lng = data[i + 1];
          color = colorFnWrapper(data,i);
          // baseGeo 没有高度
          // merge point to _baseGeometry(_baseGeometry is the one we using to do animation, data bar etc)
          this.addPoint(lat, lng, null, color, this._baseGeometry);
        }
      }
    }


    var subgeo = new THREE.Geometry();

    for (let i = 0; i < data.length; i += step) {
      lat = data[i];
      lng = data[i + 1];
      color = colorFnWrapper(data,i);
      size = data[i + 2];
      // set size of the bar
      size = size*200;
      this.addPoint(lat, lng, size, color, subgeo);
    }

    if (this.opts.animated) {
      // morphTargets use to do animation
      // morphTarget to the data contains height value
      // (第一步的addPoint是没高度数据的，第二步的subgeo是有高度数据的)
      this._baseGeometry.morphTargets.push({'name': this.opts.name, vertices: subgeo.vertices});
    }
    else {
      this._baseGeometry = subgeo;
    }


  }// addData

  addPoint(lat, lng, size, color, subgeo) {

    // equirectangular map projection
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (180 - lng) * Math.PI / 180;
    //make point at the surface, but lengh will be extend to both side if no matrix transformation
    this.point.position.x = this.globeRadius * Math.sin(phi) * Math.cos(theta);
    this.point.position.y = this.globeRadius * Math.cos(phi);
    this.point.position.z = this.globeRadius * Math.sin(phi) * Math.sin(theta);

    // Rotates the geometry to face point in space
    this.point.lookAt(this.mesh.position);

    this.point.scale.z = Math.max( size, 0.1 ); // avoid non-invertible matrix

    this.point.updateMatrix();

    for (var i = 0; i < this.point.geometry.faces.length; i++) {
      // color for every faces
      this.point.geometry.faces[i].color = color;

      //give top tip a gray color
      if (i == 10) this.point.geometry.faces[i].color = new THREE.Color().setStyle('rgb(90,90,90)')
      if (i == 11) this.point.geometry.faces[i].color = new THREE.Color().setStyle('rgb(90,90,90)')
    }
    if(this.point.matrixAutoUpdate){
      this.point.updateMatrix();
    }


    subgeo.merge(this.point.geometry, this.point.matrix);

  }

  createPoints(userData) {
    // _baseGeometry is then transform to 'points' to do visualization
    if (this._baseGeometry !== undefined) {
        if (this._baseGeometry.morphTargets.length >= 8) console.log("maybe too many data?");

        // points is the ultimate thing used to do visualization
        this.points = new THREE.Mesh(this._baseGeometry, new THREE.MeshBasicMaterial({
              color: 0xffffff,
              vertexColors: THREE.FaceColors,
              // animation
              morphTargets: true,
            }));
        //add userData to the points in order to raycast
        this.points.userData =  {'userData': userData};

        //add to octree
        // use vertices will be more easy to mouseover, but performance not as good.

        if(userData[0][1].length > 70000){
          this.octree.add(this.points,{ useFaces: true,useVertices: false });
        } else {
          this.octree.add(this.points,{ useFaces: false,useVertices: true });
        }



        // this.OctreeWorker.postMessage({
        //   'a':1
        // });
        //
        // this.OctreeWorker.onmessage = event => {
        //   // console.log(event);
        // }


      }
      this.scene.add(this.points);
  }

  raycast_listener(event) {
    event.preventDefault();
    //normalize mouse pos
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.raycasterMouse.x =   ( ( event.clientX - rect.left ) / ( rect.width - rect.left ) ) * 2 - 1;
    this.raycasterMouse.y = - ( ( event.clientY -rect.top   ) / ( rect.bottom - rect.top ) ) * 2 + 1;

    this.raycaster.setFromCamera( this.raycasterMouse, this.camera );

    const octreeObjects = this.octree.search( this.raycaster.ray.origin, this.raycaster.ray.far, true, this.raycaster.ray.direction );
    const intersections = this.raycaster.intersectOctreeObjects( octreeObjects );
    if ( intersections.length > 0 ) {

      this.intersected = intersections[ 0 ];
      const dataIndex = Math.floor(this.intersected.face.a / 8);
      const displayData =  this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 3];

      //check if interscetions changed
      if(this.WarID != displayData.id && !this.state.tooltips_clicked){

        this.setState({
          tooltips_clicked: false,
          mv_position:[event.clientX,event.clientY],
          mv_show : true,
          mv_tooltips : [
            displayData.id,
            displayData.cot,
            Math.round(this.scaler.invert(displayData.fat)),
            displayData.evt,
            displayData.int,
            this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 0],
            this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 1],
          ],
        })
        this.WarID = displayData.id;
        this.rotatePause = true;

        console.log("mouse pos");
        console.log(event.clientX+ ' | ' + event.clientY);
        console.log("target x");
        console.log(this.target.x + ' | ' + this.target.y);
      }

      // check height( if height = -1 then data is not in the current selection)
      if(this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 2] >= 0
        && !this.state.tooltips_clicked
      ){

        const phi = (90 - this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 0] ) * Math.PI / 180;
        const theta = (180 - this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 1] ) * Math.PI / 180;

        this.tooltips_mouseoverFeedback.position.x = 200 * Math.sin(phi) * Math.cos(theta);
        this.tooltips_mouseoverFeedback.position.y = 200 * Math.cos(phi);
        this.tooltips_mouseoverFeedback.position.z = 200 * Math.sin(phi) * Math.sin(theta);
        this.tooltips_mouseoverFeedback.lookAt(this.mesh.position);
        this.tooltips_mouseoverFeedback.scale.z = Math.max( this.points.userData.userData[ this.currentSelectedTimeFrame /* current item selected on timeLine*/ ][1] [ (dataIndex*4) + 2] *200, 0.1 ); // avoid non-invertible matrix

      }

    }else if(this.intersected && !this.state.tooltips_clicked){


      // hide tooltips component
      this.state.mv_show && this.setState({
        mv_show : false
      });
      this.rotatePause = false;
      this.setState({
        tooltips_clicked : false,
        tooltips_clicked_id : Math.random() // reset clickedID
      })

      this.WarID = Math.random(); // reset warID

      // hide tooltips white bar on the globe
      this.tooltips_mouseoverFeedback.position.x = 0;
      this.tooltips_mouseoverFeedback.position.y = 0;
      this.tooltips_mouseoverFeedback.position.z = 0;

    }

  }

  onMouseDown(event) {

    event.preventDefault();

    this.mount.addEventListener('mousemove', this.onMouseMove, false);
    this.mount.addEventListener('mouseup', this.onMouseUp, false);
    this.mount.addEventListener('mouseout', this.onMouseOut, false);
    this.mouseOnDown.x = - event.clientX;
    this.mouseOnDown.y = event.clientY;
    this.targetOnDown.x = this.target.x;
    this.targetOnDown.y = this.target.y;
    this.mount.style.cursor = 'move';

    // fetchDataFromServer
    // console.log(this.WarID);
    // console.log(this.state.tooltips_clicked_id);
    if(this.state.mv_show && this.state.tooltips_clicked_id != this.WarID) {
      let url = 'http://' + window.location.hostname + ':2700' + '/data/note/'+ this.WarID;
      fetch(new Request( url, {
          method: 'GET',
          cache: 'force-cache'
        })).then(res => res.json()).then(d =>{

        this.setTarget([this.state.mv_tooltips[5],this.state.mv_tooltips[6]],700)
        console.log('called');
        this.setState({
          mv_position:[ (window.innerWidth*0.75)*0.75 - 400/1.5 , window.innerHeight* 0.75 - 300 + 25 ],
          tooltips_clicked : true,
          tooltips_expendInfo : d,
          tooltips_clicked_id : d[0].id
        })

      })

    }

  }

  onMouseMove(event) {

    // default
    this.mouse.x = - event.clientX;
    this.mouse.y = event.clientY;

    var zoomDamp = this.distance/1000;

    this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
    this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;
    // console.log(this.target.x + '| '+this.target.y);
    this.target.y = this.target.y > this.PI_HALF ? this.PI_HALF : this.target.y;
    this.target.y = this.target.y < - this.PI_HALF ? - this.PI_HALF : this.target.y;

    // this.target.x = this.target.x > Math.PI*3/2 ? Math.PI*3/2 : this.target.x;
    // this.target.x = this.target.x < - this.PI_HALF ? - this.PI_HALF : this.target.x;


  }

  onMouseUp(event) {

    this.mount.removeEventListener('mousemove', this.onMouseMove, false);
    this.mount.removeEventListener('mouseup', this.onMouseUp, false);
    this.mount.removeEventListener('mouseout', this.onMouseOut, false);
    this.mount.style.cursor = 'auto';
  }

  onMouseOut(event) {
    this.mount.removeEventListener('mousemove', this.onMouseMove, false);
    this.mount.removeEventListener('mouseup', this.onMouseUp, false);
    this.mount.removeEventListener('mouseout', this.onMouseOut, false);
  }

  onMouseWheel(event) {

    event.preventDefault();
    if (this.overRenderer) this.zoom(event.wheelDeltaY * 0.3);
    return false;
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        this.zoom(100);
        event.preventDefault();
        break;
      case 40:
        this.zoom(-100);
        event.preventDefault();
        break;
    }
  }

  onWindowResize( event ) {
    this.camera.aspect = this.mount.offsetWidth / this.mount.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.mount.offsetWidth, this.mount.offsetHeight );
  }

  zoom(delta) {
    this.distanceTarget -= delta;
    this.distanceTarget = this.distanceTarget > 945 ? 945 : this.distanceTarget;
    this.distanceTarget = this.distanceTarget < 380 ? 380 : this.distanceTarget;
  }

  transition(currentIndex,cb) {
    this.currentSelectedTimeFrame = currentIndex;
    const timer = d3.timer((e) => {

      var t = Math.min(1,d3.easeCubicInOut(e/700));
      // old data
      this.points.morphTargetInfluences[this.lastIndex] = 1 -t;
      // new data
      // console.log(currentIndex);
      this.points.morphTargetInfluences[currentIndex] = t;

      if (t == 1) {
        timer.stop();
        this.lastIndex = currentIndex;
        cb && cb();
      }
    })
  }

  componentWillReceiveProps(nextProps) {


    this.rotatePause = nextProps.rotatePause;

  }

  setTarget(rot, distance) {
    // -1.5707963267948966

    const convert = (n, start1, stop1, start2, stop2, withinBounds) =>{
      var newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
        return newval;
    }

    this.target.x = rot[1] > 0 ? convert(rot[1],0,180,-Math.PI*1/2, Math.PI*1/2) : convert(rot[1],-180,0,Math.PI*1/2,Math.PI*3/2);

    this.target.y = convert(rot[0],-85,85,-1.5707963267948966,1.5707963267948966); //Latitude

    if(distance !== null){
      this.distanceTarget = distance;
    }

  }

  rotateGlobe(deltaSeconds,cancel) {
    // TODO: rotate toogle in UI
    // if (self.rotationSpeed != 0) {
    if (deltaSeconds > 0 && deltaSeconds < 1 && cancel == false) {
      this.target.x += 1 * deltaSeconds / -20;
      this.target.y += 1 * deltaSeconds / -100;
    }

    if(cancel){
      this.target.x = this.target.x;
      this.target.y = this.target.y;
    }
    // }
  }

  drawThreeGeo(json, radius, shape, materalOptions, container) {
      container = container;

      var x_values = [];
      var y_values = [];
      var z_values = [];
      var euler = new THREE.Euler( 0, -1.5708,0, 'XYZ' );
      var json_geom = createGeometryArray(json);
      //An array to hold the feature geometries.
      var convertCoordinates = getConversionFunctionName(shape);
      //Whether you want to convert to spherical or planar coordinates.
      var coordinate_array = [];
      //Re-usable array to hold coordinate values. This is necessary so that you can add
      //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.

      for (var geom_num = 0; geom_num < json_geom.length; geom_num++) {

          if (json_geom[geom_num].type == 'LineString') {
              coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates);

              for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                  convertCoordinates(coordinate_array[point_num], radius);
              }
              drawLine(y_values, z_values, x_values, materalOptions);

          } else if (json_geom[geom_num].type == 'Polygon') {

              for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
                  coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

                  for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                      convertCoordinates(coordinate_array[point_num], radius);
                  }
                  drawLine(y_values, z_values, x_values, materalOptions);
              }

          } else if (json_geom[geom_num].type == 'MultiLineString') {
              for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
                  coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

                  for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                      convertCoordinates(coordinate_array[point_num], radius);
                  }
                  drawLine(y_values, z_values, x_values, materalOptions);
              }

          } else if (json_geom[geom_num].type == 'MultiPolygon') {
              for (var polygon_num = 0; polygon_num < json_geom[geom_num].coordinates.length; polygon_num++) {
                  for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates[polygon_num].length; segment_num++) {
                      coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[polygon_num][segment_num]);

                      for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                          convertCoordinates(coordinate_array[point_num], radius);
                      }
                      drawLine(y_values, z_values, x_values, materalOptions);
                  }
              }
          } else {
              throw new Error('The geoJSON is not valid.');
          }
      }

      function createGeometryArray(json) {
          var geometry_array = [];

          if (json.type == 'Feature') {
              geometry_array.push(json.geometry);
          } else if (json.type == 'FeatureCollection') {
              for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                  geometry_array.push(json.features[feature_num].geometry);
              }
          } else if (json.type == 'GeometryCollection') {
              for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                  geometry_array.push(json.geometries[geom_num]);
              }
          } else {
              throw new Error('The geoJSON is not valid.');
          }
          //alert(geometry_array.length);
          return geometry_array;
      }

      function getConversionFunctionName(shape) {
          var conversionFunctionName;

          if (shape == 'sphere') {
              conversionFunctionName = convertToSphereCoords;
          } else {
              throw new Error('The shape that you specified is not valid.');
          }
          return conversionFunctionName;
      }

      function createCoordinateArray(feature) {
          //Loop through the coordinates and figure out if the points need interpolation.
          var temp_array = [];
          var interpolation_array = [];

          for (var point_num = 0; point_num < feature.length; point_num++) {
              var point1 = feature[point_num];
              var point2 = feature[point_num - 1];

              if (point_num > 0) {
                  if (needsInterpolation(point2, point1)) {
                      interpolation_array = [point2, point1];
                      interpolation_array = interpolatePoints(interpolation_array);

                      for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
                          temp_array.push(interpolation_array[inter_point_num]);
                      }
                  } else {
                      temp_array.push(point1);
                  }
              } else {
                  temp_array.push(point1);
              }
          }
          return temp_array;
      }

      function needsInterpolation(point2, point1) {
          //If the distance between two latitude and longitude values is
          //greater than five degrees, return true.
          var lon1 = point1[0];
          var lat1 = point1[1];
          var lon2 = point2[0];
          var lat2 = point2[1];
          var lon_distance = Math.abs(lon1 - lon2);
          var lat_distance = Math.abs(lat1 - lat2);

          if (lon_distance > 5 || lat_distance > 5) {
              return true;
          } else {
              return false;
          }
      }

      function interpolatePoints(interpolation_array) {
          //This function is recursive. It will continue to add midpoints to the
          //interpolation array until needsInterpolation() returns false.
          var temp_array = [];
          var point1, point2;

          for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
              point1 = interpolation_array[point_num];
              point2 = interpolation_array[point_num + 1];

              if (needsInterpolation(point2, point1)) {
                  temp_array.push(point1);
                  temp_array.push(getMidpoint(point1, point2));
              } else {
                  temp_array.push(point1);
              }
          }

          temp_array.push(interpolation_array[interpolation_array.length - 1]);

          if (temp_array.length > interpolation_array.length) {
              temp_array = interpolatePoints(temp_array);
          } else {
              return temp_array;
          }
          return temp_array;
      }

      function getMidpoint(point1, point2) {
          var midpoint_lon = (point1[0] + point2[0]) / 2;
          var midpoint_lat = (point1[1] + point2[1]) / 2;
          var midpoint = [midpoint_lon, midpoint_lat];

          return midpoint;
      }

      function convertToSphereCoords(coordinates_array, sphere_radius) {
          var lon = coordinates_array[0];
          var lat = coordinates_array[1];
          var phi = (90 - lat) * Math.PI / 180;
          var theta = (180 - lon) * Math.PI / 180;
          //different from projection for data point
          x_values.push( Math.sin(phi) * Math.cos(theta) * sphere_radius );
          y_values.push( Math.sin(phi) * Math.sin(theta) * sphere_radius * -1 );
          z_values.push( Math.cos(phi) * sphere_radius );
      }

      function drawLine(x_values, y_values, z_values, options) {
          var line_geom = new THREE.Geometry();
          createVertexForEachPoint(line_geom, x_values, y_values, z_values);

          var line_material = new THREE.LineDashedMaterial(options);
          var line = new THREE.Line(line_geom, line_material);
          container.add(line);

          clearArrays();
      }

      function createVertexForEachPoint(object_geometry, values_axis1, values_axis2, values_axis3) {

          for (var i = 0; i < values_axis1.length; i++) {
              object_geometry.vertices.push(
                new THREE.Vector3(values_axis1[i],values_axis2[i], values_axis3[i]).applyEuler(euler)
                );
          }
      }

      function clearArrays() {
          x_values.length = 0;
          y_values.length = 0;
          z_values.length = 0;
      }
  }

  tooltips_onexit(){

    // hide tooltips component
    this.state.mv_show && this.setState({
      mv_show : false
    });
    this.rotatePause = false;
    this.setState({
      tooltips_clicked : false,
      tooltips_clicked_id : Math.random() // reset clickedID
    })

    this.WarID = Math.random(); // reset warID

    // hide tooltips white bar on the globe
    this.tooltips_mouseoverFeedback.position.x = 0;
    this.tooltips_mouseoverFeedback.position.y = 0;
    this.tooltips_mouseoverFeedback.position.z = 0;
    //zoom out
    this.setTarget([-11.874010, 44.605859],945)
  }

  animate() {
    // console.time('animate takes');
    this.rotateGlobe(2/1000,this.rotatePause);

    // get frameID, frameID is for cancelling when unmount
    this.frameId = window.requestAnimationFrame(this.animate)

    /****** render code start ******/

    this.zoom(this.curZoomSpeed);

    //旋转时候的缓冲
    this.rotation.x += (this.target.x - this.rotation.x) * 0.1;
    this.rotation.y += (this.target.y - this.rotation.y) * 0.1;
    this.distance += (this.distanceTarget - this.distance) * 0.1;
    //camera coord
    this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.position.y = this.distance * Math.sin(this.rotation.y);
    this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.lookAt(this.mesh.position);
    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);

    // this.octree.update();
    // console.timeEnd('animate takes');
  } //threeJS animate



  render() {
    // console.log({...this.props});
    // render is execute ahead of componentDidMount
    console.count("---------- GlobeVisual's render called");

    return(
      <div>
        <GlobeTooltips
          mv_tooltips = {this.state.mv_tooltips}
          mv_show = {this.state.mv_show}
          mv_position = {this.state.mv_position}
          tooltips_clicked = {this.state.tooltips_clicked}
          tooltips_expendInfo = {this.state.tooltips_expendInfo}
          tooltips_onexit = {this.tooltips_onexit}
        />
        <div id="globev"
          style={{ width: '100%', height: window.innerHeight - 60, backgroundColor: 'red'}}
          ref={(mount) => {return this.mount = mount }} />
      </div>
    )

  }
} // Class

export default GlobeVisual
