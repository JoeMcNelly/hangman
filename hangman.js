var gl;
var canvas;
var vertexArray = [];
var ambientArray = [];
var diffuseArray = [];
var specularArray = [];
var shininessArray = [];
var normalArray = [];


//Dudes head
var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);
var numTimesToSubdivide = 5;
var headAmbColor=vec4(240.0/255.0,230.0/255.0,140.0/255.0,1.0);
var headDiffColor=vec4(240.0/255.0,230.0/255.0,140.0/255.0,1.0);
var headSpecColor=vec4(240.0/255.0,230.0/255.0,140.0/255.0,1.0);
var headAmb;
var headDiff;
var headSpec;
var headShininess=1000.0;
var index=0; //pointer to current location in buffer


//Dude's Torso
var torsoPoints = [
    vec4( -0.25, -2,  0.2, 1.0 ),
    vec4( -0.25,  2,  0.2, 1.0 ),
    vec4( 0.15,  2,  0.2, 1.0 ),
    vec4( 0.15, -2,  0.2, 1.0 ),
    vec4( -0.15, -2, -0.2, 1.0 ),
    vec4( -0.15,  2, -0.2, 1.0 ),
    vec4( 0.25,  2, -0.2, 1.0 ),
    vec4( 0.25, -2, -0.2, 1.0 )
];
var torsoAmbColor=vec4(1.0,0.0,0.0,1.0);
var torsoDiffColor=vec4(1.0,0.8,0.2,1.0);
var torsoSpecColor=vec4(1.0,0.5,0.5,1.0);
var torsoAmb;
var torsoDiff;
var torsoSpec;
var torsoShininess=2.0;



var near = -10;
var far = 10;
var radius = 2.5;
var theta  = 0.0;
var phi    = 0.0;


var left = -6;
var right = 6;
var ytop =6;
var bottom = -6;


    
var lightPosition = vec4(1, -1, 1, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );


var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var score = 0;

function quad(a, b, c, d) {
    
    var pa = torsoPoints[a];
    var pb = torsoPoints[b];
    var pc = torsoPoints[c];
    var pd = torsoPoints[d];

     vertexArray.push(torsoPoints[a]); 
 
     vertexArray.push(torsoPoints[b]); 

     vertexArray.push(torsoPoints[c]); 
   
     vertexArray.push(torsoPoints[a]); 

     vertexArray.push(torsoPoints[c]); 

     vertexArray.push(torsoPoints[d]); 
     
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(torsoSpec);
		diffuseArray.push(torsoDiff);
		shininessArray.push(torsoShininess);
		ambientArray.push(torsoAmb);
	}
    
}

function torso()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}
function triangle(a,b,c){

	var t1 = subtract(b,a)
	var t2 = subtract(c,a)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<3; i++){
		normalArray.push(norm);
		specularArray.push(headSpec);
		diffuseArray.push(headDiff);
		shininessArray.push(headShininess);
		ambientArray.push(headAmb);
	}
    
    a= vec4(a[0], a[1] + 2, a[2], a[3])
    b= vec4(b[0], b[1] + 2, b[2], b[3])
    c= vec4(c[0], c[1] + 2, c[2], c[3])
    
	vertexArray.push(a);
	vertexArray.push(b);
	vertexArray.push(c);
	index+=3;
}
function divideTriangle(a, b, c, count) {
    if ( count > 0 ) {
                
        var ab = mix( a, b, 0.5);
        var ac = mix( a, c, 0.5);
        var bc = mix( b, c, 0.5);
                
        ab = normalize(ab, true);
        ac = normalize(ac, true);
        bc = normalize(bc, true);
                                
        divideTriangle( a, ab, ac, count - 1 );
        divideTriangle( ab, b, bc, count - 1 );
        divideTriangle( bc, c, ac, count - 1 );
        divideTriangle( ab, bc, ac, count - 1 );
    }
    else { 
        triangle( a, b, c );
    }
}


function tetrahedron(a, b, c, d, n) {
    divideTriangle(a, b, c, n);
    divideTriangle(d, c, b, n);
    divideTriangle(a, d, b, n);
    divideTriangle(a, c, d, n);
}




window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
  
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( .9, .9, .9, 1 ); //gray for now
	gl.enable(gl.DEPTH_TEST);
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    
    headAmb = mult(lightAmbient, headAmbColor);
    headDiff = mult(lightDiffuse, headDiffColor);
    headSpec = mult(lightSpecular, headSpecColor);
	torsoAmb = mult(lightAmbient, torsoAmbColor);
    torsoDiff = mult(lightDiffuse, torsoDiffColor);
    torsoSpec = mult(lightSpecular, torsoSpecColor);

    //POPULATE POINTS
    tetrahedron(va, vb, vc, vd, numTimesToSubdivide);
	torso();
	////////////////
	
	
	
	//Buffer of normals
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalArray), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

	//vertex Buffer
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexArray), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
	//ambient color buffer
	var aBuffer =gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, aBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ambientArray), gl.STATIC_DRAW);
    
    var ambientColor = gl.getAttribLocation( program, "ambientColor");
    gl.vertexAttribPointer(ambientColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ambientColor);
	
	//specular color buffer
	var spBuffer =gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, spBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(specularArray), gl.STATIC_DRAW);
    
    var specularColor = gl.getAttribLocation( program, "specularColor");
    gl.vertexAttribPointer(specularColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(specularColor);
	
	//diffuse color buffer
	var dBuffer =gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, dBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(diffuseArray), gl.STATIC_DRAW);
    
    var diffuseColor = gl.getAttribLocation( program, "diffuseColor");
    gl.vertexAttribPointer(diffuseColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(diffuseColor);
	
	//shininess buffer
	var shBuffer =gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, shBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(shininessArray), gl.STATIC_DRAW);
    
    var matShininess = gl.getAttribLocation( program, "shininess");
    gl.vertexAttribPointer(matShininess, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(matShininess);
	
	
    modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );
    
    //add other gl setup things here for 3d stuffs and whatnot
    
	gl.uniform4fv( gl.getUniformLocation(program, 
       "lightPosition"),flatten(lightPosition) );
	gl.uniform4fv( gl.getUniformLocation(program, 
       "lightAmbient"),flatten(lightAmbient) );
	gl.uniform4fv( gl.getUniformLocation(program, 
       "lightSpecular"),flatten(lightSpecular) );
	gl.uniform4fv( gl.getUniformLocation(program, 
       "lightDiffuse"),flatten(lightDiffuse) );
    //add button/key listeners
    document.getElementById("incScore").onclick = function(){score++;};
	
	
    render();

}
function render()
{
    //do normal render things
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));

    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    //drawBackground();
    

    if (score > 0){
        drawHead();   
    }
	if (score > 1){
        drawTorso();  
    }
    if(score > 2){
        drawLeftArm();
    }
	if(score>3){
		drawRightArm();
	}
	if(score>4){
		drawLeftLeg();
	}
	if(score>5){
		drawRightLeg();
	}
     window.requestAnimFrame(render);
}
function drawBackground(){
//push the points and play destiny
}
function drawHead(){
    for( var i=0; i<index; i+=3) 
        gl.drawArrays( gl.TRIANGLES, i, 3 );
}
function drawTorso(){
	gl.drawArrays( gl.TRIANGLES, index, 36 );
}
function drawLeftArm(){
//push the points to the buffers and whatnot
}
function drawRightArm(){
//push the points to the buffers and whatnot
}
function drawLeftLeg(){
//push the points to the buffers and whatnot
}
function drawRightLeg(){
//push the points to the buffers and whatnot
}
