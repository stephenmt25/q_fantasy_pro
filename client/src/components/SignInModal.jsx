import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { UserContext } from '../UserContext';

const { TEAM_IDS } = require('../constants');

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 225,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const SignInModal = ({ open, closeModal, openInfoSnackbar, handleCloseInfo }) => {
  const [password, setPassword] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
  const { setUserId } = useContext(UserContext);

  const handleSuccess = (id) => {
    setUserId(id);
    setOpenSuccess(true);
  };

  const handleFail = () => {
    setOpenFailed(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseFailed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailed(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  function checkId(number) {
    let id = Number(number);
    return TEAM_IDS.includes(id) ? handleSuccess(id) : handleFail();
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    checkId(password);
    setPassword('');
    closeModal();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 style={{ "textAlign": "center" }}>Enter Your FPL Id</h1>
          <form style={{ "display": "flex", "flexDirection": "column" }} onSubmit={handleSignIn}>
            <div>
              <input
                type="password"
                id="fpl_id"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ "fontSize": "25px" }}
              />
            </div>
            <button style={{ "marginTop":"30px", "fontSize": "20px", "fontFamily": "Staatliches"}} type="submit">Sign In</button>
          </form>
        </Box>
      </Modal>
      <Snackbar open={openSuccess} autoHideDuration={2000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          FPL ID Verified
        </Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={2000} onClose={handleCloseFailed}>
        <Alert onClose={handleCloseFailed} severity="error" sx={{ width: '100%' }}>
          FPL ID Not Found
        </Alert>
      </Snackbar>
      <Snackbar open={openInfoSnackbar} autoHideDuration={2000} onClose={handleCloseInfo}>
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: '100%' }}>
          Signed Out
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignInModal;
