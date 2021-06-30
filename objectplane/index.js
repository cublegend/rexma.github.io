AFRAME.registerComponent('cube', {
    init: function() {
        document.addEventListener('click', this._Get_position.bind(true));
        
    },

    _Get_position: function(event) {
        let markers = document.querySelectorAll('a-nft');
        let positions = [];
        for (let i = 0; i < markers.length; i++) {
            positions[i] = markers[i].object3D.position;
            console.log(markers[i].object3D.position);
        }
        let cloak = document.createElement('a-box');
        let width = (positions[0].x - positions[1].x) * 2;
        cloak.setAttribute("position", {x: positions[0].x, y: positions[1].y, z: positions[2].z});
        
    }
})
