window.onload=()=>{
    const canvasElement = document.getElementById('canvas'), context = canvasElement.getContext('2d');
    const addFigureButtonElement = document.getElementById('addFigureButtonElement');
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

    //　暗い青: #0078AA
    //明るい青: #3AB4F2
    //　　黄色: #F2DF3A
    
    //図形の色の指定と表示
    for(const figure of figureList){
        figure.draw();
    }
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //自動で動く
    const moveFigure = ()=>{
        for(const figure of figureList){
            figure.move(0,10);
        }
        clear();
        for(const figure of figureList){
            figure.draw();
        }
    };

    //setInterval(moveFigure,33);

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
                figureList.splice(i,1);
                figureList.push(figure);
                isDowning=true;
                break;
            }
        }
        for(const figure of figureList){
            figure.draw();
        }
    });
    canvasElement.addEventListener('mousemove',(e)=>{
        clear();
        const dx = e.offsetX-lastPosition.x, dy = e.offsetY-lastPosition.y;
        lastPosition.x = e.offsetX, lastPosition.y = e.offsetY;
        const figure = figureList.slice(-1)[0];
        if(isDowning){
            figure.move(dx,dy);
        }
        for(const figure of figureList){
            figure.draw();
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
        const figure = new Rectangle(context,100,100,100,100);
        figure.setStyle=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        figure.draw();
        figureList.push(figure);
    });
    // function autoMove(figure){
    //   figure.draw();
    //   clear();
    //   return requestAnimationFrame(autoMove);
    // }
    //figure = figureList[3];
    // autoMove(figure);
};