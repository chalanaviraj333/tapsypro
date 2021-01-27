import { Component, OnInit } from '@angular/core';
import {NavparamService} from '../navparam.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-submodel',
  templateUrl: './submodel.page.html',
  styleUrls: ['./submodel.page.scss'],
})
export class SubmodelPage implements OnInit {

  selectedmodel:any;
  submodels = [];

  carsubmodels: any[] = [


    // Audi Sub Models
    {brand:"AUDI", model:"A4", submodel:"A4 Coupe", icon:"ww.png" ,type:"", startyear:2007, endyear:2009},
    {brand:"AUDI", model:"S4", submodel:"S4 Coupe", icon:"ww.png" ,type:"", startyear:2007, endyear:2013},
    {brand:"AUDI", model:"A4", submodel:"A4 Wagon", icon:"ww.png" ,type:"", startyear:2005, endyear:2008},
    {brand:"AUDI", model:"S4", submodel:"S4 Wagon", icon:"ww.png" ,type:"", startyear:2005, endyear:2008},
    {brand:"AUDI", model:"A4", submodel:"A4 Quattro", icon:"ww.png" ,type:"", startyear:2005, endyear:2008},
    {brand:"AUDI", model:"S4", submodel:"S4 Quattro", icon:"ww.png" ,type:"", startyear:2005, endyear:2008},
    {brand:"AUDI", model:"RS4", submodel:"RS4 Wagon", icon:"ww.png" ,type:"", startyear:2006, endyear:2008},
    {brand:"AUDI", model:"RS4", submodel:"RS4 Quattro", icon:"ww.png" ,type:"", startyear:2006, endyear:2008},





    // // Chrysler Sub Models
    // {brand:"CHRYSLER", model:"Chrysler 300", submodel:"300C LX S1", icon:"300clxs1.png" ,type:"bladed", range:"2005 - 2011", years:[2005,2006,2007,2008,2009,2010,2011]},
    // {brand:"CHRYSLER", model:"Chrysler 300", submodel:"300C LX S1", icon:"300clxs1.png" ,type:"slot", range:"2005 - 2011", years:[2005,2006,2007,2008,2009,2010,2011]},
    // {brand:"CHRYSLER", model:"Chrysler 300", submodel:"300C LX S2", icon:"300clxs2.png" ,type:"prox", range:"2011 - 2018", years:[2011,2012,2013,2014,2015,2016,2017,2018]},
    // {brand:"CHRYSLER", model:"Chrysler 300", submodel:"300 LX", icon:"300lx.png" ,type:"prox", range:"2018 ->", years:[2018,2019,2020]},

    // {brand:"CHRYSLER", model:"Grand Voyager", submodel:"Gen4 S1", icon:"chryslergvg4s1.png" ,type:"bladed", range:"2001 - 2004", years:[2001,2002,2003,2004]},
    // {brand:"CHRYSLER", model:"Grand Voyager", submodel:"Gen4 S2", icon:"chryslergvg4s2.png" ,type:"bladed", range:"2004 - 2007", years:[2004,2005,2006,2007]},
    // {brand:"CHRYSLER", model:"Grand Voyager", submodel:"Gen5", icon:"chryslergvg5.png" ,type:"bladed", range:"2008 - 2014", years:[2008,2009,2010,2011,2012,2013,2014]},
    // {brand:"CHRYSLER", model:"Grand Voyager", submodel:"Gen5", icon:"chryslergvg5.png" ,type:"slot", range:"2008 - 2014", years:[2008,2009,2010,2011,2012,2013,2014]},

    // {brand:"CHRYSLER", model:"PT Cruiser", submodel:"Cruiser PT/PG", icon:"ptcruiserptpg.png" ,type:"bladed", range:"2000 - 2005", years:[2000,2001,2002,2003,2004,2005]},
    // {brand:"CHRYSLER", model:"PT Cruiser", submodel:"Cruiser Facelift", icon:"ptcruiserfacelift.png" ,type:"bladed", range:"2005 - 2010", years:[2005,2006,2007,2008,2009,2010]},
    // {brand:"CHRYSLER", model:"PT Cruiser", submodel:"Cruiser Facelift", icon:"ptcruiserfacelift.png" ,type:"slot", range:"2005 - 2010", years:[2005,2006,2007,2008,2009,2010]},


    // // Citroen Sub Models
    // {brand:"CITROEN", model:"C3", submodel:"C3 S1", icon:"c3s1.png" ,type:"bladed", range:"2004 - 2010", years:[2004,2005,2006,2007,2008,2009,2010]},
    // {brand:"CITROEN", model:"C3", submodel:"C3 S2", icon:"c3s2.png" ,type:"bladed", range:"2010 - 2017", years:[2010,2011,2012,2013,2014,2015,2016,2017]},
    // {brand:"CITROEN", model:"C3", submodel:"C3 Pluriel", icon:"c3pluriel.png" ,type:"bladed", range:"2004 - 2010", years:[2004,2005,2006,2007,2008,2009,2010]},
    // {brand:"CITROEN", model:"C3", submodel:"C3 Aircross", icon:"c3aircross.png" ,type:"bladed", range:"2017 ->", years:[2017,2018,2019,2020]},
    // {brand:"CITROEN", model:"C3", submodel:"C3 Aircross", icon:"c3aircross.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"CITROEN", model:"C4", submodel:"C4 S1", icon:"c4s1.png" ,type:"bladed", range:"2003 - 2010", years:[2003,2004,2005,2006,2007,2008,2009,2010]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 S2", icon:"c4s2.png" ,type:"bladed", range:"2011 - 2018", years:[2011,2012,2013,2014,2015,2016,2017,2018]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 S2", icon:"c4s2.png" ,type:"prox", range:"2011 - 2018", years:[2011,2012,2013,2014,2015,2016,2017,2018]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Aircross", icon:"c4aircross.png" ,type:"bladed", range:"2012 - 2014", years:[2012,2013,2014]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Aircross", icon:"c4aircross.png" ,type:"prox", range:"2012 - 2014", years:[2012,2013,2014]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Picasso S1", icon:"c4picasso.png" ,type:"bladed", range:"2007 - 2013", years:[2007,2008,2009,2010,2011,2012,2013]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Picasso S2", icon:"c4s2picasso.png" ,type:"bladed", range:"2013 - 2017", years:[2013,2014,2015,2016,2017]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Picasso S2", icon:"c4s2picasso.png" ,type:"prox", range:"2013 - 2017", years:[2013,2014,2015,2016,2017]},
    // {brand:"CITROEN", model:"C4", submodel:"C4 Cactus", icon:"c4cactus.png" ,type:"bladed", range:"2015 ->", years:[2015,2016,2017,2018,2019,2020]},

    // {brand:"CITROEN", model:"C5", submodel:"C5 S1", icon:"c5s1.png" ,type:"bladed", range:"2001 - 2004", years:[2001,2002,2003,2004]},
    // {brand:"CITROEN", model:"C5", submodel:"C5 S1 Facelift", icon:"c5s1facelift.png" ,type:"bladed", range:"2004 - 2007", years:[2004,2005,2006,2007]},
    // {brand:"CITROEN", model:"C5", submodel:"C5 S2", icon:"c5s2.png" ,type:"bladed", range:"2008 - 2017", years:[2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]},
    // {brand:"CITROEN", model:"C5", submodel:"C5 Aircross", icon:"c5aircross.png" ,type:"bladed", range:"2017 - 2020", years:[2017,2018,2019,2020]},
    // {brand:"CITROEN", model:"C5", submodel:"C5 Aircross", icon:"c5aircross.png" ,type:"prox", range:"2017 - 2020", years:[2017,2018,2019,2020]},

    // {brand:"CITROEN", model:"DS4", submodel:"Citroen DS4", icon:"citroends4.png" ,type:"bladed", range:"2011 - 2017", years:[2011,2012,2013,2014,2015,2016,2017]},
    // {brand:"CITROEN", model:"DS4", submodel:"Citroen DS4", icon:"citroends4.png" ,type:"prox", range:"2011 - 2017", years:[2011,2012,2013,2014,2015,2016,2017]},

    // {brand:"CITROEN", model:"Xsara", submodel:"Xsara S1", icon:"xsaras1.png" ,type:"bladed", range:"1997 - 2001", years:[1997,1998,1999,2000,2001]},
    // {brand:"CITROEN", model:"Xsara", submodel:"Xsara S2", icon:"xsaras2.png" ,type:"bladed", range:"2001 - 2004", years:[2001,2002,2003,2004]},


    // // Fiat Sub Models
    // {brand:"FIAT", model:"S500", submodel:"500", icon:"s500500.png" ,type:"bladed", range:"2008 ->", years:[2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]},
    // {brand:"FIAT", model:"S500", submodel:"500L", icon:"s500500l.png" ,type:"bladed", range:"2011 ->", years:[2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]},
    // {brand:"FIAT", model:"S500", submodel:"500X", icon:"s500500x.png" ,type:"bladed", range:"2014 ->", years:[2014,2015,2016,2017,2018,2019,2020]},
    // {brand:"FIAT", model:"S500", submodel:"500X", icon:"s500500x.png" ,type:"prox", range:"2014 - 2020", years:[2014,2015,2016,2017,2018,2019,2020]},

    // {brand:"FIAT", model:"Ducato", submodel:"Ducato S2", icon:"ducatos2.png" ,type:"bladed", range:"2002 - 2007", years:[2002,2003,2004,2005,2006,2007]},
    // {brand:"FIAT", model:"Ducato", submodel:"Ducato S3", icon:"ducatos3.png" ,type:"bladed", range:"2007 - 2010", years:[2007,2008,2009,2010]},
    // {brand:"FIAT", model:"Ducato", submodel:"Ducato S3 Facelift", icon:"ducatos2facelift.png" ,type:"bladed", range:"2010 - 2014", years:[2010,2011,2012,2013,2014]},

    // {brand:"FIAT", model:"Punto", submodel:"Punto S1", icon:"puntos1.png" ,type:"bladed", range:"2006 - 2009", years:[2006,2007,2008,2009]},
    // {brand:"FIAT", model:"Punto", submodel:"Punto S2", icon:"puntos2.png" ,type:"bladed", range:"2013 - 2015", years:[2013,2014,2015]},

    // {brand:"FORD", model:"Cougar", submodel:"Cougar SW", icon:"cougarsw.png" ,type:"bladed", range:"1999 - 2001", years:[1999,2000,2001]},
    // {brand:"FORD", model:"Cougar", submodel:"Cougar SX", icon:"cougarsx.png" ,type:"bladed", range:"2001 - 2002", years:[2001,2002]},

    // {brand:"FORD", model:"Ecosport", submodel:"Ecosport BK", icon:"ecosportbk.png" ,type:"bladed", range:"2013 - 2018", years:[2013,2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Ecosport", submodel:"Ecosport BK", icon:"ecosportbk.png" ,type:"prox", range:"2013 - 2018", years:[2013,2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Ecosport", submodel:"Ecosport BL", icon:"ecosportbl.png" ,type:"bladed", range:"2018 ->", years:[2018,2019,2020]},
    // {brand:"FORD", model:"Ecosport", submodel:"Ecosport BL", icon:"ecosportbl.png" ,type:"prox", range:"2018 ->", years:[2018,2019,2020]},

    // {brand:"FORD", model:"Escape", submodel:"Escape BA", icon:"escapeba.png" ,type:"bladed", range:"2001 - 2003", years:[2001,2002,2003]},
    // {brand:"FORD", model:"Escape", submodel:"Escape ZA", icon:"escapeza.png" ,type:"bladed", range:"2003 - 2004", years:[2003,2004]},
    // {brand:"FORD", model:"Escape", submodel:"Escape ZB", icon:"escapezb.png" ,type:"bladed", range:"2004 - 2006", years:[2004,2005,2006]},
    // {brand:"FORD", model:"Escape", submodel:"Escape ZC", icon:"escapezc.png" ,type:"bladed", range:"2006 - 2008", years:[2006,2007,2008]},
    // {brand:"FORD", model:"Escape", submodel:"Escape ZD", icon:"escapezd.png" ,type:"bladed", range:"2008 - 2012", years:[2008,2009,2010,2011,2012]},
    // {brand:"FORD", model:"Escape", submodel:"Escape ZG", icon:"escapezg.png" ,type:"prox", range:"2016 ->", years:[2016,2017,2018,2019,2020]},

    // {brand:"FORD", model:"Explorer", submodel:"Explorer UP", icon:"explorerup.png" ,type:"bladed", range:"1997 - 1999", years:[1997,1998,1999]},
    // {brand:"FORD", model:"Explorer", submodel:"Explorer UQ", icon:"exploreruq.png" ,type:"bladed", range:"1999 - 2001", years:[1999,2000,2001]},
    // {brand:"FORD", model:"Explorer", submodel:"Explorer UT", icon:"explorerut.png" ,type:"bladed", range:"2001 - 2002", years:[2001,2002]},
    // {brand:"FORD", model:"Explorer", submodel:"Explorer UZ", icon:"exploreruz.png" ,type:"bladed", range:"2003 - 2005", years:[2003,2004,2005]},
    // {brand:"FORD", model:"Explorer", submodel:"Explorer UX", icon:"explorerux.png" ,type:"bladed", range:"2003", years:[2003]},

    // {brand:"FORD", model:"F250", submodel:"F250 XL/XLT", icon:"f250xlxlt.png" ,type:"bladed", range:"2001 - 2003", years:[2001,2002,2003]},
    // {brand:"FORD", model:"F250", submodel:"F250 RN", icon:"f250rn.png" ,type:"bladed", range:"2003 - 2006", years:[2003,2004,2005,2006]},

    // {brand:"FORD", model:"Falcon", submodel:"Falcon AU2", icon:"falconau2.png" ,type:"bladed", range:"1998 - 2001", years:[1998,1999,2000,2001]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon AU3", icon:"falconau3.png" ,type:"bladed", range:"2001 - 2002", years:[2001,2002]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon BA", icon:"falconba.png" ,type:"bladed", range:"2002 - 2005", years:[2002,2003,2004,2005]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon BF", icon:"falconbf.png" ,type:"bladed", range:"2005 - 2008", years:[2005,2006,2007,2008]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon FG", icon:"falconfg.png" ,type:"bladed", range:"2008 - 2011", years:[2008,2009,2010,2011]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon FG MKII", icon:"falconfgmk11.png" ,type:"bladed", range:"2011 - 2014", years:[2011,2012,2013,2014]},
    // {brand:"FORD", model:"Falcon", submodel:"Falcon FG X", icon:"falconfgx.png" ,type:"bladed", range:"2014 - 2016", years:[2014,2015,2016]},

    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WP", icon:"fiestawp.png" ,type:"bladed", range:"2004 - 2005", years:[2004,2005]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WQ", icon:"fiestawq.png" ,type:"bladed", range:"2006 - 2008", years:[2006,2007,2008]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WS", icon:"fiestaws.png" ,type:"bladed", range:"2008 - 2011", years:[2008,2009,2010,2011]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WT", icon:"fiestawt.png" ,type:"bladed", range:"2010 - 2013", years:[2010,2011,2012,2013]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WZ", icon:"fiestawz.png" ,type:"bladed", range:"2013 - 2018", years:[2013,2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WZ", icon:"fiestawz.png" ,type:"prox", range:"2013 - 2018", years:[2013,2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Fiesta", submodel:"Fiesta WG", icon:"fiestawg.png" ,type:"prox", range:"2019 ->", years:[2019,2020]},

    // {brand:"FORD", model:"Focus", submodel:"Focus LR", icon:"focuslr.png" ,type:"bladed", range:"2002 - 2005", years:[2002,2003,2004,2005]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LS", icon:"focusls.png" ,type:"bladed", range:"2005 - 2007", years:[2005,2006,2007]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LT", icon:"focuslt.png" ,type:"bladed", range:"2007 - 2009", years:[2007,2008,2009]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LV", icon:"focuslv.png" ,type:"bladed", range:"2009 - 2010", years:[2009,2010]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LV MKII", icon:"focuslvmk11.png" ,type:"bladed", range:"2010 - 2011", years:[2010,2011]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LW", icon:"focuslw.png" ,type:"bladed", range:"2011 - 2012", years:[2011,2012]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LW MKII", icon:"focuslwmk11.png" ,type:"bladed", range:"2012 - 2014", years:[2012,2013,2014]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LW MKII", icon:"focuslwmk11.png" ,type:"prox", range:"2012 - 2014", years:[2012,2013,2014]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LZ", icon:"focuslz.png" ,type:"bladed", range:"2014 - 2018", years:[2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Focus", submodel:"Focus LZ", icon:"focuslz.png" ,type:"prox", range:"2014 - 2018", years:[2014,2015,2016,2017,2018]},
    // {brand:"FORD", model:"Focus", submodel:"Focus SA", icon:"focussa.png" ,type:"bladed", range:"2018 ->", years:[2018,2019,2020]},
    // {brand:"FORD", model:"Focus", submodel:"Focus SA", icon:"focussa.png" ,type:"prox", range:"2018 ->", years:[2018,2019,2020]},

    // {brand:"FORD", model:"Laser", submodel:"Laser KN", icon:"laserkn.png" ,type:"bladed", range:"1999 - 2001", years:[1999,2000,2001]},
    // {brand:"FORD", model:"Laser", submodel:"Laser KQ", icon:"laserkq.png" ,type:"bladed", range:"2001 - 2002", years:[2001,2002]},

    // {brand:"FORD", model:"KA", submodel:"KA TA", icon:"fordkata.png" ,type:"bladed", range:"1999 - 2000", years:[1999,2000]},
    // {brand:"FORD", model:"KA", submodel:"KA TB", icon:"fordkatb.png" ,type:"bladed", range:"2000 - 2002", years:[2000,2001,2002]},

    // {brand:"FORD", model:"Kuga", submodel:"Kuga TE", icon:"fordkugate.png" ,type:"bladed", range:"2012 - 2013", years:[2012,2013]},
    // {brand:"FORD", model:"Kuga", submodel:"Kuga TF", icon:"fordkugatf.png" ,type:"bladed", range:"2013 - 2016", years:[2013,2014,2015,2016]},
    // {brand:"FORD", model:"Kuga", submodel:"Kuga TF", icon:"fordkugatf.png" ,type:"prox", range:"2013 - 2016", years:[2013,2014,2015,2016]},

    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo HB-HE", icon:"mondeohbhe.png" ,type:"bladed", range:"1996 - 2000", years:[1996,1997,1998,1999,2000]},
    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo MA", icon:"mondeoma.png" ,type:"bladed", range:"2007 - 2009", years:[2007,2008,2009]},
    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo MB", icon:"mondeomb.png" ,type:"bladed", range:"2009 - 2010", years:[2009,2010]},
    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo MC", icon:"mondeomc.png" ,type:"bladed", range:"2010 - 2014", years:[2010,2011,2012,2013,2014]},
    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo MC", icon:"mondeomc.png" ,type:"prox", range:"2010 - 2014", years:[2010,2011,2012,2013,2014]},
    // {brand:"FORD", model:"Mondeo", submodel:"Mondeo MD", icon:"mondeomd.png" ,type:"bladed", range:"2015 - 2019", years:[2015,2016,2017,2018,2019]},

    // {brand:"FORD", model:"Mustang", submodel:"Mustang FM", icon:"mustangfm.png" ,type:"prox", range:"2015 - 2017", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Mustang", submodel:"Mustang FN", icon:"mustangfn.png" ,type:"prox", range:"2018 ->", years:[2018,2019,2020]},

    // {brand:"FORD", model:"Ranger", submodel:"Ranger PJ", icon:"fordrangerpj.png" ,type:"bladed", range:"2006 - 2009", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Ranger", submodel:"Ranger PK", icon:"fordrangerpk.png" ,type:"bladed", range:"2009 - 2011", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Ranger", submodel:"Ranger PX", icon:"fordrangerpx.png" ,type:"bladed", range:"2011 - 2015", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Ranger", submodel:"Ranger PXII", icon:"fordrangerpxii.png" ,type:"bladed", range:"2015 - 2018", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Ranger", submodel:"Ranger PXII", icon:"fordrangerpxii.png" ,type:"bladed", range:"2018 ->", years:[2015,2016,2017]},
    // {brand:"FORD", model:"Ranger", submodel:"Ranger PXIII", icon:"fordrangerpxiii.png" ,type:"prox", range:"2018 ->", years:[2015,2016,2017]},

    // {brand:"FORD", model:"Taurus", submodel:"Taurus DN", icon:"taurusdn.png" ,type:"bladed", range:"1996", years:[1996]},
    // {brand:"FORD", model:"Taurus", submodel:"Taurus DP", icon:"taurusdp.png" ,type:"bladed", range:"1996 - 1999", years:[1996,1997,1998,1999]},

    // {brand:"FORD", model:"Territory", submodel:"Territory SX", icon:"territorysx.png" ,type:"bladed", range:"2004 - 2005", years:[2004,2005,2006]},
    // {brand:"FORD", model:"Territory", submodel:"Territory SY MK1", icon:"territorysymk1.png" ,type:"bladed", range:"2005 - 2009", years:[2005,2006,2007,2008,2009]},
    // {brand:"FORD", model:"Territory", submodel:"Territory SY MK2", icon:"territorysymk2.png" ,type:"bladed", range:"2009 - 2011", years:[2009,2010,2011]},
    // {brand:"FORD", model:"Territory", submodel:"Territory SZ MK1", icon:"territoryszmk1.png" ,type:"bladed", range:"2011 - 2014", years:[2011,2012,2013,2014]},
    // {brand:"FORD", model:"Territory", submodel:"Territory SZ MK2", icon:"territoryszmk2.png" ,type:"bladed", range:"2014 - 2016", years:[2014,2015,2016]},

    // {brand:"FORD", model:"Transit", submodel:"Transit VH", icon:"transitvh.png" ,type:"bladed", range:"2000 - 2004", years:[2000,2001,2002,2003,2004]},
    // {brand:"FORD", model:"Transit", submodel:"Transit VJ", icon:"transitvj.png" ,type:"bladed", range:"2004 - 2006", years:[2004,2005,2006]},
    // {brand:"FORD", model:"Transit", submodel:"Transit VM", icon:"transitvm.png" ,type:"bladed", range:"2006 - 2012", years:[2006,2007,2008,2009,2010,2011,2012]},
    // {brand:"FORD", model:"Transit", submodel:"Transit Custom S1", icon:"transitcustoms1.png" ,type:"bladed", range:"2014 - 2017", years:[2014,2015,2016,2017]},
    // {brand:"FORD", model:"Transit", submodel:"Transit Custom S2", icon:"transitcustoms2.png" ,type:"bladed", range:"2017 ->", years:[2017,2018,2019,2020]},
    // {brand:"FORD", model:"Transit", submodel:"Transit Custom S2", icon:"transitcustoms2.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},


    // // Holden Sub Models
    // {brand:"HOLDEN", model:"Adventra", submodel:"Adventra VY", icon:"adventravy.png" ,type:"bladed", range:"2003 - 2004", years:[2003,2004]},
    // {brand:"HOLDEN", model:"Adventra", submodel:"Adventra VZ", icon:"adventravz.png" ,type:"bladed", range:"2004 - 2006", years:[2004,2005,2006]},

    // {brand:"HOLDEN", model:"Astra", submodel:"Astra TR", icon:"astratr.png" ,type:"bladed", range:"1996 - 1998", years:[1996,1997,1998]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra TS", icon:"astrats.png" ,type:"bladed", range:"1998 - 2004", years:[1998,1999,2000,2001,2002,2003,2004]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra TS Classic", icon:"astratsclassic.png" ,type:"bladed", range:"2004 - 2005", years:[2004,2005]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra AH", icon:"astraah.png" ,type:"bladed", range:"2004 - 2009", years:[2004,2005,2006,2007,2008,2009]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra PJ", icon:"astrapj.png" ,type:"bladed", range:"2014 - 2017", years:[2014,2015,2016,2017]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra BK/BL", icon:"astrabkbl.png" ,type:"bladed", range:"2016 ->", years:[2016,2017,2018,2019,2020]},
    // {brand:"HOLDEN", model:"Astra", submodel:"Astra BK/BL", icon:"astrabkbl.png" ,type:"prox", range:"2016 ->", years:[2016,2017,2018,2019,2020]},


    // {brand:"HOLDEN", model:"Barina", submodel:"Barina SB S1", icon:"barinasb.png" ,type:"bladed", range:"1996 - 1998", years:[1996,1997,1998]},
    // {brand:"HOLDEN", model:"Barina", submodel:"Barina SB S2", icon:"barinasb.png" ,type:"bladed", range:"1998 - 2001", years:[1998,1999,2000,2001]},
    // {brand:"HOLDEN", model:"Barina", submodel:"Barina XC", icon:"barinaxc.png" ,type:"bladed", range:"2001 - 2005", years:[2001,2002,2003,2004,2005]},
    // {brand:"HOLDEN", model:"Barina", submodel:"Barina TK", icon:"barinatk.png" ,type:"bladed", range:"2005 - 2011", years:[2005,2006,2007,2008,2009,2010,2011]},
    // {brand:"HOLDEN", model:"Barina", submodel:"Barina TM", icon:"barinatm.png" ,type:"bladed", range:"2011 - 2015", years:[2011,2012,2013,2014,2015]},
    // {brand:"HOLDEN", model:"Barina", submodel:"Barina Spark MJ", icon:"barinasparkmj.png" ,type:"bladed", range:"2010 - 2015", years:[2010,2011,2012,2013,2014,2015]},

    // // Toyota Sub Models
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV40R", icon:"zn6.png" ,type:"bladed", range:"2006 - 2009", years:[2006,2007,2008,2009]},
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV40R", icon:"zn6.png" ,type:"prox", range:"2006 - 2009", years:[2006,2007,2008,2009]},
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV40R Facelift", icon:"zn6.png" ,type:"bladed", range:"2009 - 2011", years:[2009,2010,2011]},
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV40R Facelift", icon:"zn6.png" ,type:"prox", range:"2006 - 2009", years:[2006,2007,2008,2009]},
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV50R", icon:"zn6.png" ,type:"bladed", range:"2012 - 2017", years:[2012,2013,2014,2015,2016,2017]},
    // {brand:"TOYOTA", model:"Aurion", submodel:"GSV50R", icon:"zn6.png" ,type:"prox", range:"2012 - 2017", years:[2012,2013,2014,2015,2016,2017]},
  ];

  constructor(private navParamService: NavparamService, private router: Router) {

    this.selectedmodel = this.navParamService.getNavData();
    
    for (let carsubmodel of this.carsubmodels) {
      if (carsubmodel.brand == this.selectedmodel.brand && carsubmodel.model == this.selectedmodel.model)
      {
        this.submodels.push({carsubmodel});
      }
      else
      {

      }
    }

   }

  ngOnInit() {
  }

  onClick(model,brand,type,startyear,endyear){
    let car = {brand:brand, model:model, type:type, startyear:startyear, endyear:endyear};

    this.navParamService.setNavData(car);
    this.router.navigateByUrl('year');

  }

}


