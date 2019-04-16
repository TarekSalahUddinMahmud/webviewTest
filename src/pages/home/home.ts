import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var psCheckout: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  fee: any = 0;
	checkingAmount: any = 0;
	securityAmount: any = 0;
	total: any = 0;
	fundConfirmationId: any = "";
	paymentMethod: any = "";
	externalCSSLink: string = "";
	publishableKey: string = "ioond5qdfwarj1f24f8ss3x6";
  paystandEnv: string = "sandbox";
  

  constructor(public navCtrl: NavController) {
		this.total = 500.00;
		this.total = parseFloat(this.total).toFixed(2);
		
  }

  ionViewDidEnter(){
    if (typeof psCheckout == "undefined") {
			this.initialize();
		} else {
			this.initialize(true);
		}
  }

  initialize(initScript = false){
    let fileref = document.createElement('script');
    fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", "https://checkout.paystand.co/v4/js/paystand.checkout.js");
		fileref.setAttribute("id", "ps_checkout");
		fileref.setAttribute("ps-env", this.paystandEnv);
		fileref.setAttribute("ps-paymentAmount", this.total);
		fileref.setAttribute("ps-fixedAmount", "true");
		fileref.setAttribute("ps-publishableKey", this.publishableKey);
		fileref.setAttribute("ps-containerId", "ps_container_id");
		fileref.onload = () => {
			if (psCheckout) {
				if (initScript) {
					psCheckout.initialized = false;
					psCheckout.initScript();
				}
				psCheckout.onReady(() => {
					psCheckout.onceLoaded(() => {
						let content = document.getElementsByClassName('ps-checkout-content') as HTMLCollectionOf<HTMLElement>;
						content[0].style.width = "100%";
						psCheckout.showCheckout();
						console.log('psCheckout.onceLoaded');
					});
					psCheckout.onLoaded((data) => {
						console.log('psCheckout.onLoaded')
					});
					psCheckout.reboot({
						"env": this.paystandEnv,
						"mode": "embed",
						"viewLogo": "hide",
						"paymentAmount": this.total,
						"fixedAmount": "true",
						"externalCss": this.externalCSSLink,
						"publishableKey": this.publishableKey,
						"containerId": "ps_container_id"
					});
				});
			}
		}
		document.getElementsByTagName("ion-content")[0].appendChild(fileref);
  }

}
