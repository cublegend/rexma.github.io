AFRAME.registerComponent('scene-event-handler', {

    dependencies: ['raycaster'],

    on_marker: null,

    plane: null,

    ratio: null,
    
    curr_floor: null,

    mousedown: false,

    camera: null,

    max_altitude: -1,
    
    collider: null,

    init: function() {
        this.ratio = 0.001;
        this.camera = this.el.sceneEl.camera.el;
        this.plane = this.el.querySelector('#base');
        this.collider = this.plane.querySelector('[aabb-collider]');
        document.addEventListener('markerFound', function() {
            this.on_marker = true;
        }.bind(this));
        document.addEventListener('markerLost', function() {
            this.on_marker = false;
        }.bind(this));
        this.plane.addEventListener("mousedown", this._instantiate_floor.bind(this));
        this.plane.addEventListener('raycaster-intersected', this._move_floor.bind(this));
        this.plane.addEventListener("mouseup", function() {
            this.mousedown = false;
            this.curr_floor = null;
            this.plane.className = 'clickable';
        }.bind(this));
        //screen.orientation.lock("landscape-primary");
    },

    _instantiate_floor: function(event) {
        if (!this.on_marker) {
            return;
        }
        if (event.detail == undefined) return;

        if (this.curr_floor == null) {
            let new_floor = document.createElement('a-box');
            new_floor.setAttribute('building-floor', {height: 0.2, width:0.5, depth: 0.5});
            this.plane.appendChild(new_floor);
            
            this.curr_floor = new_floor;
        }

        let point = this.plane.object3D.worldToLocal(event.detail.intersection.point);
        this.curr_floor.object3D.position.x = point.x;
        this.curr_floor.object3D.position.z = point.z;
        this.curr_floor.object3D.position.y = point.y 
                + this.curr_floor.object3D.scale.y / 2;
        this.curr_floor.addEventListener('hitstart', this._altitude_detection.bind(this));
        this.max_altitude = this.curr_floor.object3D.position.y;
        this.mousedown = true;
    },

    tick: function() {
        if (this.mousedown) {
            this.plane.className = (this.plane.className == '') ? 'clickable':'';
        }
    },

    _move_floor: function(event) {
        if (!this.mousedown) return;
        /*
        let all_floors = document.querySelectorAll('[building-floor]');
        let intersection;
        let point;
        let max_altitude = 0;
        // find the highest altitude in all intersected floors
        for(var i = 0; i < all_floors.length; i++) {
            if (all_floors[i] != this.curr_floor) {
                intersection = event.detail.el.components.raycaster.getIntersection(all_floors[i]);
                if (intersection != null) {
                    point = this.plane.object3D.worldToLocal(intersection.point);
                    let y_pos = point.y + all_floors[i].object3D.scale.y / 2;
                    if (y_pos > max_altitude) {
                        max_altitude = y_pos;
                    }
                    point.y = max_altitude;
                }
            }
        }

        if (point != null) {
            this.curr_floor.object3D.position.lerp(point, 1);
        }*/
        let intersection = event.detail.el.components.raycaster.getIntersection(this.plane);
        if (intersection == null) return;
        let point = this.plane.object3D.worldToLocal(intersection.point);
        point.y = this.max_altitude;
        this.curr_floor.object3D.position.lerp(point, 0.1);
        
         
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
        }       else if (index == -1) {
            xPos = -xPos;
            yPos = -yPos;
        }
        else {
            this.curr_floor.object3D.position.x += xPos;
            this.curr_floor.object3D.position.z += yPos;
        }*/
    },

    _altitude_detection: function(event) {
        if (!this.mousedown) return;
        let collider = this.curr_floor;
        let targets = collider.querySelector('[aabb-collider]').components['aabb-collider']['intersectedEls'];
        let altitude = 0;

        targets.forEach((t) => {
            let target = t.parentElement;
            let y_pos = target.object3D.position.y 
                    + target.getAttribute('geometry').height * target.object3D.scale.y / 2 + collider.getAttribute('geometry').height * collider.object3D.scale.y / 2;

                if (y_pos > altitude) {
                    altitude = y_pos;
                }
        });
        this.max_altitude = altitude;
    }
})

//FIXME: add a invisible child object of collision box and check collision if necessary
