import {Entry} from "../types";
import {Box} from "@material-ui/core";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {ListItemIcon, ListItemText} from "@mui/material";

function EntryDetails(props: { entry: Entry }) {
    return (
        <div>
            <Box>
                <List>
                    <ListItem>
                        <ListItemText primary={props.entry.date} secondary={props.entry.description}/>
                    </ListItem>
                    <List dense={true} component="div" disablePadding>
                        <ListItem>
                            {props.entry.diagnosisCodes && <ListItemText primary={'Diagnosis codes:'}></ListItemText>}
                        </ListItem>
                        {/*    Create a new listItem for each diagnosisCode*/}
                        {props.entry.diagnosisCodes?.map((code) => (
                        <ListItem key={code} disablePadding>
                            {/*This ListItemIcon adds some left padding to the diagnosis codes*/}
                            <ListItemIcon />
                            <ListItemText primary={code}/>
                        </ListItem>
                    ))}
                    </List>
                </List>
            </Box>
            <Divider/>
        </div>

    );
}

const EntrySection = ({ entries }: { entries: Entry[] }) => {
    return (
        <div>
        <h3>Entries</h3>
        {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />

        ))}
        </div>
    );
};

export default EntrySection;