    // Alfa Romeo Sub Models 2005 - 2010
    // {brand:"ALFA ROMEO", model:"147", submodel:"147 S1", icon:"147series1.png" ,type:"bladed", startyear:2001, endyear:2005},
    // {brand:"ALFA ROMEO", model:"147", submodel:"147 S2", icon:"147series2.png" ,type:"bladed", startyear:2005, endyear:2010},

    // {brand:"ALFA ROMEO", model:"156", submodel:"156 S1", icon:"156series1.png" ,type:"bladed", range:"1999 - 2002", years:[1999,2000,2001,2002]},
    // {brand:"ALFA ROMEO", model:"156", submodel:"156 FL1", icon:"156facelift1.png" ,type:"bladed", range:"2002 - 2003", years:[2002,2003]},
    // {brand:"ALFA ROMEO", model:"156", submodel:"156 FL2", icon:"156facelift2.png" ,type:"bladed", range:"2004 - 2007", years:[2004,2005,2006,2007]},

    // {brand:"ALFA ROMEO", model:"166", submodel:"166 S1", icon:"166series1.png" ,type:"bladed", range:"1999 - 2004", years:[1999,2000,2001,2002,2003,2004]},
    // {brand:"ALFA ROMEO", model:"166", submodel:"166 S2", icon:"166series2.png" ,type:"bladed", range:"2004 - 2008", years:[2004,2005,2006,2007,2008]},


