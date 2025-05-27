import React, { createContext, useReducer } from 'react';

const initialState = { challenges: [], loading: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true };
    case 'SET_ALL':
      return { ...state, challenges: action.payload, loading: false };
    case 'JOIN':
      return {
        ...state,
        challenges: state.challenges.map(c =>
          c.id === action.payload ? { ...c, joined: true } : c
        ),
      };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const ChallengeContext = createContext();

export function ChallengeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ChallengeContext.Provider value={{ state, dispatch }}>
      {children}
    </ChallengeContext.Provider>
  );
}
