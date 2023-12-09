document.querySelectorAll('.color-dot').forEach(function(dot) {
    dot.addEventListener('click', function() {
        var palette = this.getAttribute('data-palette');
        document.documentElement.className = palette; // Assign the class to the root element
    });
});