    // {brand:"ALFA ROMEO", model:"MiTo", submodel:"MiTo S1", icon:"mitoseries1.png" ,type:"bladed", range:"2009 - 2013", years:[2009,2010,2011,2012,2013]},
    // {brand:"ALFA ROMEO", model:"MiTo", submodel:"MiTO S2", icon:"mitoseries2.png" ,type:"bladed", range:"2014 - 2018", years:[2014,2015,2016,2017,2018]},

    // {brand:"AUDI", model:"A3", submodel:"A3 8L", icon:"a38l.png" ,type:"bladed", range:"1996 - 2003", years:[1996,1997,1998,1999,2000,2001,2002,2003]},
    // {brand:"AUDI", model:"A3", submodel:"A3 8P", icon:"a38p.png" ,type:"bladed", range:"2004 - 2012", years:[2004,2005,2006,2007,2008,2009,2010,2011,2012]},
    // {brand:"AUDI", model:"A3", submodel:"A3 8V", icon:"a38v.png" ,type:"bladed", range:"2013 - 2020", years:[2013,2014,2015,2016,2017,2018,2019,2020]},
    // {brand:"AUDI", model:"A3", submodel:"A3 8V", icon:"a38v.png" ,type:"prox", range:"2013 - 2020", years:[2013,2014,2015,2016,2017,2018,2019,2020]},

