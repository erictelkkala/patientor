import {Diagnosis, Entry} from "../../types";
import {Box, Button} from "@material-ui/core";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {ListItemIcon, ListItemText} from "@mui/material";
import {addEntry, useStateValue} from "../../state";
import EntryTypeIcon from "./EntryTypeIcon";
import HealthConditionIcon from "../HealthConditionIcon";
import React from "react";
import AddEntryModal from "../../AddEntryModal";
import {EntryFormValues} from "../../AddEntryModal/AddEntryForm";
import axios from "axios";
import {apiBaseUrl} from "../../constants";

function findDiagnosisName(code: string, diagnosisList: { [p: string]: Diagnosis }): string {
    const diagnosis = diagnosisList[code];
    return diagnosis?.name || '';
}

const EntryType = ({entry}: {entry: Entry}): JSX.Element => {
    switch (entry.type) {
        case "Hospital":
            return (
                <ListItem>
                    <ListItemText inset={true} primary={"Discharged on: " + entry.discharge.date} secondary={entry.discharge.criteria}>
                    </ListItemText>
                </ListItem>
            );
        case "OccupationalHealthcare":
            return (
                <ListItem>
                    <ListItemText inset={true} primary={"Employer: " + entry.employerName}>
                    </ListItemText>
                </ListItem>
            );
        case "HealthCheck":
            return (
                <ListItem>
                    <ListItemText inset={true}>
                    {HealthConditionIcon(entry.healthCheckRating)}
                    </ListItemText>
                </ListItem>
            );
    }
};

function EntryDetails(props: { entry: Entry }) {
    const [state,] = useStateValue();
    const diagnosisList = state.diagnoses;

    return (
            <Box>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <EntryTypeIcon entry={props.entry}></EntryTypeIcon>
                        </ListItemIcon>
                        <ListItemText primary={props.entry.date} secondary={props.entry.description}/>
                    </ListItem>

                    {/*Only render the List if diagnosis codes are found*/}
                    {props.entry.diagnosisCodes &&
                        <List component="div" disablePadding>
                            <ListItem>
                                {/*Setting the property inset aligns the "diagnosis codes" nicely with the date and description horizontally*/}
                                <ListItemText inset={true} primary={'Diagnosis codes:'}></ListItemText>
                            </ListItem>
                            {/*    Create a new listItem for each diagnosisCode*/}
                                {props.entry.diagnosisCodes?.map((code) => (
                                    <ListItem dense={true} key={code}>
                                        {/*This ListItemIcon adds some left padding to the diagnosis codes*/}
                                        <ListItemIcon/>
                                        <ListItemText inset={true} secondary={code}/>
                                        <ListItemText secondary={findDiagnosisName(code, diagnosisList)}/>
                                    </ListItem>
                                ))}
                        </List>
                    }
                    <EntryType entry={props.entry}></EntryType>
                    <ListItemText primary={"Diagnosed by: " + props.entry.specialist}></ListItemText>
                </List>
            {/*Add a divider between entries*/}
            <Divider/>
            </Box>
    );
}

const EntrySection = ({ entries }: { entries: Entry[] }) => {
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const [, dispatch] = useStateValue();
    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            //Get the id of the patient from the url
            const patientID = window.location.pathname.split("/")[2];
            // Send the new entry to the backend and store the response
            const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${patientID}/entries`,
                values
            );
            // Dispatch the new entry to the state
            dispatch(addEntry(newEntry, patientID));
            //Close the modal
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };
    return (
        <div>
        <h3>Entries</h3>
        {/*    For each entry*/}
        {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
        ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default EntrySection;