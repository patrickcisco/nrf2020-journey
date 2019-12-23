
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { white } from 'ansi-colors';
import { List, ListItem, ListItemText} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';




const useStyles = makeStyles( theme => ({
  table: {
    // minWidth: 650,
  },
}));



export default function PickList(props) {
    const classes = useStyles();
    const rows = props.tags;
    const isPickList = props.isPickList;
    console.log('isPickList', isPickList);
    const checkmark = (color) => {
        return (
            <CheckCircleOutlineIcon style={{fill: 'green'}}/>
        )
    }
    const cancel = (color) => {
        return (
            <CancelIcon color={color}/>
        )
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">       
            <TableHead>
            <TableRow className={classes.header}>
                { !isPickList &&
                 <TableCell size='small'></TableCell>
                }
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Product ID</TableCell>
                <TableCell align="right">USD</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row, idx) => (
                <TableRow key={idx}>
                { !isPickList &&
                    <TableCell size='small' component="th" scope="row">
                        { row.good &&
                            checkmark("primary")
                        }
                        { !row.good &&
                            cancel("secondary")
                        }
                    </TableCell>
                }
                <TableCell align="right">{row.product}</TableCell>
                <TableCell align="right">{row.upc}</TableCell>
                <TableCell align="right">${row.usd}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}