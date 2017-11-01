import React from "react";
import {render} from "react-dom";

import Container from "./Components/Question/Question.component";

import "../scss/main.scss";

const container = document.getElementById("app");

render(
    <Container />,
    container
);