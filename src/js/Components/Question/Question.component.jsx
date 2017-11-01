import React, {Component} from "react";
import PropTypes from "prop-types";

import Switch from "../Switch/Switch.component";

import "./question.styles";

const rules = {"1": false, "2": false, "3": false};

class Question extends Component {

    constructor(props) {
        super(props);

        this.defaultClassName = "question";

        this.state = {
            className: this.defaultClassName,
            result: "" // The answer is correct
        }
    }

    processUserAction = (value, id) => {
        const status = this.props.onChange(value, id);
        this.setState({
            className: this.defaultClassName + " " + status.name,
            result: status.label
        })
    };

    render() {
        const {question, conditions} = this.props;
        const {className, result} = this.state;
        return (
            <div className={className}>
                <div className="question-text">{question}</div>
                {
                    /**
                     * I case the object will have its own id
                     */
                    conditions.map((condition) => {
                        return (
                            <Switch
                                key={condition.id}
                                {...condition}
                                onChange={this.processUserAction}
                            />
                        )
                    })
                }
                <div className="question-result">{result}</div>
            </div>
        )
    }
}

Question.PropsTypes = {
    question: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.obj),
    onChange: PropTypes.func.isRequired
};

/**
 * This is only in demonstration purpose:
 *
 */
Question.defaultProps = {
    question: "Some question with few conditions",
    conditions: [
        {
            id: 1,
            leftLabel: "incorrect",
            rightLabel: "correct",
            defaultPosition: false
        },
        {
            id: 2,
            leftLabel: "incorrect",
            rightLabel: "correct",
            defaultPosition: false
        },
        {
            id: 3,
            leftLabel: "incorrect",
            rightLabel: "correct",
            defaultPosition: false
        }

    ],
    onChange: (value, id) => {
        // This function is only demonstration example of simple logic of component

        rules[id] = value;

        const result = Object.keys(rules).reduce((prev, current) => {
            return prev ? prev === rules[current] : false;
        }, true);
        return result ? {
                name: "success",
                label: "The answer is correct"
            } :
            {
                name: "warning",
                label: "The answer is incorrect"
            };
    }
};

export default Question;