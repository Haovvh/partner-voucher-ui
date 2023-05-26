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
  

  

  const CampaignEnableByCampaignId = (campaignId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/Campaign/Enable/${campaignId}`, {
  
    },{ 
      headers: headerService.accessToken()
  })
  );
  
  const CampaignDisableByCampaignId = (campaignId) => (
    axios.put(`${process.env.REACT_APP_API_URL}/Campaign/Disable/${campaignId}`, {
  
    },{ 
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

  const PutCampaignInfoByCampaignId = (campaignId, name,  description,  startDate,  endDate,  gameId,   winRate,   isEnable = true) => (
    axios.put(`${process.env.REACT_APP_API_URL}/Campaign/Info/${campaignId}`,{
      name,
      description,
      startDate,
      endDate,
      gameId,
      winRate,
      isEnable
  }, { 
    headers: headerService.accessToken()
})
  )

  const PostVoucherCampaign = (campaignId, voucherSeriesId, quantity, expiresOn) =>(
    axios.post(`${process.env.REACT_APP_API_URL}/Campaign/Voucher/${campaignId}`,{
      voucherSeriesId, quantity, expiresOn
  }, { 
    headers: headerService.accessToken()
  })
)

const PutVoucherCampaign = (campaignId, voucherSeriesId, quantity, expiresOn) =>(
  axios.put(`${process.env.REACT_APP_API_URL}/Campaign/Voucher/${campaignId}`,{
    voucherSeriesId, quantity, expiresOn
}, { 
  headers: headerService.accessToken()
})
)
const DeleteVoucherCampaign = (campaignId, voucherSeriesId) =>(
  axios.delete(`${process.env.REACT_APP_API_URL}/Campaign/Voucher/${campaignId}/${voucherSeriesId}`, { 
  headers: headerService.accessToken()
  })
)
const DeleteVoucherCampaign01 = (campaignId, voucherSeriesId) =>(
  axios.delete(`${process.env.REACT_APP_API_URL}/Campaign/Voucher/${campaignId}`, { 
  headers: headerService.accessToken()
  }, {
    voucherSeriesId
  })
)



  const CampaignService = {
    DeleteVoucherCampaign01,
    PostCampaign,
    CampaignAllByStore,   
    GetCampaignById,
    PostVoucherCampaign,
    PutVoucherCampaign,
    DeleteVoucherCampaign,
    DeleteCampaignById,
    CampaignEnableByCampaignId,
    CampaignDisableByCampaignId,
    PutCampaignInfoByCampaignId
  }

  export default CampaignService