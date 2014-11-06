var gl;
var canvas;
var vBuffer;
var cBuffer;
var MAXNUM=1000; //maximum number of vertices, adjust as needed
var index=0; //pointer to current location in buffer

var colors = [vec4(0.4,0.0,0.0,1.0),//red
              vec4(0.0,0.4,0.0,1.0),//green
			  vec4(0.0,0.0,0.4,1.0),//blue
              vec4(0,0,0,1),//black
              vec4(1,1,1,1)//white
            ]

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
  
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1, 1, 1, 1 ); //white for now
	gl.enable(gl.DEPTH_TEST);
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	//Create and associate Vertex buffer
	vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 8*MAXNUM, gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//Create and associate Color buffer
	cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, 16*MAXNUM, gl.STATIC_DRAW);
	
	var vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    
    //add other gl setup things here for 3d stuffs and whatnot
    
    
    //add button/key listeners
    
    render();

}
function render()
{
    //do normal render things

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
}

function drawHead(){
//push the points to the buffers and whatnot
}
function drawTorso(){
//push the points to the buffers and whatnot
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