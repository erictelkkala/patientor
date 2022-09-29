import { State } from "./state";
import {Patient, Diagnosis, Entry} from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_SINGLE_PATIENT";
      payload: Patient;
    }
  |  {
      type: "SET_DIAGNOSIS_LIST";
        payload: Diagnosis[];
    }
  |  {
        type: "ADD_ENTRY";
        payload: Entry, patientID: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "SET_SINGLE_PATIENT":
        return {
            ...state,
            patient: action.payload
        };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnoses: {
                    ...action.payload.reduce(
                        (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
                        {}
                    ),
                    ...state.diagnoses
                }
            };
        case "ADD_ENTRY":
            return {
                ...state,
                patient: {
                    ...state.patient,
                    entries: [...state.patient.entries, action.payload]
                }
            };
    default:
      return state;
  }
};
