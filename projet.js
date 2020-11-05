
// ======================================================================================================================
// Spécialisation des classes Sim et Acteur pour un projet particulier
// ======================================================================================================================

function Appli(){
	Sim.call(this) ; 
}

Appli.prototype = Object.create(Sim.prototype) ; 
Appli.prototype.constructor = Appli ; 

Appli.prototype.creerScene = function(params){
	params = params || {} ; 
	this.scene.add(new THREE.AxesHelper(3.0)) ; 
	this.scene.add(creerSol()) ; 

	var tux = new Acteur2("tux1",{path:"assets/obj/pingouin",obj:"penguin",mtl:"penguin"},this) ; 
	this.addActeur(tux) ; 

	var herbe1 = new Herbe("herbe1",{},this) ; 
	this.addActeur(herbe1) ;
	
	var i;
	var min = -50;
	var max = 50;
	for(i = 0; i < 100; i++) {
		var herbe2 = new Herbe("herbe2",{couleur:0xaaff55},this) ; 
		herbe2.setPosition(Math.floor(Math.random() * (max - min + 1)) + min, 0, Math.floor(Math.random() * (max - min + 1)) + min); 
		this.addActeur(herbe2) ;
	}

	var rocher = new Rocher("rocher",{largeur:3,profondeur:2,hauteur:1.5,couleur:0xffaa22},this);
	rocher.setPosition(-5,0.75,5) ; 
	this.addActeur(rocher) ; 
} 


// ========================================================================================================

function Acteur1(nom,data,sim){
	Acteur.call(this,nom,data,sim) ; 

	var repertoire = data.path + "/" ; 
	var fObj       = data.obj + ".obj" ; 
	var fMtl       = data.mtl + ".mtl" ; 

	var obj = chargerObj("tux1",repertoire,fObj,fMtl) ; 
	this.setObjet3d(obj) ;
	
}

Acteur1.prototype = Object.create(Acteur.prototype) ; 
Acteur1.prototype.constructor = Acteur1 ; 

Acteur1.prototype.actualiser = function(dt){
	console.log(this.sim.horloge) ; 
	var t = this.sim.horloge  ; 
	this.setOrientation(t) ;  
	this.setPosition(2*Math.sin(t),0.0,3*Math.cos(2*t)) ; 
}

function Acteur2(nom, data, sim){
	Acteur.call(this, nom, data, sim);

	var repertoire = data.path + "/" ; 
	var fObj       = data.obj + ".obj" ; 
	var fMtl       = data.mtl + ".mtl" ; 
	
	var obj = chargerObj("tux1",repertoire,fObj,fMtl) ; 
	this.setObjet3d(obj) ; 

	this.speed = new THREE.Vector3(1, 0, 0);
	this.position = new THREE.Vector3(1, 0, 0);
}
	
Acteur2.prototype = Object.create(Acteur.prototype) ; 
Acteur2.prototype.constructor = Acteur2 ; 

/*Acteur2.prototype.actualiser = function(dt){
	console.log(this.sim.horloge);
	var t = this.sim.horloge; 

	if(t%4 <= 0.04) {
		var orientation =  Math.floor(Math.random() * 360); 
		this.setOrientation(orientation) ;  
		console.log("Orientation");
	}
	
	if(this.object3D) {
	
		this.position.addScaledVector(this.speed, 1);
		this.object3D.position.addScaledVector(this.speed, 1) ; 
	}
}*/
Acteur2.prototype.actualiser = function(dt){
    //console.log(this.sim.horloge) ; 
    var t = this.sim.horloge ; 

    //Mise a jour régulière du déplacement du pinguin
    if((t*1000)%5000>0 & (t*1000)%5000<20) {
        var x=getRandomInt(100)-50;
        var z=getRandomInt(100)-50;
        new THREE.Vector3(x,0,z);
        this.objet3d.lookAt(new THREE.Vector3(x,0,z));
        this.vitesse=new THREE.Vector3();
    }
    //Ajout de l'accélération dans la bonne direction
    var acc=new THREE.Vector3(0,0,0.5);
    acc.applyQuaternion(this.objet3d.quaternion);

    //Ajout d'une accélération nouvelle
    this.appliquerForce(acc);

    //Actualisation de la position, de la vitesse et remise à 0 de l'accélération
    this.objet3d.position.addScaledVector(this.vitesse,dt) ;


    //Verification des bords de la map
    if(this.objet3d.position.x>50.0) this.objet3d.position.x=50.0;
    if(this.objet3d.position.z>50.0) this.objet3d.position.z=50.0;
    if(this.objet3d.position.x<-50.0) this.objet3d.position.x=-50.0;
    if(this.objet3d.position.z<-50.0) this.objet3d.position.z=-50.0;


    this.vitesse.addScaledVector(this.acceleration,dt) ;
    this.acceleration.set(0.0,0.0,0.0) ;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// La classe décrivant les touffes d'herbe
// =======================================

function Herbe(nom,data,sim){
	Acteur.call(this,nom,data,sim) ; 

	var rayon   = data.rayon || 0.25 ;  
	var couleur = data.couleur || 0x00ff00 ;  

	var sph = creerSphere(nom,{rayon:rayon, couleur:couleur}) ;
	this.setObjet3d(sph) ; 
}
Herbe.prototype = Object.create(Acteur.prototype) ; 
Herbe.prototype.constructor = Herbe ; 

// La classe décrivant les rochers
// ===============================

function Rocher(nom,data,sim){
	Acteur.call(this,nom,data,sim) ; 

	var l = data.largeur || 0.25 ;  
	var h = data.hauteur || 1.0 ; 
	var p = data.profondeur || 0.5 ;  
	var couleur = data.couleur || 0x00ff00 ;  

	var box = creerBoite(nom,{largeur:l, hauteur:h, profondeur:p, couleur:couleur}) ;
	this.setObjet3d(box) ; 
}
Rocher.prototype = Object.create(Acteur.prototype) ; 
Rocher.prototype.constructor = Rocher ; 






