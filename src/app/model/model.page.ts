import { Component, OnInit } from '@angular/core';
import { NavparamService } from '../navparam.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  brand: any;
  models = [];

  carmodels: any[] = [

    // Alfa Romeo Models 
    { brand: 'ALFA ROMEO', model: 'Giulietta', startyear: 2010, endyear: 2016 },

    { brand: 'ALFA ROMEO', model: 'MiTo', startyear: 2008, endyear: 2016 },
    // {brand:"ALFA ROMEO", name:"MiTo", icon:"mito.png" , range:"2008 - 2016", type:"bladed", startyear:2008, endyear:2016},


    // Audi Models

    { brand: 'AUDI', model: 'A4 Coupe', startyear: 2007, endyear: 2009 },

    { brand: 'AUDI', model: 'A4 Wagon', startyear: 2005, endyear: 2008 },

    { brand: 'AUDI', model: 'A4 Quattro', startyear: 2005, endyear: 2008 },

    { brand: 'AUDI', model: 'S4 Coupe', startyear: 2007, endyear: 2013 },

    { brand: 'AUDI', model: 'S4 Wagon', startyear: 2005, endyear: 2008 },

    { brand: 'AUDI', model: 'S4 Quattro', startyear: 2005, endyear: 2008 },

    { brand: 'AUDI', model: 'RS4 Wagon', startyear: 2006, endyear: 2008 },

    { brand: 'AUDI', model: 'RS4 Quattro', startyear: 2006, endyear: 2008 },

    { brand: 'AUDI', model: 'Q5', startyear: 2008, endyear: 2014 },

    { brand: 'AUDI', model: 'Q2', startyear: 2017, endyear: 2017 },



    // Chrysler Models
    { brand: 'CHRYSLER', model: '300C Tourer', startyear: 2005, endyear: 2010 },

    { brand: 'CHRYSLER', model: '300C Sedan', startyear: 2005, endyear: 2010 },

    { brand: 'CHRYSLER', model: '300', startyear: 2008, endyear: 2017 },

    { brand: 'CHRYSLER', model: 'Grand Voyager', startyear: 2008, endyear: 2013 },

    { brand: 'CHRYSLER', model: 'Town & Country', startyear: 2004, endyear: 2017 },



    // Dodge Models
    { brand: 'DODGE', model: 'Charger', startyear: 2008, endyear: 2017 },

    { brand: 'DODGE', model: 'Challenger', startyear: 2008, endyear: 2017 },

    { brand: 'DODGE', model: 'Durango', startyear: 2008, endyear: 2017 },

    { brand: 'DODGE', model: 'Grand Caravan', startyear: 2004, endyear: 2017 },

    { brand: 'DODGE', model: 'Journey', startyear: 2008, endyear: 2016 },

    { brand: 'DODGE', model: 'Ram', startyear: 2008, endyear: 2018 },

    { brand: 'DODGE', model: 'Magnum', startyear: 2008, endyear: 2008 },

    { brand: 'DODGE', model: 'Dart', startyear: 2013, endyear: 2016 },





    // Volkswagen Models
    { brand: 'VOLKSWAGEN', model: 'Routan', startyear: 2009, endyear: 2012 },



    // Fiat Models
    { brand: 'FIAT', model: 'Freemont', startyear: 2011, endyear: 2011 },

    { brand: 'FIAT', model: 'Abarth 500', startyear: 2008, endyear: 2016 },
    { brand: 'FIAT', model: 'Abarth Punto Evo', startyear: 2010, endyear: 2013 },
    { brand: 'FIAT', model: 'Abarth 500X', startyear: 2016, endyear: 2018 },

    { brand: 'FIAT', model: '500', startyear: 2007, endyear: 2016 },

    { brand: 'FIAT', model: 'Grande Punto', startyear: 2006, endyear: 2016 },
    
    { brand: 'FIAT', model: 'Panda', startyear: 2003, endyear: 2012 },

    { brand: 'FIAT', model: 'Punto Evo', startyear: 2009, endyear: 2016 },

    { brand: 'FIAT', model: 'Qubo', startyear: 2008, endyear: 2008 },

    { brand: 'FIAT', model: 'Fiorino', startyear: 2007, endyear: 2016 },

    { brand: 'FIAT', model: 'Egea', startyear: 2016, endyear: 2018 },

    { brand: 'FIAT', model: 'Tipo', startyear: 2016, endyear: 2018 },




    // Ford Models
    { brand: 'FORD', model: 'KA', startyear: 2009, endyear: 2016 },
    { brand: 'FORD', model: 'KA+', startyear: 2016, endyear: 2016 },

    { brand: 'FORD', model: 'F150', startyear: 2015, endyear: 2017 },

    { brand: 'FORD', model: 'Ranger', startyear: 2011, endyear: 2018 },

    { brand: 'FORD', model: 'Focus', startyear: 2011, endyear: 2015 },

    { brand: 'FORD', model: 'Mondeo', startyear: 2007, endyear: 2018 },

    { brand: 'FORD', model: 'C-Max', startyear: 2010, endyear: 2015 },

    { brand: 'FORD', model: 'Grand C-Max', startyear: 2010, endyear: 2015 },

    { brand: 'FORD', model: 'S-Max', startyear: 2010, endyear: 2017 },

    { brand: 'FORD', model: 'Galaxy', startyear: 2010, endyear: 2017 },

    { brand: 'FORD', model: 'B-Max', startyear: 2012, endyear: 2014 },

    { brand: 'FORD', model: 'Fiesta', startyear: 2008, endyear: 2016 },

    { brand: 'FORD', model: 'Kuga', startyear: 2011, endyear: 2014 },

    { brand: 'FORD', model: 'Edge', startyear: 2016, endyear: 2018 },


    // Chevrolet Models
    { brand: 'CHEVROLET', model: 'Impala', startyear: 2014, endyear: 2017 },

    { brand: 'CHEVROLET', model: 'Camaro', startyear: 2010, endyear: 2016 },
    { brand: 'CHEVROLET', model: 'Camaro Convertible', startyear: 2012, endyear: 2013 },

    { brand: 'CHEVROLET', model: 'Sonic', startyear: 2012, endyear: 2017 },

    { brand: 'CHEVROLET', model: 'Orlando', startyear: 2011, endyear: 2015 },

    { brand: 'CHEVROLET', model: 'Aveo', startyear: 2000, endyear: 2020 },



    // Opel Models
    { brand: 'OPEL', model: 'Astra', startyear: 2004, endyear: 2016 },

    { brand: 'OPEL', model: 'Insignia', startyear: 2008, endyear: 2017 },

    { brand: 'OPEL', model: 'Cascade', startyear: 2013, endyear: 2016 },

    { brand: 'OPEL', model: 'Combo', startyear: 2002, endyear: 2009 },

    { brand: 'OPEL', model: 'Corsa', startyear: 2001, endyear: 2007 },

    { brand: 'OPEL', model: 'Meriva', startyear: 2002, endyear: 2006 },

    { brand: 'OPEL', model: 'Tigra', startyear: 2004, endyear: 2006 },

    { brand: 'OPEL', model: 'Adam', startyear: 2013, endyear: 2013 },

    { brand: 'OPEL', model: 'Mokka', startyear: 2013, endyear: 2016 },

    { brand: 'OPEL', model: 'Vectra C', startyear: 2002, endyear: 2008 },

    { brand: 'OPEL', model: 'Signum', startyear: 2003, endyear: 2008 },

    { brand: 'OPEL', model: 'Zafira', startyear: 2005, endyear: 2013 },
    { brand: 'OPEL', model: 'Zafira Tourer', startyear: 2012, endyear: 2017 },



    //  Holden Models
    { brand: 'HOLDEN', model: 'Barina', startyear: 2009, endyear: 2016 },

    { brand: 'HOLDEN', model: 'Colorado', startyear: 2018, endyear: 2018 },

    { brand: 'HOLDEN', model: 'Commodore VE', startyear: 2006, endyear: 2013 },
    { brand: 'HOLDEN', model: 'Commodore VF', startyear: 2014, endyear: 2017 },

    { brand: 'HOLDEN', model: 'Spark', startyear: 2015, endyear: 2015 },
    
    { brand: 'HOLDEN', model: 'Cascada', startyear: 2013, endyear: 2013 },
    
    { brand: 'HOLDEN', model: 'Cruze', startyear: 2008, endyear: 2016 },

    { brand: 'HOLDEN', model: 'Trax', startyear: 2012, endyear: 2015 },

    { brand: 'HOLDEN', model: 'Astra', startyear: 2004, endyear: 2016 },
    
    { brand: 'HOLDEN', model: 'Malibu', startyear: 2013, endyear: 2016 },
    
    { brand: 'HOLDEN', model: 'Captiva', startyear: 2010, endyear: 2018 },
    
    { brand: 'HOLDEN', model: 'Zafira', startyear: 2005, endyear: 2013 },
    


    // Peugeot Models
    { brand: 'PEUGEOT', model: 'Bipper', startyear: 2007, endyear: 2012 },



    // Citroen Models
    { brand: 'CITREON', model: 'C4 Picasso', startyear: 2007, endyear: 2010 },
    { brand: 'CITREON', model: 'C4 Grand Picasso', startyear: 2007, endyear: 2010 },

    { brand: 'CITREON', model: 'C5', startyear: 2008, endyear: 2011 },

    { brand: 'CITROEN', model: 'Nemo', startyear: 2007, endyear: 2012 },



    // Honda Models
    {brand:'HONDA', model:'Civic', startyear:2003, endyear:2019},

    {brand:'HONDA', model:'CRV', startyear:2001, endyear:2018},

    {brand:'HONDA', model:'Jazz', startyear:2004, endyear:2018},

    {brand:'HONDA', model:'Accord', startyear:2002, endyear:2017},
    
    {brand:'HONDA', model:'City', startyear:2013, endyear:2016},

    {brand:'HONDA', model:'BRV', startyear:2013, endyear:2016},

    {brand:'HONDA', model:'Crider', startyear:2013, endyear:2016},
    
    {brand:'HONDA', model:'Odassey', startyear:2004, endyear:2008},
    
    {brand:'HONDA', model:'HRV', startyear:2005, endyear:2018},

    {brand:'HONDA', model:'Stream', startyear:2004, endyear:2005},
    
    {brand:'HONDA', model:'FRV', startyear:2007, endyear:2009},
    
    {brand:'HONDA', model:'Brio', startyear:2015, endyear:2016},

    {brand:'HONDA', model:'Mobilio', startyear:2015, endyear:2016},
    
    {brand:'HONDA', model:'Fit', startyear:2014, endyear:2014},
    
    {brand:'HONDA', model:'Shuttle', startyear:2014, endyear:2014},
    {brand:'HONDA', model:'Vezel', startyear:2014, endyear:2014},
    
    {brand:'HONDA', model:'XRV', startyear:2014, endyear:2014},
    
    {brand:'HONDA', model:'Grace', startyear:2016, endyear:2016},
    
    {brand:'HONDA', model:'Jade', startyear:2014, endyear:2017},

    {brand:'HONDA', model:'Crosstour', startyear:2014, endyear:2016},
    
    {brand:'HONDA', model:'CRV', startyear:2012, endyear:2016},
    


    // Hyundai Models
    {brand:'HYUNDAI', model:'Azera', startyear:2011, endyear:2015},

    {brand:'HYUNDAI', model:'Elantra', startyear:2011, endyear:2015},
    {brand:'HYUNDAI', model:'Elantra GT', startyear:2018, endyear:2019},

    {brand:'HYUNDAI', model:'Equus', startyear:2011, endyear:2015},

    {brand:'HYUNDAI', model:'Genesis', startyear:2009, endyear:2014},

    {brand:'HYUNDAI', model:'Sonata', startyear:2011, endyear:2015},

    {brand:'HYUNDAI', model:'Tucson', startyear:2013, endyear:2019},

    {brand:'HYUNDAI', model:'Veloster', startyear:2011, endyear:2017},

    {brand:'HYUNDAI', model:'i30', startyear:2017, endyear:2020},
    
    {brand:'HYUNDAI', model:'Santa Fe', startyear:2012, endyear:2017},

    {brand:'HYUNDAI', model:'ix35', startyear:2013, endyear:2015},
    
    {brand:'HYUNDAI', model:'ix45', startyear:2012, endyear:2017},
    
    {brand:'HYUNDAI', model:'i10', startyear:2013, endyear:2016},
    



    // Kia Models
    {brand:'KIA', model:'Borrego', startyear:2009, endyear:2012},

    {brand:'KIA', model:'Forte', startyear:2011, endyear:2013},

    {brand:'KIA', model:'Optima', startyear:2011, endyear:2016},

    {brand:'KIA', model:'Sorento', startyear:2011, endyear:2016},

    {brand:'KIA', model:'Soul', startyear:2011, endyear:2013},

    {brand:'KIA', model:'Rio', startyear:2011, endyear:2014},

    {brand:'KIA', model:'Sportage', startyear:2011, endyear:2016},

    {brand:'KIA', model:'Picanto', startyear:2014, endyear:2016},
    
    {brand:'KIA', model:'K3', startyear:2012, endyear:2012},
    
    {brand:'KIA', model:'Cerato', startyear:2012, endyear:2012},
    



    // Jaguar Models
    {brand:'JAGUAR', model:'XK', startyear:2007, endyear:2015},

    {brand:'JAGUAR', model:'XKR', startyear:2007, endyear:2011},

    {brand:'JAGUAR', model:'XF', startyear:2007, endyear:2018},

    {brand:'JAGUAR', model:'XFR', startyear:2007, endyear:2011},

    {brand:'JAGUAR', model:'F Type', startyear:2014, endyear:2015},
    
    {brand:'JAGUAR', model:'E Pace', startyear:2018, endyear:2018},

    {brand:'JAGUAR', model:'I Pace', startyear:2018, endyear:2018},

    {brand:'JAGUAR', model:'XJ', startyear:2011, endyear:2017},
  
    {brand:'JAGUAR', model:'F Pace', startyear:2017, endyear:2019},

    {brand:'JAGUAR', model:'XE', startyear:2017, endyear:2018},



    // Jeep Models
    {brand:'JEEP', model:'Commander', startyear:2008, endyear:2010},

    {brand:'JEEP', model:'Grand Cherokee', startyear:2008, endyear:2019},
    
    {brand:'JEEP', model:'Cherokee', startyear:2014, endyear:2019},


    // LAND Rover Models
    {brand:'LAND ROVER', model:'Freelander', startyear:2007, endyear:2013},

    {brand:'LAND ROVER', model:'LR2', startyear:2008, endyear:2014},

    {brand:'LAND ROVER', model:'LR3', startyear:2005, endyear:2009},
    
    {brand:'LAND ROVER', model:'Discovery', startyear:2015, endyear:2018},
    {brand:'LAND ROVER', model:'Discovery Sport', startyear:2016, endyear:2018},
    {brand:'LAND ROVER', model:'Discovery 3', startyear:2006, endyear:2010},

    {brand:'LAND ROVER', model:'LR4', startyear:2012, endyear:2018},
    


    // Range rover Models
    {brand:'RANGE ROVER', model:'Sport', startyear:2006, endyear:2016},

    {brand:'RANGE ROVER', model:'Evoque', startyear:2011, endyear:2016},

    {brand:'RANGE ROVER', model:'Vogue', startyear:2010, endyear:2010},



    // Lexus Models
    {brand:'LEXUS', model:'ES350', startyear:2008, endyear:2013},

    {brand:'LEXUS', model:'IS250', startyear:2006, endyear:2013},

    {brand:'LEXUS', model:'IS350', startyear:2006, endyear:2013},

    {brand:'LEXUS', model:'GS300', startyear:2006, endyear:2013},

    {brand:'LEXUS', model:'GS350', startyear:2007, endyear:2013},

    {brand:'LEXUS', model:'GS430', startyear:2006, endyear:2013},

    {brand:'LEXUS', model:'GS450h', startyear:2007, endyear:2013},

    {brand:'LEXUS', model:'GS460', startyear:2008, endyear:2013},

    {brand:'LEXUS', model:'LS460', startyear:2007, endyear:2013},

    {brand:'LEXUS', model:'LS600h', startyear:2008, endyear:2013},
    
    {brand:'LEXUS', model:'IS-F', startyear:2008, endyear:2011},
    
    {brand:'LEXUS', model:'CT200h', startyear:2011, endyear:2011},
    
    {brand:'LEXUS', model:'HS250h', startyear:2010, endyear:2012},
    
    {brand:'LEXUS', model:'LX570', startyear:2010, endyear:2011},

    {brand:'LEXUS', model:'ISC', startyear:2009, endyear:2011},
    

    // Mazda Models
    {brand:'MAZDA', model:'6 Wagon', startyear:2012, endyear:2019},

    {brand:'MAZDA', model:'CX-3', startyear:2015, endyear:2019},

    {brand:'MAZDA', model:'CX-5', startyear:2012, endyear:2019},

    {brand:'MAZDA', model:'CX-7', startyear:2010, endyear:2019},
    
    {brand:'MAZDA', model:'2', startyear:2014, endyear:2016},

    {brand:'MAZDA', model:'3 Hatch', startyear:2013, endyear:2015},
    
    {brand:'MAZDA', model:'3', startyear:2017, endyear:2017},

    {brand:'MAZDA', model:'6', startyear:2017, endyear:2017},
    
    {brand:'MAZDA', model:'CX-9', startyear:2017, endyear:2017},
    
    
    // Mini Models
    {brand:'MINI', model:'Mini cooper', startyear:2006, endyear:2013},

    // Nissan Models
    {brand:'NISSAN', model:'Cabster', startyear:2006, endyear:2015},

    {brand:'NISSAN', model:'Note', startyear:2006, endyear:2013},

    {brand:'NISSAN', model:'NV200', startyear:2009, endyear:2013},

    {brand:'NISSAN', model:'Pathfinder', startyear:2005, endyear:2020},

    {brand:'NISSAN', model:'Qashqai', startyear:2006, endyear:2014},

    {brand:'NISSAN', model:'Duali', startyear:2006, endyear:2014},

    {brand:'NISSAN', model:'Micra', startyear:2010, endyear:2011},

    {brand:'NISSAN', model:'Micra K12', startyear:2002, endyear:2010},

    {brand:'NISSAN', model:'Navara', startyear:2006, endyear:2015},

    {brand:'NISSAN', model:'Patrol', startyear:2006, endyear:2012},
    
    {brand:'NISSAN', model:'Juke', startyear:2009, endyear:2010},

    {brand:'NISSAN', model:'Cube', startyear:2009, endyear:2013},
    
    {brand:'NISSAN', model:'Armada', startyear:2017, endyear:2018},

    {brand:'NISSAN', model:'Murano', startyear:2015, endyear:2020},
    
    {brand:'NISSAN', model:'Titan', startyear:2017, endyear:2019},

    {brand:'NISSAN', model:'Rogue', startyear:2017, endyear:2019},

    {brand:'NISSAN', model:'Altima', startyear:2016, endyear:2018},

    {brand:'NISSAN', model:'Maxima', startyear:2016, endyear:2019},
    
    
    // Renault Models

    {brand:'RENAULT', model:'Maxity', startyear:2007, endyear:2016},

    {brand:'RENAULT', model:'Megane II', startyear:2003, endyear:2008},
    {brand:'RENAULT', model:'Megane III', startyear:2009, endyear:2015},
    {brand:'RENAULT', model:'Megane IV', startyear:2016, endyear:2016},

    {brand:'RENAULT', model:'Scenic', startyear:2009, endyear:2015},
    {brand:'RENAULT', model:'Scenic II', startyear:2003, endyear:2008},
    {brand:'RENAULT', model:'Grand Scenic', startyear:2009, endyear:2015},
    {brand:'RENAULT', model:'Grand Scenic II', startyear:2003, endyear:2008},

    {brand:'RENAULT', model:'Clio IV', startyear:2009, endyear:2017},

    {brand:'RENAULT', model:'Captur', startyear:2013, endyear:2017},
    
    {brand:'RENAULT', model:'Laguna III', startyear:2008, endyear:2012},
   
    {brand:'RENAULT', model:'Fluence', startyear:2012, endyear:2016},
    
    {brand:'RENAULT', model:'Talisman', startyear:2016, endyear:2016},

    {brand:'RENAULT', model:'Espace V', startyear:2016, endyear:2016},

    {brand:'RENAULT', model:'Kadjar', startyear:2015, endyear:2015},


    // Subaru Models
    {brand:'SUBARU', model:'Impreza', startyear:2004, endyear:2020},

    {brand:'SUBARU', model:'Liberty', startyear:2004, endyear:2009},

    {brand:'SUBARU', model:'Outback', startyear:2005, endyear:2019},

    {brand:'SUBARU', model:'Tribeca', startyear:2004, endyear:2009},

    {brand:'SUBARU', model:'Forester', startyear:2004, endyear:2020},

    {brand:'SUBARU', model:'Legacy', startyear:2008, endyear:2014},
    
    {brand:'SUBARU', model:'XV', startyear:2018, endyear:2018},
    {brand:'SUBARU', model:'XV Crosstrek', startyear:2017, endyear:2020},
   
    {brand:'SUBARU', model:'Legacy', startyear:2016, endyear:2020},
    
    {brand:'SUBARU', model:'BRZ', startyear:2014, endyear:2020},
    
    {brand:'SUBARU', model:'ST', startyear:2016, endyear:2017},

    {brand:'SUBARU', model:'WRX', startyear:2016, endyear:2018},



    // Toyota Models
   
  ];

  constructor(
    private navParamService: NavparamService, private router: Router, private http: HttpClient
  ) {

    this.brand = this.navParamService.getNavData();

    for (let carmodel of this.carmodels) {
      if (carmodel.brand == this.brand) {
        this.models.push({brand:carmodel.brand, endyear:carmodel.endyear,model:carmodel.model,startyear:carmodel.startyear});
      }
      else {

      }
    }
    this.models.sort((a, b) => (a.model > b.model) ? 1 : -1)
  }

  ngOnInit() {
  }

  onClick(x, y, type, startyear, endyear) {


    let car = { brand: this.brand, model: x, type: type, startyear: startyear, endyear: endyear };

    if (y == "All Models") {
      this.navParamService.setNavData(car);
      this.router.navigateByUrl('submodel');
    }
    else {
      this.navParamService.setNavData(car);
      this.router.navigateByUrl('year');

    }

  }

}
