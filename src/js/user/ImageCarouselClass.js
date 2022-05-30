export default class ImageCarousel {

    constructor( {allImagesWrapper, activeImageWrapper} ) {

        this.allImagesWrapper = document.querySelector( allImagesWrapper );
        this.activeImageWrapper = document.querySelector( activeImageWrapper );
        if (this.allImagesWrapper){
            this.allImages = this.allImagesWrapper.querySelectorAll('img');
            
            this.allImages[0].classList.add('active');
            this.initActiveImage( this.allImages[0].getAttribute('src') )
            
            this.allImages.forEach( img => {
                img.addEventListener( 'click', this.replaceImage.bind(this) )
            });
        }
    }

    initActiveImage( src ) {
        const imgElem = document.createElement('img');
        imgElem.classList.add('active-view__img');
        imgElem.setAttribute('src', src);
        this.activeImageWrapper.appendChild( imgElem );
    }

    replaceImage( event ) {

        const target = event.target;
        this.activeImageWrapper.querySelector('img').setAttribute( 'src', target.getAttribute('src') );

        this.allImagesWrapper.querySelector('.active').classList.remove('active');

        target.classList.add('active');
    }
}