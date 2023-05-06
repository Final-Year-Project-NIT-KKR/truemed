import * as React from 'react';
import  { useRef } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { getMyShipments } from '../data_providers/shipment_data_provider';
import DownloadIcon from '@mui/icons-material/Download';
import QRCode from 'react-qr-code';
import { toPng } from 'html-to-image';
import download  from 'downloadjs'
import StatusDialog from './StatusDialog';
function createData(chainId,shipmentId,recieverId,medicineId, Status, verificationStatus) {
  return {
    chainId,
    shipmentId,
    recieverId,
    medicineId,
    Status,
    verificationStatus
  };
}


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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'chainId',
    numeric: true,
    disablePadding: true,
    label: 'Chain ID',
    },
  {
    id: 'shipmentId',
    numeric: true,
    disablePadding: true,
    label: 'Shipment ID',
  },
  {
    id: 'recieverId',
    numeric: true,
    disablePadding: false,
    label: 'Receiver ID',
  },
  {
    id: 'medicineId',
    numeric: true,
    disablePadding: false,
    label: 'Medicine Id',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'verificationStatus',
    numeric: false,
    disablePadding: false,
    label: 'Verified',
  },
  {
    id: 'qrCode',
    numeric: false,
    disablePadding: false,
    label: 'QR Code',
  },
];

function MedicineTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={'left'}
            padding={headCell.disablePadding ? 'normal' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
          
        ))}
        
      </TableRow>
    </TableHead>
  );
}

MedicineTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function MedicineTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          My Shipments
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
      <Tooltip title="Change Status">
          <StatusDialog />
        </Tooltip>
    </Toolbar>
  );
}

MedicineTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function MyShipment() {
  React.useEffect(()=> {async function getData(){
    await getMyShipments()
  }
   getData();
}, [])
  const [rows, setRows] = React.useState([])

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.medicineid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  // const qrCodeRef = useRef(null);

  const handleDownloadClick = async(chain,ship)=>{
    console.log(chain,ship)
    const qrCodeNode = document.getElementById(`${chain}+${ship}`)
    toPng(qrCodeNode)
    .then(function (dataUrl) {
      download(dataUrl, 'qrcode.png');
      
    })
    .catch(function (error) {
          console.error('Error:', error);
        });
    

  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    var shipments;
  React.useEffect(()=>{ 
    async function loadData()
    {
    shipments = await getMyShipments()
    var newRows = []
    for(let i=0;i<shipments.length;i++){
      newRows.push(createData(shipments[i]['chainId'],shipments[i]['shipmentId'], shipments[i]['recieverId'], shipments[i]['medicineId'], shipments[i]['deliveryStatus'], shipments[i]['transactionStatus']))
    }
    console.log(newRows)
    setRows(newRows);
    } loadData() }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <MedicineTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <MedicineTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log(row);
                //   const isItemSelected = isSelected(row.medicineid);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      key={`${row.shipmentId}+${row.chainId}`}
                    //   selected={isItemSelected}
                    >
                     <TableCell component="th"
                        id={labelId}
                        scope="row"
                        padding="normal">{row.chainId}</TableCell>

                      <TableCell
                        align='left'
                      >
                        {row.shipmentId}
                      </TableCell>
                      <TableCell align="left">{row.recieverId}</TableCell>
                      <TableCell align="left">{row.medicineId}</TableCell>
                      <TableCell align="left">{row.Status}</TableCell>
                      <TableCell align="left">{""+row.verificationStatus}</TableCell>
                      <TableCell align="center">
                      <div style={{ position: 'absolute', left: '-9999px' }}>
                      <QRCode
                        id={`${row.chainId}+${row.shipmentId}`}
                        value={`${row.chainId}+${row.shipmentId}`}
                        size={250}
                        level={'H'}
                       
                    />
                      </div>
                      
                      <IconButton color="primary" aria-label="download QR" component="label" onClick={()=>handleDownloadClick(row.chainId,row.shipmentId)}>
                      
                    <DownloadIcon />
                    </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    
    </Box>
  );
}