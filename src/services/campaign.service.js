import axios from "axios";

import headerService from "./header.service";

const CampaignAllByStore = (storeId = headerService.getUserId()) => (
    axios.get(`${process.env.REACT_APP_API_URL}/Campaign/All/${storeId}`, { 
      headers: headerService.accessToken()
  })
  );

  const GetCampaignById = (CampaignId) => (
    axios.get(`${process.env.REACT_APP_API_URL}/Campaign/${CampaignId}`, { 
      headers: headerService.accessToken()
  })
  );
  
  const DeleteCampaignById = (CampaignId) => (
    axios.delete(`${process.env.REACT_APP_API_URL}/Campaign/${CampaignId}`, { 
      headers: headerService.accessToken()
  })
  );
  

  const PutCampaignById = (name, description, CampaignId ) => (
    axios.put(`${process.env.REACT_APP_API_URL}/Campaign/${CampaignId}`,{
      name, description
    }, { 
      headers: headerService.accessToken()
  })
  );

  
  const PostCampaign = (campaignInfo, campaignVoucherSeriesList ) => (
    axios.post(`${process.env.REACT_APP_API_URL}/Campaign/Create`,{
        campaignInfo,
        campaignVoucherSeriesList
    }, { 
      headers: headerService.accessToken()
  })
  );

  const CampaignService = {
    PostCampaign,
    CampaignAllByStore,   
    GetCampaignById,
    PutCampaignById,
    DeleteCampaignById
  }

  export default CampaignService