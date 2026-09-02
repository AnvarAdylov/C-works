  $(document).ready(function() {
		if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
 		// Declaring main variables
		var container, camera, scene, renderer;
		// Objects
		var	floormesh, TableTop, phi = 0, Leg1, Leg2, Leg3, Leg4, StackPaper, Paper; 
		// walls
		var Wall1, Wall2, Wall3, Wall4, Wall5, Wall6;
		// Door
		var Door, Doorknob1, Doorknob2;
		//
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
				controls.zoomSpeed = 1.5;
				controls.panSpeed = 1.5;
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
				/*
				var r = "js/textures/MilkyWay/";
				var urls = [
					r + "px.png", r + "nx.png",
					r + "py.png", r + "ny.png",
					r + "pz.png", r + "nz.png"
				];
				
				textureCube = new THREE.CubeTextureLoader().load( urls );
				*/
				scene = new THREE.Scene();
				//scene.background = textureCube;
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
				var materialsDoor = [
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }), // правая сторона
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }), // левая сторона
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }), //верх
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }), // низ
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }), // лицевая сторона
					new THREE.MeshBasicMaterial( { color: 0xd3d3d3 }) // задняя сторона
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
 				//new THREE.ShadowVolume(TableTop);
				//var tableShadow = new THREE.ShadowMesh( TableTop );
				//scene.add( tableShadow );
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
				Leg2 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				Leg2.position.y = -10.5;
				Leg2.position.x = 14;
				Leg2.position.z = 24;
				scene.add(Leg2);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg2);
				//
				
				//
				var cube = new THREE.BoxGeometry( 1, 19, 1, materials);
				Leg3 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				Leg3.position.y = -10.5;
				Leg3.position.x = -14.0;
				Leg3.position.z = 24.0;
				scene.add(Leg3);
 				//добавляем тень кубу
 				//new THREE.ShadowVolume(Leg3);
				//
				
				//
				var cube = new THREE.BoxGeometry( 1.0, 19.0, 1.0, materials);
				Leg4 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials));
				Leg4.position.y = -10.5;
				Leg4.position.x = 14.0;
				Leg4.position.z = -24.0;
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
				// Walls
				var cube = new THREE.BoxGeometry( 4, 50, 74, materials );
				Wall1 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall1.position.y = 5;
				Wall1.position.x = -35;
				Wall1.position.z = 0;
				scene.add(Wall1);
				var cube = new THREE.BoxGeometry( 70, 50, 4, materials );
				Wall2 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall2.position.y = 5;
				Wall2.position.x = 0;
				Wall2.position.z = -35;
				scene.add(Wall2);
				var cube = new THREE.BoxGeometry( 70, 50, 4, materials );
				Wall3 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall3.position.y = 5;
				Wall3.position.x = 0;
				Wall3.position.z = 35;
				scene.add(Wall3);
				var cube = new THREE.BoxGeometry( 4, 50, 24, materials );
				Wall4 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall4.position.y = 5;
				Wall4.position.x = 35;
				Wall4.position.z = -25;
				scene.add(Wall4);
				var cube = new THREE.BoxGeometry( 4, 50, 24, materials );
				Wall5 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall5.position.y = 5;
				Wall5.position.x = 35;
				Wall5.position.z = 25;
				scene.add(Wall5);
				var cube = new THREE.BoxGeometry( 4, 10, 26, materials );
				Wall6 = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materials) );
				Wall6.position.y = 25;
				Wall6.position.x = 35;
				Wall6.position.z = 0;
				scene.add(Wall6);
				// Door
				var cube = new THREE.BoxGeometry( 2, 40, 26, materialsDoor );
				Door = new THREE.Mesh( cube, new THREE.MeshFaceMaterial(materialsDoor) );
				Door.position.y = 0;
				Door.position.x = 35;
				Door.position.z = 0;
				scene.add(Door);
				//
				Doorknob1 = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 0.5, 1, 9, 1 ), new THREE.MeshBasicMaterial( { color: 0x357574 }) );
				Doorknob1.rotation.z = Math.PI / 2;
				Doorknob1.position.set(33.5, 6, 7);
				scene.add(Doorknob1);
				Doorknob2 = new THREE.Mesh( new THREE.CylinderGeometry( 1.5, 0.5, 1, 9, 1 ), new THREE.MeshBasicMaterial( { color: 0x357574 }) );
				Doorknob2.rotation.z = 3*Math.PI / 2;
				Doorknob2.position.set(36.5, 6, 7);
				scene.add(Doorknob2);
				//
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
				container.append( renderer.domElement );		
					
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