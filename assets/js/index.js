import * as THREE from 'three';
import { OrbitControls } from '../../three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from '../../three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from '../../three/examples/jsm/environments/RoomEnvironment.js';

			import { GUI } from '../../three/examples/jsm/libs/lil-gui.module.min.js';

			let camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				const container = document.querySelector( '#container' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
				camera.position.set( - 0.75, 0.7, 5);

				scene = new THREE.Scene();

				// model

				new GLTFLoader()
					.load( '../../assets/objects/mic/scene.gltf', function ( gltf ) {

						scene.add( gltf.scene );

					} );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = 1;
				renderer.outputEncoding = THREE.sRGBEncoding;
				container.appendChild( renderer.domElement );

				const environment = new RoomEnvironment();
				const pmremGenerator = new THREE.PMREMGenerator( renderer );

				scene.background = new THREE.Color( 0xdddddd);
				scene.environment = pmremGenerator.fromScene( environment ).texture;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableDamping = true;
				controls.minDistance = 0.5;
				controls.maxDistance = 96;
				controls.target.set( 0, 0.35, 0 );
				controls.update();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				controls.update(); // required if damping enabled

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
