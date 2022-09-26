import React from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import { Gender, Patient } from "../types";
import { setSinglePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
// Icons for the genders
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const patientPage = (): JSX.Element => {
    //Get the id from the url
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient>();
    const [state, dispatch] = useStateValue();
    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            // If the patient is already in the state, don't fetch it again
            if (state.patient.id !== id) {
                console.log("Fetching a new patient...");
                try {
                    const {data} = await axios.get<Patient>(
                        `http://localhost:3001/api/patients/${id}`
                    );
                    dispatch(setSinglePatient(data));
                    setPatient(data);
                } catch (e) {
                    console.error(e);
                }
            } else {
                setPatient(state.patient);
            }
        };
        void fetchPatient(id as string);
    }, [dispatch, id]);

    if (!patient) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else {
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

    }
};

export default patientPage;