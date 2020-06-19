import React, { Component } from 'react';
import './Control.css'
import MaterialIcon from '@material/react-material-icon';
import { MIN_ITEM_BIG_COLUM, MIN_ITEM_LARGE_COLUM, MIN_ITEM_SMALL_COLUM } from '../constants/constants'

const IconProps = {
    danger: {
      iconName: 'cancel',
      iconColor: 'red'
    },
    warning: {
      iconName: 'error_outline',
      iconColor: 'yellow'
    },
    success: {
      iconName: 'check_circle_outline',
      iconColor: 'green'
    },
  }

const SimpleTable = (props) => {

    const tbodyTr = props.data.map((ctrl,index) => {


        const {iconName, iconColor} = IconProps[ctrl.quality];

        if( props.max < index+1 ){   
            return (
                <tr key={index} className={`expanded ${props.toggleClass}`}>
                    <td>{ ctrl.name }</td>
                    <td className="text-center">{ ctrl.dev }</td>
                    <td className="text-center">{ ctrl.devTot }</td>
                    <td>
                        <MaterialIcon icon={`${iconName}`} className={`icon-${ctrl.quality}`} />
                    </td>
                </tr>
            )
        } else {
            return (
                <tr key={index}>
                    <td>{ ctrl.name }</td>
                    <td className="text-center">{ ctrl.dev }</td>
                    <td className="text-center">{ ctrl.devTot }</td>
                    <td>
                        <MaterialIcon icon={`${iconName}`} className={`icon-${ctrl.quality}`}  />
                    </td>
                </tr>
            );
        }
    })

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Control</th>
                    <th scope="col" className="text-center">Dev</th>
                    <th scope="col" className="text-center">Dev Tot Out</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                { tbodyTr }
            </tbody>
        </table>
    );
}



class Control extends Component {
        
    constructor(props){
        super(props);
        this.state = {
            toggleClass: 'd-none'
        };
        this.twoColumns = props.options.twoColumns
    }
           
    render(){
        let table;
        let table2;
        let max;
        (this.props.data.length > MIN_ITEM_LARGE_COLUM ) ? max = MIN_ITEM_LARGE_COLUM : max = MIN_ITEM_SMALL_COLUM; 
            
        
        if (this.twoColumns){
            let half = Math.trunc((this.props.data.length)/2);
            let tot = this.props.data.length;

          return (
            <div className="row no-gutters">
                <div className="col-6">
                    <SimpleTable data={this.props.data.slice(0,half-1)} max={max}  toggleClass={this.state.toggleClass} />
                </div>
                <div className="col-6">
                    <SimpleTable data={this.props.data.slice(half,tot-1)} max={max}  toggleClass={this.state.toggleClass} />
                </div>
                <button 
                    className="btn btn-secondary d-block showMore-button p-3 w-100"
                    onClick={() => this.showMoreClick()}
                >
                    &#9726;&#9726;&#9726;
                </button>
            </div>
          );
        }
        else {
            return (
                <div>
                    <SimpleTable data={this.props.data} max={max} toggleClass={this.state.toggleClass} />
                    <button 
                        className="btn btn-secondary d-block showMore-button p-3 w-100"
                        onClick={() => this.showMoreClick()}
                    >
                        &#9726;&#9726;&#9726;
                    </button>
                </div>
            );
        }
    }

    splitColumns(){
        const half = Math.round(this.inputControlData.length / 2 );
        this.bigColumn1 = this.inputControlData.slice(0, half);
        this.bigColumn2 = this.inputControlData.slice(half, this.inputControlData.length);
    }

    showMoreClick(){
        if (this.state.toggleClass === 'd-none'){
            this.setState({
                toggleClass: ''
            })
        } else {
            this.setState({
                toggleClass: 'd-none'
            })
        }
    }
}

export default Control;
