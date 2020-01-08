import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import MaterialTable from 'material-table';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function TagList(props) {
    const classes = useStyles();

    const removeFromBatonList = (data) => {
        data.map(k => {
            k.batonList = false;
            axios.put('/api/batonlist', k)
            .then((res) => {
                console.log('updating baton list', res);
            }, (error) => {
                console.error('error!', error);
            })
        })
        props.reload();
    }
    const updateBatonList = (data) => {
        data.map(k => {
            k.batonList = true;
            axios.put('/api/batonlist', k)
            .then((res) => {
                console.log('updating baton list', res);
            }, (error) => {
                console.error('error!', error);
            })
        })
        props.reload();
    }
    const removeFromPickList = (data) => {
        data.map(k => {
            k.pickList = false;
            axios.put('/api/picklist', k)
            .then((res) => {
                console.log('updating pick list', res);
            }, (error) => {
                console.error('error!', error);
            })
        })
        props.reload();
    }

    const updatePickList = (data) => {
        data.map(k => {
            k.pickList = true;
            axios.put('/api/picklist', k)
            .then((res) => {
                console.log('updating pick list', res);
            }, (error) => {
                console.error('error!', error);
            })
        })
        props.reload();
    }
    const columns = [
        {
            title: "Product",
            field: "product",
        },
        {
            title: "Product ID",
            field: "upc",
        },
        {
            title: "EPC",
            field: "epc",
        },
        {
            title: "Inlay",
            field: "inlay",
        },
        {
            title: "Pick List",
            field: "pickList",
            render: rowData => {
                if (rowData.pickList) {
                    return (
                        <CheckCircleOutlineIcon style={{fill: 'green'}}/>
                    )
                }
                return (
                    <span/>
                )
            }
        },
        {
            title: "Baton List",
            field: "batonList",
            render: rowData => {
                if (rowData.batonList) {
                    return (
                        <CheckCircleOutlineIcon style={{fill: 'green'}}/>
                    )
                }
                return (
                    <span/>
                )
            }
        }
    ]
    const options = {
        pageSize: 50,
        pageSizeOptions: [10, 25, 50, 100, 200, 500],
        selection: true,
        filtering: true,
    }
    const rows = props.tags;
      return (
        <MaterialTable
          title="Pick List Selection"
          columns={columns}
          data={rows}
          options={options}
          actions={[
            {
                tooltip: 'Add To Baton List',
                icon: 'add',
                onClick: (evt, data) => updateBatonList(data)
            },              
            {
              tooltip: 'Add To Pick List',
              icon: 'add',
              onClick: (evt, data) => updatePickList(data)
            },
            {
              tooltip: 'Remove From Baton List',
              icon: 'delete',
              onClick: (evt, data) => removeFromBatonList(data)
            },
            {
              tooltip: 'Remove From Pick List',
              icon: 'delete',
              onClick: (evt, data) => removeFromPickList(data)
            }
        ]}
        />
      )
  }

  