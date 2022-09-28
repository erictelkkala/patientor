//Add the correct icon depending on the entry type
import {Entry} from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import HealingIcon from "@mui/icons-material/Healing";

// Check for any unchecked types
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryTypeIcon = ({entry}: {entry: Entry}): JSX.Element => {
    switch (entry.type) {
        case "Hospital":
            return (
                <LocalHospitalIcon fontSize="large"></LocalHospitalIcon>
            );
        case "OccupationalHealthcare":
            return (
                <WorkIcon fontSize="large"></WorkIcon>
            );
        case "HealthCheck":
            return (
                <HealingIcon fontSize="large"></HealingIcon>
            );
        default: return assertNever(entry);
    }
};

export default EntryTypeIcon;