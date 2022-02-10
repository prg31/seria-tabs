import ImageCarousel from "./ImageCarouselClass.js";
import ImageZoom from "./ImageZoomClass.js";
import TabsClass from "./TabsClass.js";

window.addEventListener('DOMContentLoaded', () => {


    new ImageCarousel({
        allImagesWrapper: '.image-carousel',
        activeImageWrapper: '.active-view',
    });

    new ImageZoom({
        activeImageContainer: '.active-view',
        popupImageWrapper: '.popup__image-wrapper',
        popupTemplate: '#image-zoom-popup-template',
        popupClose: '.popup__close',
    });

    new TabsClass({
        tabNamesContainer: '.info-tabs__tabs',
        tabName: '.info-tabs__tab',
        tabContainer: '.tab-content',
        tab: '.tab-content__item',
        prevBtn: '.control.left',
        nextBtn: '.control.right',
    });
});
