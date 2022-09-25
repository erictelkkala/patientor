import React from "react";
import axios from "axios";
import { Box } from "@material-ui/core";
import {Patient} from "../types";
import { useStateValue} from "../state";
import { useParams } from "react-router-dom";

const patientPage = (): JSX.Element => {
    //Get the id from the url
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient>();
    const [state, dispatch] = useStateValue();
    React.useEffect(() => {
        const fetchPatient = async (id: string) => {
            if (state.patient.id !== id) {
                console.log("Fetching a new patient...");
                try {
                    const {data} = await axios.get<Patient>(
                        `http://localhost:3001/api/patients/${id}`
                    );
                    dispatch({type: "SET_SINGLE_PATIENT", payload: data});
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
        return (
            <div>
                <Box>
                    <h1>{patient.name}</h1>
                    <p>ssn: {patient.ssn}</p>
                    <p>occupation: {patient.occupation}</p>
                </Box>
            </div>
        );
    }
};

export default patientPage;