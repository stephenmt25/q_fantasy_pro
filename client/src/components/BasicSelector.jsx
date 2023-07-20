import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [range, setRange] = React.useState('');

  const handleChange = (event) => {
    setRange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">GW Range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={range}
          label="GW Range"
          onChange={handleChange}
        >
          <MenuItem value={10}>Last 10 GWs</MenuItem>
          <MenuItem value={20}>Last 20 GWs</MenuItem>
          <MenuItem value={30}>All GWs</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}