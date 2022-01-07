import React from 'react'
import { makeStyles } from '@mui/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { RaceStatus } from '../../interfaces/RaceStatus';
import clsx from 'clsx';

const useStyles = makeStyles({
    inactive: {
      color: 'rgb(184,0,0)'
    },
    active: {
      color: '#15a752'
    },
  });

interface StatusIconProps {
    status: RaceStatus,
}

const StatusIcon = (props: StatusIconProps) => {
    const classes = useStyles();

    return <FiberManualRecordIcon className={clsx(classes.inactive, {
        [classes.active]: props.status === RaceStatus.ACTIVE
      })} />
}

export default StatusIcon;