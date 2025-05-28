import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const initialState = {
  challenges: [],   
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, challenges: Array.isArray(action.payload) ? action.payload : [], loading: false };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, challenges: [] };

    case 'JOIN':
      return {
        ...state,
        challenges: state.challenges.map(c =>
          c.id.toString() === action.payload.toString()
            ? {
                ...c,
                joined: true,
                participants: Array.isArray(c.participants) ? [
                  ...c.participants,
                  { avatarUrl: 'https://via.placeholder.com/40?text=You' }
                ] : []
              }
            : c
        ),
      };

    default:
      return state;
  }
}

export const ChallengeContext = createContext();

export function ChallengeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchChallenges = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const res = await axios.get('https://mocki.io/v1/f276565b-138d-404a-ab38-04a877554f3f');
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  return (
    <ChallengeContext.Provider value={{ state, dispatch, fetchChallenges }}>
      {children}
    </ChallengeContext.Provider>
  );
}
