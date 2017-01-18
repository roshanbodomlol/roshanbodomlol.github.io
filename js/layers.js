//Options
let options = {
    container: '#layers',
    layer: '.layer',
    parallax: false,
    parallaxSpeed: 0.5,
    overlayLayer: true,
    horizontal: false
};

const layersWrap = document.querySelector(options.container);
let majorOffset = layersWrap.offsetTop; // Account for offset of layers container

//Layers
const layers = document.querySelectorAll(options.layer);
let winHeight = $(window).height();

console.log(winHeight);

function updateResize() {

    winHeight = $(window).height();
    layers.forEach(layer => {
        let offsetTop = layer.offsetTop;
        let layerIndex = layer.dataset.index;
        layer.dataset.offset = winHeight * layerIndex;
    });

}

function scroller() {

    let scrollTop = this.scrollY;

    //
    layers.forEach(layer => {

        let offsetTop = layer.dataset.offset;

        //Tasne
        if (scrollTop >= offsetTop) {
            layer.classList.add('taseko');
            if(options.parallax) {
                layer.style.transform = `translateY(-${Math.round(options.parallaxSpeed * (scrollTop - offsetTop))}px)`;
                // layer.style.top = majorOffset + 'px';
            }
        }
        else {
            layer.classList.remove('taseko');
            layer.style.transform = `translateY(0)`;
        }

        //overlay opacity
        if(options.overlayLayer) {
            let children = layer.childNodes;
            children.forEach(child => {
                if(child.className == 'overlay') {
                    let opacity = (scrollTop - offsetTop)/(winHeight);
                    opacity = Number(opacity.toFixed(2)).toFixed(2);
                    child.style.opacity = opacity;
                }
            });
        }
    });
}

function init() {

    layers.forEach(layer => {
        let offsetTop = layer.offsetTop;
        let layerIndex = layer.dataset.index;
        let spacer = document.createElement('div');
        let overlay = document.createElement('div');

        layer.dataset.offset = winHeight * layerIndex;

        layersWrap
            .insertBefore(spacer, layer.nextSibling)
            .classList
            .add('spacer');

        layer
            .appendChild(overlay)
            .classList
            .add('overlay');

        //Horizontal Scrolling

    });

    scroller();

}

window.addEventListener('scroll', scroller);
window.onresize = updateResize;

function layersStart(settings) {

    if(settings) {
        options.container = settings.container;
        options.layer = settings.layer;
        options.parallax = settings.parallax;
        options.parallaxSpeed = settings.parallaxSpeed;
        options.overlayLayer = settings.overlayLayer;
        options.horizontal = settings.horizontal;
    }

    init();

}
