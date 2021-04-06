import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidates";
import { Button, ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles } from "@material-ui/core";
import DCandidatesForm from "./DCandidatesForm";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useToasts } from 'react-toast-notifications';

const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DCandidates = ({classes,...props}) => {

    const [currentId, setCurrentId] = useState(0);

    useEffect(() => {
        props.fetchAllCandidates()
    }, [])//ComponentDidMount

    const { addToast } = useToasts();

    const onDelete = id => {
        if(window.confirm('Are you sure to delete this record?')){
            props.deleteDCandidate(id, () => addToast("Deleted successfuly", {appearance: "info"}))
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidatesForm {...({ currentId, setCurrentId })}/>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <TableContainer>
                            <Table>
                                <TableHead className={classes.root}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Mobile</TableCell>
                                        <TableCell>Blood Group</TableCell>
                                        <TableCell>Options</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.dCandidateList.map((record,index) => {
                                            return (<TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup>
                                                        <Button><EditIcon color="primary"
                                                        onClick = {() => setCurrentId(record.id)}/></Button>
                                                        <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)}/></Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>)
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list
});

const mapActionToProps = {
    fetchAllCandidates: actions.fetchAll,
    deleteDCandidate:  actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));