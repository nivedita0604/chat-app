import React from 'react';
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <DashboardToggle />
      <CreateRoomBtnModal />
    </div>
  );
};

export default Sidebar;
