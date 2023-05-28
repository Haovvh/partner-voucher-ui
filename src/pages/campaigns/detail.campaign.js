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

import Grid from '@mui/material/Unstable_Grid2';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';



import getService from '../../services/getEnum.service'
import voucherService from '../../services/voucher.service';   
import gameService from '../../services/game.service';

// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
import CampaignService from '../../services/campaign.service';
// mock
import { checkWinRate } from '../../utils/check';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },  
  { id: 'quantity', label: 'Quantity', alignRight: false },  
  { id: 'expiresOn', label: 'ExpiresOn', alignRight: false },  
  { id: '' },
];


// ----------------------------------------------------------------------





export default function CampaignDetail(props) {  
  
  const [success, setSuccess] = useState(false);

  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [vouchers, setVouchers] = useState([])

  const [descriptionVoucher, setDescriptionVoucher] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [voucherId, setVoucherId] = useState("");

  const [games, setGames] = useState([]);

  const [winRate, setWinRate] = useState("");

  const [startDateText, setStartDateText] = useState("");

  const [endDateText, setEndDateText] = useState("");

  const [expiresOnText, setExpiresOnText] = useState("");

  const [gameId, setGameId] = useState("");

  const [nameVoucher, setNameVoucher] = useState("");

  const [quantityText, setQuantityText] = useState(0)

  const [tempVoucher, setTempVoucher] = useState([]);
  const isEnable = true;

  const handleChangeName = (event) => {
    setName(event.target.value) 
  }
  const handleChangeWinRate = (event) => {
    setWinRate(event.target.value) 
  }

  const handleChangeQuantity = (event) => {
    setQuantityText(event.target.value) 
  }

  const handlechangeStartDate = (event) => {

    setStartDateText(event.target.value) 
  }

  const handlechangeExpiresOn = (event) => {
    setExpiresOnText(event.target.value) 
  }

  const handlechangeEndDate = (event) => {
    setEndDateText(event.target.value) 
  }

  const handleChangeGame = (event) => {
    setGameId(event.target.value) 
  }

  const handlechangeDescription = (event) => {
    setDescription(event.target.value) 
  }
  
  const handleClose = () => {
    setOpen(false)    
  }
  const handleClickEdit = (id) => {
    
    voucherService.GetVoucherById(id).then(
      response => { 
        
        if (response.data && response.data.success) {
          const temp = response.data.data.voucherSeries
          setOpen(true)
          setVoucherId(temp.id);
          setName(temp.name);
          setDescription(temp.description)
                    
        }
        
      }, error => {
        console.log(error)
        setSuccess(!success)
      }
    )
    
  };
  const handleClickDelete = (id) => {
    if(window.confirm(`Are you want delete `)) {
      const temp = tempVoucher.filter((e) => e.voucherSeriesId !== id)
      setTempVoucher(temp) 
    }
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

 const handleChangeVoucher = (event) => {
    setVoucherId(event.target.value)
    const temp = vouchers.filter(e=> e.id === event.target.value)
    
    setDescriptionVoucher(temp[0].description)
    setNameVoucher(temp[0].name)
    
 }

  const handleClickNew = () => {
    setOpen(true);
    
  }
  const handleClickCancel = () => {
    setOpen(false);
    
  }
  const clearScreen = () =>{
    setVoucherId("");
    setDescriptionVoucher("");
    setQuantityText("");
    setExpiresOnText("");
    setNameVoucher("");
  }
  const handleClickSaveCampaign = () => {
    if(name && description && startDateText && endDateText && gameId && tempVoucher.length >= 1 && winRate) {
        if(startDateText < endDateText) {
            const tempStartDate = startDateText.split("-");
            const tempEndDate = endDateText.split("-");
            const startDate = {
                year: tempStartDate[0],
                month: tempStartDate[1],
                day: tempStartDate[2]
            }
            const endDate = {
                year: tempEndDate[0],
                month: tempEndDate[1],
                day: tempEndDate[2]
            }
            const campaignInfo = {
                name,
                description,
                startDate,
                endDate,
                gameId,
                isEnable,
                winRate
            }
            const campaignVoucherSeriesList = tempVoucher
            CampaignService.PostCampaign(campaignInfo, campaignVoucherSeriesList).then(
                response => {
                    if(response.data && response.data.success) {
                        alert("Create Sucess")
                        window.location.assign('/campaign')
                    }
                }, error => {
                    alert("Dữ liệu không hợp lệ")
                }
            )
        } else {
            alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc")
        }
        
    } else {
        alert("Vui lòng nhập đủ thông tin")
    }
    
  }

  const handleClickSubmit = () => {
    if(voucherId && descriptionVoucher && expiresOnText && quantityText > 0) {
        
        const checkVoucherId = tempVoucher.filter(option => option.voucherSeriesId === voucherId).length
        if(checkVoucherId === 0) {
            const tempExpiresOn = expiresOnText.split("-");
            setTempVoucher([...tempVoucher, {
                voucherSeriesId: voucherId,
                name: nameVoucher,
                description: descriptionVoucher,
                quantity: parseInt(quantityText,10),
                expiresOn: {
                    year: tempExpiresOn[0],
                    month: tempExpiresOn[1],
                    day: tempExpiresOn[2]
                },
                
            }])
            setOpen(false)
            clearScreen();
        } else {
            alert("Voucher đã tồn tại")
        }
        

    }   else {
        alert("Vui lòng nhập đầy đủ thông tin");
    } 
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tempVoucher.length) : 0;
 
  useEffect(() =>{
    if(props.load === true) {
        voucherService.VoucherAllByStore().then(
            response =>{
              if(response.data  && response.data.success) {
                console.log("voucherSeriesList =>",response.data.data.voucherSeriesList)
      
                setVouchers(response.data.data.voucherSeriesList)
                setSuccess(false)
              }
            }, error => {
              console.log("Error voucherSeriesList ==>",error)
            }
        )
        gameService.GameAll().then(
            response => {
                if(response.data && response.data.success ) {
                    const temp = response.data.data.games;
                    
                    setGames( temp)
                }
                
            }
        )
    }
    
    
  },[])

  return (
    <>
      <Helmet>
        <title> CampaignDetail  </title>
      </Helmet>

      <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Campaign
          </Typography>
          <Button onClick={handleClickSaveCampaign} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Save Campaign
          </Button>
        </Stack>      
        <Grid container spacing={2}>
            <Grid xs={6}>
                <Label>Name </Label>
                <TextField 
                name="name" 
                fullWidth
                value={name} 
                required
                onChange={(event) => { handleChangeName(event) }}
                />
            </Grid>
            
            <Grid xs={3}>
                <Label>StartDate </Label>
                <TextField 
                name="start" 
                type="date"
                value={startDateText} 
                fullWidth
                required
                onChange={(event) => { handlechangeStartDate(event) }}
                />
            </Grid>
            <Grid xs={3}>
                <Label>EndDate </Label>
                <TextField 
                name="end" 
                type="date"
                value={endDateText} 
                fullWidth
                required
                onChange={(event) => { handlechangeEndDate(event) }}
                />
            </Grid>
            <Grid xs={12}>
                <Label>Description </Label>
                <TextField 
                name="description" 
                multiline
                rows={2}
                value={description} 
                fullWidth
                required
                onChange={(event) => { handlechangeDescription(event) }}
                />
            </Grid>
            <Grid xs={4}>
            <Label>Game </Label>
            <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={gameId}
                  id="country"      
                  onChange= {handleChangeGame}
                >
                  {games  && games.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
            </Grid>
            <Grid xs={4}>
                <Label>WinRate </Label>
                <TextField 
                name="WinRate" 
                type="number"
                
                value={winRate} 
                fullWidth
                required
                onChange={(event) => { handleChangeWinRate(event) }}
                />
            </Grid>
        </Grid>
        <br/>
        <Grid>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Vouchers
          </Typography>
          <Button onClick={handleClickNew} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Voucher
          </Button>
        </Stack>

        <Card>          

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tempVoucher.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}                  
                />
                <TableBody>
                  {tempVoucher.map((row) => {
                    const { voucherSeriesId, name, description, quantity, expiresOn } = row;
                    

                    return (
                      <TableRow hover key={voucherSeriesId} tabIndex={-1} role="checkbox" >
                        
                        
                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{description}</TableCell> 

                        <TableCell align="left">{quantity}</TableCell>  
                        
                        <TableCell align="left">{expiresOn.year}-{expiresOn.month}-{expiresOn.day} </TableCell>  


                        <TableCell align="right">                        
                        <IconButton size="large" color="inherit" onClick={()=>handleClickEdit(voucherSeriesId)}>
                          <Iconify icon={'eva:edit-fill'}  sx={{ mr: 2 }} />                          
                          </IconButton>
                          <IconButton size="large" color="inherit" onClick={()=>handleClickDelete(voucherSeriesId)}>
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

              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tempVoucher.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        </Grid>
        

      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Voucher</DialogTitle>
        <DialogContent>
        <br/>
        <Grid container spacing={2}>
          <Grid xs={12}>
          <Label>Voucher</Label>
          <TextField
                  fullWidth
                  select
                  variant="outlined"
                  value={voucherId}
                  id="country"      
                  onChange= {handleChangeVoucher}
                >
                  {vouchers  && vouchers.map((option) => (
             <MenuItem key={option.id} name={option.name} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
          
          </Grid>
          <Grid xs={12}>
          <Label>Description</Label>
          <TextField 
            name="descriptionVoucher"  
            value={descriptionVoucher} 
            fullWidth
            disabled            
            />
          </Grid>
          <Grid xs={12}>
          <Label>ExpiresOn</Label>
                <TextField 
                name="start" 
                type="date"
                value={expiresOnText} 
                fullWidth
                required
                onChange={(event) => { handlechangeExpiresOn(event) }}
                />
            </Grid>
          <Grid xs={12}>
          <Label>Quantity</Label>
          <TextField 
            name="quantity" 
            type="number"
            value={quantityText} 
            fullWidth
            required
            onChange= {handleChangeQuantity}            
            />
          </Grid>
          
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      
      
    </>
  );
}
