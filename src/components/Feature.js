import React, { Component } from 'react';
import './Feature.css';
import circle from '../assets/circle.svg'
import warning from '../assets/warning.svg'
import success from '../assets/success.svg'
import Control from './Control';
import { MIN_ITEM_BIG_COLUM, MIN_ITEM_LARGE_COLUM, MIN_ITEM_SMALL_COLUM } from '../constants/constants'

const Feature = props => {
  const {controls, quality, name} = props.data;
    const twoColumns = Math.trunc(controls.length / MIN_ITEM_BIG_COLUM);
    const qualityIcon = quality === 'warning' ? warning : success;

    return (
      <div className='feature'>
          <h3
              className={` ${ quality} circle`}
          >
              <img
                  className={ 'icon' }
                  src={circle}
              />
              { name }
              <img
                  className={ 'icon icon-right' }
                  src={qualityIcon}
              />
          </h3>
          {
            <Control data={controls} options={ {twoColumns: twoColumns} } />
          }
      </div>
    );
}

export default Feature;
