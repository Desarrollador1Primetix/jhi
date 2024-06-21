import {CalendarMonth, Delete, Search} from '@mui/icons-material';
import {Button, Grid, IconButton, Popover, Stack} from '@mui/material';
import {DateValidationError, PickerChangeHandlerContext} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {Dayjs} from 'dayjs';
import * as React from 'react';

interface CalendarProps {
  onSearch: (startDate: string, endDate: string) => void;
  onResetEvents: () => void;
}
export default function Calendar({onSearch, onResetEvents}: CalendarProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndtDate] = React.useState<Dayjs | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onPressCalendar();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onPressCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onPressSearch = () => {
    onSearch(startDate?.format('YYYY-MM-DD') ?? '', endDate?.format('YYYY-MM-DD') ?? '');
  };

  const onChangeStartDate = (
    value: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    setStartDate(value);
  };

  const onChangeEndDate = (
    value: Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    setEndtDate(value);
  };

  const onCleanDates = () => {
    setStartDate(null);
    setEndtDate(null);
    onResetEvents();
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <IconButton color='info' onClick={handleClick}>
        <CalendarMonth />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Grid container gap={1} sx={{padding: 2, flexDirection: 'column'}}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker value={startDate} onChange={onChangeStartDate} label='Fecha de inicio' />
          </DemoContainer>
          <DemoContainer components={['DatePicker']}>
            <DatePicker value={endDate} onChange={onChangeEndDate} label='Fecha final' />
          </DemoContainer>
          <Stack justifyContent={'space-between'} direction='row'>
            {(startDate || endDate) && (
              <Button
                startIcon={<Delete />}
                variant='contained'
                color='error'
                onClick={onCleanDates}
              >
                Limpiar
              </Button>
            )}

            <Button
              startIcon={<Search />}
              variant='contained'
              color='primary'
              onClick={onPressSearch}
            >
              Buscar
            </Button>
          </Stack>
        </Grid>
      </Popover>
    </LocalizationProvider>
  );
}
