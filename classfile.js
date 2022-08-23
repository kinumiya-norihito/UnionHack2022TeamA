//図形
class Figure{
    #context;
    #positionX;
    #positionY;
    #style;
    #drawType;

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
            this.#context.stroke();
        }
    }

    //内外判定
    isIn(x,y){
        return false;
    }
};

class Circle extends Figure{
    #radius;
    constructor(context, positionX, positionY, radius, drawType){
        super(context, positionX, positionY, drawType);
        this.#radius = Math.abs(radius);
    }

    move(dx,dy){
        super.move(dx,dy);
    }

    draw(){
        super.context.beginPath();
        super.context.arc(super.positionX, super.positionY, this.#radius, 0, 2*Math.PI, 1);
        super.draw();
    }

    isIn(x,y){
        return (x-super.positionX)**2+(y-super.positionY)**2<=this.#radius**2;
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

    draw(){
        super.context.beginPath();
        super.context.rect(super.positionX, super.positionY, this.#width, this.#height);
        super.draw();
    }

    isIn(x,y){
        const px = super.positionX, py = super.positionY;
        return px <= x && x <= px + this.#width && py <= y && y <= py + this.#height;
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

    draw(){
        super.context.beginPath();
        const p0x=super.positionX,p0y=super.positionY;
        super.context.moveTo(p0x, p0y);
        super.context.lineTo(this.#p1x+p0x,this.#p1y+p0y);
        super.context.lineTo(this.#p2x+p0x,this.#p2y+p0y);
        super.context.closePath();
        super.draw();
    }

    isIn(x,y){
        const px=x-super.positionX,py=y-super.positionY;
        const cp=(p0x,p0y,p1x,p1y,p2x,p2y)=>{
            return (p1x-p0x)*(p2y-p1y)-(p1y-p0y)*(p2x-p1x)<0;
        };
        const f0=cp(0,0,this.#p1x,this.#p1y,px,py);
        const f1=cp(this.#p1x,this.#p1y,this.#p2x,this.#p2y,px,py);
        const f2=cp(this.#p2x,this.#p2y,0,0,px,py);
        return f0==f1&&f1==f2;
    }
}