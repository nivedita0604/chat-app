import React, { useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import Dashboard from '.';
import { auth } from '../../misc/firebase';
import { useMediaQuery, useModalState } from '../../misc/custom-hook';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  // to make dashborad more reponsive when opened in Mobile
  const isMobile = useMediaQuery('(max-width: 992px)');
  // sign out function used in dashoboard/index.js
  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Sign Out!', 4000);
    close();
  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
