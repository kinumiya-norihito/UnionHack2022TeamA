window.onload=()=>{
    const canvasElement = document.getElementById('canvas'), context = canvasElement.getContext('2d');
    const addFigureButtonElement = document.getElementById('addFigureButtonElement');
    let canvasWidth = 1920, canvasHeight = 1080;
    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    //図形の追加
    const figureList = [];


    const figureObjList = [
        {
            //右上の円(小)
            f:new Circle(context, 0, 20, 190, 0),
            s:'#0078AA',
            w:15
        },
        {
            ////右上の円(大)
            f:new Circle(context, 70, 90, 215, 0),
            s:'#0078AA',
            w:15
        },
        {
            //上部の三角
            f:new Triangle(context, 450, 0, 555, 150, 640, 0, 1),
            s:'#0078AA',
            w:15
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
    ];

    for(const figure of figureObjList){
        figureList.push(figure.f);
        figure.f.setStyle=figure.s;
        figure.w&&(figure.f.lineWidth=figure.w);
    }

    //#F2DF3A
    //#0078AA
    //#3AB4F2
    
    //図形の色の指定と表示
    let counter=0;
    for(const figure of figureList){
        //figure.fillStyle=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        figure.draw();
        counter++;
    }
    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    //操作関係
    //押してるか押してないか
    let isDowning=false;
    let lastPosition={x:-1,y:-1};
    canvasElement.addEventListener('mousedown',(e)=>{
        const mx = e.offsetX, my = e.offsetY;
        console.log([mx,my]);
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

    //図形の追加
    addFigureButtonElement.addEventListener('click',(e)=>{
        const figure = new Rectangle(context,100,100,100,100);
        figure.setStyle=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        figure.draw();
        figureList.push(figure);
    });
};