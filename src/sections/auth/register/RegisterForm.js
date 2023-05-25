import { useState, useEffect } from 'react';

// @mui
import {   Stack, TextField, Link, Paper,styled, Grid  } from '@mui/material';


import {Form, Button, Modal} from 'react-bootstrap'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { LoadingButton } from '@mui/lab';
// components
import partner from '../../../services/partner.service'
import getService from '../../../services/getEnum.service'
import Label from '../../../components/label';


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
  const [dateOfBirth, setDateBirthDate] = useState({
    year: 2000,
    month:1,
    day:1
  });
   const [company, setCompany] = useState("")
   
  
 
  
  const [partnerTypes, setPartnerTypes] = useState([]);
  const [partnerType, setPartnerType] = useState("");
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
    
    setDateBirthDate({
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
    console.log(event.target.value)    
    setPartnerType(event.target.value)
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
          alert("Success")
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
   
    const account = {
      account: {
        userName,
        password,
        name,
        gender,
        dateOfBirth,
        address
      },
      partnerType,
      company
      }
    
    if(password !== confirmPassword){
      alert("Password and ConfirmPassword are not the same");
    } else if(userName && password && name && gender && dateOfBirth &&  partnerType && provineId && districtId && wardId) {
      
      partner.register( account
        ).then(
          response=>{
            console.log(response)
            
            if(response.status === 200 && response.data.data){
              
              setShow(true);              
              
              setUserId(response.data.data.userAccount.id);
              
            }
            
          }, error =>{
            console.log(error)
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
          console.log(response.data.data.partnerTypValue)
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Label>Email</Label>
        <TextField 
        fullWidth
        name="userName" 
        
        value={userName} 
        type="text"
        required
        onChange={(event) => { handleChangeUserName(event) }}
        />
      </Grid>
 
      <Grid item xs={7}>
      <Label>FullName</Label>
        <TextField 
        name="name" 
        fullWidth
        value={name} 
        required
        onChange={(event) => { handleChangeName(event) }}
        />      
      </Grid>
      <Grid item xs={5}>
      <Label>DateOfBirth</Label>
      <TextField 
        fullWidth
        type="date"        
        required
        onChange={(event) => { handleChangeBirthDate(event) }}
        />  
      </Grid>
      <Grid item xs={4}>
      <Label>Gender</Label>
      <TextField
                  fullWidth
                  select
                  value={gender}
                  id="country"        
                  onChange= {handleChangeGender}
                >
                  {genders  && Array.isArray(genders) && genders.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
                  </TextField>       
    </Grid>
      <Grid item xs={8}>
      <Label>Provine</Label>
      <TextField
                  fullWidth
                  select
                  value={provineId}
                  id="country"       
                  onChange= {handleChangeProvineId}
                >
                  {provines  && provines.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
          </TextField>      
    </Grid>
    <Grid item xs={6}>
    <Label>District</Label>
      <TextField
                  fullWidth
                  select
                  value={districtId}
                  id="country"         
                  onChange= {handleChangeDistrictId}
                >
                  {districts  && districts.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>  
    </Grid>
    <Grid item xs={6}>
    <Label>Ward</Label>
      <TextField
                  fullWidth
                  select
                  value={wardId}
                  id="country"       
                  onChange= {handleWardId}
                >
                  {wards  && wards.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
    </Grid>
    <Grid item xs={8}>
    <Label>Street</Label>
        <TextField 
        fullWidth
        name="street" 
        value={address.street} 
        required
        onChange={(event) => { handleChangeStreet(event) }}
        />
    </Grid>
    <Grid item xs={4}>
    <Label>Partner Type</Label>
    <TextField
                  fullWidth
                  select
                  value={partnerType}
                  id="country"    
                  onChange= {handleChangeType}
                >
                  {partnerTypes && Array.isArray(partnerTypes)  && partnerTypes.map((option) => (
             <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          )
          )}
                  </TextField>
    </Grid>
    
    <Grid item xs={12}>
      <TextField
        fullWidth
          name="password"
          label="Password"
          required
          value={password}
          type="password"
          onChange={(event) => { handleChangePassword(event) }}          
        />        
    </Grid>
    <Grid item xs={12}>
      <TextField
      fullWidth
          name="ConfirmPassword"
          label="ConfirmPassword"
          required
          value={confirmPassword}
          type='password'
          onChange={(event) => { handleConfirmPassword(event) }}
          
        />
    </Grid>
    <Grid item xs={12}>
    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClickRegister}>
        Register
      </LoadingButton>
    </Grid>
    <Grid item xs={12}>
      <Link href='/login' > Login
      </Link>
    
    </Grid>
    
  </Grid>      

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
