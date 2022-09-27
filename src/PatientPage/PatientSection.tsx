import {Gender, Patient} from "../types";
import {Box} from "@material-ui/core";
// Icons for the genders
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import React from "react";

const PatientSection = (patient: Omit<Patient, 'entries'>): JSX.Element => {
    switch (patient.gender) {
        case Gender.Male:
            return (
                <div>
                    <Box>
                        <h1>{patient.name} <MaleIcon></MaleIcon></h1>
                        <p>SSN: {patient.ssn}</p>
                        <p>Occupation: {patient.occupation}</p>
                    </Box>
                </div>
            );
        case Gender.Female:
            return (
                <div>
                    <Box>
                        <h1>{patient.name}<FemaleIcon></FemaleIcon></h1>
                        <p>SSN: {patient.ssn}</p>
                        <p>Occupation: {patient.occupation}</p>
                    </Box>
                </div>
            );
        case Gender.Other:
            return (
                <div>
                    <Box>
                        <h1>{patient.name}</h1>
                        <p>SSN: {patient.ssn}</p>
                        <p>Occupation: {patient.occupation}</p>
                    </Box>
                </div>
            );
        default:
            return (
                <div>
                    <Box>
                        <h1>{patient.name}</h1>
                        <p>SSN: {patient.ssn}</p>
                        <p>Occupation: {patient.occupation}</p>
                    </Box>
                </div>
            );
    }
};

export default PatientSection;