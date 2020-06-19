import React, { Component } from 'react';
import './Part.css'
import Feature from './Feature';
import  dataParts from '../parts-test.json';

import { MIN_ITEM_BIG_COLUM, MIN_ITEM_LARGE_COLUM } from '../constants/constants'

class Part extends Component {

    state = {...dataParts[0]};

    oldState;
    bigFeaturesArray = []
    smallFeaturesArray = []
    largeFeaturesArray = [];
    initialize = false;
    

    startReadingPart = () => {
        setInterval(() => { this.readNextPartAtRandom() }, 10000);
    }

    readNextPartAtRandom = () => {       

        this.oldState = this.state;
        this.setState(dataParts[Math.floor(Math.random() * 10)]);
    }

    locateFeatures(){
        this.bigFeaturesArray = []
        this.smallFeaturesArray = []
        this.largeFeaturesArray = [];

        // sort columns
        this.state.features.forEach( (feature, index) => {
            if (feature.controls.length > MIN_ITEM_BIG_COLUM){
                this.sumTotDev(feature, this.oldState.features);
                this.bigFeaturesArray.push(feature);
            } else if (feature.controls.length > MIN_ITEM_LARGE_COLUM){
                this.sumTotDev(feature, this.oldState.features);
                this.largeFeaturesArray.push(feature);
            } else {
                this.sumTotDev(feature, this.oldState.features);
                this.smallFeaturesArray.push(feature);
            }
        })
    }

    initDevTot(){
        if (!this.initialize){
            this.state.features.forEach( ( feature ) => {
                feature.controls.forEach( (control) => {
                  control.devTot = 0;
                });
              });
              this.oldState = this.state;
              this.initialize = true;
        }

    }

    sumTotDev(feature, oldArray){
        let oldFeature;
        oldFeature = oldArray.find(element => element.name === feature.name );
    
        if (oldFeature === undefined){
          return feature;
        }
        feature.controls.forEach((elem, index, controlArray ) => {
          if (oldFeature.controls[index] !== undefined){
            elem.devTot = parseFloat((oldFeature.controls[index].devTot + oldFeature.controls[index].dev).toFixed(4));
          }
        });
    
        return feature;
    }

    render(){
        
        this.initDevTot();

        this.locateFeatures();

        return (
            <div className="container-fluid">
                <div className="ml-3">
                    <p>
                        <button
                            className="btn btn-primary"
                            onClick={this.startReadingPart}
                            >
                        Read Parts every 10 secs
                        </button>
                        <button
                            className="btn btn-secondary ml-3"
                            onClick={this.readNextPartAtRandom}
                        >
                        Read Next Part
                        </button>
                    </p>

                    <h1> <span>Produced Piece Name: </span>{ this.state.name }</h1>
                </div>
                <div className="row no-gutters">
                    { 
                        this.bigFeaturesArray.map((feature, index) => (
                            <div className="col-lg-5 col-md-6 col-sm-12" >
                                <Feature data={feature} key={index.toString()}/>
                            </div>
                        )) 
                    }
                    
                    <div className="col">
                        <div className="row no-gutters">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <div className="row no-gutters">                                  
                                    { 
                                    this.smallFeaturesArray.map((feature, index) => (
                                        <div className="col-lg-6 col-md-12" >
                                            <Feature data={feature} key={index.toString()}/>
                                        </div>
                                    ))
                                    }                               
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <div className="row no-gutters">
                                        {
                                        this.largeFeaturesArray.map((feature, index) => (
                                            <div className="col-12" >
                                                <Feature data={feature} key={index.toString()}/>
                                            </div>
                                            ))
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Part;
