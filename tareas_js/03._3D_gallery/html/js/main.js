
			var table = [
				[ "../img/00.png", 10, 2 ],
				[ "../img/01.png", 14, 2 ],
				[ "../img/02.png", 15, 2 ],
				[ "../img/03.png", 16, 2 ],
				[ "../img/04.png", 17, 2 ],
				[ "../img/05.png", 18, 2 ],
				[ "../img/06.png", 1, 3 ],
				[ "../img/07.png", 2, 3 ],
				[ "../img/16.png", 3, 3 ],
				[ "../img/17.png", 4, 3 ],
				[ "../img/08.png", 13, 3 ],
				[ "../img/09.png", 14, 3 ],
				[ "../img/10.png", 15, 3 ],
				[ "../img/11.png", 16, 3 ],
				[ "../img/12.png", 17, 3 ],
				[ "../img/13.png", 18, 3 ],
				[ "../img/14.png", 1, 4 ],
				[ "../img/15.png", 2, 4 ],
				[ "../img/16.png", 3, 4 ],
				[ "../img/17.png", 4, 4 ],
			];

			var camera, scene, renderer;
			var geometry, material, mesh;

			var controls;

			var objects = [];
			var targets = { table: [], sphere: [] };

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
				camera.position.z = 1800;

				scene = new THREE.Scene();

				for ( var i = 0; i < table.length; i ++ ) {

					var item = table[ i ];

					var element = document.createElement( 'div' );
					element.className = 'element';

					var symbol = document.createElement( 'img' );
					symbol.className = 'imgGallery';
					symbol.src= item[ 0 ];
					element.appendChild( symbol );


					var object = new THREE.CSS3DObject( element );
					object.position.x = Math.random() * 4000 - 2000;
					object.position.y = Math.random() * 4000 - 2000;
					object.position.z = Math.random() * 4000 - 2000;
					scene.add( object );

					objects.push( object );

				}

				// sphere

				var vector = new THREE.Vector3();

				for ( var i = 0, l = objects.length; i < l; i ++ ) {

					var object = objects[ i ];

					var phi = Math.acos( -1 + ( 2 * i ) / l );
					var theta = Math.sqrt( l * Math.PI ) * phi;

					var object = new THREE.Object3D();

					object.position.x = 1000 * Math.cos( theta ) * Math.sin( phi );
					object.position.y = 1000 * Math.sin( theta ) * Math.sin( phi );
					object.position.z = 1000 * Math.cos( phi );

					vector.copy( object.position ).multiplyScalar( 2 );

					object.lookAt( vector );

					targets.sphere.push( object );

				}

				//

				renderer = new THREE.CSS3DRenderer();
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.domElement.style.position = 'absolute';
				renderer.domElement.style.top = 0;
				document.getElementById('container').appendChild( renderer.domElement );

				//

				controls = new THREE.TrackballControls( camera, renderer.domElement );
				controls.rotateSpeed = 0.5;
				controls.addEventListener( 'change', render );

				transform( targets.sphere, 0 );

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function transform( targets, duration ) {

				TWEEN.removeAll();

				for ( var i = 0; i < objects.length; i ++ ) {

					var object = objects[ i ];
					var target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( render )
					.start();

			}

			

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );


				TWEEN.update();
				controls.update();

			}

			function render() {

				renderer.render( scene, camera );

			}
