AFRAME.registerComponent('building-floor', {
    schema: {
        height: {type: 'float', default: 0.3},
        width: {type: 'float', default: 1},
        color: {type: 'color', default: '#C06C84'},
        random_color: {type: 'boolean', default: true}
    },

    init: function() {
        let floor = this.el;
        let data = this.data;
        floor.setAttribute("height", data.height);
        floor.setAttribute("width", data.width);
        if (this.data.random_color) {
            floor.setAttribute("color", this._random_color_gen());
        }
        else {
            floor.setAttribute("color", data.color);
        }
    },

    _random_color_gen: function() {
        var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
    }
})

AFRAME.registerComponent('scene-event-handler', {

    dependencies: ['raycaster'],

    on_marker: null,

    plane: null,

    ratio: null,
    
    curr_floor: null,

    mousedown: false,

    camera: null,

    dragging: false,

    init: function() {
        this.ratio = 0.001;
        this.camera = this.el.sceneEl.camera.el;
        this.plane = this.el.querySelector('#base');
        document.addEventListener('markerFound', function() {
            this.on_marker = true;
        }.bind(this));
        document.addEventListener('markerLost', function() {
            this.on_marker = false;
        }.bind(this));
        document.querySelector('#base').addEventListener("mousedown", this._instantiate_floor.bind(this));
        document.querySelector('#base').addEventListener('raycaster-intersected', this._move_floor.bind(this));
        document.querySelector('#base').addEventListener("mouseup", function() {
            this.mousedown = false;
            this.curr_floor = null;
            this.dragging = false;
        }.bind(this));
        screen.orientation.lock("landscape-primary");
        
    },

    _instantiate_floor: function(event) {
        if (!this.on_marker) {
            return;
        }
        if (event.detail == undefined) return;

        if (this.curr_floor == null) {
           
            let new_floor = document.createElement('a-box');
            new_floor.setAttribute('building-floor', '');
            new_floor.className = "collidable";
            new_floor.object3D.scale.set(0.2, 1, 0.2);
            this.plane.appendChild(new_floor);
            
            this.curr_floor = new_floor;
            this.mousedown = true;
        }

        let point = this.plane.object3D.worldToLocal(event.detail.intersection.point);
        this.curr_floor.object3D.position.x = point.x;
        this.curr_floor.object3D.position.z = point.z;
        this.curr_floor.object3D.position.y = point.y;
        
        console.log(this.curr_floor);
        
    },

    tick: function() {
        if (this.dragging) {
            this.plane.className = (this.plane.className == '') ? 'collidable':'';
        }
    },

    _move_floor: function(event) {
        if (!this.mousedown) return;
        let intersection = event.detail.el.components.raycaster.getIntersection(this.plane);
        if (intersection == null) return;
        console.log(event.detail);
        let point = this.plane.object3D.worldToLocal(intersection.point);
        this.curr_floor.object3D.position.lerp(point, 0.1);
         this.dragging = true;
         
         //FIXME: orientation issues on phone...
    
        /*
        let xPos = event.movementX * this.ratio;
        let yPos = event.movementY * this.ratio;

        // attach the object on camera to move according to camera rotation then
        // attach it back
        let marker_rot = document.querySelector('a-marker').getAttribute('rotation');
        
        let index = Math.round(marker_rot.x / 90);
        console.log(index + " " + marker_rot.x);
        if (index == 1) {
            this.curr_floor.object3D.position.z -= xPos;
            this.curr_floor.object3D.position.x -= yPos;
        }
        else if (index == -2) {
            let temp = xPos;
            xPos = yPos;
            yPos = -xPos;
        }
        else if (index == -1) {
            xPos = -xPos;
            yPos = -yPos;
        }
        else {
            this.curr_floor.object3D.position.x += xPos;
            this.curr_floor.object3D.position.z += yPos;
        }*/
    }
})