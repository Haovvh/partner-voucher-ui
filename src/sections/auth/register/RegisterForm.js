import { useState, useEffect } from 'react';

// @mui
import {   Stack, TextField, Select } from '@mui/material';


import {Form, Button, Modal} from 'react-bootstrap'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { LoadingButton } from '@mui/lab';
// components
import partner from '../../../services/partner.service'
import getService from '../../../services/getEnum.service'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [show, setShow] = useState(false);
  const [otpValue, setOtpValue] = useState("");


  const [userName, setUserName] = useState("");
  
  const [address, setAddress] = useState({
    wardId:"",
    street:""
  })  
  const [name, setName] = useState("");
  const [genders, setGenders] = useState([]);
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState({
    year: 2000,
    month:1,
    day:1
  });
  
 
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [type, setType] = useState("");
  const [userId, setUserId]  = useState("");

  const [provines, setProvines] = useState([]);
  const [provineId, setProvineId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleChangeOtp = (event) => {
    setOtpValue(event.target.value) 
  }
  const handleClickClose = () => {
    setShow(false)    
  }

  const handleChangeUserName = (event) => {        
    setUserName(event.target.value)
  }
  const handleChangeName = (event) => {        
    setName(event.target.value)
  }
  
  const handleChangeBirthDate = (event) => {    
    const date = event.target.value.toString().split('-');
    
    setBirthDate({
      year: parseInt(date[0], 10),
      month: parseInt(date[1], 10),
      day: date[2]
    })
  }

  const handleClose = () => {
    setShow(false)    
  }
 
  const handleWardId = (event) => { 
         
    setWardId(event.target.value)
    setAddress(prevState => ({ ...prevState,
      wardId:event.target.value}))
  }
  const handleChangeStreet = (event) => {        
    
    setAddress(prevState => ({ ...prevState,
      street:event.target.value}))
  }
  const handleChangeType = (event) => {        
    setType(event.target.value)
  }
  const handleChangePassword = (event) => {        
    setPassword(event.target.value)
  }
  const handleConfirmPassword = (event) => {        
    setConfirmPassword(event.target.value)
  }
  
  const handleChangeProvineId = (event) => { 
     
    getService.getAddressDistrictProvineId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {
          setDistricts(response.data.data.districts);
        } 
      }
    )
    setProvineId(event.target.value)
  }

  const handleChangeDistrictId = (event) => {  
    getService.getAddressWardDistrictId(event.target.value).then(
      response =>{
        if(response.status === 200 && response.data.data) {
          
          setWards(response.data.data.wards);
        }        
      }
    )
    setDistrictId(event.target.value)
  }
  
  const handleChangeGender = (event) => {        
    setGender(event.target.value)
  }
  const handleClickSave = () =>{    
    partner.verifyRegister(otpValue,userId).then(
      response=>{
        console.log(response.status)
        console.log(response.data.data)

        if(response.status === 200 && response.data.data ){
          setShow(false);
          window.location.assign('/login');
        }
        else {
          alert("Wrong OTP");
          setOtpValue("");
        }
        
      }, error => {
        console.log(error)
      }
    )
  }

  const handleClickRegister = () => {
    console.log(userName, password, name,  gender, birthDate, address , type)
    
    if(password !== confirmPassword){
      alert("Password and ConfirmPassword are not the same");
    } else if(userName && password && name && gender && birthDate &&  type && provineId && districtId && wardId) {
        partner.register( userName, password, name,  gender, birthDate, address , type).then(
          response=>{
            console.log(response)
            
            if(response.status === 200 && response.data.data){
              
              setShow(true);
              console.log("id", response.data.data.userAccount.id)
              
              setUserId(response.data.data.userAccount.id);
              
            }
            
          }, err =>{
            console.log(err)
          }
        )
    } else{
      alert("====")
    }
    
      
  };
  useEffect (()=>{
    
     getService.getValuesGender().then(
      response =>{
        if(response.data && response.status === 200) {
          const arrayGender  = response.data.data.genderValue;        
                   
          setGenders(arrayGender)
        }
        
      }, error => {
        console.log(error)
      }
    )
    getService.getValuesPartnerType().then(
      response =>{
        if(response.status === 200 && response.data.data) {
          
          setPartnerTypes(response.data.data.partnerTypValue);
        }
        
      }
    )
    
    getService.getAddressProvines().then(
      response =>{
        if(response.data && response.status === 200){
          setProvines(response.data.data.provines);          
        }
      }
    )
    

  },[])

  return (
    <>
      <Stack spacing={3}>
        <TextField 
        name="userName" 
        label="User Name" 
        value={userName} 
        type="text"
        required
        onChange={(event) => { handleChangeUserName(event) }}
        />
        <TextField 
        name="name" 
        label="Full Name" 
        value={name} 
        required
        onChange={(event) => { handleChangeName(event) }}
        />
        <TextField 
        
        label="" 
        type="date"
        
        required
        onChange={(event) => { handleChangeBirthDate(event) }}
        />   
        <TextField
                  style={{ marginTop: 20 }}
                  label="Provine"
                  fullWidth
                  select
                  variant="outlined"
                  value={provineId}
                  id="country"                  
                  margin="dense"
                  onChange= {handleChangeProvineId}
                >
                  {provines  && provines.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
          </TextField>       

            <TextField
                  style={{ marginTop: 20 }}
                  label="District"
                  fullWidth
                  select
                  variant="outlined"
                  value={districtId}
                  id="country"                  
                  margin="dense"
                  onChange= {handleChangeDistrictId}
                >
                  {districts  && districts.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>  
                  
                  
            <TextField
                  style={{ marginTop: 20 }}
                  label="Ward"
                  fullWidth
                  select
                  variant="outlined"
                  value={wardId}
                  id="country"                  
                  margin="dense"
                  onChange= {handleWardId}
                >
                  {wards  && wards.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>                    
         
        <TextField 
        name="street" 
        label="Street" 
        value={address.street} 
        required
        onChange={(event) => { handleChangeStreet(event) }}
        />
        
        <TextField
                  style={{ marginTop: 20 }}
                  label="Gender"
                  fullWidth
                  select
                  variant="outlined"
                  value={gender}
                  id="country"                  
                  margin="dense"
                  onChange= {handleChangeGender}
                >
                  {genders  && Array.isArray(genders) && genders.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
                  </TextField>       

        <TextField
          name="password"
          label="Password"
          required
          value={password}
          type="password"
          onChange={(event) => { handleChangePassword(event) }}
          
        />
        <TextField
          name="ConfirmPassword"
          label="ConfirmPassword"
          required
          value={confirmPassword}
          type='password'
          onChange={(event) => { handleConfirmPassword(event) }}
          
        />
        <TextField
                  style={{ marginTop: 20 }}
                  label="Partner Type"
                  fullWidth
                  select
                  variant="outlined"
                  value={type}
                  id="country"                  
                  margin="dense"
                  onChange= {handleChangeType}
                >
                  {partnerTypes && Array.isArray(partnerTypes)  && partnerTypes.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
                  </TextField>
        
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickRegister}>
        Register
      </LoadingButton>
      </Stack>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please Check Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>        
        <Form.Group >
              <Form.Label>OTP </Form.Label>
              <Form.Control type="text" onChange={handleChangeOtp} value={otpValue} placeholder="OTP Input"/>           
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClickClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
      
    </>
  );
}
