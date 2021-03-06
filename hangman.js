//Written by Orry Jarvis and Joe McNelly
var gl;
var canvas;
var aspect;
var vertexArray = [];
var ambientArray = [];
var diffuseArray = [];
var specularArray = [];
var shininessArray = [];
var normalArray = [];
var numberOfHeadVertex = 12288;
var numberOfTorsoVertex = 36;
var numberOfBackgroundVertex = 138;
var numberOfArmVertex = 72;
var numberOfLegVertex = 36;

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
var headShininess=1000000.0;


//Dude's Torso and appendages
var torsoPoints = [
    vec4( -.8, -2,  0.4, 1.0 ),//0
    vec4( -.8,  1,  0.4, 1.0 ),//1
    vec4( .8,  1,  0.4, 1.0 ),//2
    vec4( .8, -2,  0.4, 1.0 ),//3
    vec4( -.8, -2, -0.4, 1.0 ),//4
    vec4( -.8,  1, -0.4, 1.0 ),//5
    vec4( .8,  1, -0.4, 1.0 ),//6
    vec4( .8, -2, -0.4, 1.0 ),  //7
    //right arm sleeve
    vec4( .8, .25, 0.4, 1.0 ),//8  
    vec4( .8, .25, -0.4, 1.0 ),//9  
    vec4( 1.55, .25, -0.4, 1.0 ),//10 
    vec4( 1.55, 1, -0.4, 1.0 ),//11 
    vec4( 1.55, 1, 0.4, 1.0 ),//12 
    vec4( 1.55, .25, 0.4, 1.0 ),//13 
    //right arm
    vec4( .8, .25, 0.4, 1.0 ),//14 
    vec4( .8, .25, -0.4, 1.0 ),//15  
    vec4( 1.55, .25, -0.4, 1.0 ),//16 
    vec4( 1.55, .25, 0.4, 1.0 ),//17
    vec4( .8, -.5, 0.4, 1.0 ),//18
    vec4( .8, -.5, -0.4, 1.0 ),//19
    vec4( 1.55, -.5, -0.4, 1.0 ),//20
    vec4( 1.55, -.5, 0.4, 1.0 ),//21
    //left arm sleeve
    vec4( -1.55, 1, -0.4, 1.0 ),//22  
    vec4( -1.55, 1, 0.4, 1.0 ),//23 
    vec4( -1.55, .25, -0.4, 1.0 ),//24
    vec4( -1.55, .25, 0.4, 1.0 ),//25  
    vec4( -.8, .25, 0.4, 1.0 ),//26 
    vec4( -.8, .25, -0.4, 1.0 ),//27 
    //left arm
    vec4( -1.55, .25, 0.4, 1.0 ),//28 
    vec4( -1.55, .25, -0.4, 1.0 ),//29 
    vec4( -.8, .25, -0.4, 1.0 ),//30 
    vec4( -.8, .25, 0.4, 1.0 ),//31 
    vec4( -1.55, -.5, 0.4, 1.0 ),//32 
    vec4( -1.55, -.5, -0.4, 1.0 ),//33 
    vec4( -.8, -.5, -0.4, 1.0 ),//34 
    vec4( -.8, -.5, 0.4, 1.0 ),//35
    //left leg
    vec4( -.2, -2, 0.4, 1.0 ),//36 
    vec4( -.2, -2, -0.4, 1.0 ),//37 
    vec4( -.8, -5, -0.4, 1.0 ),//38
    vec4( -.8, -5, 0.4, 1.0 ),//39
    vec4( -.2, -5, 0.4, 1.0 ),//40 
    vec4( -.2, -5, -0.4, 1.0 ),//41 

    //right leg
    vec4( .2, -2, -0.4, 1.0 ),//42
    vec4( .2, -2, 0.4, 1.0 ),//43 
    vec4( .2, -5, -0.4, 1.0 ),//44
    vec4( .2, -5, 0.4, 1.0 ),//45
    vec4( .8, -5, 0.4, 1.0 ),//46 
    vec4( .8, -5, -0.4, 1.0 ),//47 
];
var torsoAmbColor=vec4(1.0,0.0,0.0,1.0);
var torsoDiffColor=vec4(1.0,0.3,0.3,1.0);
var torsoSpecColor=vec4(1.0,0.3,0.3,1.0);
var torsoAmb;
var torsoDiff;
var torsoSpec;
var torsoShininess=2.0;




