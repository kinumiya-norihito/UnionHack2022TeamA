//図形
class Figure{
    #context;
    #positionX;
    #positionY;
    #style;
    #drawType;
    #lineWidth;

    constructor(context, positionX, positionY, drawType){
        this.#context = context;
        this.#positionX = positionX;
        this.#positionY = positionY;
        this.#drawType = drawType;
    }

    get positionX(){
        return this.#positionX;
    }

    get positionY(){
        return this.#positionY;
    }

    get context(){
        return this.#context;
    }

    set setStyle(style){
        this.#style = style;
    }

    set lineWidth(lineWidth){
        this.#lineWidth=lineWidth;
    }

    //移動
    move(dx,dy){
        this.#positionX+=dx;
        this.#positionY+=dy;
    }

    draw(){
        if(this.#drawType){
            this.#context.fillStyle=this.#style;
            this.#context.fill();
        }
        else{
            this.#context.strokeStyle=this.#style;
            this.#context.lineWidth=this.#lineWidth;
            this.#context.stroke();
        }
    }

    //内外判定
    isIn(x,y){
        return this.#context.isPointInPath(x,y);
    }
};

/*
move(xdx,dy): void, 現在位置からdx,dyだけ移動
draw(): void, 図形を描写
isIn(x,y): bool, x,yが図形のpath内にあるかを判定
 */

class Circle extends Figure{
    #radius;
    constructor(context, positionX, positionY, radius, drawType){
        super(context, positionX, positionY, drawType);
        this.#radius = Math.abs(radius);
    }

    move(dx,dy){
        super.move(dx,dy);
    }

    #makePath(){
        super.context.beginPath();
        super.context.arc(super.positionX, super.positionY, this.#radius, 0, 2*Math.PI, 1);
    }

    draw(){
        this.#makePath();
        super.draw();
    }

    isIn(x,y){
        this.#makePath();
        return super.isIn(x,y);
    }
};

class Rectangle extends Figure{
    #width;
    #height;
    constructor(context, positionX, positionY, width, height, drawType){
        super(context, positionX, positionY, drawType);
        this.#width = Math.abs(width);
        this.#height = Math.abs(height);
    }

    move(dx,dy){
        super.move(dx,dy);
    }

    #makePath(){
        super.context.beginPath();
        super.context.rect(super.positionX, super.positionY, this.#width, this.#height);
    }

    draw(){
        this.#makePath();
        super.draw();
    }

    isIn(x,y){
        this.#makePath();
        return super.isIn(x,y);
    }
}

class Triangle extends Figure{
    #p1x;
    #p1y;
    #p2x;
    #p2y;
    constructor(context, p0x, p0y, p1x, p1y, p2x, p2y, drawType){
        super(context, p0x, p0y, drawType);
        this.#p1x = p1x-p0x;
        this.#p1y = p1y-p0y;
        this.#p2x = p2x-p0x;
        this.#p2y = p2y-p0y;
    }

    move(dx,dy){
        super.move(dx,dy);
    }

    #makePath(){
        super.context.beginPath();
        const p0x=super.positionX,p0y=super.positionY;
        super.context.moveTo(p0x, p0y);
        super.context.lineTo(this.#p1x+p0x,this.#p1y+p0y);
        super.context.lineTo(this.#p2x+p0x,this.#p2y+p0y);
        super.context.closePath();
    }

    draw(){
        this.#makePath();
        super.draw();
    }

    isIn(x,y){
        this.#makePath();
        return super.isIn(x,y);
    }
}