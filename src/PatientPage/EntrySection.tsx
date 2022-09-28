import {Diagnosis, Entry} from "../types";
import {Box} from "@material-ui/core";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {ListItemIcon, ListItemText} from "@mui/material";
import { useStateValue } from "../state";

function findDiagnosisName(code: string, diagnosisList: { [p: string]: Diagnosis }): string {
    const diagnosis = diagnosisList[code];
    return diagnosis?.name || '';
}

function EntryDetails(props: { entry: Entry }) {
    const [state,] = useStateValue();
    const diagnosisList = state.diagnoses;
    return (
            <Box>
                <List>
                    <ListItem>
                        <ListItemText primary={props.entry.date} secondary={props.entry.description}/>
                    </ListItem>
                    <List component="div" disablePadding>
                        <ListItem>
                            {props.entry.diagnosisCodes && <ListItemText primary={'Diagnosis codes:'}></ListItemText>}
                        </ListItem>
                        {/*    Create a new listItem for each diagnosisCode*/}
                        {props.entry.diagnosisCodes?.map((code) => (
                            <ListItem key={code}>
                                {/*This ListItemIcon adds some left padding to the diagnosis codes*/}
                                <ListItemIcon />
                                <ListItemText primary={code}/>
                                <ListItemText secondary={findDiagnosisName(code, diagnosisList)}/>
                            </ListItem>
                    ))}
                    </List>
                </List>
            {/*Add a divider between entries*/}
            <Divider/>
            </Box>
    );
}

const EntrySection = ({ entries }: { entries: Entry[] }) => {
    return (
        <div>
        <h3>Entries</h3>
        {/*    For each entry*/}
        {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
        ))}
        </div>
    );
};

export default EntrySection;