//legs lighting
var pantsAmbColor=vec4(17/255,53/255,114/255,1.0);
var pantsDiffColor=vec4(.3,.35,114/255,1.0);
var pantsSpecColor=vec4(0/255,0,114/255,1.0);
var pantsAmb;
var pantsDiff;
var pantsSpec;
var pantsShininess=2.0;

//the post
var postPoints = [
    vec4( -2, 4,  0.2, 1.0 ),//0
    vec4( -2,  5,  0.2, 1.0 ),//1
    vec4( 5,  5,  0.2, 1.0 ),//2
    vec4( 5, 4,  0.2, 1.0 ),//3
    vec4( -2, 4, -0.2, 1.0 ),//4
    vec4( -2,  5, -0.2, 1.0 ),//5
    vec4( 5,  5, -0.2, 1.0 ),//6
    vec4( 5, 4, -0.2, 1.0 ),//7         now start with making the vertical bar
    vec4(5, -6, 0.2, 1),//8
    vec4(5,-6, -0.2, 1),//9
    vec4(4, 4,0.2,1),//10
    vec4(4,4,-0.2,1),//11
    vec4(4,-6,0.2,1),//12
    vec4(4,-6,-0.2,1)//13               
];

var postAmbColor=vec4(77/255,32/255,0.0,1.0);
var postDiffColor=vec4(77/255,0.3,0.3,1.0);
var postSpecColor=vec4(77/255,0,0,1.0);
var postAmb;
var postDiff;
var postSpec;
var postShininess=2.0;

//the rope
var ropePoints = [
    vec4(-0.1,4,0.1,1),//0
    vec4(0.1,4,0.1,1),//1
    vec4(0.1,3,0.1,1),//2
    vec4(-0.1,3,0.1,1),//3
    vec4(-0.1,4,-0.1,1),//4
    vec4(0.1,4,0-.1,1),//5
    vec4(0.1,3,-0.1,1),//6
    vec4(-0.1,3,-0.1,1)//7
];

var ropeAmbColor=vec4(191/255,124/255,52/255,1.0);
var ropeDiffColor=vec4(191/255,124/255,52/255,1.0);
var ropeSpecColor=vec4(191/255,124/255,2/255,1.0);
var ropeAmb;
var ropeDiff;
var ropeSpec;
var ropeShininess=2.0;



//the ground

var groundPoints = [
    vec4(-6,-6,6,1),//0
    vec4(-6,-7,6,1),//1
    vec4(6,-6,6,1),//2
    vec4(6,-7,6,1),//3
    vec4(-6,-6,-6,1),//4
    vec4(-6,-7,-6,1),//5
    vec4(6,-6,-6,1),//6
    vec4(6,-7,-6,1)//7
];


var groundAmbColor=vec4(11/255,97/255,11/255,1.0);
var groundDiffColor=vec4(11/255,97/255,11/255,1.0);
var groundSpecColor=vec4(0, 97/255,0,1.0);
var groundAmb;
var groundDiff;
var groundSpec;
var groundShininess=2.0;


var near = -20;
var far = 20;
var radius = 4.5;
var theta  = 0.0;
var phi    = 0.25;
var dr = 5.0 * Math.PI/180.0;

var left = -6;
var right = 6;
var ytop =6;
var bottom = -6;


    
var lightPosition = vec4(12, 10, -2, 1.0 );//7-5-7-0
var lightAmbient = vec4(0.01, 0.01, 0.01, 1.0 );
var lightDiffuse = vec4( 0.9, 0.9, 0.9, 1.0 );
var lightSpecular = vec4( 0.9,0.9, 0.9, 1.0 );


var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;
var eye;
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var score = 0;



