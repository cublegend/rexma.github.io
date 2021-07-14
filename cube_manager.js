AFRAME.registerComponent('cube-manager', {
    init: function () {
        // create random cubes that follow mouse position parallex movement

        // how many cubes
        let num_cubes = Math.random() * (50, 30) + 30;
        for (let i = 0; i < num_cubes; i++) {
            this._create_cubes();
        }
        this.el.addEventListener('mousemove', this._mouse_to_world.bind(this));
    },

    _create_cubes: function() {
        // randomize cube setup
        let canvas = document.querySelector('canvas');
        let rect = document.querySelector('a-scene').getBoundingClientRect();
        let width_max = ( (canvas.width - rect.left) / rect.width ) * 2 - 1;
        let width_min = ( (0 - rect.left) / rect.width ) * 2 - 1;
        let height_max = - ( (canvas.height - rect.top) / rect.height ) * 2 + 1;;
        let height_min = - ( (0 - rect.top) / rect.height ) * 2 + 1;;
        let pos_x = Math.random() * (width_max - width_min) + width_min;
        let pos_y = Math.random() * (height_max - height_min) + height_min;
        let pos_z = Math.random() * -2;
        let rotation_x = Math.random() * 8;
        let rotation_y = Math.random() * 8;
        let rotation_z = Math.random() * 8;
        let n = Math.random() * (8000 - 2000) + 2000;

        // create cube
        let new_cube = document.createElement('a-plane');
        new_cube.object3D.position.set(pos_x, pos_y, pos_z);
        new_cube.object3D.scale.set(0.1, 0.1, 0.1);
        new_cube.object3D.rotation.set(rotation_x, rotation_y, rotation_z);
        new_cube.setAttribute('color', 'white');
        new_cube.setAttribute('material', 'transparent', 'true');
        new_cube.setAttribute('material', 'opacity', '0');
        
        
        // set animations
        new_cube.setAttribute('animation__enter',{
            property: 'material.opacity',
            to: '0.2',
            dur: n / 2
        });
        new_cube.setAttribute('animation__rotation',{
            property: 'rotation',
            to: '30 60 0',
            dur: n,
            loop: 'true',
            easing: 'linear'
        });
       
        this.el.appendChild(new_cube);

        // remove when animation complete
        new_cube.addEventListener('animationcomplete', (e) => {
            if (e.detail.name == 'animation__enter') {
                new_cube.setAttribute('animation__opacity',{
                    property: 'material.opacity',
                    to: '0',
                    dur: n / 2,
                    easing: 'linear'
                });
                return;
            }
            new_cube.parentNode.removeChild(new_cube);
            // create a new cube whenever one is gone
            this._create_cubes();
        });
    },

    _mouse_to_world: function(e) {
        let mouse = new THREE.Vector2();
        let camera = AFRAME.scenes[0].camera;
        let rect = document.querySelector('a-scene').getBoundingClientRect();
        mouse.x = ( (e.clientX - rect.left) / rect.width ) * 5 - 1;
        mouse.y = - ( (e.clientY - rect.top) / rect.height ) * 5 + 1;
        let vector = new THREE.Vector3( mouse.x, mouse.y, -1 ).unproject( camera );
        let rot = new THREE.Vector3();
        let ratio = 2;
        rot.y = -vector.x * 360 * ratio;
        rot.x = vector.y * 360 * ratio;
        rot.z = vector.z * 360 * ratio;
        document.querySelector('[camera]').setAttribute('rotation',{x: rot.x, y: rot.y, z: rot.z} );

    }
})