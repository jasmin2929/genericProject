import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../core/services/spinner.service';
import { TranslateService } from "@ngx-translate/core";
import { LayoutSettings } from './layout-settings';
import { Settings } from '../Settings';

/**
 * LayoutComponent contains functions for layout, which contains toolbar, sidenav, and sidenav-content (set of starter components)
 */
/**
 * @ignore
 */
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
    /**
     * for responsive design
     */
    private _mobileQueryListener: () => void;
    /**
     * for responsive design
     */
    mobileQuery: MediaQueryList;
    showSpinner: boolean = false;
    user: any;
    userName: string = "";
    /**
     * subscription for activating routes 
     */
    private autoLogoutSubscription: Subscription = new Subscription;

    /**
     * for internalization on runtime
     */
    language: string = LayoutSettings.DEFAULT_LANGUAGE;

    permissionValid: string = LayoutSettings.PERMISSION_VALID;


    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        public translate: TranslateService,
    ) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);

        //translation
        translate.addLangs(LayoutSettings.ALL_LANGUAGES);
        translate.setDefaultLang(LayoutSettings.DEFAULT_LANGUAGE);

        //getBrowserLang gives you the language set in the user's browser
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang?.match(/en|de|fr|it/) ? this.getCurrentLanguage() : LayoutSettings.DEFAULT_LANGUAGE);
    }

    /**
     * gets user and activates routes
     */
    ngOnInit(): void {

        if (this.user) {
            if (this.getCurrentLanguage() != "{}") {
                this.language = this.getCurrentLanguage();
                console.log(this.getCurrentLanguage());
                this.translate.use(this.getCurrentLanguage());
            }
        }
    }

    /**
     * removes 
     */
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    /**
     * detects changes of view for responsive design
     */
    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }

    /**
     * for internalization at runtime
     */
    translation(): void {
        this.translate.use(this.language);
        this.saveCurrentLanguage();
    }

    saveCurrentLanguage() {
        localStorage.setItem(LayoutSettings.CURRENT_LANGUAGE, this.language);
    }
    getCurrentLanguage() {
        return localStorage.getItem(LayoutSettings.CURRENT_LANGUAGE) || '{}';
    }
}
