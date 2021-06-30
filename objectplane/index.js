AFRAME.registerComponent('cloak-obj', {
    init: function() {
        let mesh = this.el.getObject3D('mesh');
            if (mesh == undefined) return;
            mesh.traverse(function(node) {
                if (node.isMesh && node.material) {
                    console.log(node);
                    node.material.colorWrite = false;
                    node.material.needsUpdate = true;
                }
            });
    }
})
