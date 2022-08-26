window.onload=()=>{
    const canvasElement = document.getElementById('canvas'), context = canvasElement.getContext('2d');
    const addFigureButtonElement = document.getElementById('addFigureButtonElement');
    const deleteFigureButtonElement = document.getElementById('deleteFigureButtonElement');
    const comFigureButtonElement = document.getElementById('comFigureButtonElement');

    const downloadImageButton = document.getElementById('downloadImageButton');
    const canvasTitle = document.getElementById('canvasTitle');
    let canvasWidth = 1920, canvasHeight = 1080;
    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    //関数
    HTMLCanvasElement.prototype.downloadCanvas = function(name){
        name||(name='canvas');
        const a = document.createElement('a');
        a.download = name + '.png';
        a.href = this.toDataURL();
        a.click();
    };
    const drawFigures = () => {
        clear();
        for(const figure of figureList){
            figure.draw();
        }
    }
    const rnadInt = x => {
        return Math.floor(Math.random()*x);
    };
    

    //canvasElement.downloadCanvas();

    //図形の追加
    const figureList = [];

    //初期配置される図形
    const figureObjList = [
        {
            //右上の円(小)
            f:new Circle(context, -4, 25, 190, 0),
            s:'#0078AA',
            w:15
        },
        {
            ////右上の円(大)
            f:new Circle(context, 80, 100, 205, 0),
            s:'#0078AA',
            w:15
        },
        {
            //上部の三角
            f:new Triangle(context, 450, 0, 555, 150, 640, 0, 1),
            s:'#0078AA'
        },
        {
            //三連図形
            f:new Rectangle(context, 745, 123, 218, 103, 0),
            s:'#0078AA',
            w:10
        },
        {
            //三連図形
            f:new Rectangle(context, 843, 171, 301, 113, 0),
            s:'#3AB4F2',
            w:10
        },
        {
            //三連図形
            f:new Triangle(context, 1025, 331, 1194, 372, 1180, 196, 0),
            s:'#F2DF3A',
            w:14
        },
        {
            //円
            f:new Circle(context, 1238, 548, 132, 0),
            s:'#F2DF3A',
            w:10
        },
        {
            //円
            f:new Circle(context, 140, 494, 98, 0),
            s:'#3AB4F2',
            w:12
        },
        {
            //長方形
            f:new Rectangle(context, -100, 732, 295, 230, 0),
            s:'#3AB4F2',
            w:10
        },
        {
            //円
            f:new Circle(context, 225, 1007, 125, 0),
            s:'#F2DF3A',
            w:12
        },
        {
            //三角
            f:new Triangle(context, 594, 603, 651, 808, 802, 660, 0),
            s:'#F2DF3A',
            w:20
        },
        {
            //三角
            f:new Circle(context, 1694, 685, 70, 1),
            s:'#0078AA'
        },
        {
            //四角
            f:new Rectangle(context, 1695, 432, 120, 257, 0),
            s:'#3AB4F2',
            w:10
        },
        {
            //四角
            f:new Rectangle(context, 1768, 139, 200, 402, 1),
            s:'#F2DF3A'
        },
        {
            //三角
            f:new Triangle(context, 1148, 730, 1128, 990, 1371, 844, 0),
            s:'#0078AA',
            w:15
        },
        {
            //三角
            f:new Triangle(context, 1258, 860, 1394, 775, 1405, 940, 0),
            s:'#3AB4F2',
            w:15
        },
        {
            //三角
            f:new Circle(context, 1780, 892, 64, 0),
            s:'#F2DF3A',
            w:10
        },
        {
            //三角
            f:new Circle(context, 1895, 1005, 150, 0),
            s:'#F2DF3A',
            w:10
        },
        {
            //複合図形
            f:new Figures(new Circle(context, 391, 256, 60, 0),new Circle(context, 442, 296, 41, 0)),
            s:'#F2DF3A',
            w:10
        },
        {
            //複合図形
            f:new Figures(new Rectangle(context, 476, 893, 134, 400, 0),new Rectangle(context, 566, 988, 180, 400, 0)),
            s:'#0078AA',
            w:10
        },
    ];

    //図形を表示
    for(const figure of figureObjList){
        figureList.push(figure.f);
        figure.f.setStyle=figure.s;
        figure.w&&(figure.f.lineWidth=figure.w);
    }
    drawFigures();

    //　暗い青: #0078AA
    //明るい青: #3AB4F2
    //　　黄色: #F2DF3A
    
    //図形の色の指定と表示
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //自動で動く
    const moveFigure = ()=>{
        for(const figure of figureList){
            figure.move();
            const px = figure.positionX, py = figure.positionY;

        }
        drawFigures();
    };
    setInterval(moveFigure,33);
    //moveFigure();

    //操作関係
    //押してるか押してないか
    let isDowning=false;
    let lastPosition={x:-1,y:-1};
    canvasElement.addEventListener('mousedown',(e)=>{

        const mx = e.offsetX, my = e.offsetY;
        lastPosition.x = mx;
        lastPosition.y = my;
        for(let i=figureList.length-1;0<=i;i--){
            const figure = figureList[i];
            if(figure.isIn(mx, my)){
                figure.move(0,0);
                figureList.splice(i,1);
                figureList.push(figure);
                isDowning=true;
                break;
            }
        }
        drawFigures();
    });
    canvasElement.addEventListener('mousemove',(e)=>{
        const dx = e.offsetX-lastPosition.x, dy = e.offsetY-lastPosition.y;
        lastPosition.x = e.offsetX, lastPosition.y = e.offsetY;
        const figure = figureList.slice(-1)[0];
        if(isDowning){
            figure.move(dx,dy);
            drawFigures();
        }
    });
    canvasElement.addEventListener('mouseup',(e)=>{
        if(isDowning){
            isDowning=false;
        }
    });
    canvasElement.addEventListener('mouseout',(e)=>{
        if(isDowning){
            isDowning=false;
        }
    });

    downloadImageButton.addEventListener('click',(e)=>{
        canvasElement.downloadCanvas(canvasTitle.value);
    });

    //図形の追加
    addFigureButtonElement.addEventListener('click',(e)=>{
        let figure;
        switch(rnadInt(3)){
            case 0:
                figure = new Rectangle(context,rnadInt(canvasWidth),rnadInt(canvasHeight),rnadInt(300)+50,rnadInt(300)+50,rnadInt(2));
                break;
            case 1:
                const p0x=rnadInt(canvasWidth),p0y=rnadInt(canvasHeight);
                let arg=Math.PI*Math.random()*2,r=Math.random()*230+70;
                const p1x=Math.floor(Math.cos(arg)*r)+p0x,p1y=Math.floor(Math.sin(arg)*r)+p0y;
                arg=Math.PI*Math.random()*2,r=Math.random()*230+70;
                const p2x=Math.floor(Math.cos(arg)*r)+p0x,p2y=Math.floor(Math.sin(arg)*r)+p0y;
                figure = new Triangle(context,p0x,p0y,p1x,p1y,p2x,p2y,rnadInt(2));
                break;
            case 2:
                figure = new Circle(context,rnadInt(canvasWidth),rnadInt(canvasHeight),rnadInt(300)+30,rnadInt(2));
                break;
        }
        let r=g=b=0;
        while(r**2+g**2+b**2<1000){
            r=rnadInt(256);
            g=rnadInt(256);
            b=rnadInt(256);
        }
        figure.setStyle=`rgb(${255-r},${255-g},${255-b})`;
        figure.draw();
        figureList.push(figure);
    });

    //画像の削除
    deleteFigureButtonElement.addEventListener('click',(e)=>{
        figureList.pop();
        drawFigures();
    });

    //図形の合成
    comFigureButtonElement.addEventListener('click',(e)=>{
        if(figureList.length>=2){
            const f0=figureList.pop(),f1=figureList.pop();
            f0.drawType=0,f1.drawType=0;
            const df=new Figures(f0,f1);
            df.setStyle=f0.getStyle;
            figureList.push(df);
        } 
    });
    // function autoMove(figure){
    //   figure.draw();
    //   clear();
    //   return requestAnimationFrame(autoMove);
    // }
    //figure = figureList[3];
    // autoMove(figure);
};