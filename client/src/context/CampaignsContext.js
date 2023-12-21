import { useReducer, createContext } from 'react';

export const CampaignsContext = createContext();

export const campaignsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CAMPAIGNS': {
      return {
        campaigns: action.payload,
      };
    }
    case 'CREATE_CAMPAIGN':
      return {
        campaigns: [action.payload, ...state.campaigns],
      };
    case 'DELETE_CAMPAIGN':
      return {
        campaigns: state.campaigns?.filter((x) => x.id !== action.payload.id),
      };
    case 'CHANGE_CAMPAIGN_STATUS':
      return {
        campaigns: state.campaigns?.map((x) =>
          x.id === action.payload.id ? { ...x, active: !x.active } : x
        ),
      };
    default:
      return state;
  }
};

export const CampaignsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(campaignsReducer, { campaigns: null });
  return (
    <CampaignsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CampaignsContext.Provider>
  );
};