var texSize = 256;
var numChecks = 8;
var texture1, texture2;
var t1, t2;

var c;

var flag = true;
var texCoordsArray = [];
var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0)
];

var alphabet=["a","b","c","d","e",
	"f","g","h","i","j","k","l","m"
	,"n","o","p","q","r","s","t","u",
	"v","w","x","y","z"];
var lettersLeft=alphabet.slice(0);
var lettersGuessed=[];
var wordToGuess="";
var lettersDisplayable=[];
var p1Score=0;
var p2Score=0;

var image2 = new Uint8Array(4*texSize*texSize);

   /* for ( var i = 0; i < texSize; i++ ) {
        for ( var j = 0; j <texSize; j++ ) {
            image2[4*i*texSize+4*j] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+1] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+2] = 127+127*Math.sin(0.1*i*j);
            image2[4*i*texSize+4*j+3] = 255;
           }
    }*/
    
    for ( var i = 0; i < texSize; i++ ) {
        for ( var j = 0; j <texSize; j++ ) {
            var patchx = Math.floor(i/(texSize/numChecks));
            var patchy = Math.floor(j/(texSize/numChecks));
            if(patchx%2 ^ patchy%2) c = 255;
            else c = 0;
            //c = 255*(((i & 0x8) == 0) ^ ((j & 0x8)  == 0))
            image2[4*i*texSize+4*j] = c;
            image2[4*i*texSize+4*j+1] = c;
            image2[4*i*texSize+4*j+2] = c;
            image2[4*i*texSize+4*j+3] = 255;
        }
    }
//end global variables


//init on load function

