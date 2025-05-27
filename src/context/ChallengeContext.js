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
      return { ...state, challenges: action.payload, loading: false };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'JOIN':
      return {
        ...state,
        challenges: state.challenges.map(c =>
          c.id === action.payload ? { ...c, joined: true } : c
        ),
      };
    default:
      return state;
  }
}

export const ChallengeContext = createContext();

export function ChallengeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchChallenges() {
      dispatch({ type: 'LOADING' });
      try {
        // TODO: kendi endpoint'inize göre URL'i değiştirin
        const res = await axios.get('https://mocki.io/v1/bdab5757-0dc3-4bd5-a43a-04f6b85f4a26');
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    }
    fetchChallenges();
  }, []);

  return (
    <ChallengeContext.Provider value={{ state, dispatch }}>
      {children}
    </ChallengeContext.Provider>
  );
}
