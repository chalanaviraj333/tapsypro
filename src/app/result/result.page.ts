import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/storage';
import { Router } from '@angular/router';

interface Remote {
  tapsycode: string;
  boxnumber: number;
  inbuildchip: string;
  inbuildblade: string;
  remotetype: string;
  compitablebrands: Array<string>;
  image: string;
  notes: string;
  compitablecars: Array<Object>;
}

interface ProgrammingDetails {
  brand: string;
  model: string;
  years: Array<number>;
  blade: string;
  chip: string;
  smartProYes: number;
  smartProNo: number;
  autelYes: number;
  autelNo: number;
  xtoolYes: number;
  xtoolNo: number;
  obdStarYes: number;
  obdStarNo: number;
  kdRemotesYes: number;
  kdRemotesNo: number;
  xHorseYes: number;
  xHorseNo: number;
  notes: Array<string>;
}


@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})


export class ResultPage implements OnInit {


  public choosecar: any;
  public compitableremotes: Array<Remote> = [];
  public programmingDetails: ProgrammingDetails = { brand: 'N/A', model: 'N/A', years: [], blade: 'N/A', chip: 'N/A', smartProYes: 0, smartProNo: 0, autelYes: 0, autelNo: 0, xtoolYes: 0, xtoolNo: 0, obdStarYes: 0, obdStarNo: 0, kdRemotesYes: 0, kdRemotesNo: 0, xHorseYes: 0, xHorseNo: 0, notes: [] };
  public firebaseKey: string;
  public foundFromDatabase = false;

  chipmfkmachine = {};
  remotealerticon = "remove.png";


  constructor(private navParamService: NavparamService, private http: HttpClient,
    public alertController: AlertController, private router: Router) {

    this.choosecar = this.navParamService.getNavData();

    // getting results of compatible remotes from database
    this.http.get<{ [key: string]: Remote }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/remotes.json')
      .subscribe(resData => {

        for (const key in resData) {

          let compatiblecars: any = resData[key].compitablecars;

          if (compatiblecars.find(i => i.brand === this.choosecar.brand && i.model === this.choosecar.model && (this.choosecar.year >= i.startyear && this.choosecar.year <= i.endyear))) {
            const iconname = (resData[key].image);
            firebase.storage().ref().child('images/remotes/' + iconname).getDownloadURL()
              .then(response => {
                this.compitableremotes.push({
                  tapsycode: resData[key].tapsycode, boxnumber: resData[key].boxnumber, inbuildchip: resData[key].inbuildchip,
                  inbuildblade: resData[key].inbuildblade, remotetype: resData[key].remotetype, compitablebrands: resData[key].compitablebrands, image: response, notes: resData[key].notes,
                  compitablecars: resData[key].compitablecars
                })
                this.compitableremotes.sort((a, b) => (a.boxnumber > b.boxnumber) ? 1 : -1)
              })
              .catch(error => { console.log('error', error) })
          }

        }

      });

    // getting results of car programming details from database
    this.http.get<{ [key: string]: ProgrammingDetails }>('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json')
      .subscribe(resData => {


        for (const key in resData) {

          if (this.choosecar.brand == resData[key].brand && this.choosecar.model == resData[key].model && resData[key].years.find(i => i === this.choosecar.year)) {
            this.programmingDetails = resData[key];
            this.foundFromDatabase = true;

            this.firebaseKey = key;
          }
          else {

          }
        }

        if (this.foundFromDatabase == false) {
          this.programmingDetails.brand = this.choosecar.brand;
          this.programmingDetails.model = this.choosecar.model;
          this.programmingDetails.years = [this.choosecar.year];
          this.programmingDetails.blade = 'N/A';
          this.programmingDetails.chip = 'N/A';
          this.programmingDetails.smartProYes = 0;
          this.programmingDetails.smartProNo = 0;
          this.programmingDetails.autelYes = 0;
          this.programmingDetails.autelNo = 0;
          this.programmingDetails.xtoolYes = 0;
          this.programmingDetails.xtoolNo = 0;
          this.programmingDetails.obdStarYes = 0;
          this.programmingDetails.obdStarNo = 0;
          this.programmingDetails.kdRemotesYes = 0;
          this.programmingDetails.kdRemotesNo = 0;
          this.programmingDetails.xHorseYes = 0;
          this.programmingDetails.xHorseNo = 0;
          this.programmingDetails.notes = [];

        }

      });

  }

  updateProgrammingDetails() {

    if (this.foundFromDatabase == true) {
      return this.http.put(`https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details/${this.firebaseKey}.json`, this.programmingDetails).subscribe(
        resData => {
          
        }
      );

    }
    else {
      return this.http.post('https://tapsystock-a6450-default-rtdb.firebaseio.com/programming-details.json', this.programmingDetails).subscribe(
        resData => {
          
        }
      );
    }
  }

  async _smartProYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Smart Pro worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.smartProYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _smartProNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'Smart Pro not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.smartProNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _autelYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Autel worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.autelYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _autelNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'Autel not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.autelNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _xtoolYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Xtool worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.xtoolYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }


  async _xtoolNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'Xtool not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.xtoolNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _obdStarYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'OBD Star worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.obdStarYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _obdStarNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'OBD Star not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.obdStarNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _kdRemotesYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'KD Remotes worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.kdRemotesYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _kdRemotesNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'KD Remotes not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.kdRemotesNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _xHorseYes() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'XHorse Remotes worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.xHorseYes++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }

  async _xHorseNo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Failed',
      message: 'XHorse Remotes not worked for this Car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.programmingDetails.xHorseNo++;
            this.updateProgrammingDetails();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alertBoxCancel'
        }
      ]
    });

    await alert.present();
  }


  _carNotes() {
    this.navParamService.setNavData(this.choosecar);
    this.router.navigateByUrl('carnotes');
  }

  ngOnInit() {
  }

}



