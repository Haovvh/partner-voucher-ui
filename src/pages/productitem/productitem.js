import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,  
  TableRow,  
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  TextField,
  MenuItem,

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



   
import productcategoryService from '../../services/productcategory.service';
import productitemService from '../../services/productitem.service';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock



// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },  
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'imageUrl', label: 'Image', alignRight: false },  
  { id: 'productCategory', label: 'ProductCategory', alignRight: false },  
  { id: 'isEnable', label: 'Enable', alignRight: false },
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
  
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  } 
  return stabilizedThis.map((el) => el[0]);
}

export default function ProductItem() {  
  const [success, setSuccess] = useState(false)
  
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [productItems, setProductItems] = useState([])

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [productCategoryId, setProductCategoryId] = useState("");

  const [productCategories, setProductCategories] = useState("");

  const [productItemId, setProductItemId]  = useState("");
  
  const [imageUrl, setImageUrl] = useState("/Image/ProductItem");

  const handleChangeName = (event) => {
    setName(event.target.value) 
  }

  const handleChangePrice = (event) => {
    setPrice(event.target.value) 
  }

  const handleChangeProductCategory = (event) => {
    setProductCategoryId(event.target.value)
  }
  const handleChangeImageURL = (event) => {
    setImageUrl(event.target.value)
  }

  const handlechangeDescription = (event) => {
    setDescription(event.target.value) 
  }
 
  const handleClose = () => {
    setOpen(false)    
  }
  const handleClickEdit = (id) => {
    
    productitemService.GetProductItemById(id).then(
      response => {
        if (response.data && response.data.success) {
          const temp = response.data.data.productItem
          setOpen(true)  
          console.log(temp)
          setProductItemId(temp.id)
          setName(temp.name);
          setDescription(temp.description);
          setPrice(temp.price)
          setProductCategoryId(temp.productCategory.id)
          setImageUrl(temp.imageUrl)
        }
        
      }, error => {
        console.log(error)
      }
    )
  };
  const handleClickDelete = (id) => {
    if(window.confirm("Are you want delete")) {
      productitemService.DeleteProductItemById(id).then(
        response => { 
          if (response.data && response.data.success) {
            alert("Delete Success")
            setSuccess(!success);
          }
          
        }, error => {
          console.log(error)
        }
      )
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
    clearInput();
    
  }
  const clearInput = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setProductCategoryId(0)
    setImageUrl("/Image/ProductItem")
    setProductCategoryId("");
    setProductItemId("");
  }
  const handleClickSubmit = () => {
    if(productItemId === "") {
      productitemService.PostProductItem(name, description,productCategoryId, price).then(
        response => {
          if(response.data && response.data.success) {
            setSuccess(true);          
            clearInput();
            setOpen(false);    
          }          
        }, error => {
          alert("Vui lòng kiểm tra dữ liệu")
          console.log("Error Submit",error)
        }
      )
    } else {
      productitemService.PutProductItemById(name, description, productCategoryId, price, imageUrl,  productItemId).then(
        response => {
          if(response.data && response.data.success) {
            alert("Update Success")
            setSuccess(true);          
            clearInput();
            setOpen(false);    
          }
          
        }, error => {
          alert("Vui lòng kiểm tra dữ liệu")
          console.log("Error Submit",error)
        }
      )
    }
    
    
  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productItems.length) : 0;

  const filteredDatas = applySortFilter(productItems, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredDatas.length && !!filterName;
  useEffect(() =>{
    productcategoryService.ProductCategoryAvalible().then(
      response => {
        if(response.data && response.data.success) {
          setProductCategories(response.data.data.productCategories)
        }
        
      }, error => {
        console.log(error)
      }
    )
    productitemService.ProductItemAvailableByStoreId().then(
      response =>{
        if(response.data  && response.data.success) {
          setSuccess(false)
          setProductItems(response.data.data.productItems)
        }
      }, error => {
        console.log(error)
      }
    )
    
  },[success])

  return (
    <>
      <Helmet>
        <title> ProductItem  </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          ProductItem
          </Typography>
          <Button onClick={handleClickNew} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New ProductItem
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
                  rowCount={productItems.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredDatas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, description, price, imageUrl, productCategory, isEnable } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        

                        <TableCell align="left">{name}</TableCell>

                        <TableCell align="left">{description}</TableCell>

                        <TableCell align="left">{price}</TableCell>

                        <TableCell align="left">{imageUrl}</TableCell>

                        <TableCell align="left">{productCategory.name}</TableCell>

                        <TableCell align="left">
                          {isEnable ? <Label color="success">{sentenceCase('Yes')}</Label>: 
                          <Label color="warning">{sentenceCase('No')}</Label>}
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
            count={productItems.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New ProductItem</DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
          <Grid xs={12}>
          <TextField 
            name="name" 
            label="Name" 
            fullWidth
            value={name} 
            required
            onChange={(event) => { handleChangeName(event) }}
            />
          </Grid>
          <Grid xs={12}>
          <TextField 
            name="description" 
            label="Description" 
            value={description} 
            fullWidth
            required
            onChange={(event) => { handlechangeDescription(event) }}
            />             
          </Grid>
          <Grid xs={12}>
            <TextField 
              name="price" 
              label="Price" 
              type="number"
              value={price} 
              fullWidth
              required
              onChange={(event) => { handleChangePrice(event) }}
              />
          </Grid>
          <Grid xs={12}>
          <TextField
                  label="ProductCategory"
                  fullWidth
                  select
                  variant="outlined"
                  value={productCategoryId}
                  id="country"      
                  onChange= {handleChangeProductCategory}
                >
                  {productCategories  && productCategories.map((option) => (
             <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
          )}
            </TextField>
          </Grid>
          <Grid xs={12}>
            <TextField 
              name="Image" 
              label="Image" 
              value={imageUrl} 
              fullWidth
              required
              onChange={(event) => { handleChangeImageURL(event) }}
              />
          </Grid>
        </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCancel}>Cancel</Button>
          <Button onClick={handleClickSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      
    </>
  );
}
