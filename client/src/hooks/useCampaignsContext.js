import { useContext } from 'react';
import { CampaignsContext } from '../context/CampaignsContext';

export const useCampaignsContext = () => {
  const context = useContext(CampaignsContext);
  if (!context)
    throw new Error(
      'useCampaignsContext must be used inside CampaignsContextProvider'
    );
  return context;
};