// { remotenumber: 1, icon: "TAP1-NLK-ALFA-01-433.png", tc: "TAP1-NLK-ALFA-01-433", box: 1, brands: ['ALFA ROMEO'], compatiblewith: [{brand:'ALFA ROMEO', model:'Giulietta', startyear:2010, endyear:2016}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 2, icon: "TAP2-NLK-ALFA-02-433.png", tc: "TAP2-NLK-ALFA-02-433", box: 2, brands: ['ALFA ROMEO'], compatiblewith: [{brand:'ALFA ROMEO', model:'MiTo', startyear:2008, endyear:2016}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 3, icon: "TAP3-TRK-AUDI-05-433-48.png", tc: "TAP3-TRK-AUDI-05-433-48", box: 3, brands: ['AUDI'], compatiblewith: [{brand:'AUDI', model:'A4 Coupe', startyear:2007, endyear:2009},{brand:'AUDI', model:'S4 Coupe', startyear:2007, endyear:2013},{brand:'AUDI', model: 'A4 Wagon', startyear:2005, endyear:2008},{brand:'AUDI', model:'S4 Wagon', startyear:2005, endyear:2008},{brand:'AUDI', model:'A4 Quattro', startyear:2005, endyear:2008},{brand:'AUDI', model:'S4 Quattro', startyear:2005, endyear:2008},{brand:'AUDI', model:'RS4 Wagon', startyear:2006, endyear:2008},{brand:'AUDI', model:'RS4 Quattro', startyear:2006, endyear:2008}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 4, icon: "TAP4-TRK-AUDI-08-433.png", tc: "TAP4-TRK-AUDI-08-433", box: 4, brands: ['AUDI'], compatiblewith: [{brand:'AUDI', model:'Q5', startyear:2008, endyear:2014}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 5, icon: "TAP5-TRK-AUDI-29-433.png", tc: "TAP5-TRK-AUDI-29-433", box: 5, brands: ['AUDI'], compatiblewith: [{brand:'AUDI', model:'Q2', startyear:2017, endyear:2017}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 6, icon: "TAP6-TRK-BMW-02-315-CAS2.png", tc: "TAP6-TRK-BMW-02-315-CAS2", box: 6, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 1', startyear:2004, endyear:2011},{brand:'BMW', model:'Series 3', startyear:2005, endyear:2007},{brand:'BMW', model:'Series 5', startyear:2005, endyear:2010},{brand:'BMW', model:'Series 6', startyear:2004, endyear:2010},{brand:'BMW', model:'X5', startyear:2006, endyear:2006}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 7, icon: "TAP7-TRK-BMW-02-433-CAS2.png", tc: "TAP7-TRK-BMW-02-433-CAS2", box: 7, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 1', startyear:2004, endyear:2011},{brand:'BMW', model:'Series 3', startyear:2005, endyear:2007},{brand:'BMW', model:'Series 5', startyear:2005, endyear:2010},{brand:'BMW', model:'Series 6', startyear:2004, endyear:2010},{brand:'BMW', model:'X5', startyear:2006, endyear:2006},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 8, icon: "TAP8-TRK-BMW-04-315-EWS-44.png", tc: "TAP8-TRK-BMW-04-315-EWS-44", box: 8, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 5', startyear:2000, endyear:2003},{brand:'BMW', model:'Series 6', startyear:2000, endyear:2003},{brand:'BMW', model:'Series 7', startyear:2000, endyear:2002},{brand:'BMW', model:'Z3', startyear:2001, endyear:2002},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 9, icon: "TAP9-TRK-BMW-04-433-EWS-44.png", tc: "TAP9-TRK-BMW-04-433-EWS-44", box: 9, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:1998, endyear:2002},{brand:'BMW', model:'Z Series', startyear:1996, endyear:2002},{brand:'BMW', model:'Series 5', startyear:1997, endyear:2002},{brand:'BMW', model:'Series 7', startyear:1996, endyear:2002},], blade: 'whhooo', chip: 'wqeooo', notes: '' },

    // { remotenumber: 10, icon: "TAP10-TRK-BMW-05-315-CAS3.png", tc: "TAP10-TRK-BMW-05-315-CAS3", box: 10, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 1 (E81/E82/E88)', startyear:2007, endyear:2012},{brand:'BMW', model:'Series 1 (E87)', startyear:2004, endyear:2011},{brand:'BMW', model:'Series 3 (E90/E91)', startyear:2005, endyear:2011},{brand:'BMW', model:'Series 3 (E92/E93)', startyear:2007, endyear:2011},{brand:'BMW', model:'Series 5 (E60/E61)', startyear:2003, endyear:2010},{brand:'BMW', model:'Series X (E70/X5)', startyear:2006, endyear:2012},{brand:'BMW', model:'Series X (E71/X6/E72/X6H)', startyear:2008, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 11, icon: "TAP11-TRK-BMW-05-433-CAS3.png", tc: "TAP11-TRK-BMW-05-433-CAS3", box: 11, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:2006, endyear:2012},{brand:'BMW', model:'Series 5', startyear:2003, endyear:2011},{brand:'BMW', model:'Series 6', startyear:2004, endyear:2012},{brand:'BMW', model:'X Series', startyear:2007, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 12, icon: "TAP12-TRK-BMW-06-315-CAS3+.png", tc: "TAP12-TRK-BMW-06-315-CAS3+", box: 12, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:2007, endyear:2010},{brand:'BMW', model:'Series 5', startyear:2006, endyear:2010}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 13, icon: "TAP13-TRK-BMW-11-315-CAS4.png", tc: "TAP13-TRK-BMW-11-315-CAS4", box: 13, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:2009, endyear:2013},{brand:'BMW', model:'Series 5', startyear:2009, endyear:2014},{brand:'BMW', model:'Series 7', startyear:2009, endyear:2014},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 14, icon: "TAP14-TRK-BMW-11-433-CAS4.png", tc: "TAP14-TRK-BMW-11-433-CAS4", box: 14, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:2013, endyear:2016}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 15, icon: "TAP15-TRK-BMW-11-433-FEM.png", tc: "TAP15-TRK-BMW-11-433-FEM", box: 15, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 3', startyear:2013, endyear:2016}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 16, icon: "TAP16-TRK-BMW-14-433-CAS4.png", tc: "TAP16-TRK-BMW-14-433-CAS4", box: 16, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 5', startyear:2010, endyear:2014},{brand:'BMW', model:'Series 6', startyear:2011, endyear:2013},{brand:'BMW', model:'Series 7', startyear:2009, endyear:2013},{brand:'BMW', model:'X3', startyear:2011, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 17, icon: "TAP17-TRK-BMW-14-433-FEM.png", tc: "TAP17-TRK-BMW-14-433-FEM", box: 17, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 5', startyear:2010, endyear:2012},{brand:'BMW', model:'Series 6', startyear:2011, endyear:2012},{brand:'BMW', model:'Series 7', startyear:2009, endyear:2012},{brand:'BMW', model:'X3', startyear:2011, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 18, icon: "TAP18-TRK-BMW-16-433-EWS-44.png", tc: "TAP18-TRK-BMW-16-433-EWS-44", box: 18, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'X3', startyear:2004, endyear:2010},{brand:'BMW', model:'Series 3', startyear:1998, endyear:2005},{brand:'BMW', model:'Series 5', startyear:1998, endyear:2005},{brand:'BMW', model:'Series 7', startyear:1998, endyear:2005},{brand:'BMW', model:'X5', startyear:1998, endyear:2005},{brand:'BMW', model:'Z3', startyear:1998, endyear:2005},{brand:'BMW', model:'Z4', startyear:1998, endyear:2005},{brand:'BMW', model:'330i', startyear:2001, endyear:2004},{brand:'BMW', model:'525i', startyear:2001, endyear:2004},{brand:'BMW', model:'325', startyear:1998, endyear:2004}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 19, icon: "TAP19-TRK-BMW-30-433-FEM.png", tc: "TAP19-TRK-BMW-30-433-FEM", box: 19, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 2(F45/F46)', startyear:2014, endyear:2014},{brand:'BMW', model:'Series 5(F10/F11/F07/F18)', startyear:2012, endyear:2016},{brand:'BMW', model:'X5(F15/F85)', startyear:2013, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 20, icon: "TAP20-TRK-BMW-41-433-FEM.png", tc: "TAP20-TRK-BMW-41-433-FEM", box: 20, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 6(F06/F12/F13)', startyear:2013, endyear:2018},{brand:'BMW', model:'Series 7(F01/F02/F03/F04)', startyear:2014, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 21, icon: "TAP21-TRK-BMW-42-433-FEM.png", tc: "TAP21-TRK-BMW-42-433-FEM", box: 21, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 6(F06/F12/F13)', startyear:2013, endyear:2018},{brand:'BMW', model:'Series 7(F01/F02/F03/F04)', startyear:2014, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 22, icon: "TAP22-TRK-BMW-44-433-CAS4.png", tc: "TAP22-TRK-BMW-44-433-CAS4", box: 22, brands: ['BMW'], compatiblewith: [{brand:'BMW', model:'Series 2(F45/F46)', startyear:2014, endyear:2020},{brand:'BMW', model:'Series 5(F10/F11/F07/F18)', startyear:2012, endyear:2016},{brand:'BMW', model:'X5(F15/F85)', startyear:2013, endyear:2018}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 23, icon: "TAP23-NLK-CHRY-03-433-12.png", tc: "TAP23-NLK-CHRY-03-433-12", box: 23, brands: ['CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300C Tourer', startyear:2008, endyear:2010}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 24, icon: "TAP24-NLK-CHRY-03-433-13.png", tc: "TAP24-NLK-CHRY-03-433-13", box: 24, brands: ['CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300C Sedan', startyear:2008, endyear:2010}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 25, icon: "TAP25-NLK-CHRY-03-433-14.png", tc: "TAP25-NLK-CHRY-03-433-14", box: 25, brands: ['CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'Grand Voyager', startyear:2008, endyear:2013}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 26, icon: "TAP26-NLK-CHRY-04-433-2-OHT.png", tc: "TAP26-NLK-CHRY-04-433-2-OHT", box: 26, brands: ['CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300C Tourer', startyear:2005, endyear:2008}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 27, icon: "TAP27-NLK-CHRY-04-433-3-OHT.png", tc: "TAP27-NLK-CHRY-04-433-3-OHT", box: 27, brands: ['CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300C Sedan', startyear:2005, endyear:2008}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 28, icon: "TAP28-TRK-CIT-03-433.png", tc: "TAP28-TRK-CIT-03-433", box: 28, brands: ['CITREON'], compatiblewith: [{brand:'CITREON', model:'C4 Picasso', startyear:2007, endyear:2010},{brand:'CITREON', model:'C4 Grand Picasso', startyear:2007, endyear:2010},{brand:'CITREON', model:'C5', startyear:2008, endyear:2011},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 29, icon: "TAP29-NLK-CHRY-03-433-1.png", tc: "TAP29-NLK-CHRY-03-433-1", box: 29, brands: ['DODGE','CHRYSLER','VOLKSWAGEN'], compatiblewith: [{brand:'CHRYSLER', model:'300', startyear:2008, endyear:2010},{brand:'CHRYSLER', model:'Town & Country', startyear:2008, endyear:2017},{brand:'DODGE', model:'Charger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Challenger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Durango', startyear:2008, endyear:2012},{brand:'DODGE', model:'Grand Caravan', startyear:2008, endyear:2017},{brand:'DODGE', model:'Journey', startyear:2008, endyear:2012},{brand:'DODGE', model:'Ram', startyear:2008, endyear:2012},{brand:'DODGE', model:'Magnum', startyear:2008, endyear:2008},{brand:'VOLKSWAGEN', model:'Routan', startyear:2009, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 30, icon: "TAP30-NLK-CHRY-03-433-2.png", tc: "TAP30-NLK-CHRY-03-433-2", box: 30, brands: ['DODGE','CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300', startyear:2008, endyear:2011},{brand:'DODGE', model:'Challenger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Charger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Magnum', startyear:2008, endyear:2008}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 31, icon: "TAP31-NLK-CHRY-03-433-3.png", tc: "TAP31-NLK-CHRY-03-433-3", box: 31, brands: ['DODGE','CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300', startyear:2008, endyear:2010},{brand:'CHRYSLER', model:'Town & Country', startyear:2008, endyear:2017},{brand:'DODGE', model:'Charger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Challenger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Durango', startyear:2008, endyear:2012},{brand:'DODGE', model:'Grand Caravan', startyear:2008, endyear:2017},{brand:'DODGE', model:'Journey', startyear:2009, endyear:2012},{brand:'DODGE', model:'Ram', startyear:2008, endyear:2012}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 32, icon: "TAP32-NLK-CHRY-03-433-4.png", tc: "TAP32-NLK-CHRY-03-433-4", box: 32, brands: ['DODGE','CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300', startyear:2008, endyear:2011},{brand:'DODGE', model:'Charger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Challenger', startyear:2008, endyear:2012},{brand:'DODGE', model:'Durango', startyear:2011, endyear:2013},{brand:'DODGE', model:'Magnum', startyear:2008, endyear:2008}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 33, icon: "TAP33-NLK-CHRY-04-315-6-M3N.png", tc: "TAP33-NLK-CHRY-04-315-6-M3N", box: 33, brands: ['DODGE','CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'Town & Country', startyear:2004, endyear:2007},{brand:'DODGE', model:'Grand Caravan', startyear:2004, endyear:2007},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 34, icon: "TAP34-NLK-CHRY-06-433-1.png", tc: "TAP34-NLK-CHRY-06-433-1", box: 34, brands: ['DODGE'], compatiblewith: [{brand:'DODGE', model:'Charger', startyear:2011, endyear:2016},{brand:'DODGE', model:'Journey', startyear:2011, endyear:2016},{brand:'DODGE', model:'Dart', startyear:2013, endyear:2016},{brand:'DODGE', model:'Challenger', startyear:2015, endyear:2016},{brand:'DODGE', model:'Durango', startyear:2014, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 35, icon: "TAP35-NLK-CHRY-06-433-2.png", tc: "TAP35-NLK-CHRY-06-433-2", box: 35, brands: ['DODGE'], compatiblewith: [{brand:'DODGE', model:'Charger', startyear:2011, endyear:2016},{brand:'DODGE', model:'Journey', startyear:2011, endyear:2016},{brand:'DODGE', model:'Dart', startyear:2013, endyear:2016},{brand:'DODGE', model:'Challenger', startyear:2015, endyear:2016},{brand:'DODGE', model:'Durango', startyear:2014, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 36, icon: "TAP36-NLK-CHRY-06-433-3.png", tc: "TAP36-NLK-CHRY-06-433-3", box: 36, brands: ['DODGE','CHRYSLER'], compatiblewith: [{brand:'CHRYSLER', model:'300', startyear:2011, endyear:2017},{brand:'DODGE', model:'Charger', startyear:2011, endyear:2017},{brand:'DODGE', model:'Dart', startyear:2014, endyear:2016},{brand:'DODGE', model:'Challenger', startyear:2015, endyear:2017}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 37, icon: "TAP37-NLK-CHRY-06-433-4.png", tc: "TAP37-NLK-CHRY-06-433-4", box: 37, brands: ['DODGE','CHRYSLER','FIAT'], compatiblewith: [{brand:'DODGE', model:'Charger', startyear:2011, endyear:2016},{brand:'DODGE', model:'Dart', startyear:2013, endyear:2016},{brand:'DODGE', model:'Journey', startyear:2011, endyear:2015},{brand:'DODGE', model:'Challenger', startyear:2015, endyear:2017},{brand:'DODGE', model:'Durango', startyear:2014, endyear:2017},{brand:'CHRYSLER', model:'300', startyear:2011, endyear:2017},{brand:'FIAT', model:'Freemont', startyear:2011, endyear:2011}], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 38, icon: "TAP38-NLK-FIAT-05-433.png", tc: "TAP38-NLK-FIAT-05-433", box: 38, brands: ['FIAT','FORD','PEUGEOT','CITROEN','OPEL'], compatiblewith: [{brand:'FIAT', model:'Abarth 500', startyear:2008, endyear:2016},{brand:'FIAT', model:'Abarth Punto Evo', startyear:2010, endyear:2013},{brand:'FIAT', model:'500', startyear:2007, endyear:2016},{brand:'FIAT', model:'Grande Punto', startyear:2006, endyear:2016},{brand:'FIAT', model:'Panda', startyear:2011, endyear:2011},{brand:'FIAT', model:'Punto Evo', startyear:2009, endyear:2016},{brand:'FIAT', model:'Qubo', startyear:2008, endyear:2008},{brand:'FIAT', model:'Fiorino', startyear:2007, endyear:2016},{brand:'FORD', model:'KA', startyear:2009, endyear:2016},{brand:'PEUGEOT', model:'Bipper', startyear:2012, endyear:2012},{brand:'CITROEN', model:'Nemo', startyear:2012, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 39, icon: "TAP39-NLK-FIAT-12-433.png", tc: "TAP39-NLK-FIAT-12-433", box: 39, brands: ['FIAT','PEUGEOT','CITROEN'], compatiblewith: [{brand:'FIAT', model:'Fiorino', startyear:2007, endyear:2007},{brand:'FIAT', model:'Qubo', startyear:2008, endyear:2008},{brand:'PEUGEOT', model:'Bipper', startyear:2007, endyear:2007},{brand:'CITROEN', model:'Nemo', startyear:2007, endyear:2007},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 40, icon: "TAP40-NLK-FIAT-13-433.png", tc: "TAP40-NLK-FIAT-13-433", box: 40, brands: ['FIAT'], compatiblewith: [{brand:'FIAT', model:'Panda', startyear:2003, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 41, icon: "TAP41-NLK-FIAT-14-433.png", tc: "TAP41-NLK-FIAT-14-433", box: 41, brands: ['FIAT'], compatiblewith: [{brand:'FIAT', model:'Abarth 500X', startyear:2016, endyear:2018},{brand:'FIAT', model:'Egea', startyear:2016, endyear:2018},{brand:'FIAT', model:'Tipo', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 42, icon: "TAP42-NLK-FIAT-15-433.png", tc: "TAP42-NLK-FIAT-15-433", box: 42, brands: ['FIAT'], compatiblewith: [{brand:'FIAT', model:'Abarth 500X', startyear:2016, endyear:2018},{brand:'FIAT', model:'Egea', startyear:2016, endyear:2018},{brand:'FIAT', model:'Tipo', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 43, icon: "TAP43-NLK-FORD-06-63+.png", tc: "TAP43-NLK-FORD-06-63+", box: 43, brands: ['FORD'], compatiblewith: [], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 44, icon: "TAP44-NLK-FORD-11-433.png", tc: "TAP44-NLK-FORD-11-433", box: 44, brands: ['FORD'], compatiblewith: [{brand:'FORD', model:'F150', startyear:2015, endyear:2017},{brand:'FORD', model:'Ranger', startyear:2015, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 45, icon: "TAP45-NLK-FORD-31-433.png", tc: "TAP45-NLK-FORD-31-433", box: 45, brands: ['FORD'], compatiblewith: [{brand:'FORD', model:'Focus', startyear:2011, endyear:2013},{brand:'FORD', model:'Mondeo', startyear:2010, endyear:2013},{brand:'FORD', model:'C-Max', startyear:2010, endyear:2013},{brand:'FORD', model:'Grand C-Max', startyear:2010, endyear:2013},{brand:'FORD', model:'S-Max', startyear:2011, endyear:2013},{brand:'FORD', model:'Galaxy', startyear:2010, endyear:2013},{brand:'FORD', model:'Ranger', startyear:2011, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 46, icon: "TAP46-NLK-FORD-R10-433.png", tc: "TAP46-NLK-FORD-R10-433", box: 46, brands: ['FORD'], compatiblewith: [], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 47, icon: "TAP47-NLK-FORD-R13-304.png", tc: "TAP47-NLK-FORD-R13-304", box: 47, brands: ['FORD'], compatiblewith: [], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 48, icon: "TAP48-TRK-FORD-13-433-63+.png", tc: "TAP48-TRK-FORD-13-433-63+", box: 48, brands: ['FORD'], compatiblewith: [{brand:'FORD', model:'B-Max', startyear:2012, endyear:2014},{brand:'FORD', model:'Fiesta', startyear:2008, endyear:2016},{brand:'FORD', model:'Kuga', startyear:2011, endyear:2014},{brand:'FORD', model:'Galaxy', startyear:2010, endyear:2015},{brand:'FORD', model:'S-Max', startyear:2010, endyear:2015},{brand:'FORD', model:'C-Max', startyear:2010, endyear:2015},{brand:'FORD', model:'Grand C-Max', startyear:2010, endyear:2015},{brand:'FORD', model:'Focus', startyear:2011, endyear:2015},{brand:'FORD', model:'Mondeo', startyear:2007, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 49, icon: "TAP49-TRK-FORD-29-433.png", tc: "TAP49-TRK-FORD-29-433", box: 49, brands: ['FORD'], compatiblewith: [{brand:'FORD', model:'Mondeo', startyear:2014, endyear:2018},{brand:'FORD', model:'Edge', startyear:2016, endyear:2018},{brand:'FORD', model:'S-Max', startyear:2015, endyear:2017},{brand:'FORD', model:'Galaxy', startyear:2015, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 50, icon: "TAP50-TRK-FORD-33-433-601B.png", tc: "TAP50-TRK-FORD-33-433-601B", box: 50, brands: ['FORD'], compatiblewith: [{brand:'FORD', model:'KA+', startyear:2016, endyear:2016},{brand:'FORD', model:'Mondeo', startyear:2014, endyear:2014},{brand:'FORD', model:'Galaxy', startyear:2015, endyear:2015},{brand:'FORD', model:'S-Max', startyear:2015, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 51, icon: "TAP51-NLK-CHEV-05-433.png", tc: "TAP51-NLK-CHEV-05-433", box: 51, brands: ['HOLDEN','CHEVROLET'], compatiblewith: [{brand:'CHEVROLET', model:'Impala', startyear:2014, endyear:2017},{brand:'HOLDEN', model:'Malibu', startyear:2014, endyear:2016},{brand:'CHEVROLET', model:'Camaro', startyear:2010, endyear:2016},{brand:'CHEVROLET', model:'Camaro Convertible', startyear:2012, endyear:2013},{brand:'HOLDEN', model:'Cruze', startyear:2010, endyear:2015},{brand:'HOLDEN', model:'Captiva', startyear:2010, endyear:2016},{brand:'CHEVROLET', model:'Sonic', startyear:2012, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 52, icon: "TAP52-NLK-CHEV-09-433.png", tc: "TAP52-NLK-CHEV-09-433", box: 52, brands: ['HOLDEN','CHEVROLET','OPEL'], compatiblewith: [{brand:'HOLDEN', model:'Cruze', startyear:2009, endyear:2014},{brand:'CHEVROLET', model:'Orlando', startyear:2011, endyear:2014},{brand:'HOLDEN', model:'Astra', startyear:2009, endyear:2015},{brand:'OPEL', model:'Astra', startyear:2009, endyear:2015},{brand:'OPEL', model:'Insignia', startyear:2008, endyear:2017},{brand:'OPEL', model:'Cascade', startyear:2013, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 53, icon: "TAP53-NLK-CHEV-19-433-48.png", tc: "TAP53-NLK-CHEV-19-433-48", box: 53, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Barina', startyear:2009, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 54, icon: "TAP54-NLK-CHEV-28-433.png", tc: "TAP54-NLK-CHEV-28-433", box: 54, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Colorado', startyear:2018, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 55, icon: "TAP55-NLK-CHEV-32-433.png", tc: "TAP55-NLK-CHEV-32-433", box: 55, brands: ['CHEVROLET'], compatiblewith: [{brand:'CHEVROLET', model:'Aveo', startyear: 2000, endyear: 2020},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 56, icon: "TAP56-NLK-CHEV-R14-433.png", tc: "TAP56-NLK-CHEV-R14-433", box: 56, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Commodore VE', startyear:2006, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 57, icon: "TAP57-NLK-OPEL-12-433.png", tc: "TAP57-NLK-OPEL-12-433", box: 57, brands: ['OPEL'], compatiblewith: [{brand:'OPEL', model:'Combo', startyear:2002, endyear:2009},{brand:'OPEL', model:'Corsa', startyear:2001, endyear:2007},{brand:'OPEL', model:'Meriva', startyear:2002, endyear:2006},{brand:'OPEL', model:'Tigra', startyear:2004, endyear:2006},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 58, icon: "TAP58-TRK-CHEV-04-46.png", tc: "TAP58-TRK-CHEV-04-46", box: 58, brands: ['HOLDEN','CHEVROLET'], compatiblewith: [], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 59, icon: "TAP59-TRK-CHEV-08-433.png", tc: "TAP59-TRK-CHEV-08-433", box: 59, brands: ['HOLDEN','CHEVROLET','OPEL'], compatiblewith: [{brand:'HOLDEN', model:'Spark', startyear:2015, endyear:2015},{brand:'OPEL', model:'Adam', startyear:2013, endyear:2013},{brand:'HOLDEN', model:'Cascada', startyear:2013, endyear:2013},{brand:'HOLDEN', model:'Barina', startyear:2012, endyear:2015},{brand:'HOLDEN', model:'Cruze', startyear:2011, endyear:2014},{brand:'CHEVROLET', model:'Orlando', startyear:2011, endyear:2014},{brand:'HOLDEN', model:'Trax', startyear:2012, endyear:2015},{brand:'HOLDEN', model:'Astra', startyear:2010, endyear:2016},{brand:'OPEL', model:'Astra', startyear:2010, endyear:2016},{brand:'OPEL', model:'Zafira Tourer', startyear:2012, endyear:2017},{brand:'OPEL', model:'Insignia', startyear:2009, endyear:2016},{brand:'OPEL', model:'Mokka', startyear:2013, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 60, icon: "TAP60-TRK-CHEV-09-433.png", tc: "TAP60-TRK-CHEV-09-433", box: 60, brands: ['HOLDEN','OPEL'], compatiblewith: [{brand:'HOLDEN', model:'Cruze', startyear:2008, endyear:2014},{brand:'CHEVROLET', model:'Orlando', startyear:2011, endyear:2015},{brand:'HOLDEN', model:'Astra', startyear:2009, endyear:2015},{brand:'OPEL', model:'Astra', startyear:2009, endyear:2015},{brand:'OPEL', model:'Insignia', startyear:2008, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 61, icon: "TAP61-TRK-CHEV-12-433.png", tc: "TAP61-TRK-CHEV-12-433", box: 61, brands: ['HOLDEN','CHEVROLET'], compatiblewith: [], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 62, icon: "TAP62-TRK-CHEV-13-433.png", tc: "TAP62-TRK-CHEV-13-433", box: 62, brands: ['HOLDEN','CHEVROLET'], compatiblewith: [{brand:'HOLDEN', model:'Cruze', startyear:2011, endyear:2015},{brand:'CHEVROLET', model:'Impala', startyear:2014, endyear:2015},{brand:'HOLDEN', model:'Malibu', startyear:2013, endyear:2015},{brand:'HOLDEN', model:'Commodore VF', startyear:2014, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 63, icon: "TAP63-TRK-CHEV-41-433.png", tc: "TAP63-TRK-CHEV-41-433", box: 63, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Captiva', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 64, icon: "TAP64-TRK-OPEL-02-434.png", tc: "TAP64-TRK-OPEL-02-434", box: 64, brands: ['OPEL'], compatiblewith: [{brand:'OPEL', model:'Vectra C', startyear:2002, endyear:2008},{brand:'OPEL', model:'Signum', startyear:2003, endyear:2008},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 65, icon: "TAP65-TRK-OPEL-06-433.png", tc: "TAP65-TRK-OPEL-06-433", box: 65, brands: ['HOLDEN','OPEL'], compatiblewith: [{brand:'HOLDEN', model:'Astra', startyear:2004, endyear:2009},{brand:'OPEL', model:'Astra', startyear:2004, endyear:2009},{brand:'HOLDEN', model:'Zafira', startyear:2005, endyear:2013},{brand:'OPEL', model:'Zafira', startyear:2005, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 66, icon: "TAP66-NLK-HON-39-433.png", tc: "TAP66-NLK-HON-39-433", box: 66, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Civic', startyear:2011, endyear:2012},{brand:'HONDA', model:'CRV', startyear:2011, endyear:2012},{brand:'HONDA', model:'Jazz', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 67, icon: "TAP67-NLK-HON-01-433.png", tc: "TAP67-NLK-HON-01-433", box: 67, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Accord', startyear:2016, endyear:2017},{brand:'HONDA', model:'CRV', startyear:2016, endyear:2017},{brand:'HONDA', model:'Civic', startyear:2016, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 68, icon: "TAP68-NLK-HON-05-313.8-8E.png", tc: "TAP68-NLK-HON-05-313.8-8E", box: 68, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Accord', startyear:2006, endyear:2007},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 69, icon: "TAP69-NLK-HON-05-433-OB.png", tc: "TAP69-NLK-HON-05-433-OB", box: 69, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Accord', startyear:2002, endyear:2005},{brand:'HONDA', model:'CRV', startyear:2001, endyear:2006},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 70, icon: "TAP70-NLK-HON-09-433-G.png", tc: "TAP70-NLK-HON-09-433-G", box: 70, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'City', startyear:2013, endyear:2016},{brand:'HONDA', model:'BRV', startyear:2013, endyear:2016},{brand:'HONDA', model:'Crider', startyear:2013, endyear:2016},{brand:'HONDA', model:'Civic', startyear:2013, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 71, icon: "TAP71-NLK-HON-10-433.png", tc: "TAP71-NLK-HON-10-433", box: 71, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'City', startyear:2013, endyear:2016},{brand:'HONDA', model:'BRV', startyear:2013, endyear:2016},{brand:'HONDA', model:'Crider', startyear:2013, endyear:2016},{brand:'HONDA', model:'Civic', startyear:2013, endyear:2016},{brand:'HONDA', model:'Accord', startyear:2013, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 72, icon: "TAP72-NLK-HON-11-313.8-13.png", tc: "TAP72-NLK-HON-11-313.8-13", box: 72, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Jazz', startyear:2004, endyear:2005},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 73, icon: "TAP73-NLK-HON-11-433.png", tc: "TAP73-NLK-HON-11-433", box: 73, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Odassey', startyear:2004, endyear:2008},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 74, icon: "TAP74-NLK-HON-11-433-48CHIP.png", tc: "TAP74-NLK-HON-11-433-48CHIP", box: 74, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Civic', startyear:2003, endyear:2005},{brand:'HONDA', model:'Jazz', startyear:2004, endyear:2005},{brand:'HONDA', model:'HRV', startyear:2005, endyear:2005},{brand:'HONDA', model:'Stream', startyear:2004, endyear:2005},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 75, icon: "TAP75-NLK-HON-11-433-8E.png", tc: "TAP75-NLK-HON-11-433-8E", box: 75, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'CRV', startyear:2006, endyear:2008},{brand:'HONDA', model:'FRV', startyear:2007, endyear:2009},{brand:'HONDA', model:'Jazz', startyear:2006, endyear:2008},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 76, icon: "TAP76-NLK-HON-18-433.png", tc: "TAP76-NLK-HON-18-433", box: 76, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Brio', startyear:2015, endyear:2016},{brand:'HONDA', model:'Mobilio', startyear:2015, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 77, icon: "TAP77-NLK-HON-27-313.8.png", tc: "TAP77-NLK-HON-27-313.8", box: 77, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Fit', startyear:2014, endyear:2014},{brand:'HONDA', model:'City', startyear:2014, endyear:2014},{brand:'HONDA', model:'Jazz', startyear:2014, endyear:2014},{brand:'HONDA', model:'Shuttle', startyear:2014, endyear:2014},{brand:'HONDA', model:'Vezel', startyear:2014, endyear:2014},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 78, icon: "TAP78-NLK-HON-27-434.png", tc: "TAP78-NLK-HON-27-434", box: 78, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Fit', startyear:2014, endyear:2014},{brand:'HONDA', model:'City', startyear:2014, endyear:2014},{brand:'HONDA', model:'Vezel', startyear:2014, endyear:2014},{brand:'HONDA', model:'XRV', startyear:2014, endyear:2014},{brand:'HONDA', model:'HRV', startyear:2018, endyear:2018},{brand:'HONDA', model:'Jazz', startyear:2018, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 79, icon: "TAP79-NLK-HON-28-434.png", tc: "TAP79-NLK-HON-28-434", box: 79, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'City', startyear:2015, endyear:2015},{brand:'HONDA', model:'Jazz', startyear:2015, endyear:2015},{brand:'HONDA', model:'Civic', startyear:2015, endyear:2015},{brand:'HONDA', model:'Grace', startyear:2016, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 80, icon: "TAP80-NLK-HON-40-433-46.png", tc: "TAP80-NLK-HON-40-433-46", box: 80, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Accord', startyear:2011, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 81, icon: "TAP81-NLK-HON-45-433.png", tc: "TAP81-NLK-HON-45-433", box: 81, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Civic', startyear:2015, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 82, icon: "TAP82-NLK-HON-62-433.png", tc: "TAP82-NLK-HON-62-433", box: 82, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'CRV', startyear:2015, endyear:2017},{brand:'HONDA', model:'Jade', startyear:2014, endyear:2017},{brand:'HONDA', model:'Crosstour', startyear:2014, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 83, icon: "TAP83-TRK-HON-37-433.png", tc: "TAP83-TRK-HON-37-433", box: 83, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'Civic', startyear:2012, endyear:2015},{brand:'HONDA', model:'CRV', startyear:2012, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 84, icon: "TAP84-TRK-HON-58-433.png", tc: "TAP84-TRK-HON-58-433", box: 84, brands: ['HONDA'], compatiblewith: [{brand:'HONDA', model:'CRV', startyear:2018, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 85, icon: "TAP85-NLK-HYUN-20-315.png", tc: "TAP85-NLK-HYUN-20-315", box: 85, brands: ['HYUNDAI','KIA'], compatiblewith: [{brand:'HYUNDAI', model:'Azera', startyear:2011, endyear:2015},{brand:'HYUNDAI', model:'Elantra', startyear:2011, endyear:2015},{brand:'HYUNDAI', model:'Equus', startyear:2011, endyear:2014},{brand:'HYUNDAI', model:'Genesis', startyear:2009, endyear:2014},{brand:'HYUNDAI', model:'Sonata', startyear:2011, endyear:2015},{brand:'HYUNDAI', model:'Tucson', startyear:2013, endyear:2014},{brand:'HYUNDAI', model:'Veloster', startyear:2011, endyear:2017},{brand:'KIA', model:'Borrego', startyear:2009, endyear:2012},{brand:'KIA', model:'Forte', startyear:2011, endyear:2013},{brand:'KIA', model:'Optima', startyear:2011, endyear:2014},{brand:'KIA', model:'Sorento', startyear:2011, endyear:2013},{brand:'KIA', model:'Soul', startyear:2011, endyear:2013},{brand:'KIA', model:'Rio', startyear:2011, endyear:2014},{brand:'KIA', model:'Sportage', startyear:2011, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 86, icon: "TAP86-NLK-HYUN-20-433.png", tc: "TAP86-NLK-HYUN-20-433", box: 86, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Sonata', startyear:2011, endyear:2015},{brand:'HYUNDAI', model:'Genesis', startyear:2009, endyear:2014},{brand:'HYUNDAI', model:'Equus', startyear:2011, endyear:2015},{brand:'HYUNDAI', model:'Veloster', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 87, icon: "TAP87-NLK-HYUN-53-433.png", tc: "TAP87-NLK-HYUN-53-433", box: 87, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'i30', startyear:2017, endyear:2020},{brand:'HYUNDAI', model:'Elantra GT', startyear:2018, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 88, icon: "TAP88-TRK-HYUN-03-433.png", tc: "TAP88-TRK-HYUN-03-433", box: 88, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'i30', startyear:2017, endyear:2017},{brand:'HYUNDAI', model:'Elantra', startyear:2015, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 89, icon: "TAP89-TRK-HYUN-10-433.png", tc: "TAP89-TRK-HYUN-10-433", box: 89, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Santa Fe', startyear:2013, endyear:2015},{brand:'HYUNDAI', model:'ix45', startyear:2013, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 90, icon: "TAP90-TRK-HYUN-18-433.png", tc: "TAP90-TRK-HYUN-18-433", box: 90, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Tucson', startyear:2014, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 91, icon: "TAP91-TRK-HYUN-21-433.png", tc: "TAP91-TRK-HYUN-21-433", box: 91, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Tucson', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 92, icon: "TAP92-TRK-HYUN-33-433-2S610.png", tc: "TAP92-TRK-HYUN-33-433-2S610", box: 92, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Tucson', startyear:2014, endyear:2016},{brand:'HYUNDAI', model:'ix35', startyear:2013, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 93, icon: "TAP93-TRK-HYUN-34-433.png", tc: "TAP93-TRK-HYUN-34-433", box: 93, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Santa Fe', startyear:2012, endyear:2017},{brand:'HYUNDAI', model:'ix45', startyear:2012, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 94, icon: "TAP94-TRK-HYUN-49-433.png", tc: "TAP94-TRK-HYUN-49-433", box: 94, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Tucson', startyear:2018, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 95, icon: "TAP95-TRK-HYUN-50-433.png", tc: "TAP95-TRK-HYUN-50-433", box: 95, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'i10', startyear:2013, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 96, icon: "TAP96-TRK-HYUN-52-433.png", tc: "TAP96-TRK-HYUN-52-433", box: 96, brands: ['HYUNDAI'], compatiblewith: [{brand:'HYUNDAI', model:'Tucson', startyear:2019, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 97, icon: "TAP97-NLK-JAGU-02-433.png", tc: "TAP97-NLK-JAGU-02-433", box: 97, brands: ['JAGUAR'], compatiblewith: [{brand:'JAGUAR', model:'XK', startyear:2007, endyear:2011},{brand:'JAGUAR', model:'XKR', startyear:2007, endyear:2011},{brand:'JAGUAR', model:'XF', startyear:2007, endyear:2011},{brand:'JAGUAR', model:'XFR', startyear:2007, endyear:2011},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 98, icon: "TAP98-TRK-JAGU-01-433.png", tc: "TAP98-TRK-JAGU-01-433", box: 98, brands: ['JAGUAR'], compatiblewith: [{brand:'JAGUAR', model:'XF', startyear:2012, endyear:2015},{brand:'JAGUAR', model:'F Type', startyear:2015, endyear:2015},{brand:'JAGUAR', model:'XK', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 99, icon: "TAP99-TRK-JAGU-04-433.png", tc: "TAP99-TRK-JAGU-04-433", box: 99, brands: ['JAGUAR'], compatiblewith: [{brand:'JAGUAR', model:'E Pace', startyear:2018, endyear:2018},{brand:'JAGUAR', model:'F Pace', startyear:2018, endyear:2018},{brand:'JAGUAR', model:'I Pace', startyear:2018, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },


    // { remotenumber: 100, icon: "TAP100-NLK-CHRY-03-433-5.png", tc: "TAP100-NLK-CHRY-03-433-5", box: 100, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Commander', startyear:2008, endyear:2010},{brand:'JEEP', model:'Grand Cherokee', startyear:2008, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 101, icon: "TAP101-NLK-CHRY-03-433-6.png", tc: "TAP101-NLK-CHRY-03-433-6", box: 101, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Grand Cherokee', startyear:2008, endyear:2012},{brand:'JEEP', model:'Commander', startyear:2008, endyear:2010},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 102, icon: "TAP102-NLK-JEEP-06-433.png", tc: "TAP102-NLK-JEEP-06-433", box: 102, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Cherokee', startyear:2014, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 103, icon: "TAP103-NLK-JEEP-07-433.png", tc: "TAP103-NLK-JEEP-07-433", box: 103, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Grand Cherokee', startyear:2013, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 104, icon: "TAP104-NLK-JEEP-09-433-3.png", tc: "TAP104-NLK-JEEP-09-433-3", box: 104, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Grand Cherokee', startyear:2014, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 105, icon: "TAP105-NLK-JEEP-19-433-1.png", tc: "TAP105-NLK-JEEP-19-433-1", box: 105, brands: ['JEEP'], compatiblewith: [{brand:'JEEP', model:'Cherokee', startyear:2014, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 106, icon: "TAP106-TRK-KIA-15-433.png", tc: "TAP106-TRK-KIA-15-433", box: 106, brands: ['KIA'], compatiblewith: [{brand:'KIA', model:'Picanto', startyear:2014, endyear:2016},{brand:'KIA', model:'Optima', startyear:2014, endyear:2016},{brand:'KIA', model:'Sorento', startyear:2014, endyear:2016},{brand:'KIA', model:'Sportage', startyear:2014, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 107, icon: "TAP107-TRK-KIA-16-433-4D.png", tc: "TAP107-TRK-KIA-16-433-4D", box: 107, brands: ['KIA'], compatiblewith: [{brand:'KIA', model:'K3', startyear:2012, endyear:2012},{brand:'KIA', model:'Forte', startyear:2013, endyear:2013},{brand:'KIA', model:'Cerato', startyear:2012, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 108, icon: "TAP108-TRK-KIA-37-433.png", tc: "TAP108-TRK-KIA-37-433", box: 108, brands: ['KIA'], compatiblewith: [{brand:'KIA', model:'Sorento', startyear:2015, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 109, icon: "TAP109-NLK-LAND-03.png", tc: "TAP109-NLK-LAND-03", box: 109, brands: ['LAND ROVER'], compatiblewith: [{brand:'LAND ROVER', model:'Freelander', startyear:2007, endyear:2013},{brand:'LAND ROVER', model:'LR2', startyear:2008, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 110, icon: "TAP110-NLK-LAND-09-315.png", tc: "TAP110-NLK-LAND-09-315", box: 110, brands: ['LAND ROVER','RANGE ROVER'], compatiblewith: [{brand:'LAND ROVER', model:'LR3', startyear:2005, endyear:2009},{brand:'RANGE ROVER', model:'Sport', startyear:2006, endyear:2011},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 111, icon: "TAP111-NLK-LAND-09-433.png", tc: "TAP111-NLK-LAND-09-433", box: 111, brands: ['LAND ROVER','RANGE ROVER'], compatiblewith: [{brand:'LAND ROVER', model:'Discovery 3', startyear:2006, endyear:2010},{brand:'RANGE ROVER', model:'Sport', startyear:2006, endyear:2010},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 112, icon: "TAP112-NLK-LAND-13-433.png", tc: "TAP112-NLK-LAND-13-433", box: 112, brands: ['LAND ROVER','RANGE ROVER','JAGUAR'], compatiblewith: [{brand:'JAGUAR', model:'F Type', startyear:2014, endyear:2015},{brand:'JAGUAR', model:'XJ', startyear:2011, endyear:2017},{brand:'JAGUAR', model:'XF', startyear:2013, endyear:2018},{brand:'JAGUAR', model:'F Pace', startyear:2017, endyear:2019},{brand:'JAGUAR', model:'XE', startyear:2017, endyear:2018},{brand:'LAND ROVER', model:'LR2', startyear:2013, endyear:2014},{brand:'LAND ROVER', model:'LR4', startyear:2012, endyear:2018},{brand:'LAND ROVER', model:'Discovery', startyear:2015, endyear:2018},{brand:'LAND ROVER', model:'Discovery Sport', startyear:2016, endyear:2018},{brand:'RANGE ROVER', model:'Evoque', startyear:2011, endyear:2016},{brand:'RANGE ROVER', model:'Sport', startyear:2010, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 113, icon: "TAP113-TRK-LAND-13-433.png", tc: "TAP113-TRK-LAND-13-433", box: 113, brands: ['RANGE ROVER'], compatiblewith: [{brand:'RANGE ROVER', model:'Sport', startyear:2010, endyear:2010},{brand:'RANGE ROVER', model:'Vogue', startyear:2010, endyear:2010},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 114, icon: "TAP114-TRK-LEX-07-3370-433.png", tc: "TAP114-TRK-LEX-07-3370-433", box: 114, brands: ['LEXUS'], compatiblewith: [{brand:'LEXUS', model:'ES350', startyear:2008, endyear:2013},{brand:'LEXUS', model:'IS250', startyear:2008, endyear:2013},{brand:'LEXUS', model:'IS350', startyear:2008, endyear:2013},{brand:'LEXUS', model:'GS300', startyear:2008, endyear:2013},{brand:'LEXUS', model:'GS350', startyear:2008, endyear:2013},{brand:'LEXUS', model:'GS430', startyear:2008, endyear:2013},{brand:'LEXUS', model:'GS450h', startyear:2008, endyear:2013},{brand:'LEXUS', model:'GS460', startyear:2008, endyear:2013},{brand:'LEXUS', model:'LS460', startyear:2008, endyear:2013},{brand:'LEXUS', model:'LS600h', startyear:2008, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 115, icon: "TAP115-TRK-LEX-08-0140.png", tc: "TAP115-TRK-LEX-08-0140", box: 115, brands: ['LEXUS'], compatiblewith: [{brand:'LEXUS', model:'ES350', startyear:2007, endyear:2009},{brand:'LEXUS', model:'GS300', startyear:2006, endyear:2006},{brand:'LEXUS', model:'GS350', startyear:2007, endyear:2008},{brand:'LEXUS', model:'GS430', startyear:2006, endyear:2007},{brand:'LEXUS', model:'GS450h', startyear:2007, endyear:2008},{brand:'LEXUS', model:'GS460', startyear:2008, endyear:2008},{brand:'LEXUS', model:'IS250', startyear:2006, endyear:2008},{brand:'LEXUS', model:'IS350', startyear:2006, endyear:2008},{brand:'LEXUS', model:'IS-F', startyear:2008, endyear:2008},{brand:'LEXUS', model:'LS460', startyear:2007, endyear:2008},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 116, icon: "TAP116-TRK-LEX-08-3370.png", tc: "TAP116-TRK-LEX-08-3370", box: 116, brands: ['LEXUS'], compatiblewith: [{brand:'LEXUS', model:'CT200h', startyear:2011, endyear:2011},{brand:'LEXUS', model:'ES350', startyear:2010, endyear:2012},{brand:'LEXUS', model:'GS450h', startyear:2009, endyear:2012},{brand:'LEXUS', model:'GS460', startyear:2009, endyear:2011},{brand:'LEXUS', model:'GS350', startyear:2009, endyear:2012},{brand:'LEXUS', model:'HS250h', startyear:2010, endyear:2012},{brand:'LEXUS', model:'IS250', startyear:2009, endyear:2011},{brand:'LEXUS', model:'IS350', startyear:2009, endyear:2011},{brand:'LEXUS', model:'IS-F', startyear:2009, endyear:2011},{brand:'LEXUS', model:'LS460', startyear:2009, endyear:2009},{brand:'LEXUS', model:'LX570', startyear:2010, endyear:2011},{brand:'LEXUS', model:'ISC', startyear:2009, endyear:2011},{brand:'LEXUS', model:'LS600h', startyear:2009, endyear:2009},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 117, icon: "TAP117-NLK-MAZ-14-433.png", tc: "TAP117-NLK-MAZ-14-433", box: 117, brands: ['MAZDA'], compatiblewith: [{brand:'MAZDA', model:'6 Wagon', startyear:2012, endyear:2019},{brand:'MAZDA', model:'CX-3', startyear:2015, endyear:2019},{brand:'MAZDA', model:'CX-5', startyear:2012, endyear:2019},{brand:'MAZDA', model:'CX-7', startyear:2010, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 118, icon: "TAP118-NLK-MAZ-24-433.png", tc: "TAP118-NLK-MAZ-24-433", box: 118, brands: ['MAZDA'], compatiblewith: [{brand:'MAZDA', model:'CX-3', startyear:2015, endyear:2015},{brand:'MAZDA', model:'CX-5', startyear:2012, endyear:2015},{brand:'MAZDA', model:'2', startyear:2014, endyear:2016},{brand:'MAZDA', model:'3 Hatch', startyear:2013, endyear:2015},{brand:'MAZDA', model:'6 Wagon', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 119, icon: "TAP119-NLK-MAZ-25-433.png", tc: "TAP119-NLK-MAZ-25-433", box: 119, brands: ['MAZDA'], compatiblewith: [{brand:'MAZDA', model:'3', startyear:2013, endyear:2017},{brand:'MAZDA', model:'6', startyear:2012, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 120, icon: "TAP120-TRK-MAZ-22-433.png", tc: "TAP120-TRK-MAZ-22-433", box: 120, brands: ['MAZDA'], compatiblewith: [{brand:'MAZDA', model:'CX-5', startyear:2017, endyear:2017},{brand:'MAZDA', model:'CX-9', startyear:2017, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 121, icon: "TAP121-TRK-MAZ-24-433.png", tc: "TAP121-TRK-MAZ-24-433", box: 121, brands: ['MAZDA'], compatiblewith: [{brand:'MAZDA', model:'CX-3', startyear:2015, endyear:2015},{brand:'MAZDA', model:'CX-5', startyear:2012, endyear:2015},{brand:'MAZDA', model:'2', startyear:2014, endyear:2016},{brand:'MAZDA', model:'3 Hatch', startyear:2013, endyear:2015},{brand:'MAZDA', model:'6 Wagon', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 122, icon: "TAP122-NLK-BMW-01-315.png", tc: "TAP122-NLK-BMW-01-315", box: 122, brands: ['MINI COOPER'], compatiblewith: [{brand:'MINI', model:'Mini cooper', startyear:2006, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 123, icon: "TAP123-NLK-BMW-01-433.png", tc: "TAP123-NLK-BMW-01-433", box: 123, brands: ['MINI COOPER'], compatiblewith: [{brand:'MINI', model:'Mini Cooper', startyear:2008, endyear:2013},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 124, icon: "TAP124-NLK-NISS-05-433.png", tc: "TAP124-NLK-NISS-05-433", box: 124, brands: ['NISSAN','RENAULT'], compatiblewith: [{brand:'NISSAN', model:'Cabster', startyear:2006, endyear:2015},{brand:'NISSAN', model:'Note', startyear:2006, endyear:2013},{brand:'NISSAN', model:'NV200', startyear:2009, endyear:2013},{brand:'NISSAN', model:'Pathfinder', startyear:2005, endyear:2006},{brand:'NISSAN', model:'Qashqai', startyear:2006, endyear:2014},{brand:'NISSAN', model:'Duali', startyear:2006, endyear:2014},{brand:'NISSAN', model:'Micra K12', startyear:2002, endyear:2010},{brand:'NISSAN', model:'Navara', startyear:2006, endyear:2015},{brand:'NISSAN', model:'Patrol', startyear:2006, endyear:2006},{brand:'NISSAN', model:'Renault', startyear:2007, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 125, icon: "TAP125-NLK-NISS-12-433.png", tc: "TAP125-NLK-NISS-12-433", box: 125, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Patrol', startyear:2010, endyear:2012},{brand:'NISSAN', model:'Juke', startyear:2009, endyear:2010},{brand:'NISSAN', model:'Cube', startyear:2009, endyear:2013},{brand:'NISSAN', model:'Micra', startyear:2010, endyear:2011},{brand:'NISSAN', model:'Armada', startyear:2017, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 126, icon: "TAP126-NLK-NISS-55-433.png", tc: "TAP126-NLK-NISS-55-433", box: 126, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Murano', startyear:2015, endyear:2018},{brand:'NISSAN', model:'Pathfinder', startyear:2016, endyear:2018},{brand:'NISSAN', model:'Titan', startyear:2017, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 127, icon: "TAP127-NLK-NISS-56-433.png", tc: "TAP127-NLK-NISS-56-433", box: 127, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Rogue', startyear:2017, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 128, icon: "TAP128-TRK-NISS-13-433.png", tc: "TAP128-TRK-NISS-13-433", box: 128, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Altima', startyear:2016, endyear:2018},{brand:'NISSAN', model:'Maxima', startyear:2016, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 129, icon: "TAP129-TRK-NISS-66-433.png", tc: "TAP129-TRK-NISS-66-433", box: 129, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Pathfinder', startyear:2015, endyear:2018},{brand:'NISSAN', model:'Murano', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 130, icon: "TAP130-TRK-NISS-69-433.png", tc: "TAP130-TRK-NISS-69-433", box: 130, brands: ['NISSAN'], compatiblewith: [{brand:'NISSAN', model:'Pathfinder', startyear:2019, endyear:2020},{brand:'NISSAN', model:'Murano', startyear:2019, endyear:2020},{brand:'NISSAN', model:'Titan', startyear:2019, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 131, icon: "TAP131-NLK-REN-09-433.png", tc: "TAP131-NLK-REN-09-433", box: 131, brands: ['RENAULT'], compatiblewith: [{brand:'RENAULT', model:'Megane II', startyear:2003, endyear:2008},{brand:'RENAULT', model:'Scenic II', startyear:2003, endyear:2008},{brand:'RENAULT', model:'Grand Scenic II', startyear:2003, endyear:2008},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 132, icon: "TAP132-NLK-REN-10-433.png", tc: "TAP132-NLK-REN-10-433", box: 132, brands: ['RENAULT'], compatiblewith: [{brand:'RENAULT', model:'Clio IV', startyear:2009, endyear:2015},{brand:'RENAULT', model:'Captur', startyear:2013, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 133, icon: "TAP133-NLK-REN-19-433.png", tc: "TAP133-NLK-REN-19-433", box: 133, brands: ['RENAULT'], compatiblewith: [{brand:'RENAULT', model:'Clio IV', startyear:2013, endyear:2017},{brand:'RENAULT', model:'Captur', startyear:2013, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 134, icon: "TAP134-NLK-REN-20-433.png", tc: "TAP134-NLK-REN-20-433", box: 134, brands: ['RENAULT'], compatiblewith: [{brand:'RENAULT', model:'Megane III', startyear:2009, endyear:2015},{brand:'RENAULT', model:'Laguna III', startyear:2008, endyear:2012},{brand:'RENAULT', model:'Scenic', startyear:2009, endyear:2015},{brand:'RENAULT', model:'Fluence', startyear:2012, endyear:2016},{brand:'RENAULT', model:'Grand Scenic', startyear:2009, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 135, icon: "TAP135-NLK-REN-37-433.png", tc: "TAP135-NLK-REN-37-433", box: 135, brands: ['RENAULT'], compatiblewith: [{brand:'RENAULT', model:'Megane IV', startyear:2016, endyear:2016},{brand:'RENAULT', model:'Talisman', startyear:2016, endyear:2016},{brand:'RENAULT', model:'Espace V', startyear:2016, endyear:2016},{brand:'RENAULT', model:'Kadjar', startyear:2015, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 136, icon: "TAP136-TRK-SUBA-02-433-62.png", tc: "TAP136-TRK-SUBA-02-433-62", box: 136, brands: ['SUBARU'], compatiblewith: [{brand:'SUBARU', model:'Impreza', startyear:2004, endyear:2010},{brand:'SUBARU', model:'Liberty', startyear:2004, endyear:2009},{brand:'SUBARU', model:'Outback', startyear:2005, endyear:2009},{brand:'SUBARU', model:'Tribeca', startyear:2004, endyear:2009},{brand:'SUBARU', model:'Forester', startyear:2004, endyear:2009},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 137, icon: "TAP137-TRK-SUBA-11-433-62.png", tc: "TAP137-TRK-SUBA-11-433-62", box: 137, brands: ['SUBARU'], compatiblewith: [{brand:'SUBARU', model:'Outback', startyear:2008, endyear:2014},{brand:'SUBARU', model:'Forester', startyear:2008, endyear:2014},{brand:'SUBARU', model:'Legacy', startyear:2008, endyear:2014},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 138, icon: "TAP138-TRK-SUBA-12-433-62.png", tc: "TAP138-TRK-SUBA-12-433-62", box: 138, brands: ['SUBARU'], compatiblewith: [{brand:'SUBARU', model:'Outback', startyear:2008, endyear:2010},{brand:'SUBARU', model:'Forester', startyear:2009, endyear:2011},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 139, icon: "TAP139-TRK-SUBA-13-433.png", tc: "TAP139-TRK-SUBA-13-433", box: 139, brands: ['SUBARU'], compatiblewith: [{brand:'SUBARU', model:'XV', startyear:2018, endyear:2018},{brand:'SUBARU', model:'Outback', startyear:2019, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 140, icon: "TAP140-TRK-SUBA-21-433.png", tc: "TAP140-TRK-SUBA-21-433", box: 140, brands: ['SUBARU'], compatiblewith: [{brand:'SUBARU', model:'Forester', startyear:2014, endyear:2020},{brand:'SUBARU', model:'Legacy', startyear:2016, endyear:2020},{brand:'SUBARU', model:'Impreza', startyear:2016, endyear:2020},{brand:'SUBARU', model:'XV Crosstrek', startyear:2017, endyear:2020},{brand:'SUBARU', model:'BRZ', startyear:2014, endyear:2020},{brand:'SUBARU', model:'Outback', startyear:2015, endyear:2018},{brand:'SUBARU', model:'ST', startyear:2016, endyear:2017},{brand:'SUBARU', model:'WRX', startyear:2016, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 141, icon: "TAP141-TRK-TOY-29-5290.png", tc: "TAP141-TRK-TOY-29-5290", box: 141, brands: ['TOYOTA'], compatiblewith: [{brand:'TOYOTA', model:'4-Runner', startyear:2010, endyear:2013},{brand:'TOYOTA', model:'Prius', startyear:2010, endyear:2013},{brand:'TOYOTA', model:'Sicon', startyear:2012, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 142, icon: "TAP142-TRK-TOY-31-5290.png", tc: "TAP142-TRK-TOY-31-5290", box: 142, brands: ['TOYOTA'], compatiblewith: [{brand:'TOYOTA', model:'Prius', startyear:2012, endyear:2014},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 143, icon: "TAP143-TRK-TOY-52-5290.png", tc: "TAP143-TRK-TOY-52-5290", box: 143, brands: ['TOYOTA'], compatiblewith: [{brand:'TOYOTA', model:'Prius V', startyear:2010, endyear:2016},{brand:'TOYOTA', model:'4-Runner', startyear:2010, endyear:2018},{brand:'TOYOTA', model:'Venza', startyear:2009, endyear:2014},{brand:'TOYOTA', model:'Prius C', startyear:2012, endyear:2014},{brand:'TOYOTA', model:'Sicon TC', startyear:2012, endyear:2012},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 144, icon: "TAP144-TRK-VW-02-433-MQB.png", tc: "TAP144-TRK-VW-02-433-MQB", box: 144, brands: ['VOLKSWAGEN','SKODA','SEAT'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Golf', startyear:2012, endyear:2015},{brand:'SKODA', model:'Octavia', startyear:2012, endyear:2015},{brand:'SEAT', model:'Leon', startyear:2012, endyear:2015},{brand:'VOLKSWAGEN', model:'Polo', startyear:2014, endyear:2017},{brand:'VOLKSWAGEN', model:'Tiguan', startyear:2016, endyear:2020},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 145, icon: "TAP145-TRK-VW-02-433-AG.png", tc: "TAP145-TRK-VW-02-433-AG", box: 145, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Golf', startyear:2012, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 146, icon: "TAP146-TRK-VW-08-433-48.png", tc: "TAP146-TRK-VW-08-433-48", box: 146, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Passat', startyear:2004, endyear:2015},{brand:'VOLKSWAGEN', model:'Passat CC', startyear:2004, endyear:2015},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 147, icon: "TAP147-TRK-VW-12-433.png", tc: "TAP147-TRK-VW-12-433", box: 147, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Touareg', startyear:2011, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 148, icon: "TAP148-TRK-VW-13-433.png", tc: "TAP148-TRK-VW-13-433", box: 148, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Touran', startyear:2015, endyear:2018},{brand:'VOLKSWAGEN', model:'Tiguan', startyear:2016, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 149, icon: "TAP149-TRK-VW-29-433.png", tc: "TAP149-TRK-VW-29-433", box: 149, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Passat B8', startyear:2017, endyear:2017},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 150, icon: "TAP150-TRK-VW-34-433.png", tc: "TAP150-TRK-VW-34-433", box: 150, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Golf', startyear:2019, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 151, icon: "TAP151-TRK-VW-35-433.png", tc: "TAP151-TRK-VW-35-433", box: 151, brands: ['VOLKSWAGEN'], compatiblewith: [{brand:'VOLKSWAGEN', model:'Golf', startyear:2019, endyear:2019},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 152, icon: "TAP152-NLK-VOL-07-434.png", tc: "TAP152-NLK-VOL-07-434", box: 152, brands: ['VOLVO'], compatiblewith: [{brand:'VOLVO', model:'S60', startyear:2011, endyear:2017},{brand:'VOLVO', model:'S60 XC', startyear:2016, endyear:2017},{brand:'VOLVO', model:'S60 L', startyear:2016, endyear:2017},{brand:'VOLVO', model:'S80', startyear:2007, endyear:2016},{brand:'VOLVO', model:'V60', startyear:2014, endyear:2017},{brand:'VOLVO', model:'V60 XC', startyear:2015, endyear:2017},{brand:'VOLVO', model:'V70', startyear:2008, endyear:2010},{brand:'VOLVO', model:'XC60', startyear:2009, endyear:2017},{brand:'VOLVO', model:'XC70', startyear:2008, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 153, icon: "TAP153-NLK-CHEV-05-433.png", tc: "TAP153-NLK-CHEV-05-433", box: 153, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Commodore VF', startyear:2014, endyear:2017},{brand:'HOLDEN', model:'Malibu', startyear:2013, endyear:2016},{brand:'HOLDEN', model:'Cruze', startyear:2011, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 154, icon: "TAP154-TRK-CHEV-05-433.png", tc: "TAP154-TRK-CHEV-05-433", box: 154, brands: ['HOLDEN'], compatiblewith: [{brand:'HOLDEN', model:'Commodore VF', startyear:2014, endyear:2017},{brand:'HOLDEN', model:'Malibu', startyear:2013, endyear:2016},{brand:'HOLDEN', model:'Cruze', startyear:2011, endyear:2016},], blade: 'whhooo', chip: 'wqeooo', notes: '' },
    // { remotenumber: 155, icon: "TAP155-NLK-DODG-06-433-1.png", tc: "TAP155-NLK-DODG-06-433-1", box: 155, brands: ['DODGE'], compatiblewith: [{brand:'DODGE', model:'Ram', startyear:2014, endyear:2018},], blade: 'whhooo', chip: 'wqeooo', notes: '' },