window.onload = function init()
{

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
  
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 46/255, 204/255, 250/255, 1 ); //light blue
	gl.enable(gl.DEPTH_TEST);
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
	aspect = canvas.width / canvas.height;
    
    headAmb = mult(lightAmbient, headAmbColor);
    headDiff = mult(lightDiffuse, headDiffColor);
    headSpec = mult(lightSpecular, headSpecColor);
	torsoAmb = mult(lightAmbient, torsoAmbColor);
    torsoDiff = mult(lightDiffuse, torsoDiffColor);
    torsoSpec = mult(lightSpecular, torsoSpecColor);
    postAmb = mult(lightAmbient, postAmbColor);
    postDiff = mult(lightDiffuse, postDiffColor);
    postSpec = mult(lightSpecular, postSpecColor);
    groundAmb = mult(lightAmbient, groundAmbColor);
    groundDiff = mult(lightDiffuse, groundDiffColor);
    groundSpec = mult(lightSpecular, groundSpecColor);
    pantsAmb = mult(lightAmbient, pantsAmbColor);
    pantsDiff = mult(lightDiffuse, pantsDiffColor);
    pantsSpec = mult(lightSpecular, pantsSpecColor);
    ropeAmb = mult(lightAmbient, ropeAmbColor);
    ropeDiff = mult(lightDiffuse, ropeDiffColor);
    ropeSpec = mult(lightSpecular, ropeSpecColor);

    //POPULATE POINTS
    initTex();
    makePost();
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
    
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );
    
    gl.activeTexture( gl.TEXTURE0 );
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.uniform1i(gl.getUniformLocation( program, "Tex0"), 0);
	
	
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
	
	document.getElementById("remaining").innerHTML=getRemainingLetters();
	
	document.getElementById("life").innerHTML=getLife();
	
    
	
	var reset = document.getElementById("reset");
    reset.addEventListener("click", function(){
        location.reload();
    });
	
	document.getElementById("enterWord").onclick = function() {
		var submission = document.getElementById("textBox").value;
		document.getElementById("textBox").value="";
		
		document.getElementById("invalid").style.visibility='hidden';
		
		if(validWord(submission)){
			wordToGuess=submission;
		
			for (i = 0;i<wordToGuess.length;i++){
				lettersDisplayable.push(false);
			}
            if (wordToGuess.length > 12){
                document.getElementById("wordProgress").style.fontSize = "20px";
            }
			document.getElementById("wordProgress").innerHTML=getDisplayString();
		
			document.getElementById("enterWord").style.visibility='hidden';
			document.getElementById("wordEnter").style.visibility='hidden';
            document.getElementById("enterWord").style.display='none';
			document.getElementById("wordEnter").style.display='none';
			document.getElementById("submitButton").style.visibility='visible';
			document.getElementById("charEnter").style.visibility='visible';
		}else{
			document.getElementById("invalid").style.visibility='visible';
		}
		
	};
	document.getElementById("submitButton").onclick = function(){
		var submission = document.getElementById("textBox").value;
		document.getElementById("textBox").value="";
		document.getElementById("invalid").style.visibility='hidden';
		if(!isValid(submission)){
			//display:
				//"Invalid submission. Please pick a letter. Make sure it
				//hasn't been picked.
			document.getElementById("invalid").style.visibility='visible';
		}else if(isCorrect(submission)){
			//fill in letters in word
			
			//remove from letters left
			//add to letters guessed
			var index=lettersLeft.indexOf(submission);
			lettersLeft.splice(index,1)
			lettersGuessed.push(submission);
			
			if(allCorrect()){
				//win win win
				document.getElementById("win").style.visibility='visible';
				document.getElementById("submitButton").disabled=true;
			}
			
		}else{
			//draw hangman part
			score++;
			//remove from letters left
			//add to letters guessed
			var index=lettersLeft.indexOf(submission);
			lettersLeft.splice(index,1)
			lettersGuessed.push(submission);
			
			if (score>5){
				//Lose lose lose
				document.getElementById("lose").style.visibility='visible';
				document.getElementById("submitButton").disabled=true;
			}
		}
		document.getElementById("guessed").innerHTML=getGuessedLetters();
		document.getElementById("remaining").innerHTML=getRemainingLetters();
		document.getElementById("wordProgress").innerHTML=getDisplayString();
		document.getElementById("life").innerHTML=getLife();
		
	};
    render();

}
function render()
{
   
    //do normal render things
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    eye = vec3(10*Math.sin(theta)*Math.cos(phi), 
        10*Math.sin(theta)*Math.sin(phi), 10*Math.cos(theta));
        
    /*eye = vec3(radius*Math.sin(theta)*Math.cos(phi), 
        radius*Math.sin(theta)*Math.sin(phi), radius*Math.cos(theta));
        */
    modelViewMatrix = lookAt(eye, at , up);
    //projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    projectionMatrix =perspective(90, aspect,1,20);
	
	
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    theta+=.01;
    drawBackground();

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

function getLife(){
	return ""+(6-score);
}
function allCorrect(){
	for (i=0;i<lettersDisplayable.length;i++){
		if(!(lettersDisplayable[i])){
			return false;
		}
	}
	return true;
}
function getGuessedLetters(){
	var returnString="";
	for (i=0;i<lettersGuessed.length;i++){
		returnString+=lettersGuessed[i];
		if (!(i==lettersGuessed.length-1)){
			returnString+=", "
		}
	}
	return returnString;
}

function getRemainingLetters(){
	var returnString="";
	for (i=0;i<lettersLeft.length;i++){
		returnString+=lettersLeft[i];
		if (!(i==lettersLeft.length-1)){
			returnString+=", "
		}
	}
	return returnString;
}
function isCorrect(subString){
	var returnTrue=false;
	for (i=0;i<wordToGuess.length;i++){
		if(subString.toLowerCase().charAt(0)==wordToGuess.toLowerCase().charAt(i)){
			returnTrue= true;
			lettersDisplayable[i]=true;
		}
	}
	return returnTrue;
}

function isValid(subString){
	if (!(subString.length==1)){
		return false;
	}
	if (!(alphabet.indexOf(subString.toLowerCase())>-1)){
		return false;
	}
	if (!(lettersLeft.indexOf(subString.toLowerCase())>-1)){
		return false;
	}
	return true;
}

function validWord(submission){
	for (i=0;i<submission.length;i++){
		if (!(alphabet.indexOf(submission.toLowerCase().charAt(i))>-1)){
			return false;
		}
	}
	return true;
}

function getDisplayString(){
	var returnString="";
	for (i=0;i<wordToGuess.length;i++){
		if (lettersDisplayable[i]){
			returnString+=wordToGuess.charAt(i);
		}else{
			returnString+="_";
		}
		if(!(i==wordToGuess.length-1)){
			returnString+=" ";
		}
	}
	return returnString;
}

function drawBackground(){
    gl.drawArrays( 
        gl.TRIANGLES,
            0, 
        numberOfBackgroundVertex );
}
function drawHead(){
    for( var i=0; i<numberOfHeadVertex; i+=3) 
        gl.drawArrays( gl.TRIANGLES, i + numberOfBackgroundVertex , 3 );
}
function drawTorso(){
	gl.drawArrays( 
        gl.TRIANGLES, 
            numberOfHeadVertex+
            numberOfBackgroundVertex, 
        numberOfTorsoVertex );
}
function drawLeftArm(){
    gl.drawArrays( 
        gl.TRIANGLES, 
            numberOfHeadVertex+
            numberOfTorsoVertex+
            numberOfBackgroundVertex, 
        numberOfArmVertex );
}
function drawRightArm(){
    gl.drawArrays( 
        gl.TRIANGLES, 
            numberOfHeadVertex+
            numberOfTorsoVertex+
            numberOfBackgroundVertex+
            numberOfArmVertex, 
        numberOfArmVertex );
}
function drawLeftLeg(){
    gl.drawArrays( 
        gl.TRIANGLES, 
            numberOfHeadVertex+
            numberOfTorsoVertex+
            numberOfBackgroundVertex+
            2*numberOfArmVertex, 
        numberOfLegVertex );
}
function drawRightLeg(){
    gl.drawArrays( 
        gl.TRIANGLES, 
            numberOfHeadVertex+
            numberOfTorsoVertex+
            numberOfBackgroundVertex+
            2*numberOfArmVertex+
            numberOfLegVertex, 
        numberOfLegVertex );
}



//Helper methods 


//initialize the texture map
function initTex(){
    texture2 = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, texture2 );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image2);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, 
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

} 