    // {brand:"AUDI", model:"A4", submodel:"A4 8D/B5", icon:"a48db5.png" ,type:"bladed", range:"1995- 2001", years:[1995,1996,1997,1998,1999,2000,2001]},
    // {brand:"AUDI", model:"A4", submodel:"A4 8E/B6", icon:"a48eb6.png" ,type:"bladed", range:"2001 - 2005", years:[2001,2002,2003,2004,2005]},
    // {brand:"AUDI", model:"A4", submodel:"A4 8E/B7", icon:"a48eb7.png" ,type:"bladed", range:"2005 - 2008", years:[2005,2006,2007,2008]},
    // {brand:"AUDI", model:"A4", submodel:"A4 8K/B8", icon:"a48kb8.png" ,type:"prox", range:"2008 - 2016", years:[2008,2009,2010,2011,2012,2013,2014,2015,2016]},
    // {brand:"AUDI", model:"A4", submodel:"A4 F4/B9", icon:"a4f4b9.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"A5", submodel:"A5 8T/B8", icon:"a58tb8.png" ,type:"prox", range:"2008 - 2016", years:[2008,2009,2010,2011,2012,2013,2014,2015,2016]},
    // {brand:"AUDI", model:"A5", submodel:"A5 F5/B9", icon:"a5f5b9.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"A6", submodel:"A6 4A/C4", icon:"a64ac4.png" ,type:"bladed", range:"1995 - 1997", years:[1995,1996,1997]},
    // {brand:"AUDI", model:"A6", submodel:"A6 4B/C5", icon:"a64bc5.png" ,type:"bladed", range:"1997 - 2004", years:[1997,1998,1999,2000,2001,2002,2003,2004]},
    // {brand:"AUDI", model:"A6", submodel:"A6 4F/C6", icon:"a64fc6.png" ,type:"bladed", range:"2004 - 2011", years:[2004,2005,2006,2007,2008,2009,2010,2011]},
    // {brand:"AUDI", model:"A6", submodel:"A6 4G/C7", icon:"a64gc7.png" ,type:"prox", range:"2012 - 2017", years:[2012,2013,2014,2015,2016,2017]},
    // {brand:"AUDI", model:"A6", submodel:"A6 F2/4A", icon:"a6f24a.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"A8", submodel:"A8 4D/C5", icon:"a84dc5.png" ,type:"bladed", range:"1995 - 2003", years:[1995,1996,1997,1998,1999,2000,2001,2002,2003]},
    // {brand:"AUDI", model:"A8", submodel:"A8 4E/C6", icon:"a84ec6.png" ,type:"bladed", range:"2004 - 2011", years:[2004,2005,2006,2007,2008,2009,2010,2011]},
    // {brand:"AUDI", model:"A8", submodel:"A8 4F/C7", icon:"a84fc7.png" ,type:"prox", range:"2012 - 2017", years:[2012,2013,2014,2015,2016,2017]},
    // {brand:"AUDI", model:"A8", submodel:"A8 F8/C8", icon:"a8f8c8.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"Q3", submodel:"Q3 8U", icon:"q38u.png" ,type:"bladed", range:"2012 - 2017", years:[2012,2013,2014,2015,2016,2017]},
    // {brand:"AUDI", model:"Q3", submodel:"Q3 F3", icon:"q3f3.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"Q5", submodel:"Q5 8R", icon:"q58r.png" ,type:"prox", range:"2009 - 2017", years:[2009,2010,2011,2012,2013,2014,2015,2016,2017]},
    // {brand:"AUDI", model:"Q5", submodel:"Q5 FY", icon:"q5fy.png" ,type:"prox", range:"2017 ->", years:[2017,2018,2019,2020]},

    // {brand:"AUDI", model:"Q7", submodel:"Q7 4L", icon:"q74l.png" ,type:"bladed", range:"2006 - 2012", years:[2006,2007,2008,2009,2010,2011,2012]},
    // {brand:"AUDI", model:"Q7", submodel:"Q7 4M", icon:"q74m.png" ,type:"prox", range:"2012 ->", years:[2012,2013,2014,2015,2016,2017,2018,2019,2020]},

    // {brand:"AUDI", model:"TT", submodel:"TT 8N", icon:"tt8n.png" ,type:"bladed", range:"1999 - 2006", years:[1999,2000,2001,2002,2003,2004,2005,2006]},
    // {brand:"AUDI", model:"TT", submodel:"TT 8J", icon:"tt8j.png" ,type:"bladed", range:"2006 - 2014", years:[2006,2007,2008,2009,2010,2011,2012,2013,2014]},
    // {brand:"AUDI", model:"TT", submodel:"TT FV", icon:"ttfv.png" ,type:"prox", range:"2014 ->", years:[2014,2015,2016,2017,2018,2019,2020]},
