import React, {createContext, useContext, useReducer} from "react";
import {Gender, Patient} from "../types";

import {Action} from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
};

const initialState: State = {
  patients: {},
  patient: {
    id: "",
    name: "",
    dateOfBirth: "",
    ssn: "",
    occupation: "",
    gender: Gender.Other,
  }
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList
  };
};

const setSinglePatient = (patient: Patient): Action => {
    return {
        type: "SET_SINGLE_PATIENT",
        payload: patient
    };
};

const addPatient = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient
    };
};

// Export the action creators
export {setPatientList, setSinglePatient, addPatient};