function torso()
{
    //body
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
    //right sleeve
    quad( 2, 8, 13, 12 );
    quad( 8, 9, 10, 13 );
    quad( 12, 13, 10, 11 );
    quad( 11, 10, 9, 6 );
    quad( 6, 9, 8, 2 );
    quad( 6, 2, 12, 11 );
    //right arm
    quad4(14,18,21,17);
    quad4(15,19,18,14);
    quad4(16,20,19,15);
    quad4(17,21,20,16);
    quad4(18,19,20,21);
    quad4(15,14,17,16);
    //left sleeve
    quad( 23, 25, 26, 1 );
    quad( 25, 24, 27, 26 );
    quad( 22, 23, 1, 5 );
    quad( 1, 26, 27, 5 );
    quad( 5, 27, 24, 22 );
    quad( 22, 24, 25, 23 );
    //left arm
    quad4(28,32,35,31);
    quad4(29,33,32,28);
    quad4(30,34,33,29);
    quad4(31,35,34,30);
    quad4(32,33,34,35);
    quad4(29,28,31,30);
    //left leg
    quad5(0,39,40,41);
    quad5(36,40,41,37);
    quad5(37,41,38,4);
    quad5(4,38,39,0);
    quad5(39,38,41,40);
    quad5(4,0,36,37);
    //right leg
    quad5(43,45,46,3);
    quad5(3,46,47,7);
    quad5(7,47,44,42);
    quad5(42,44,45,43);
    quad5(42,43,3,7);
    quad5(45,44,47,46);
}


