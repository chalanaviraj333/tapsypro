import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { NavparamService } from '../navparam.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('search', { static: false }) search: IonSearchbar;

  public remotes = [];
  private searchedItem: any;


  constructor(private navParamService: NavparamService, private router: Router) {

    this.remotes = [
      { remotenumber: 1, icon: "TAP1-TRK-OPEL-06-433.png", tc: "TAP1-TRK-OPEL-06-433", box: 1, brands: ['HOLDEN', 'OPEL'], compatiblewith: ['2004-2009 Opel/Vauxhall Astra H', '2005-2013 Opel/Vauxhall Zafira B'], blade: '', chip: "", notes: '' },
      { remotenumber: 2, icon: "TAP2-TRK-HON-58-433.png", tc: "TAP2-TRK-HON-58-433", box: 2, brands: ['HONDA'], compatiblewith: ['2018 CRV'], blade: '', chip: "", notes: '' },
      { remotenumber: 3, icon: "TAP3-TRK-FORD-13-433.png", tc: "TAP3-TRK-FORD-13-433", box: 3, brands: ['FORD'], compatiblewith: ['2012-2014 Ford B-Max','2008-2016 Fiesta','2011-2014 Kuga','2010-2015 Galaxy','2010-2015 S-Max','2010-2015 C-Max','2010-2015 Grand C-Max','2011-2015 Focus','2007-2015 Mondeo'], blade: '', chip: "", notes: '' },
      { remotenumber: 4, icon: "TAP4-NLK-CHRY-06-433-2.png", tc: "TAP4-NLK-CHRY-06-433-2", box: 4, brands: ['DODGE'], compatiblewith: ['2011-2016 Charger','2011-2016 Journey','2013-2016 Dart','2015-2016 Challenger','2014-2016 Durango'], blade: '', chip: "", notes: '' },
      { remotenumber: 5, icon: "TAP5-NLK-LAND-03.png", tc: "TAP5-NLK-LAND-03", box: 5, brands: ['LAND ROVER'], compatiblewith: ['2007-2013 Freelander','2008-2012 Land Rover LR2'], blade: '', chip: "", notes: '' },
      { remotenumber: 6, icon: "TAP6-NLK-HON-01-433.png", tc: "TAP6-NLK-HON-01-433", box: 6, brands: ['HONDA'], compatiblewith: ['2016-2017 Accord','2016-2017 CR-V','2016-2017 Civic'], blade: '', chip: "", notes: '' },
      { remotenumber: 7, icon: "TAP7-TRK-JAGU-01-433.png", tc: "TAP7-TRK-JAGU-01-433", box: 7, brands: ['JAGUAR'], compatiblewith: ['2012-2015 XF','2015- F-Type','2012-2015 XK'], blade: '', chip: "", notes: '' },
      { remotenumber: 8, icon: "TAP8-NLK-FIAT-15-433.png", tc: "TAP8-NLK-FIAT-15-433", box: 8, brands: ['FIAT'], compatiblewith: ['2016-2018 500X','2016-2018 Egea','2016-2018 Tipo'], blade: '', chip: "", notes: '' },
      { remotenumber: 9, icon: "TAP9-TRK-TOY-31-5290.png", tc: "TAP9-TRK-TOY-31-5290", box: 9, brands: ['TOYOTA'], compatiblewith: ['2012-2014 Toyota Prius C'], blade: '', chip: "", notes: '' },
      { remotenumber: 10, icon: "TAP10-NLK-LAND-09-315.png", tc: "TAP10-NLK-LAND-09-315", box: 10, brands: ['LAND ROVER','RANGE ROVER'], compatiblewith: ['2005-2009 Land Rover LR3','2006-2009 Range Rover','2006-2011 Range Rover Sport'], blade: '', chip: "", notes: '' },
      { remotenumber: 11, icon: "TAP11-NLK-LAND-09-433.png", tc: "TAP11-NLK-LAND-09-433", box: 11, brands: ['LAND ROVER','RANGE ROVER'], compatiblewith: ['2006-2010 Discovery 3','2006-2010 Range Rover Sport'], blade: '', chip: "", notes: '' },
      { remotenumber: 12, icon: "TAP12-TRK-AUDI-08-433.png", tc: "TAP12-TRK-AUDI-08-433", box: 12, brands: ['AUDI'], compatiblewith: ['2008-2014 Q5'], blade: '', chip: "", notes: '' },
      { remotenumber: 13, icon: "TAP13-NLK-REN-37-433.png", tc: "TAP13-NLK-REN-37-433", box: 13, brands: ['RENAULT'], compatiblewith: ['2016- Megane4','2016- Talisman','2016- Espace 5','2015- Kadjar'], blade: '', chip: "", notes: '' },
      { remotenumber: 14, icon: "TAP14-TRK-NISS-66-433.png", tc: "TAP14-TRK-NISS-66-433", box: 14, brands: ['NISSAN'], compatiblewith: ['2015-2018 Pathfinder','2016-2018 Murano'], blade: '', chip: "", notes: '' },
      { remotenumber: 15, icon: "TAP15-TRK-TOY-52-5290.png", tc: "TAP15-TRK-TOY-52-5290", box: 15, brands: ['TOYOTA'], compatiblewith: ['2010-2016 Prius V','2010-2018 4Runner','2009-2014 Venza','2012-2014 Prius C','2012- Sicon TC'], blade: '', chip: "", notes: '' },
      { remotenumber: 16, icon: "TAP16-NLK-FIAT-12-433.png", tc: "TAP16-NLK-FIAT-12-433", box: 16, brands: ['FIAT','PEUGEOT','CITROEN'], compatiblewith: ['2007- Fiat Fiorino','2008- Fiat Qubo','2007- Peugeot Bipper','2007- Citroen Nemo'], blade: '', chip: "", notes: '' },
      { remotenumber: 17, icon: "TAP17-TRK-VW-08-433-48.png", tc: "TAP17-TRK-VW-08-433-48", box: 17, brands: ['VOLKSWAGEN'], compatiblewith: ['2004-2015 passat/passat CC'], blade: '', chip: "", notes: '' },
      { remotenumber: 18, icon: "TAP18-NLK-HON-09-433-G.png", tc: "TAP18-NLK-HON-09-433-G", box: 18, brands: ['HONDA'], compatiblewith: ['2013-2016 CITY','2013-2016 BR-V','2013-2016 CRIDER','2013-2016 CIVIC'], blade: '', chip: "", notes: '' },
      { remotenumber: 19, icon: "TAP19-NLK-DODG-06-433.png", tc: "TAP19-NLK-DODG-06-433", box: 19, brands: ['DODGE'], compatiblewith: ['2011-2016 Charger','2011-2016 Journey','2013-2016 Dart','2015-2016 Challenger','2014-2016 Durango'], blade: '', chip: "", notes: '' },
      { remotenumber: 20, icon: "TAP20-TRK-VW-12-433.png", tc: "TAP20-TRK-VW-12-433", box: 20, brands: ['VOLKSWAGEN'], compatiblewith: ['2011-2018 Touareg'], blade: '', chip: "", notes: '' },
      { remotenumber: 21, icon: "TAP21-NLK-JAGU-02-433.png", tc: "TAP21-NLK-JAGU-02-433", box: 21, brands: ['JAGUAR'], compatiblewith: ['2007-2011 XK XKR','2007-2011 XF XFR'], blade: '', chip: "", notes: '' },
      { remotenumber: 22, icon: "TAP22-TRK-TOY-29-5290.png", tc: "TAP22-TRK-TOY-29-5290", box: 22, brands: ['TOYOTA'], compatiblewith: ['2010-2013 4-Runner','2010-2013 Prius','2012 Sicon'], blade: '', chip: "", notes: '' },
      { remotenumber: 23, icon: "TAP23-TRK-JAGU-04-433.png", tc: "TAP23-TRK-JAGU-04-433", box: 23, brands: ['JAGUAR'], compatiblewith: ['2018- E-Pace','2018- F-Pace','2018- I-Pace'], blade: '', chip: "", notes: '' },
      { remotenumber: 24, icon: "TAP24-NLK-BMW-01-433.png", tc: "TAP24-NLK-BMW-01-433", box: 24, brands: ['MINI COOPER'], compatiblewith: ['2006-2013 Mini Cooper'], blade: '', chip: "", notes: '' },
      { remotenumber: 25, icon: "TAP25-TRK-NISS-69-433.png", tc: "TAP25-TRK-NISS-69-433", box: 25, brands: ['NISSAN'], compatiblewith: ['2019-2020 Pathfinder','2019-2020 Murano','2019- Titan'], blade: '', chip: "", notes: '' },
      { remotenumber: 26, icon: "TAP26-TRK-SUBA-21-433.png", tc: "TAP26-TRK-SUBA-21-433", box: 26, brands: ['SUBARU'], compatiblewith: ['2014-2020 Forester','2016-2020 Legacy','2016-2020 Impreza','2017-2020 XV Crosstrek','2014-2020 BRZ','2015-2018 Outback','2016-2017 ST','2016-2018 WRX'], blade: '', chip: "", notes: '' },
      { remotenumber: 27, icon: "TAP27-NLK-HON-18-433.png", tc: "TAP27-NLK-HON-18-433", box: 27, brands: ['HONDA'], compatiblewith: ['2015-2016 Brio','2015-2016 Mobilio'], blade: '', chip: "", notes: '' },
      { remotenumber: 28, icon: "TAP28-NLK-CHEV-28-433.png", tc: "TAP28-NLK-CHEV-28-433", box: 28, brands: ['HOLDEN'], compatiblewith: ['2018- Colorado'], blade: '', chip: "", notes: '' },
      { remotenumber: 29, icon: "TAP29-NLK-HON-10-433.png", tc: "TAP29-NLK-HON-10-433", box: 29, brands: ['HONDA'], compatiblewith: ['2013-2016 BR-V','2013-2016 ACCORD','2013-2016 CRIDER','2013-2016 CIVIC','2013-2016 CITY'], blade: '', chip: "", notes: '' },
      { remotenumber: 30, icon: "TAP30-TRK-NISS-13-433.png", tc: "TAP30-TRK-NISS-13-433", box: 30, brands: ['NISSAN'], compatiblewith: ['2016-2018 Altima','2016-2019 Maxima'], blade: '', chip: "", notes: '' },
      { remotenumber: 31, icon: "TAP31-NLK-HON-62-433.png", tc: "TAP31-NLK-HON-62-433", box: 31, brands: ['HONDA'], compatiblewith: ['2015-2017 CRV','2014-2017 Jade','2014-2016 Crosstour' ], blade: '', chip: "", notes: '' },
      { remotenumber: 32, icon: "TAP32-NLK-FIAT-05-433.png", tc: "TAP32-NLK-FIAT-05-433", box: 32, brands: ['FIAT','FORD','PEUGEOT','CITROEN','OPEL','VAUXHALL'], compatiblewith: ['2008-2016 Abarth 500','2010-2013 Abarth Punto Evo','2007-2016 Fiat 500','2006-2016 Fiat Grande Punto','2011- Fiat Panda','2009-2016 Fiat Punto Evo','2008- Fiat Qubo','2007-2016 Fiat Fiorino','2009-2016 Ford Ka','2012- Peugeot Bipper','2012- Vauxhall Combo','2012- Citroen Nemo','2012- Opel Combo'], blade: '', chip: "", notes: '' },
      { remotenumber: 33, icon: "TAP33-NLK-NISS-55-433.png", tc: "TAP33-NLK-NISS-55-433", box: 33, brands: ['NISSAN'], compatiblewith: ['2015-2018 Murano','2016-2018 Pathfinder','2017-2018 Titan'], blade: '', chip: "", notes: '' },
      { remotenumber: 34, icon: "TAP34-TRK-CHEV-41-433.png", tc: "TAP34-TRK-CHEV-41-433", box: 34, brands: ['HOLDEN'], compatiblewith: ['2016-2018 Captiva'], blade: '', chip: "", notes: '' },
      { remotenumber: 35, icon: "TAP35-NLK-REN-19-433.png", tc: "TAP35-NLK-REN-19-433", box: 35, brands: ['RENAULT'], compatiblewith: ['2013-2017 Clio IV','2013-2017 Captur'], blade: '', chip: "", notes: '' },
      { remotenumber: 36, icon: "TAP36-TRK-CHEV-08-433.png", tc: "TAP36-TRK-CHEV-08-433", box: 36, brands: ['CHEVROLET','VAUXHALL'], compatiblewith: ['2015- Spark','2013- Adam','2013- Cascada','2012-2015 Chevrolet Aveo','2011-2014 Chevrolet Cruze','2011-2014 Chevrolet Orlando','2012-2015 Chevrolet Trax','2010-2016 Vauxhall Astra J','2012-2017 Vauxhall Zafira Tourer','2009-2016 Vauxhall Insignia','2013-2016 Vauxhall Mokka','2015-2017 Vauxhall'], blade: '', chip: "", notes: '' },
      //37 box was a duplicate of 16
      { remotenumber: 38, icon: "TAP38-NLK-HYUN-53-433.png", tc: "TAP38-NLK-HYUN-53-433", box: 38, brands: ['HYUNDAI'], compatiblewith: ['2017+ i30','2018-2019 Elantra GT'], blade: '', chip: "", notes: '' },
      { remotenumber: 39, icon: "TAP39-NLK-CHEV-05-433.png", tc: "TAP39-NLK-CHEV-05-433", box: 39, brands: ['CHEVROLET'], compatiblewith: ['2014-2017 Impala','2014-2016 Malibu','2010-2016 Camaro','2012-2013 Camaro Convertible','2010-2015 Cruze','2010-2016 Equinox','2012-2015 Sonic 4Dr','2012-2017 Sonic'], blade: '', chip: "", notes: '' },
      { remotenumber: 40, icon: "TAP40-NLK-FIAT-13-433.png", tc: "TAP40-NLK-FIAT-13-433", box: 40, brands: ['FIAT'], compatiblewith: ['2003-2012 Panda'], blade: '', chip: "", notes: '' },
      { remotenumber: 41, icon: "TAP41-NLK-REN-10-433.png", tc: "TAP41-NLK-REN-10-433", box: 41, brands: ['RENAULT'], compatiblewith: ['2009-2015 Clio IV','2013-2017 Captur'], blade: '', chip: "", notes: '' },
      { remotenumber: 42, icon: "TAP42-NLK-CHRY-03-433-2.png", tc: "TAP42-NLK-CHRY-03-433-2", box: 42, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2008-2011 Chrysler 300','2008-2012 Dodge Challenger','2008-2012 Dodge Charger','2008-2008 Dodge Magnum'], blade: '', chip: "", notes: '' },
      { remotenumber: 43, icon: "TAP43-TRK-CHEV-13-433.png", tc: "TAP43-TRK-CHEV-13-433", box: 43, brands: ['CHEVROLET'], compatiblewith: ['2011-2015 Cruze (Models with Push Button Start)','2014-2015 Impala','2013-2015 Malibu','2014-2015 SS'], blade: '', chip: "", notes: '' },
      { remotenumber: 44, icon: "TAP44-NLK-CHRY-03-433-1.png", tc: "TAP44-NLK-CHRY-03-433-1", box: 44, brands: ['VOLKSWAGEN','DODGE','CHRYSLER'], compatiblewith: ['2008-2010 Chrysler 300','2008-2017 Chrysler Town & Country','2008-2012 Dodge Charger','2008-2012 Dodge Challenger','2008-2012 Dodge Durango','2008-2017 Dodge Grand Caravan','2008-2012 Dodge Journey','2008-2012 Dodge Ram','2008-2008 Dodge Magnum','2009-2012 Volkswagen Routan'], blade: '', chip: "", notes: '' },
      { remotenumber: 45, icon: "TAP45-NLK-FIAT-14-433.png", tc: "TAP45-NLK-FIAT-14-433", box: 45, brands: ['FIAT'], compatiblewith: ['2016-2018 500X','2016-2018 Egea','2016-2018 Tipo'], blade: '', chip: "", notes: '' },
      //46 box was a duplicate of 11
      { remotenumber: 47, icon: "TAP47-NLK-VOL-07-434.png", tc: "TAP47-NLK-VOL-07-434", box: 47, brands: ['VOLVO'], compatiblewith: ['2011-2017 S60','2016-2017 S60 XC','2016-2017 S60 L','2007-2016 S80','2014-2017 V60','2015-2017 V60 XC','2008-2010 V70','2009-2017 XC60','2008-2016 XC70'], blade: '', chip: "", notes: '' },
      { remotenumber: 48, icon: "TAP48-NLK-NISS-56-433.png", tc: "TAP48-NLK-NISS-56-433", box: 48, brands: ['NISSAN'], compatiblewith: ['2017-2019 Rogue'], blade: '', chip: "", notes: '' },
      { remotenumber: 49, icon: "TAP49-TRK-VW-35-433.png", tc: "TAP49-TRK-VW-35-433", box: 49, brands: ['VOLKSWAGEN'], compatiblewith: ['2019- Golf MK7'], blade: '', chip: "", notes: '' },
      { remotenumber: 50, icon: "TAP50-TRK-LAND-13-433.png", tc: "TAP50-TRK-LAND-13-433", box: 50, brands: ['RANGE ROVER'], compatiblewith: ['2010- Range Rover Sport','2010- Range Rover Vogue'], blade: '', chip: "", notes: '' },
      { remotenumber: 51, icon: "TAP51-TRK-CHEV-12-433.png", tc: "TAP51-TRK-CHEV-12-433", box: 51, brands: [], compatiblewith: [], blade: '', chip: "", notes: '' },
      { remotenumber: 52, icon: "TAP52-NLK-LAND-13-433.png", tc: "TAP52-NLK-LAND-13-433", box: 52, brands: ['JAGUAR','LAND ROVER','RANGE ROVER'], compatiblewith: ['2014-2015 Jaguar F-Type','2011-2017 Jaguar XJ','2013-2018 Jaguar XF','2017-2019 Jaguar F-Pace','2017-2018 Jaguar XE','2013-2014 Land Rover LR2','2012-2018 Land Rover LR4','2015-2018 Discovery','2016-2018 Discovery Sport','2011-2016 Range Rover Evoque','2010-2016 Range Rover Sport'], blade: '', chip: "", notes: '' },
      { remotenumber: 53, icon: "TAP53-TRK-AUDI-05-433-48.png", tc: "TAP53-TRK-AUDI-05-433-48", box: 53, brands: ['AUDI'], compatiblewith: ['2007-2009 A4, S4 Cabrio','2005-2008 A4, Avant (A4)','2005-2008 A4, S4, Avant, Quattro (A4Q)','2006-2008 RS4 Avant, Quattro (RS4)','2005-2008 A4, S4, Avant, Quattro (A4Q)','2004-2008 Audi A4'], blade: '', chip: "", notes: '' },
      { remotenumber: 54, icon: "TAP54-NLK-NISS-05-433.png", tc: "TAP54-NLK-NISS-05-433", box: 54, brands: ['NISSAN','RENAULT'], compatiblewith: ['2006-2015 Cabstar','2006-2013 Note','2009-2013 NV200','2005-2006 pathfinder','2006 2014 Qashqai /Duali','2002-2010 Micra K12','2006-2015 Navara','2006 Patrol','2007-2016 Renault Maxity'], blade: '', chip: "", notes: '' },
      //55 box was a duplicate of 38
      { remotenumber: 56, icon: "TAP56-NLK-CHRY-04-315-6-M3N.png", tc: "TAP56-NLK-CHRY-04-315-6-M3N", box: 56, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2004-2007 Chrysler Town & Country','2004-2007 Dodge Grand Caravan'], blade: '', chip: "", notes: '' },
      { remotenumber: 57, icon: "TAP57-NLK-REN-20-433.png", tc: "TAP57-NLK-REN-20-433", box: 57, brands: ['RENAULT'], compatiblewith: ['2009-2015 Megane III','2008-2012 Laguna III','2009-2015 Scenic','2012-2016 Fluence','2009-2015 Grand Scenic'], blade: '', chip: "", notes: '' },
      { remotenumber: 58, icon: "TAP58-NLK-NISS-12-433.png", tc: "TAP58-NLK-NISS-12-433", box: 58, brands: ['NISSAN'], compatiblewith: ['2010-2012 Patrol','2009-2010 Juke','2009-2010 Cube','2010-2011 Micra','2017-2018 Armada'], blade: '', chip: "", notes: '' },
      { remotenumber: 59, icon: "TAP59-TRK-VW-29-433.png", tc: "TAP59-TRK-VW-29-433", box: 59, brands: ['VOLKSWAGEN'], compatiblewith: ['2017- Passat B8'], blade: '', chip: "", notes: 'Please take silver part out (in front of key)then program as normal' },
      { remotenumber: 60, icon: "TAP60-TRK-VW-02-433-AG.png", tc: "TAP60-TRK-VW-02-433-AG", box: 60, brands: ['VOLKSWAGEN'], compatiblewith: ['2012- Golf VII','2012-2015 Golf Mk7'], blade: '', chip: "", notes: '' },
      { remotenumber: 61, icon: "TAP61-TRK-LEX-07-3370-433.png", tc: "TAP61-TRK-LEX-07-3370-433", box: 61, brands: ['LEXUS'], compatiblewith: ['ES350','IS250','IS350','GS300','GS350','GS430','GS450h','GS460','LS460','LS600h'], blade: '', chip: "", notes: '' },
      // 62 box was a duplicate of 49
      { remotenumber: 63, icon: "TAP63-TRK-CIT-03-433.png", tc: "TAP63-TRK-CIT-03-433", box: 63, brands: ['CITROEN'], compatiblewith: ['2007-2010 C4 Picasso','2007-2010 C4 Grand Picasso','2008-2011 C5'], blade: '', chip: "", notes: '' },
      { remotenumber: 64, icon: "TAP64-NLK-HON-39-433.png", tc: "TAP64-NLK-HON-39-433", box: 64, brands: ['HONDA'], compatiblewith: ['2011-2013 Civic','2011-2014 CR-V','2012-2015 Jazz'], blade: '', chip: "", notes: '' },
      { remotenumber: 65, icon: "TAP65-TRK-BMW-05-315-CAS3.png", tc: "TAP65-TRK-BMW-05-315-CAS3", box: 65, brands: ['BMW'], compatiblewith: ['2007-2012 SERIE 1 (E81/E82/E88)','2004-2011 SERIE 1 (E87)','2005-2011 SERIE 3 (E90/E91)','2007-2011 SERIE 3 (E92/E93)','2003-2010 SERIE 5 (E60/E61)','2006-2012 SERIE X (E70 (X5))','2008-2012 SERIE X (E71 (X6) / E72 (X6H))'], blade: '', chip: "", notes: '' },
      { remotenumber: 66, icon: "TAP66-TRK-AUDI-29-433.png", tc: "TAP66-TRK-AUDI-29-433", box: 66, brands: ['AUDI'], compatiblewith: ['2017- AUDI Q2'], blade: '', chip: "", notes: '' },
      // 67 box was a duplicate of 60
      { remotenumber: 68, icon: "TAP68-TRK-VW-02-433.png", tc: "TAP68-TRK-VW-02-433", box: 68, brands: ['VOLKSWAGEN','SKODA'], compatiblewith: ['2012-2015 Volkswagen Golf Mk7','2012-2015 Skoda Octavia','2012-2015 Seat Leon','2014-2017 Volkswagen Polo','2016+ Volkswagen Tiguan'], blade: '', chip: "", notes: '' },
      { remotenumber: 69, icon: "TAP69-TRK-VW-13-433.png", tc: "TAP69-TRK-VW-13-433", box: 69, brands: ['VOLKSWAGEN'], compatiblewith: ['2015-2018 Touran','2016- Tiguan'], blade: '', chip: "", notes: '' },
      { remotenumber: 70, icon: "TAP70-TRK-LEX-08-0140.png", tc: "TAP70-TRK-LEX-08-0140", box: 70, brands: ['LEXUS'], compatiblewith: ['2007-09 ES350','2006- GS300','2007-08 GS350','2006-07 GS430','2007-08 GS450h','2008- GS460','2006-08 IS250','2006-08 IS350','2008- IS-F','2007-08 LS460'], blade: '', chip: "", notes: '' },
      { remotenumber: 71, icon: "TAP71-TRK-LEX-08-3370.png", tc: "TAP71-TRK-LEX-08-3370", box: 71, brands: ['LEXUS'], compatiblewith: ['2011 (June to August) CT200h','2010-12 ES350','2009-12 GS450h','2009-11 GS460','2009-12 GS350','2010-12 HS250h','2009-11 IS250','2009-11 IS350','2009-11 IS-F','2009 LS460','2010-11 LX570','2009-2011 Lexus ISC','2009 Lexus LS600h'], blade: '', chip: "", notes: '' },
      { remotenumber: 72, icon: "TAP72-TRK-VW-34-433.png", tc: "TAP72-TRK-VW-34-433", box: 72, brands: ['VOLKSWAGEN'], compatiblewith: ['2019- Golf Mk7'], blade: '', chip: "", notes: '' },


      // new entries
      { remotenumber: 73, icon: "TAP73-NLK-FORD-11-433.png", tc: "TAP73-NLK-FORD-11-433", box: 73, brands: ['FORD'], compatiblewith: ['2015-2017 Ford F150','2015-2018 Ford Ranger'], blade: '', chip: "", notes: '' },
      { remotenumber: 74, icon: "TAP74-NLK-BMW-01-315.png", tc: "TAP74-NLK-BMW-01-315", box: 74, brands: ['MINI COOPER'], compatiblewith: ['2006-2013 Mini Cooper'], blade: '', chip: "", notes: '' },
      { remotenumber: 75, icon: "TAP75-NLK-BMW-01-433.png", tc: "TAP75-NLK-BMW-01-433", box: 75, brands: ['MINI COOPER'], compatiblewith: ['2006-2013 Mini Cooper'], blade: '', chip: "", notes: '' },
      { remotenumber: 76, icon: "TAP76-TRK-BMW-11-433-FEM.png", tc: "TAP76-TRK-BMW-11-433-FEM", box: 76, brands: ['BMW'], compatiblewith: ['2013-2016 3 Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 77, icon: "TAP77-TRK-BMW-11-433-CAS4.png", tc: "TAP77-TRK-BMW-11-433-CAS4", box: 77, brands: ['BMW'], compatiblewith: ['2013-2016 3 Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 78, icon: "TAP78-TRK-BMW-11-315-CAS4.png", tc: "TAP78-TRK-BMW-11-315-CAS4", box: 78, brands: ['BMW'], compatiblewith: ['2009 - 2013 BMW 3 Series','2009 - 2014 BMW 5 Series','2009 - 2014 BMW 7 Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 79, icon: "TAP79-TRK-FORD-29-433.png", tc: "TAP79-TRK-FORD-29-433", box: 79, brands: ['FORD'], compatiblewith: ['2014-2018 Ford Mondeo','2016-2018 Ford Edge','2015-2017 Ford S-Max','2015-2017 Ford Galaxy'], blade: '', chip: "", notes: '' },
      { remotenumber: 80, icon: "TAP80-NLK-FORD-31-433.png", tc: "TAP80-NLK-FORD-31-433", box: 80, brands: ['FORD'], compatiblewith: ['2011-2013 Ford Focus','2010-2013 Mondeo','2010-2013 Ford C-Max','2010-2013 Grand C-Max','2011-2013 S-Max','2010-2013 Ford Galaxy','2011-2015 Ford Ranger'], blade: '', chip: "", notes: '' },
      { remotenumber: 81, icon: "TAP81-TRK-BMW-02-315-CAS2.png", tc: "TAP81-TRK-BMW-02-315-CAS2", box: 81, brands: ['BMW'], compatiblewith: ['2004-2011 BMW 1 series E87 ( 5WK49125 and others )','2005-2007 BMW 3 series E46 ( 5WK49127 and others )','2005-2010 BMW 5 series E60,E61 ( 5WK49147 and others )','2004-2010 BMW 6 series E63,E64 ( 5WK49145 and others )','2006- BMW X5 E70'], blade: '', chip: "", notes: '' },
      { remotenumber: 82, icon: "TAP82-TRK-BMW-02-433-CAS2.png", tc: "TAP82-TRK-BMW-02-433-CAS2", box: 82, brands: ['BMW'], compatiblewith: ['2004-2011 BMW 1 series E87 ( 5WK49125 and others )','2005-2007 BMW 3 series E46 ( 5WK49127 and others )','2005-2010 BMW 5 series E60,E61 ( 5WK49147 and others )','2004-2010 BMW 6 series E63,E64 ( 5WK49145 and others )','2006- BMW X5 E70'], blade: '', chip: "", notes: '' },
      { remotenumber: 83, icon: "TAP83-TRK-BMW-16-433-EWS-44.png", tc: "TAP83-TRK-BMW-16-433-EWS-44", box: 83, brands: ['BMW'], compatiblewith: ['2004-2010 X3','1998-2005 for 3 5 7 Series','1998-2005 for  X5 Z3 Z4','2001-2004 01 02 03 04  for 330 330i','2001 2002 2003 2004 2005 for X5 Z3 Z4','2001-2004 for 525 525i','1998-2000 for X5 Z3 Z4','2003-2005 for 3,5,7 SERIES','2001-2004 for 3 SERIES',
      '1998-1999 for 3,5,7 SERIES','1998-2000 for 325 325i 325ci + i ci xi','2001-2004 for 325 325i','for 325 330 318 525 530 540 E38 E39 E46 M5 X3 X5 E65'], blade: '', chip: "", notes: '' },
      { remotenumber: 84, icon: "TAP84-TRK-FORD-33-433-601B.png", tc: "TAP84-TRK-FORD-33-433-601B", box: 84, brands: ['FORD'], compatiblewith: ['2016- Ford KA+','2014- Ford Mondeo','2015- Ford Galaxy','2015- Ford S-Max '], blade: '', chip: "", notes: '' },
      { remotenumber: 85, icon: "TAP85-NLK-FORD-06-63+.png", tc: "TAP85-NLK-FORD-06-63+", box: 85, brands: ['FORD'], compatiblewith: [], blade: '', chip: "", notes: '' },
      { remotenumber: 86, icon: "TAP86-TRK-BMW-06-315-CAS3+.png", tc: "TAP86-TRK-BMW-06-315-CAS3+", box: 86, brands: ['BMW'], compatiblewith: ['2007-2010 BMW 3 series','2006-2010 BMW 5 series','2007-2010 BMW E90','2007-2010 BMW E91','2007-2010 BMW E92','2007-2010 BMW E93'], blade: '', chip: "", notes: '' },
      { remotenumber: 87, icon: "TAP87-TRK-BMW-44-433-CAS4.png", tc: "TAP87-TRK-BMW-44-433-CAS4", box: 87, brands: ['BMW'], compatiblewith: ['2014- BMW 2 series (F45/F46)','2012-2016 BMW 5 series(F10/F11/F07/F18)','2013-2018 BMW X5 (F15/F85)'], blade: '', chip: "", notes: '' },
      { remotenumber: 88, icon: "TAP88-TRK-BMW-14-433-FEM.png", tc: "TAP88-TRK-BMW-14-433-FEM", box: 88, brands: ['BMW'], compatiblewith: ['2010 - 2012 5 Series (F07/F10/F11/F18)','2011 - 2012 6 Series (F06/F12/F13)','2009 - 2012 7 Series (01/F02/F03/F04)','2011 - 2013 X3 Series(F25)'], blade: '', chip: "", notes: '' },
      { remotenumber: 89, icon: "TAP89-TRK-BMW-14-433-CAS4.png", tc: "TAP89-TRK-BMW-14-433-CAS4", box: 89, brands: ['BMW'], compatiblewith: ['2010 - 2014 5 Series','2011 - 2013 6 Series','2009 - 2013 7 Series','2011 - 2013 X3 Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 90, icon: "TAP90-TRK-BMW-04-315-EWS-44.png", tc: "TAP90-TRK-BMW-04-315-EWS-44", box: 90, brands: ['BMW'], compatiblewith: ['2000 - 2003 BMW 5-Series','2000 - 2003 BMW 6-Series','2000 - 2002 BMW 7-Series','2001 - 2002 BMW Z3-Series'], blade: '', chip: "", notes: '' },
     
     
      { remotenumber: 91, icon: "TAP91-TRK-BMW-04-433-EWS-44.png", tc: "TAP91-TRK-BMW-04-433-EWS-44", box: 91, brands: ['BMW'], compatiblewith: ['1998-2002 3 Series','1996-2002 Z Series','1997-2002 5 Series','1996-2002 7 Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 92, icon: "TAP92-TRK-BMW-41-433-FEM.png", tc: "TAP92-TRK-BMW-41-433-FEM", box: 92, brands: ['BMW'], compatiblewith: ['2013-2018 6 Series (F06/F12/F13)','2014-2015 7 Series (F01/F02/F03/F04)'], blade: '', chip: "", notes: '' },
      { remotenumber: 93, icon: "TAP93-TRK-BMW-42-433-FEM.png", tc: "TAP93-TRK-BMW-42-433-FEM", box: 93, brands: ['BMW'], compatiblewith: ['2013-2018 6 Series (F06/F12/F13)','2014-2015 7 Series (F01/F02/F03/F04)'], blade: '', chip: "", notes: '' },
      { remotenumber: 94, icon: "TAP94-TRK-BMW-30-433-FEM.png", tc: "TAP94-TRK-BMW-30-433-FEM", box: 94, brands: ['BMW'], compatiblewith: ['2014- BMW 2 series (F45/F46)','2012-2016 BMW 5 series(F10/F11/F07/F18)','2013-2018 BMW X5 (F15/F85)'], blade: '', chip: "", notes: '' },
      { remotenumber: 95, icon: "TAP95-TRK-BMW-05-433-CAS3.png", tc: "TAP95-TRK-BMW-05-433-CAS3", box: 95, brands: ['BMW'], compatiblewith: ['2006-2012 3 Series','2003-2011 5 Series','2004-2012 6 Series','2007-2013 X Series'], blade: '', chip: "", notes: '' },
      { remotenumber: 96, icon: "TAP96-NLK-ALFA-01-433.png", tc: "TAP96-NLK-ALFA-01-433", box: 96, brands: ['ALFA ROMEO'], compatiblewith: ['2010 - 2016 Alfa Romeo Giulietta'], blade: '', chip: "", notes: '' },
      { remotenumber: 97, icon: "TAP97-NLK-ALFA-02-433.png", tc: "TAP97-NLK-ALFA-02-433", box: 97, brands: ['ALFA ROMEO'], compatiblewith: ['2008 - 2016 Alfa Romeo Mito'], blade: '', chip: "", notes: '' },
      { remotenumber: 98, icon: "TAP98-TRK-FORD-13-433-63+.png", tc: "TAP98-TRK-FORD-13-433-63+", box: 98, brands: ['FORD'], compatiblewith: ['2012 - 2014  Ford B-Max','2008 - 2016  Ford Fiesta','2011 - 2014  Ford Kuga','2010 - 2015  Ford Galaxy','2010 - 2015  Ford S-Max','2010 - 2015  Ford C-Max','2010 - 2015  Ford Grand C-Max','2011 - 2015  Ford Focus','2007 - 2015  Ford Mondeo'], blade: '', chip: "", notes: '' },
      { remotenumber: 99, icon: "TAP99-NLK-FORD-R10-433.png", tc: "TAP99-NLK-FORD-R10-433", box: 99, brands: ['FORD'], compatiblewith: [''], blade: '', chip: "", notes: '' },
      { remotenumber: 100, icon: "TAP100-NLK-HON-11-433-46.png", tc: "TAP100-NLK-HON-11-433-46", box: 100, brands: ['HONDA'], compatiblewith: ['2004 -2008 Odassey'], blade: '', chip: "", notes: '' },

      { remotenumber: 101, icon: "TAP101-NLK-FORD-R13-304.png", tc: "TAP101-NLK-FORD-R13-304", box: 101, brands: ['FORD'], compatiblewith: ['AU Falcon'], blade: '', chip: "", notes: '' },
      { remotenumber: 102, icon: "TAP102-TRK-CHEV-09-433.png", tc: "TAP102-TRK-CHEV-09-433", box: 102, brands: ['CHEVROLET','HOLDEN'], compatiblewith: ['2008-2014 Cruze','2011-2015 Orlando','2009-2015 Astra','2008-2017 Insigna'], blade: '', chip: "", notes: '' },
      { remotenumber: 103, icon: "TAP103-NLK-CHEV-32-433.png", tc: "TAP103-NLK-CHEV-32-433", box: 103, brands: ['CHEVROLET','HOLDEN'], compatiblewith: ['Chevrolet Aveo'], blade: '', chip: "", notes: '' },
      { remotenumber: 104, icon: "TAP104-NLK-CHEV-19-433-48.png", tc: "TAP104-NLK-CHEV-19-433-48", box: 104, brands: ['HOLDEN'], compatiblewith: ['2009-2016 Aveo','2009-2016 Holden Barina'], blade: '', chip: "", notes: '' },
      { remotenumber: 105, icon: "TAP105-NLK-CHEV-28-433.png", tc: "TAP105-NLK-CHEV-28-433", box: 105, brands: ['HOLDEN'], compatiblewith: ['2018 Holden Colorado'], blade: '', chip: "", notes: '' },
      { remotenumber: 106, icon: "TAP106-TRK-OPEL-02-434.png", tc: "TAP106-TRK-OPEL-02-434", box: 106, brands: ['HOLDEN'], compatiblewith: ['2002-2008 Opel /Vauxhall Vectra C','2003-2008 Opel /Vauxhall Signum '], blade: '', chip: "", notes: '' },
      { remotenumber: 107, icon: "TAP107-NLK-CHEV-05-433.png", tc: "TAP107-NLK-CHEV-05-433", box: 107, brands: ['HOLDEN'], compatiblewith: [''], blade: '', chip: "", notes: '' },
      { remotenumber: 108, icon: "TAP108-TRK-HON-37-433.png", tc: "TAP108-TRK-HON-37-433", box: 108, brands: ['HONDA'], compatiblewith: ['2012-2015 Honda Civic (9th Gen)','2012-2016 Honda CRV (4th Gen)'], blade: '', chip: "", notes: '' },
      { remotenumber: 109, icon: "TAP109-NLK-HON-40-433-46.png", tc: "TAP109-NLK-HON-40-433-46", box: 109, brands: ['HONDA'], compatiblewith: ['2011-2013 Accord'], blade: '', chip: "", notes: '' },
      { remotenumber: 110, icon: "TAP110-NLK-OPEL-12-433.png", tc: "TAP110-NLK-OPEL-12-433", box: 110, brands: ['OPEL','HOLDEN'], compatiblewith: ['2002-2009 Opel Combo','2001-2007 Opel Corsa','2002-2006 Opel Meriva','2004-2006 Opel Tigra','2002-2009 Vauxhall Combo','2001-2007 Vauxhall Corsa','2002-2006 Vauxhall Meriva','2004-2006 Vauxhall Tigra'], blade: '', chip: "", notes: '' },


      { remotenumber: 111, icon: "TAP111-NLK-HON-27-434.png", tc: "TAP111-NLK-HON-27-434", box: 111, brands: ['HONDA'], compatiblewith: ['2014- Honda Fit','2014- Honda City','2014- Honda Vezel','2014- Honda XRV','2018 Honda HRV','2018 Honda Jazz'], blade: '', chip: "", notes: '' },
      { remotenumber: 112, icon: "TAP112-NLK-CHEV-09-433.png", tc: "TAP112-NLK-CHEV-09-433", box: 112, brands: ['CHEVROLET','HOLDEN'], compatiblewith: ['2009-2014 Chevrolet Cruze','2011-2014  Chevrolet Orlando','2009-2015  Vauxhall Astra J','2008-2017  Vauxhall Insignia','2013-2016  Vauxhall Cascade'], blade: '', chip: "", notes: '' },
      { remotenumber: 113, icon: "TAP113-NLK-CHEV-R14-433.png", tc: "TAP113-NLK-CHEV-R14-433", box: 113, brands: ['HOLDEN'], compatiblewith: ['2006-2013 Holden VE commodore'], blade: '', chip: "", notes: '' },
      { remotenumber: 114, icon: "TAP114-TRK-CHEV-04-46.png", tc: "TAP114-TRK-CHEV-04-46", box: 114, brands: ['HOLDEN'], compatiblewith: [''], blade: '', chip: "", notes: '' },
      { remotenumber: 115, icon: "TAP115-NLK-HON-28-434.png", tc: "TAP115-NLK-HON-28-434", box: 115, brands: ['HONDA'], compatiblewith: ['2015-  Honda City/Jazz','2015-  Honda Civic','2016-  Honda Grace'], blade: '', chip: "", notes: '' },
      { remotenumber: 116, icon: "TAP116-NLK-HON-11-313.8-13.png", tc: "TAP116-NLK-HON-11-313.8-13", box: 116, brands: ['HONDA'], compatiblewith: ['2004 - 2005 Jazz'], blade: '', chip: "", notes: '' },
      { remotenumber: 117, icon: "TAP117-NLK-HON-11-433-8E.png", tc: "TAP117-NLK-HON-11-433-8E", box: 117, brands: ['HONDA'], compatiblewith: ['2006-2008 Honda CRV','2007-2009 Honda FRV','2006-2008 Honda Jazz'], blade: '', chip: "", notes: '' },
      { remotenumber: 118, icon: "TAP118-NLK-HON-11-433-48CHIP.png", tc: "TAP118-NLK-HON-11-433-48CHIP", box: 118, brands: ['HONDA'], compatiblewith: ['2003-2005 Honda Civic','2004-2005 Honda Jazz','2005-2005 Honda HR-V','2004-2005 Honda Stream'], blade: '', chip: "", notes: '' },
      { remotenumber: 119, icon: "TAP119-TRK-CHEV-05-433.png", tc: "TAP119-TRK-CHEV-05-433", box: 119, brands: ['CHEVROLET','HOLDEN'], compatiblewith: ['2011-2016 Chevrolet Cruze','2014-2017 Chevrolet Impala','2013-2016 Chevrolet Malibu','2014-2017 Chevrolet SS', '2017- Commodore VF'], blade: '', chip: "", notes: '' },
      { remotenumber: 120, icon: "TAP120-NLK-HON-05-313.8-8E.png", tc: "TAP120-NLK-HON-05-313.8-8E", box: 120, brands: ['HONDA'], compatiblewith: ['2006-2007 Accord'], blade: '', chip: "", notes: '' },

      { remotenumber: 121, icon: "TAP121-NLK-HON-11-433.png", tc: "TAP121-NLK-HON-11-433", box: 121, brands: ['HONDA'], compatiblewith: ['2004-2008  Odassey'], blade: '', chip: "", notes: '' },
      { remotenumber: 122, icon: "TAP122-NLK-HON-27-313.8.png", tc: "TAP122-NLK-HON-27-313.8", box: 122, brands: ['HONDA'], compatiblewith: ['2014- Honda Fit','2014- Honda City','2014- Honda Jazz','2014- Honda Shuttle','2014- Honda Vezel'], blade: '', chip: "", notes: '' },
      { remotenumber: 123, icon: "TAP123-TRK-HYUN-52-433.png", tc: "TAP123-TRK-HYUN-52-433", box: 123, brands: ['HYUNDAI'], compatiblewith: ['2019- Hyundai Tucson'], blade: '', chip: "", notes: '' },
      { remotenumber: 124, icon: "TAP124-TRK-HYUN-34-433.png", tc: "TAP124-TRK-HYUN-34-433", box: 124, brands: ['HYUNDAI'], compatiblewith: ['2012-2017 Hyundai SantaFe','2012-2017 Hyundai IX45'], blade: '', chip: "", notes: '' },
      { remotenumber: 125, icon: "TAP125-TRK-HYUN-21-433.png", tc: "TAP125-TRK-HYUN-21-433", box: 125, brands: ['HYUNDAI'], compatiblewith: ['2016-2018 Tucson'], blade: '', chip: "", notes: '' },
      { remotenumber: 126, icon: "TAP126-NLK-HON-45-433.png", tc: "TAP126-NLK-HON-45-433", box: 126, brands: ['HONDA'], compatiblewith: ['2015-2019 Honda Civic'], blade: '', chip: "", notes: '' },
      { remotenumber: 127, icon: "TAP127-NLK-HON-05-433-OB.png", tc: "TAP127-NLK-HON-05-433-OB", box: 127, brands: ['HONDA'], compatiblewith: ['2002-2005 Accord','2001-2006 CRV'], blade: '', chip: "", notes: '' },
      { remotenumber: 128, icon: "TAP128-TRK-AUDI-08-433.png", tc: "TAP128-TRK-AUDI-08-433", box: 128, brands: ['AUDI'], compatiblewith: ['2008-2014 Audi Q5'], blade: '', chip: "", notes: '' },
      { remotenumber: 129, icon: "TAP129-NLK-HYUN-20-315.png", tc: "TAP129-NLK-HYUN-20-315", box: 129, brands: ['HYUNDAI','KIA'], compatiblewith: ['2011-2015 Hyundai Azera','2011-2015 Hyundai Elantra','2011-2014 Hyundai Equus','2009-2014 Hyundai Genesis','2011-2015 Hyundai Sonata','2013-2014 Hyundai Tucson','2011-2017 Hyundai Veloster','2009-2012 Kia Borrego','2011-2013 Kia Forte','2011-2014 Kia Optima','2011-2014 Kia Rio','2011-2013 Kia Sorento','2011-2013 Kia Soul','2011-2013 Kia Sportage'], blade: '', chip: "", notes: '' },
      { remotenumber: 130, icon: "TAP130-NLK-HYUN-20-433.png", tc: "TAP130-NLK-HYUN-20-433", box: 130, brands: ['HYUNDAI'], compatiblewith: ['2011-2015 Hyundai Sonata','2009-2014 Hyundai Genesis','2011-2015 Hyundai Equus','2012-2015 Hyundai Veloster'], blade: '', chip: "", notes: '' },
      { remotenumber: 131, icon: "TAP131-TRK-HYUN-49-433.png", tc: "TAP131-TRK-HYUN-49-433", box: 131, brands: ['HYUNDAI'], compatiblewith: ['2018 Hyundai Tucson'], blade: '', chip: "", notes: '' },
      { remotenumber: 132, icon: "TAP132-TRK-HYUN-18-433.png", tc: "TAP132-TRK-HYUN-18-433", box: 132, brands: ['HYUNDAI'], compatiblewith: ['2014-2015 Hyundai Tucson'], blade: '', chip: "", notes: '' },
      { remotenumber: 133, icon: "TAP133-TRK-HYUN-10-433.png", tc: "TAP133-TRK-HYUN-10-433", box: 133, brands: ['HYUNDAI'], compatiblewith: ['2013-2015 Hyundai Santa Fe','2013-2015 Hyundai IX45'], blade: '', chip: "", notes: '' },
      { remotenumber: 134, icon: "TAP134-TRK-HYUN-03-433.png", tc: "TAP134-TRK-HYUN-03-433", box: 134, brands: ['HYUNDAI'], compatiblewith: ['2015- Elantra','2017- I30'], blade: '', chip: "", notes: '' },
      { remotenumber: 135, icon: "TAP135-TRK-HYUN-33-433-2S610.png", tc: "TAP135-TRK-HYUN-33-433-2S610", box: 135, brands: ['HYUNDAI'], compatiblewith: ['2014-2016 Hyundai Tucson','2013-2015 Hyundai IX35'], blade: '', chip: "", notes: '' },
      { remotenumber: 136, icon: "TAP136-TRK-HYUN-50-433.png", tc: "TAP136-TRK-HYUN-50-433", box: 136, brands: ['HYUNDAI'], compatiblewith: ['2013-2016 I10'], blade: '', chip: "", notes: '' },
      { remotenumber: 137, icon: "TAP137-NLK-CHRY-03-433-3.png", tc: "TAP137-NLK-CHRY-03-433-3", box: 137, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2008-2010 Chrysler 300','2008-2017 Chrysler Town & Country','2008-2012 Dodge Charger','2008-2012 Dodge Challenger','2008-2012 Dodge Durango','2008-2017 Dodge Grand Caravan','2009-2012 Dodge Journey','2008-2012 Dodge Ram'], blade: '', chip: "", notes: '' },
      { remotenumber: 138, icon: "TAP138-NLK-JEEP-19-433-1.png", tc: "TAP138-NLK-JEEP-19-433-1", box: 138, brands: ['JEEP'], compatiblewith: ['2014-2019 JEEP CHEROKEE'], blade: '', chip: "", notes: '' },
      { remotenumber: 139, icon: "TAP139-NLK-CHRY-03-433-5.png", tc: "TAP139-NLK-CHRY-03-433-5", box: 139, brands: ['JEEP'], compatiblewith: ['2008-2010 Jeep Commander','2008-2013 Jeep Grand Cherokee'], blade: '', chip: "", notes: '' },
      { remotenumber: 140, icon: "TAP140-NLK-CHRY-03-433-4.png", tc: "TAP140-NLK-CHRY-03-433-4", box: 140, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2008-2011 Chrysler 300','2008-2012 Dodge Charger','2008-2012 Dodge Challenger','2011-2013 Dodge Durango','2008-2008 Dodge Magnum'], blade: '', chip: "", notes: '' },
      { remotenumber: 141, icon: "TAP141-NLK-CHRY-03-433-1.png", tc: "TAP141-NLK-CHRY-03-433-1", box: 141, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2008-2010 Chrysler 300','2008-2017 Chrysler Town & Country','2008-2012 Dodge Charger','2008-2012 Dodge Challenger','2008-2012 Dodge Durango','2008-2017 Dodge Grand Caravan','2008-2012 Dodge Journey','2008-2012 Dodge Ram','2008-2008 Dodge Magnum','2009-2012 Volkswagen Routan'], blade: '', chip: "", notes: '' },
      { remotenumber: 142, icon: "TAP142-NLK-CHRY-03-433-12.png", tc: "TAP142-NLK-CHRY-03-433-12", box: 142, brands: ['CHRYSLER'], compatiblewith: ['2008-2010 Chrysler 300C Tourer Model'], blade: '', chip: "", notes: '' },
      { remotenumber: 143, icon: "TAP143-NLK-CHRY-03-433-13.png", tc: "TAP143-NLK-CHRY-03-433-13", box: 143, brands: ['CHRYSLER'], compatiblewith: ['2008-2010 Chrysler 300C Saloon/Sedan Model'], blade: '', chip: "", notes: '' },
      { remotenumber: 144, icon: "TAP144-NLK-CHRY-04-433-3-OHT.png", tc: "TAP144-NLK-CHRY-04-433-3-OHT", box: 144, brands: ['CHRYSLER'], compatiblewith: ['2005-2008 Chrysler 300C Saloon/Sedan'], blade: '', chip: "", notes: '' },
      { remotenumber: 145, icon: "TAP145-NLK-CHRY-04-433-2-OHT.png", tc: "TAP145-NLK-CHRY-04-433-2-OHT", box: 145, brands: ['CHRYSLER'], compatiblewith: ['2005-2008 Chrysler 300C Tourer'], blade: '', chip: "", notes: '' },
      { remotenumber: 146, icon: "TAP146-NLK-JEEP-06-433.png", tc: "TAP146-NLK-JEEP-06-433", box: 146, brands: ['JEEP'], compatiblewith: ['2014-2017 Jeep Cherokee'], blade: '', chip: "", notes: '' },
      { remotenumber: 147, icon: "TAP147-NLK-JEEP-07-433.png", tc: "TAP147-NLK-JEEP-07-433", box: 147, brands: ['JEEP'], compatiblewith: ['2013-2015 Jeep Grand Cherokee'], blade: '', chip: "", notes: '' },
      { remotenumber: 148, icon: "TAP148-NLK-CHRY-06-433-1.png", tc: "TAP148-NLK-CHRY-06-433-1", box: 148, brands: ['DODGE'], compatiblewith: ['2011-2016 Dodge Charger','2011-2016 Dodge Journey','2013-2016 Dodge Dart','2015-2016 Dodge Challenger','2014-2016 Dodge Durango'], blade: '', chip: "", notes: '' },
      { remotenumber: 149, icon: "TAP149-NLK-CHRY-06-433-4.png", tc: "TAP149-NLK-CHRY-06-433-4", box: 149, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2011-2016 Dodge Charger','2013-2016 Dodge Dart','2011-2015 Dodge Journey','2015-2017 Dodge Challenger','2014-2017 Dodge Durango','2011-2017 Chrysler 300','2011- Fiat Freemont'], blade: '', chip: "", notes: '' },
      { remotenumber: 150, icon: "TAP150-NLK-CHRY-03-433-2.png", tc: "TAP150-NLK-CHRY-03-433-2", box: 150, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2008-2011 Chrysler 300','2008-2012 Dodge Challenger','2008-2012 Dodge Charger','2008-2008 Dodge Magnum'], blade: '', chip: "", notes: '' },
      

      { remotenumber: 151, icon: "TAP151-NLK-CHRY-03-433-6.png", tc: "TAP151-NLK-CHRY-03-433-6", box: 151, brands: ['JEEP'], compatiblewith: ['2008-2012 Jeep Grand Cherokee (Non-Prox)','2008-2010 Jeep Commander'], blade: '', chip: "", notes: '' },
      { remotenumber: 152, icon: "TAP152-NLK-CHRY-03-433-14.png", tc: "TAP152-NLK-CHRY-03-433-14", box: 152, brands: ['CHRYSLER'], compatiblewith: ['2008-2013 Chrysler Grand Voyager'], blade: '', chip: "", notes: '' },
      { remotenumber: 153, icon: "TAP153-NLK-JEEP-09-433-3.png", tc: "TAP153-NLK-JEEP-09-433-3", box: 153, brands: ['JEEP'], compatiblewith: ['2014-2019 Jeep Grand Cherokee'], blade: '', chip: "", notes: '' },
      { remotenumber: 154, icon: "TAP154-NLK-CHRY-06-433-3.png", tc: "TAP154-NLK-CHRY-06-433-3", box: 154, brands: ['DODGE','CHRYSLER'], compatiblewith: ['2011-2017 Chrysler 300','2011-2017 Dodge Charger','2014-2016 Dodge Dart','2015-2017 Dodge Challenger'], blade: '', chip: "", notes: '' },
      { remotenumber: 155, icon: "TAP155-NLK-CHRY-06-433-1.png", tc: "TAP155-NLK-CHRY-06-433-1", box: 155, brands: ['DODGE'], compatiblewith: ['2011-2016 Dodge Charger','2011-2016 Dodge Journey','2013-2016 Dodge Dart','2015-2016 Dodge Challenger','2014-2016 Dodge Durango'], blade: '', chip: "", notes: '' },
      { remotenumber: 156, icon: "TAP156-TRK-KIA-16-433-4D.png", tc: "TAP156-TRK-KIA-16-433-4D", box: 156, brands: ['KIA'], compatiblewith: ['2012- Kia K3','2013- Kia Forte','2012- Kia Cerato'], blade: '', chip: "", notes: '' },
      { remotenumber: 157, icon: "TAP157-TRK-KIA-37-433.png", tc: "TAP157-TRK-KIA-37-433", box: 157, brands: ['KIA'], compatiblewith: ['2015-2016 KIA Sorento'], blade: '', chip: "", notes: '' },
      { remotenumber: 158, icon: "TAP158-TRK-KIA-15-433.png", tc: "TAP158-TRK-KIA-15-433", box: 158, brands: ['KIA'], compatiblewith: ['2014-2016 Picanto(Morning)/Optima/Sorento/Sportage'], blade: '', chip: "", notes: '' },
      { remotenumber: 159, icon: "TAP159-TRK-KIA-16-433-4D.png", tc: "TAP159-TRK-KIA-16-433-4D", box: 159, brands: ['KIA'], compatiblewith: ['2012- Kia K3','2013- Kia Forte','2012- Kia Cerato'], blade: '', chip: "", notes: '' },
      { remotenumber: 160, icon: "TAP160-TRK-SUBA-02-433-62.png", tc: "TAP160-TRK-SUBA-02-433-62", box: 160, brands: ['SUBARU'], compatiblewith: ['2004-2010 Subaru Impreza','2004-2009 Subaru Liberty','2005-2009 Subaru Outback','2004-2009 Subaru Tribeca','2004-2009 Subaru Forester'], blade: '', chip: "", notes: '' },
      { remotenumber: 161, icon: "TAP161-TRK-SUBA-11-433-62.png", tc: "TAP161-TRK-SUBA-11-433-62", box: 161, brands: ['SUBARU'], compatiblewith: ['2008-2014 Subaru Outback','2008-2014 Subaru Forester','2008-2014 Subaru Legacy'], blade: '', chip: "", notes: '' },
      { remotenumber: 162, icon: "TAP162-TRK-SUBA-13-433.png", tc: "TAP162-TRK-SUBA-13-433", box: 162, brands: ['SUBARU'], compatiblewith: ['2018- Subaru XV'], blade: '', chip: "", notes: '' },
      { remotenumber: 163, icon: "TAP163-TRK-SUBA-12-433-62.png", tc: "TAP163-TRK-SUBA-12-433-62", box: 163, brands: ['SUBARU'], compatiblewith: ['2008-2010 Subaru Outback','2009-2011 Subaru Forester'], blade: '', chip: "", notes: '' },
      { remotenumber: 164, icon: "TAP164-TRK-SUBA-02-433-62.png", tc: "TAP164-TRK-SUBA-02-433-62", box: 164, brands: ['SUBARU'], compatiblewith: ['2004-2010 Subaru Impreza','2004-2009 Subaru Liberty','2005-2009 Subaru Outback','2004-2009 Subaru Tribeca','2004-2009 Subaru Forester'], blade: '', chip: "", notes: '' },
      { remotenumber: 165, icon: "TAP165-NLK-REN-09-433.png", tc: "TAP165-NLK-REN-09-433", box: 165, brands: ['RENAULT'], compatiblewith: ['2003-2008 Renault Megane II','2003-2008 Renault Scenic II','2003-2008 Renault Grand Scenic II'], blade: '', chip: "", notes: '' },
      { remotenumber: 166, icon: "TAP166-TRK-MAZ-24-433.png", tc: "TAP166-TRK-MAZ-24-433", box: 166, brands: ['MAZDA'], compatiblewith: ['2015 CX-3','2012-2015 CX-5','2014-2016 Mazda 2','2013-2015 Mazda 3 (Hatch)','2012-2015  Mazda 6 (Wagon)'], blade: '', chip: "", notes: '' },
      { remotenumber: 167, icon: "TAP167-NLK-MAZ-24-433.png", tc: "TAP167-NLK-MAZ-24-433", box: 167, brands: ['MAZDA'], compatiblewith: ['2015 CX-3','2012-2015 CX-5','2014-2016 Mazda 2','2013-2015 Mazda 3 (Hatch)','2012-2015 Mazda 6 (Wagon)'], blade: '', chip: "", notes: '' },
      { remotenumber: 168, icon: "TAP168-NLK-MAZ-25-433.png", tc: "TAP168-NLK-MAZ-25-433", box: 168, brands: ['MAZDA'], compatiblewith: ['2017- Mazda 3','2017- Mazda 6'], blade: '', chip: "", notes: '' },
      { remotenumber: 169, icon: "TAP169-NLK-MAZ-14-433.png", tc: "TAP169-NLK-MAZ-14-433", box: 169, brands: ['MAZDA'], compatiblewith: ['Mazda 6 Wagon (09/2012 + )','Mazda CX-3 (02/2015 + )','Mazda CX-5 (01/2012 + )','Mazda CX-7 2010-'], blade: '', chip: "", notes: '' },
      { remotenumber: 170, icon: "TAP170-TRK-MAZ-22-433.png", tc: "TAP170-TRK-MAZ-22-433", box: 170, brands: ['MAZDA'], compatiblewith: ['2017- Mazda CX-5','2017- Mazda CX-9'], blade: '', chip: "", notes: '' },
      
      
      


    ];

    this.searchedItem = this.remotes;

  }

  ngOnInit() {

  }

  _ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.remotes;

    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return (item.brands.findIndex(elem => elem.toLowerCase() === val.toLowerCase()) > -1);
      })
    }
  }

  onClick(x) {

    let selectedremote: object;

    for (let remote of this.remotes) {
      if (remote.remotenumber == x) {

        selectedremote = remote;
      }
    }

    this.navParamService.setNavData(selectedremote);
    this.router.navigateByUrl('remotedetails');

  }

  addremote() {
    this.router.navigateByUrl('addremote');
  }
}




