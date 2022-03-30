AFRAME.registerComponent('box-collider', {
    schema: {
        isTrigger: {type: 'boolean', default: false},
        altitude: {type: 'float', default: -1}
    },

    init: function() {
        this.el.setAttribute('aabb-collider','objects', '.collidable');
        this.el.className = 'collidable';
        this.el.addEventListener('hitstart', this._on_collided.bind(this));
    },

    _on_collided: function(event) {
        if (this.isTrigger) {
            this._trigger_events();
            return;
        }
        //console.log(event);
        let collider = this.el;
        let targets = collider.components['aabb-collider']['intersectedEls'];
        let altitude = 0;
        targets.forEach((target) => {
            if (target != collider) {
                let dir = new THREE.Vector3();
                dir.subVectors(collider.object3D.position, target.object3D.position).normalize();
                //console.log(dir);
                let y_pos = target.object3D.position.y;
                if (y_pos > altitude) {
                    altitude = y_pos;
                }
    
                this.altitude = altitude;
            }
        });
    },

    _trigger_events: function() {
        return;
    }
})