function makePost()//background
{
   
    //horizontal post
    quad2( 1, 0, 3, 2 );
    quad2( 2, 3, 7, 6 );
    quad2( 3, 0, 4, 7 );
    quad2( 6, 5, 1, 2 );
    quad2( 4, 5, 6, 7 );
    quad2( 5, 4, 0, 1 );
    //vertical post
    quad2( 10, 3, 8, 12 );
    quad2( 3, 7, 9, 8 );
    quad2( 11, 10, 12, 13 );
    quad2( 7, 11, 13, 9 );
    quad2( 12, 8, 13, 9 );
    //ground
    quad3( 0,2,3,1 );
    quad3( 2,6,7,3 );
    quad3( 4,0,1,5 );
    quad3( 6,4,5,7 );
    quad3( 4,6,2,0 );
    quad3( 1,3,7,5 );
    //rope
    
    quad6( 0,1,2,3 );
    quad6(1,5,6,2);
    quad6(5,4,7,6);
    quad6(4,0,3,7);
    quad6(4,5,1,0);
    quad6(3,2,6,7);
    
}




/*
"Block" Helper methods(torso, post, arms, etc.)
*/

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
     texCoordsArray.push(texCoord[0]);
     texCoordsArray.push(texCoord[1]);
     texCoordsArray.push(texCoord[2]);
     texCoordsArray.push(texCoord[0]);
     texCoordsArray.push(texCoord[2]);
     texCoordsArray.push(texCoord[3]);
     
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

function quad2(a, b, c, d) {
    
    var pa = postPoints[a];
    var pb = postPoints[b];
    var pc = postPoints[c];
    var pd = postPoints[d];

     vertexArray.push(postPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(postPoints[b]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(postPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(postPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(postPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(postPoints[d]); 
     texCoordsArray.push(texCoord[0]);
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(postSpec);
		diffuseArray.push(postDiff);
		shininessArray.push(postShininess);
		ambientArray.push(postAmb);
	}
    
}

function quad3(a, b, c, d) {
    
    var pa = groundPoints[a];
    var pb = groundPoints[b];
    var pc = groundPoints[c];
    var pd = groundPoints[d];

     vertexArray.push(groundPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(groundPoints[b]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(groundPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(groundPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(groundPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(groundPoints[d]); 
     texCoordsArray.push(texCoord[0]);
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(groundSpec);
		diffuseArray.push(groundDiff);
		shininessArray.push(groundShininess);
		ambientArray.push(groundAmb);
	}
    
}

function quad4(a, b, c, d) {
    
    var pa = torsoPoints[a];
    var pb = torsoPoints[b];
    var pc = torsoPoints[c];
    var pd = torsoPoints[d];

     vertexArray.push(torsoPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[b]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[d]); 
     texCoordsArray.push(texCoord[0]);
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(headSpec);
		diffuseArray.push(headDiff);
		shininessArray.push(headShininess);
		ambientArray.push(headAmb);
	}
    
}


function quad5(a, b, c, d) {
    
    var pa = torsoPoints[a];
    var pb = torsoPoints[b];
    var pc = torsoPoints[c];
    var pd = torsoPoints[d];

     vertexArray.push(torsoPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[b]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(torsoPoints[d]); 
     texCoordsArray.push(texCoord[0]);
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(pantsSpec);
		diffuseArray.push(pantsDiff);
		shininessArray.push(pantsShininess);
		ambientArray.push(pantsAmb);
	}
    
}

function quad6(a, b, c, d) {
    var pa = ropePoints[a];
    var pb = ropePoints[b];
    var pc = ropePoints[c];
    var pd = ropePoints[d];

     vertexArray.push(ropePoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(ropePoints[b]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(ropePoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(ropePoints[a]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(ropePoints[c]); 
    texCoordsArray.push(texCoord[0]);
     vertexArray.push(ropePoints[d]); 
     texCoordsArray.push(texCoord[0]);
     
    var t1 = subtract(pb,pa)
	var t2 = subtract(pc,pa)
	var norm = normalize(cross(t1,t2));
	norm = vec4(norm);
	for (var i=0; i<6; i++){
		normalArray.push(norm);
		specularArray.push(ropeSpec);
		diffuseArray.push(ropeDiff);
		shininessArray.push(ropeShininess);
		ambientArray.push(ropeAmb);
	}
    
    
}

//End "block" helper methods



/*
Helper methods for drawing the head
*/

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
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[0]);
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