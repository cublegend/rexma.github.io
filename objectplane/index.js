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
    on_marker: null,

    plane: null,

    ratio: null,
    
    curr_floor: null,

    mousedown: false,

    init: function() {
        document.addEventListener('markerFound', function() {
            this.on_marker = true;
        }.bind(this));
        document.addEventListener('markerLost', function() {
            this.on_marker = false;
        }.bind(this));
        document.querySelector('#base').addEventListener("mousedown", this._instantiate_floor.bind(this));
        document.addEventListener('mousemove', this._move_floor.bind(this));
        document.querySelector('#base').addEventListener("mouseup", function() {
            this.mousedown = false;
            this.ratio = null;
            curr_floor = null;
        }.bind(this));
    },

    _instantiate_floor: function(event) {
        if (!this.on_marker) {
            return;
        }
        if (event.detail.intersection == undefined) return;
        let point = document.querySelector('#base').object3D.worldToLocal(event.detail.intersection.point);
        let new_floor = document.createElement('a-box');
        new_floor.setAttribute('building-floor', '');
        new_floor.object3D.scale.set(0.2, 1, 0.2);

        document.querySelector('#base').appendChild(new_floor);
        new_floor.object3D.position.x = point.x;
        new_floor.object3D.position.z = point.z;
        new_floor.object3D.position.y = point.y;
        this.curr_floor = new_floor;
        this.mousedown = true;
        console.log("inst");
    },

    _move_floor: function(event) {
        if (!this.mousedown) return;
        if (this.ratio == null) {
            this.ratio = 0.001;
        }
        let xPos = event.movementX * this.ratio;
        let yPos = event.movementY * this.ratio;
        this.curr_floor.object3D.position.x += xPos;
        this.curr_floor.object3D.position.z += yPos;
    }
})