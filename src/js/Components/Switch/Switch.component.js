import React, {Component} from "react";
import PropTypes from "prop-types";

import "../../../scss/animations/trigger.animation";
import "../../../scss/animations/label.animation";
import "./switch.styles";

class Switch extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: props.defaultPosition,
            animated: false
        }
    }

    getClassName(){
        const {animated, active} = this.state;
        const switchOn = animated ? "switch on animated" : "switch on";
        const switchOff = animated ? "switch off animated" : "switch off";

        return active ? switchOn : switchOff;
    }

    changeValue = (event) => {
        const {onChange} = this.props;
        const {id} = event.currentTarget.dataset;
        this.setState(prevState => ({
            active: !prevState.active,
            animated: true
        }));

        onChange(!this.state.active, id);
    };

    render(){
        const {leftLabel, rightLabel, id} = this.props;
        return (
            <div className={this.getClassName()} data-id={id} onClick={this.changeValue}>
                <div className="label">{leftLabel}</div>
                <button>toggle</button>
                <div className="label">{rightLabel}</div>
            </div>
        )
    }
}

Switch.Proptypes = {
    leftLabel: PropTypes.string.isRequired,
    rightLabel: PropTypes.string.isRequired,
    defaultPosition: PropTypes.bool,
    onChange:PropTypes.func.isRequired,
};

export default Switch;