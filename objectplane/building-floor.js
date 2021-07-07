AFRAME.registerComponent('building-floor', {
    schema: {
        height: {type: 'float', default: 0.3},
        width: {type: 'float', default: 1},
        color: {type: 'color', default: '#C06C84'},
        depth: {type: 'float', default: 1},
        random_color: {type: 'boolean', default: true}
    },

    init: function() {
        let floor = this.el;
        let data = this.data;

        
        floor.setAttribute("height", data.height);
        floor.setAttribute("width", data.width);
        floor.setAttribute('depth', data.depth);
        floor.className = 'clickable';

        let collider = document.createElement('a-box');
        collider.setAttribute('geometry', {height: data.height, width: data.width, depth: data.depth});
        collider.object3D.scale.set(0.95, 0.95, 0.95);
        collider.setAttribute('material', {opacity: 0, transparent: true});
        collider.setAttribute('aabb-collider',{objects: '.collidable'});
        floor.appendChild(collider);
        collider.setAttribute('data-aabb-collider-dynamic', 'true');
        collider.className = "collidable";
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
