export class BaseApp {

    topbarMenuActive: boolean;
    staticMenuDesktopInactive: boolean;
    staticMenuMobileActive: boolean;
    menuClick: boolean;
    topbarItemClick: boolean;
    activeTopbarItem: any;
    menuHoverActive: boolean;

    bloquear = true;

    constructor() { }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }
        if (!this.menuClick) {
            if (this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }
            this.menuHoverActive = false;
        }
        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.topbarMenuActive = false;
        if (this.isDesktop()) {
            this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
        } else {
            this.staticMenuMobileActive = !this.staticMenuMobileActive;
        }
        event.preventDefault();
    }

    onMenuClick() {
        this.menuClick = true;
        this.staticMenuMobileActive = false;
    }

    isMobile() {
        return window.innerWidth < 1000;
    }

    isDesktop() {
        return window.innerWidth >= 1000;
    }

    isTablet() {
        const width = window.innerWidth;
        return width < 1000 && width > 640;
    }

    hideOverlayMenu() {
        this.staticMenuMobileActive = false;
    }

    fecharMenuTopBar() {
        this.topbarItemClick = true;
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;
        this.hideOverlayMenu();
        event.preventDefault();
    }

}
