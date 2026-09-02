 $(document).ready(function() {
		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
 		// Declaring main variables
		
 		var container, camera, scene, renderer;
		// Objects
		var	floormesh, TableTop, phi = 0, Leg1, Leg2, Leg3, Leg4, StackPaper, Paper; 
		var controls; 


 		init();
 		animate();

 		function init()
 		{
 				//
				container = $( 'div' ).attr('id','cardfield');
				$('body').append( container );
				
				//
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				// Set camera initial position
				camera.position.y = 17.5;
				camera.position.z = 25;
				//
				controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 2.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
				controls.keys = [ 65, 83, 68 ];
				controls.addEventListener( 'change', render );

				//
				var textureLoader = new THREE.TextureLoader();
				// Creating a scene
				// SCENE

				var r = "js/textures/MilkyWay/";
				var urls = [
					r + "px.png", r + "nx.png",
					r + "py.png", r + "ny.png",
					r + "pz.png", r + "nz.png"
				];

				textureCube = new THREE.CubeTextureLoader().load( urls );

				scene = new THREE.Scene();
				scene.background = textureCube;
				/*
				window.addEventListener( 'resize', onWindowResize, false );
				window.addEventListener( 'mousemove', onDocumentMouseMove, false );
				*/
				// Creating floor for our space
				var floorgeo = new THREE.BoxGeometry(70,70,0.5);
				//
				floormesh = new THREE.Mesh(floorgeo, new THREE.MeshBasicMaterial({color: 0x248C0F, opacity:0.9}));
				//
				floormesh.position.y = -20;
				//и разворачиваем его по оси х так, чтобы он был параллелен ей.
				floormesh.rotation.x = 90 * Math.PI / 180;
				//добавляем к сцене
				scene.add(floormesh);
				
				
				//Different colored meshes
				var materials = [
					new THREE.MeshBasicMaterial( { color: 0xE01B4C }), // правая сторона
					new THREE.MeshBasicMaterial( { color: 0x34609E }), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0x7CAD18 }), //верх
					new THREE.MeshBasicMaterial( { color: 0x00EDB2 }), // низ
					new THREE.MeshBasicMaterial( { color: 0xED7700 }), // лицевая сторона
					new THREE.MeshBasicMaterial( { color: 0xB5B1AE }) // задняя сторона
				];
				// Texture for paper
				var textureLoader = new THREE.TextureLoader();
				var texture = textureLoader.load('js/textures/paper.jpg');
				var paper = [
					new THREE.MeshBasicMaterial( {map: texture }), // правая сторона
					new THREE.MeshBasicMaterial( {map: texture }), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0xffffff }), //верх
					new THREE.MeshBasicMaterial( { color: 0xffffff }), // низ
					new THREE.MeshBasicMaterial( {map: texture }), // лицевая сторона
					new THREE.MeshBasicMaterial( {map: texture }) // задняя сторона
				];
				// Texture for new paper
				var newPaper = [
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // правая сторона
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 0.5 }), //верх
					new THREE.MeshBasicMaterial( { color: 0xFFFFFF, transparent: true, opacity: 0.5 }), // низ
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}), // лицевая сторона
					new THREE.MeshBasicMaterial( {map: texture, transparent: true, opacity: 0.5}) // задняя сторона
				];
				
				
				// Creating top of the table
				var cube = new THREE.BoxGeometry( 30, 0.5, 50, materials);
				//
				TableTop = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				//указываем позицию по оси y
				TableTop.position.y = -1;
				//добавляем к сцене
				scene.add(TableTop);
 				//Adding shadow to the object
 				new THREE.ShadowVolume(TableTop);
				var tableShadow = new THREE.ShadowMesh( TableTop );
				scene.add( tableShadow );
				// 
				var cube = new THREE.BoxGeometry( 1, 19, 1, materials);
				//
				Leg1 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				//
				Leg1.position.y = -10.5;
				Leg1.position.x = -14;
				Leg1.position.z = -24;
				//добавляем к сцене
				scene.add(Leg1);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg1);
				//
				
				//
				var cube = new THREE.BoxGeometry( 1, 19, 1, materials);
				//создаем мэш для куба, в качестве материала мэша 
				//будет браться тот, который применен к кубу
				Leg2 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				//указываем позицию по оси y
				Leg2.position.y = -10.5;
				Leg2.position.x = 14;
				Leg2.position.z = 24;
				//добавляем к сцене
				scene.add(Leg2);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg2);
				//
				
				//
				var cube = new THREE.BoxGeometry( 1, 19, 1, materials);
				//создаем мэш для куба, в качестве материала мэша 
				//будет браться тот, который применен к кубу
				Leg3 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				//указываем позицию по оси y
				Leg3.position.y = -10.5;
				Leg3.position.x = -14.0;
				Leg3.position.z = 24.0;
				//добавляем к сцене
				scene.add(Leg3);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg3);
				//
				
				//
				var cube = new THREE.BoxGeometry( 1.0, 19.0, 1.0, materials);
				//создаем мэш для куба, в качестве материала мэша 
				//будет браться тот, который применен к кубу
				Leg4 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				//указываем позицию по оси y
				Leg4.position.y = -10.5;
				Leg4.position.x = 14.0;
				Leg4.position.z = -24.0;
				//добавляем к сцене
				scene.add(Leg4);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg4);
				//
				
				//Бумага
				var cube = new THREE.BoxGeometry(8.0,2.0,6.0, paper);
				StackPaper = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(paper));
				scene.add(StackPaper);
				StackPaper.position.z = -1.0;
				StackPaper.position.x = 1.0;
				//new THREE.ShadowVolume(StackPaper);
				//StackPaper.visible = false;
				//
			
				//
				var cube = new THREE.BoxGeometry(8.0,0.1,6.0, newPaper);
				Paper = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(newPaper));
				scene.add(Paper);
				Paper.position.z = -5.0;
				Paper.position.x = 10.0;
				Paper.position.y = -0.7;
				//new THREE.ShadowVolume(Paper);
				
				
				light = new THREE.DirectionalLight( 0xffffff );
				
				
 				//устанавливаем белый свет 
				light = new THREE.DirectionalLight( 0xffffff );
				//да, объекты должны отбрасывать тень
				light.castShadow = true;
				//сам пол у нас в -150, свет соотв. ставим выше (в 1 по y и 0 по x и z), чтобы он попадал на наш куб и заставлял его отбрасывать тень
				//напомню, что свет двигается от указанной точки к началу координат
				light.position.set( 1, 1, 1 );
				//добавлям свет
				scene.add( light ); 
				

				renderer = new THREE.WebGLRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );


				
					
				window.addEventListener( 'resize', onWindowResize, false );
 		}

		function onWindowResize( event ) {

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight;

				renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

				camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
				camera.updateProjectionMatrix();

		}
		
 		function animate()
 		{
 			requestAnimationFrame(animate);
			controls.update()
 		}

 		function render()
 		{

 			renderer.render(scene, camera);
 		}
});
				