import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { HOME_PATH } from '../../global/consts';

const useStyles = makeStyles({
  container: {
    marginBottom: 30,
  },
  currentBet: {
      color: '#1976d2',
      fontSize: '14px !important'
  },
  breadcrumb: {
    fontSize: '14px !important'
  }
});

interface BreadcrumbProps {
    label: string,
}

const Breadcrumb = (props: BreadcrumbProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Breadcrumbs className={classes.breadcrumb}>
                <Link to={HOME_PATH}>
                    Home
                </Link>
                <Typography className={classes.currentBet}>{props.label}</Typography>
            </Breadcrumbs>
        </div>
    );
}

export default Breadcrumb;
