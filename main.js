window.onload=()=>{
    const canvasElement = document.getElementById('canvas'), context = canvasElement.getContext('2d');
    const addFigureButtonElement = document.getElementById('addFigureButtonElement');
    let canvasWidth = 1920, canvasHeight = 1080;
    canvasElement.width = canvasWidth;
    canvasElement.height = canvasHeight;

    //図形の追加
    const figureList = [];
    figureList.push(new Circle(context, 300, 300, 100)); 
    figureList[0].fillStyle='#F2DF3A';
    figureList.push(new Rectangle(context, 300, 300, 100, 100));
    figureList[1].fillStyle='#0078AA';
    figureList.push(new Triangle(context, 300, 300, 100, 100,400,200));
    figureList[2].fillStyle='#3AB4F2';
    
    //図形の色の指定と表示
    for(const figure of figureList){
        //figure.fillStyle=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        figure.fill();
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
            figure.fill();
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
            figure.fill();
        }
    });
    canvasElement.addEventListener('mouseup',(e)=>{
        if(isDowning){
            isDowning=false;
        }
    });

    //図形の追加
    addFigureButtonElement.addEventListener('click',(e)=>{
        const figure = new Rectangle(context,100,100,100,100);
        figure.fillStyle=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
        figure.fill();
        figureList.push(figure);
    });
};