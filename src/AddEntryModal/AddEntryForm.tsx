import React from "react";
import {Grid, Button, InputLabel, MenuItem, Select} from "@material-ui/core";
import {Field, Formik, Form, FieldProps} from "formik";

import {TextField} from "../AddPatientModal/FormField";
import {Entry, HospitalEntry} from "../types";
import {DiagnosisSelection} from "../AddPatientModal/FormField";
import {useStateValue} from "../state";

/*
 * use type Entry, but omit id
 * If this type is set to Entry, it will not initialize the fields correctly
 */
export type EntryFormValues = Omit<HospitalEntry, "id">;

// structure of a single option
export type TypeOption = {
    value: Entry["type"];
    label: string;
};

const typeOptions: TypeOption[] = [
    {value: "Hospital", label: "Hospital"},
    // {value: "OccupationalHealthcare", label: "Occupational Healthcare"},
    // {value: "HealthCheck", label: "Health Check"}
];

type SelectFieldProps = {
    name: string;
    label: string;
    options: TypeOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

const SelectField = ({ name, label, options }: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);


interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    const initialValues: Omit<HospitalEntry, 'id'> = {
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
            date: "",
            criteria: ""
        }
    };
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        {/*Type options*/}
                        <SelectField
                            label="Type"
                            name="type"
                            options={typeOptions}
                        />
                        <Field
                            label="Discharge Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge Criteria"
                            placeholder="Criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    color={"primary"}
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
