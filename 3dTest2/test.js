
var canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight - canvas.offsetTop;

main();

function main(){
    var cube = new Cube(new Vertex(0,0,0),100);
    var obj = [cube];
    //順時針45,35,30
    rotateX(cube,ToRad(45));// +
    rotateY(cube,ToRad(-35));// -
    rotateZ(cube,ToRad(30));// +

    render3d(obj,ctx,width/2,height/2);
}

function ToRad(angle){
    return angle*Math.PI/180;
}

function Vertex(x, y, z){
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.z = parseFloat(z);
}
function Vertex2d(x, y){
    this.x = parseFloat(x);
    this.y = parseFloat(y);
}

function Cube(center,size){
    var s = size / 2,//float
        c = center;//Vertex

    this.vertices = [
        new Vertex(c.x - s, c.y - s, c.z + s),// 0
        new Vertex(c.x - s, c.y + s, c.z + s),// 1
        new Vertex(c.x + s, c.y + s, c.z + s),// 2
        new Vertex(c.x + s, c.y - s, c.z + s),// 3
        new Vertex(c.x + s, c.y - s, c.z - s),// 4
        new Vertex(c.x + s, c.y + s, c.z - s),// 5
        new Vertex(c.x - s, c.y + s, c.z - s),// 6
        new Vertex(c.x - s, c.y - s, c.z - s),// 7
    ];
    this.face = [
        [this.vertices[0],this.vertices[1],this.vertices[2],this.vertices[3]],//front
        [this.vertices[3],this.vertices[2],this.vertices[5],this.vertices[4]],//right
        [this.vertices[4],this.vertices[5],this.vertices[6],this.vertices[7]],//back
        [this.vertices[7],this.vertices[6],this.vertices[1],this.vertices[0]],//left
        [this.vertices[0],this.vertices[3],this.vertices[4],this.vertices[7]],//up
        [this.vertices[6],this.vertices[1],this.vertices[2],this.vertices[5]]//down
    ];
}

function render3d(objects,ctx,dx,dy){
    for(var i = 0;i < objects.length;i++){
        for(var j = 0;j < objects[i].face.length;j++){
            var face = objects[i].face[j];

            var p = project2d(face[0]);
            ctx.beginPath();
            ctx.moveTo(p.x+dx, p.y+dy);
            for(var k = 1;k < face.length;k++){
                p = project2d(face[k]);
                ctx.lineTo(p.x+dx, p.y+dy);
            }
            ctx.closePath();

            ctx.stroke();
        }
    }
}

function project(M){
    var d = 300;
    var r = d / (d + M.z);

    return new Vertex2d(M.x*r, M.y*r);
}
function project2d(M){
    return new Vertex2d(M.x, M.y);
}

function rotateX(c,angle){
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    for(var i = 0;i<c.vertices.length;i++){
        var p = c.vertices[i];
        var y = p.y*cos - p.z*sin;
        var z = p.z*cos + p.y*sin;

        p.y = y;
        p.z = z;
    }
}

function rotateY(c,angle){
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    for(var i = 0;i < c.vertices.length;i++){
        var p = c.vertices[i];
        var x = p.x*cos - p.z*sin;
        var z = p.z*cos + p.x*sin;

        p.x = x;
        p.z = z;
    }
}
function rotateZ(c,angle){
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);
    for(var i = 0;i < c.vertices.length;i++){
        var p = c.vertices[i];
        var x = p.x*cos - p.y*sin;
        var y = p.y*cos + p.x*sin;

        p.x = x;
        p.y = y;
    }
}