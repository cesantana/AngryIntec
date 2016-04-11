var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    space:null,
    body:null,
    shape:null,
    xavier: null,
    dercha: null,
    Izq: null,
    base: null,
    ancholimit: 5,
    elasticidadLim: 0.5,
    friccion: 1,
    //Mover cañon
    moverConejo: function(location, event){
        cc.log("Mover conejo");
        var size = cc.winSize;
        var  juego = event.getCurrentTarget();
        var ubicacion = location.getLocation();
        
        var rotateTo = new cc.RotateTo(0, ubicacion.y);
        
        juego.cannon.runAction(rotateTo);
        var juegoBox = event.getCurrentTarget();
     
//        for(var bomba of juego.bombas){
//            var cuadro = bomba.getBoundingBox();
//            if(cc.rectIntersectsRect(cuadro,conejo)){
//                alert("Conejo choco");      
//            }
//        }
//        for(var zanahoria of juego.zanahorias){
//            var zanahoriaBounding = zanahoria.getBoundingBox();
//            if(cc.rectIntersectsRect(zanahoriaBounding,conejo)){
//                juego.puntos++
//                juego.winLbl.setString("Puntos " + juego.puntos);
//            }
//        }
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
        
        this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
        this.body.p = cc.p(size.width / 2, size.height / 2);
        this.space.addBody(this.body);
        
//      init body
        this.shape = new cp.BoxShape(this.body, contentSize.width - 14, contentSize.height);
        this.space.addShape(this.shape);
        
        this.xavier.setBody(this.body);

        this.addChild(this.xavier, 2);
        
        this.sprite = new cc.Sprite(res.fondo);
        this.sprite.setPosition(size.width / 2, size.height / 2);
        this.addChild(this.sprite, 0);

        this.trapecio = new cc.Sprite(res.trapecio);
        this.trapecio.setPosition((size.width * 0.12), (size.height * 0.15));
        this.addChild(this.trapecio, 0);
        
        this.cannon = new cc.Sprite(res.cannon);
        this.cannon.setPosition((size.width * 0.12), (size.height * 0.15)+ 20);
        this.addChild(this.cannon, 0);
        
        this.malvado = new cc.Sprite(res.terrorist);
        this.malvado.setPosition((size.width / 2) + 210 ,(size.height * 0.15) + 70);
        this.addChild(this.malvado, 0);
        
        
        this.wood = new cc.Sprite(res.madera);
        this.wood.setPosition((size.width / 2) + 140 ,(size.height * 0.15) + 70);
        this.addChild(this.wood, 0);
        //palo 2
        this.wood = new cc.Sprite(res.madera);
        this.wood.setPosition((size.width / 2) + 286 ,(size.height * 0.15) + 70);
        this.addChild(this.wood, 0);
        //palo 3 acostado
        this.wood2 = new cc.Sprite(res.madera_2);
        this.wood2.setPosition((size.width / 2) + 215 ,(size.height * 0.15) + 155);
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
