import axios from "axios";

import headerService from "./header.service";

const StoreDetail = () => (
    axios.get(`${process.env.REACT_APP_API_URL}/Partner/Store/Detail`, { 
      headers: headerService.accessToken()
  })
  );
  
  const StoreRegister = (name, description, address, openTime, closeTime, isEnable = true, bannerUrl = "/Image/StoreBanner") => (
    
    axios.post(`${process.env.REACT_APP_API_URL}/Partner/Store/Register`,{
        name, description, address, openTime, closeTime, isEnable, bannerUrl
   }, { 
    headers: headerService.accessToken() 
})
);
const StoreEnable = () => (
    axios.put(`${process.env.REACT_APP_API_URL}/Partner/Store/Enable`, { 
        headers: headerService.accessToken() 
    })
);
const StoreDisable = () => (
    axios.put(`${process.env.REACT_APP_API_URL}/Partner/Store/Disable`,{ 
        headers: headerService.accessToken() 
    })
);
 

  export default {
    StoreDetail,
    StoreRegister,
    StoreEnable,
    StoreDisable
  }