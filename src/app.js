var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    space:null,
    body:null,
    shape:null,
    xavier: null,
    dercha: null,
    Izq: null,
    base: null,
    ancholimit: 2,
    elasticidadLim: 0.5,
    friccion: 500,
    //Mover cañon
    moverConejo: function(location, event){
        cc.log("Mover conejo");
        var size = cc.winSize;
        var  juego = event.getCurrentTarget();
        var ubicacion = location.getLocation();
        
        var rotateTo = new cc.RotateTo(0, ubicacion.y);
        
        juego.cannon.runAction(rotateTo);
        var juegoBox = event.getCurrentTarget();

    },
   matar: function(location, event){
        var ubicacion = location.getLocation();
        return true;
    },
    
    update : function( delta ) {
        this.space.step( delta );
    },
    
    ctor:function (space) {
        //Este es el proyecto final, aqui tendrán que hacer todo desde cero
        this._super();
        var size = cc.winSize;

        this.space = new cp.Space();
        this._debugNode = new cc.PhysicsDebugNode(this.space);
        this._debugNode.setVisible(true);
        // Parallax ratio and offset
        this.addChild(this._debugNode, 10);
        
        this.space.gravity = cp.v(0, -350);
      
           this.xavier = new cc.PhysicsSprite(res.terrorist);
        var contentSize = this.xavier.getContentSize();
         //MALO 1
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p((size.width / 2) + 250 ,(size.height * 0.15) + 70);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height -10);
        this.shape.setFriction(10);//Esto hace qe el objeto se quede estatico
        this.space.addShape(this.shape);
        this.xavier.setBody(this.body);
        this.addChild(this.xavier, 2);
         //MALO 2
        this.malvado = new cc.PhysicsSprite(res.terrorist);
        var contentSize = this.xavier.getContentSize();
       this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p((size.width / 2) + 390 ,(size.height * 0.15) + 70);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height-10);
        this.shape.setFriction(10);//Esto hace qe el objeto se quede estatico
        this.space.addShape(this.shape);
        this.malvado.setBody(this.body);
        this.addChild(this.malvado, 2);
        
        //FONDO
        this.sprite = new cc.Sprite(res.fondo);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.sprite, 0);
        //base del cañon
        this.trapecio = new cc.Sprite(res.trapecio);
        this.trapecio.setPosition((size.width * 0.122) -50, (size.height * 0.15));
        this.addChild(this.trapecio, 0);
        //cañon
        this.cannon = new cc.Sprite(res.cannon);
        this.cannon.setPosition((size.width * 0.122) -50, (size.height * 0.15)+ 20);
        this.addChild(this.cannon, 0);
       
        
        //Instanciando maderas verticales

        this.wood = new cc.PhysicsSprite(res.madera);
        var contentSize = this.xavier.getContentSize();
       this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p((size.width / 2) + 320 ,(size.height * 0.15) + 70);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width - 100, contentSize.height);
        this.shape.setFriction(10);//Esto hace qe el objeto se quede estatico
        
        this.space.addShape(this.shape);
        this.wood.setBody(this.body);
        this.addChild(this.wood, 0);
        //palo 2
        this.wood = new cc.PhysicsSprite(res.madera);
        var contentSize = this.xavier.getContentSize();
       this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p((size.width / 2) + 436 ,(size.height * 0.15) + 70);
        //back up de la linea de arriba
        //this.body.p = cc.p((size.width / 2) + 286 ,(size.height * 0.15) + 70);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width - 100, contentSize.height);
        this.shape.setFriction(10);//Esto hace qe el objeto se quede estatico
        
        this.space.addShape(this.shape);
        this.wood.setBody(this.body);
        this.addChild(this.wood, 2);
        
         //Instanciando madera horizontal
        //palo 3 acostado
        this.wood2 = new cc.PhysicsSprite(res.madera_2);
        var contentSize = this.xavier.getContentSize();
       this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p((size.width / 2) + 370 ,(size.height / 4) * 3);
        this.space.addBody(this.body);
        this.shape = new cp.BoxShape(this.body, contentSize.width + 24, contentSize.height-115);
        
        this.space.addShape(this.shape);
        this.wood2.setBody(this.body);
        this.addChild(this.wood2, 0);
        
        
        /*limites del juegos-paredes*/
        
                    //Izq
                this.Izq = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 0), new cp.v(0, cc.winSize.height), this.ancholimit);
                this.Izq.setElasticity(this.elasticidadLim);
                this.Izq.setFriction(this.friccion);
                this.space.addStaticShape(this.Izq);
                    //derecha
                this.dercha = new cp.SegmentShape(this.space.staticBody, new cp.v(cc.winSize.width, cc.winSize.height), new cp.v(cc.winSize.width, 0), this.ancholimit);
                this.dercha.setElasticity(this.elasticidadLim);
                this.dercha.setFriction(this.friccion);
                this.space.addStaticShape(this.dercha);
                    //Base
                this.base = new cp.SegmentShape(this.space.staticBody, new cp.v(0, 0), new cp.v(cc.winSize.width, 0), this.ancholimit);
                this.base.setElasticity(this.elasticidadLim);
                this.base.setFriction(this.friccion);
                this.space.addStaticShape(this.base);
                
        

         cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: this.matar,
            onTouchMoved: this.moverConejo
            
        }, this);
    
        this.scheduleUpdate();
        return true;
    }
       
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});
