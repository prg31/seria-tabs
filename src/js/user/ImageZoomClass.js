export default class ImageZoom{

    constructor( {activeImageContainer, popupImageWrapper, popupTemplate, popupClose} ) {
        this.activeImageContainer = document.querySelector( activeImageContainer );
        this.popupTemplate = document.querySelector( popupTemplate );
        this.popupImageWrapperSelector = popupImageWrapper;
        this.popupCloseSelector = popupClose;

        if (this.activeImageContainer)
        this.activeImageContainer.addEventListener('click', this.showPopup.bind(this) )
    }

    showPopup() {
        const wrapper = this.createPopup();

        document.querySelector('html').style.overflow = 'hidden';

        wrapper.addEventListener('click', event => {
            const classList = event.target.classList;
            const closeIconClass = this.popupCloseSelector.replace(/\./, "");

            if ( classList.contains('overlay') || classList.contains( closeIconClass ) ) {
                document.querySelector('#image-zoom-popup').remove();
                document.querySelector('html').style.overflow = 'initial';
            }
        })
    }

    createPopup() {

        const source = this.activeImageContainer.querySelector('img').getAttribute('src');

        const templateBody = this.popupTemplate.innerHTML;
        const wrapper = document.createElement('div');
        wrapper.classList.add('overlay');
        wrapper.setAttribute('id', 'image-zoom-popup');
        wrapper.innerHTML = templateBody;

        const yOffset = Math.abs( (document.body.getBoundingClientRect()).y );
        wrapper.style.top = `${yOffset}px`;

        const img = document.createElement('img');
        img.classList.add('popup__image');
        img.setAttribute('src', source);

        wrapper.querySelector( this.popupImageWrapperSelector ).append( img )
        document.body.append( wrapper );

        return wrapper;
    }

}