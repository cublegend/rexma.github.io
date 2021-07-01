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

    init: function() {
        document.addEventListener('markerFound', function() {
            this.on_marker = true;
        }.bind(this));
        document.addEventListener('markerLost', function() {
            this.on_marker = false;
        }.bind(this));

        document.addEventListener('markerFound', this._create_click_plane.bind(this));

        document.querySelector('#base').addEventListener("click", this._instantiate_floor.bind(this));
    },

    _create_click_plane: function(event) {
        if (this.plane != null) return;
        let p = document.createElement('a-plane');
        this.plane = p;
        document.querySelector('a-marker').appendChild(p);
        p.setAttribute('rotation', {x: -90, y: 0, z: 0});
        p.setAttribute('color', 'beige');
        p.object3D.scale.set(3, 3, 3);
        p.addEventListener('click', this._instantiate_floor.bind(this));
    },

    _instantiate_floor: function(event) {
        if (!this.on_marker) {
            return;
        }
        if (event.detail.intersection == undefined) return;
        let point = document.querySelector('a-marker').object3D.worldToLocal(event.detail.intersection.point); //HERE!!!
        console.log("instantiate floor at mouse position at: " + event.detail.intersection.point.z);
        let new_floor = document.createElement('a-box');
        new_floor.setAttribute('building-floor', '');

        document.querySelector('a-marker').appendChild(new_floor);
        new_floor.object3D.position.x = point.x;
        new_floor.object3D.position.y = point.y;
        new_floor.object3D.position.z = point.z;
    }
})