export default class TabsClass{

    tabIndex = 0;
    tabMinIndex = 0;
    tabMaxIndex = 0;

    constructor( {tabNamesContainer, tabName, tabContainer, tab, prevBtn, nextBtn} ) {
        this.tabNames = document.querySelector( tabNamesContainer ).querySelectorAll( tabName );
        this.tabContainer = document.querySelector( tabContainer );
        this.tabs = this.tabContainer.querySelectorAll( tab );
        this.prevBtn = document.querySelector( prevBtn );
        this.nextBtn = document.querySelector( nextBtn );

        this.tabMaxIndex = this.tabs.length - 1;
        if ( this.tabMaxIndex === 0 ) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = 'none';
        }

        this.activateTab();

        this.tabNames.forEach( tabName => {
            tabName.addEventListener( 'click', this.handleNameClick.bind(this) )
        })

        this.prevBtn.addEventListener('click', this.showPrevTab.bind(this))
        this.nextBtn.addEventListener('click', this.showNextTab.bind(this))
    }

    handleNameClick( event ) {
        this.tabNames.forEach( (tabName, i) => {
            if (event.target === tabName) {

                this.tabIndex = i;
                this.activateTab();
            }
        })
    }

    activateTab() {
        this.hideAllTabs();

        this.tabNames[ this.tabIndex ].classList.add('active');

        this.tabs[ this.tabIndex ].style.display = 'block';

        if (this.tabIndex === this.tabMinIndex) {
            this.prevBtn.classList.add('disabled')
        }
        if (this.tabIndex === this.tabMaxIndex) {
            this.nextBtn.classList.add('disabled')
        }
    }

    hideAllTabs() {
        this.prevBtn.classList.remove('disabled');
        this.nextBtn.classList.remove('disabled');

        this.tabNames.forEach( tabName => {
            tabName.classList.remove('active');
        });

        this.tabs.forEach( tab => {
            tab.style.display = 'none';
        });
    }

    showPrevTab() {
        if (this.tabIndex - 1 < this.tabMinIndex) {
            return;
        }

        this.tabIndex--;
        this.activateTab();
    }

    showNextTab() {
        if (this.tabIndex + 1 > this.tabMaxIndex) {
            return;
        }

        this.tabIndex++;
        this.activateTab();
    }

}