import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Box,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,  
  TableRow,  
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Modal 
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import display from '../../utils/alert';


import getService from '../../services/getEnum.service'
   
import partnerService from '../../services/partner.service';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';
import searchPartner from '../../utils/searchPartner';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if(query.toLowerCase().indexOf(searchPartner[0]) || query.toLowerCase().indexOf(searchPartner[1]) ||query.toLowerCase().indexOf(searchPartner[2])){
    return filter(array, (_user) => _user.status.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }  
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map((el) => el[0]);
}

export default function Store() {  

  const [openTime, setOpenTime] = useState({
    hours: 0,
    minute: 1
  })
  const [closeTime, setCloseTime] = useState({
    hours: 0,
    minute: 1
  })
  const [openTimeText, setOpenTimeText] = useState("")
  const [closeTimeText, setCloseTimeText] = useState("")
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const isEnable = true;
  const [order, setOrder] = useState('asc');
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [address, setAddress] = useState({
    wardId:"",
    street:""
  })
  const [provines, setProvines] = useState([]);
  const [provineId, setProvineId] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeName = (event) => {
    setName(event.target.value) 
  }

  const handlechangeDescription = (event) => {
    setDescription(event.target.value) 
  }
  const handleClickClose = () => {
    setOpen(false)    
  }
  const handleClose = () => {
    setOpen(false)    
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
  const handleClickSave = () =>{ 
    alert("ok")
   }


  const handleClickEdit = (id, name) => {
    alert(`edit ${id}  ${name}`)
  };
  const handleClickDelete = (id) => {
    alert(`delete ${id}`)
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
    setSelected([]);
  };

  const handleClickNew = () => {
    setOpen(true);
    
  }
  const handleClickCancel = () => {
    setOpen(false);
    
  }
  const handleClickSubmit = () => {
    console.log(name, description, address, openTime, closeTime);
    if(name && description && provineId && districtId && wardId && address && openTimeText && closeTimeText) {
      partnerService.StoreRegister(name,description,address,openTime,closeTime).then(
        response => {
          if(response.data && response.status === 200 && response.data.success) {
            alert(display.SUCCESS_STORE)
            console.log(response)
          }
          
        }
      )
    } else {
      alert("Please Write All Input")
    }
    setOpen(false);    
  }
  const handleChangeOpenTime = (event) => {
    
    const timeText = event.target.value.split(':')
    
    setOpenTimeText(event.target.value)
    setOpenTime(prevState => ({ ...prevState,
      hours: parseInt(timeText[0], 10),
      minute: parseInt(timeText[1], 10)
    }))
    
  }
  const handleChangeCloseTime = (event) => {

    const timeText = event.target.value.split(':')
    alert(`${timeText[0]} ==> ${timeText[1]}`)
    setCloseTimeText(event.target.value)
    setCloseTime(prevState => ({ ...prevState,
      hours:parseInt(timeText[0],10),
      minute:parseInt(timeText[1], 10)
    }))
  }

  

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;
  useEffect(() =>{
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
      <Helmet>
        <title> Store  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Store
          </Typography>
          <Button onClick={handleClickNew} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Store
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}  />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                         <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{company}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">                        
                          <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(id, name)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(id)}>
                          <Iconify  icon={'eva:trash-2-outline'} color="red" sx={{ mr: 2 }} />                        
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Store</DialogTitle>
        <DialogContent>
          
        <TextField 
        name="name" 
        label="Store Name" 
        fullWidth
        value={name} 
        required
        onChange={(event) => { handleChangeName(event) }}
        />

          
        <TextField 
        name="description" 
        label="Description" 
        value={description} 
        fullWidth
        required
        onChange={(event) => { handlechangeDescription(event) }}
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
                  select
                  fullWidth
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
          fullWidth
          value={address.street} 
          required
          onChange={(event) => { handleChangeStreet(event) }}
          />
        
        <TextField 
        name="openTime" 
        label="OpenTime" 
        type="time"
        fullWidth
        value={openTimeText} 
        required
        onChange={(event) => { handleChangeOpenTime(event) }}
        />
        <TextField 
        name="closeTime" 
        label="CloseTime" 
        type="time"
        fullWidth
        value={closeTimeText} 
        required
        onChange={(event) => { handleChangeCloseTime(event) }}
        />
        
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      
    </>
  );
}
