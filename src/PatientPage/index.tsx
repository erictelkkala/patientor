import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { setSinglePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import PatientSection from "./PatientSection";
import EntrySection from "./EntrySection/EntrySection";

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
        return (
            <div>
                <PatientSection id={patient.id} name={patient.name} occupation={patient.occupation} gender={patient.gender} ssn={patient.ssn} />
                {/*Only show the entries if there are any*/}
                {patient.entries.length > 0 && <EntrySection entries={patient.entries} />}
            </div>
        );
    }
};

export default patientPage;