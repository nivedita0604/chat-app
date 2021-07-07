/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonToolbar, Icon } from 'rsuite';
import { useMediaQuery } from '../../../misc/custom-hook';
import { useCurrentRoom } from '../../../context/current-room.context';
import RoomInfoBtnModal from './RoomInfoBtnModal';

const index = () => {
  const name = useCurrentRoom(v => {
    return v.name;
  });

  const isMobile = useMediaQuery('(max-width: 992px)');
  return (
    <div>
      <div className="d-flex justify-context-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <div>
          <ButtonToolbar className="ws-nowrap">
            <span>todo</span>
          </ButtonToolbar>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-left">
        <span>todo</span>
        <RoomInfoBtnModal />
      </div>
    </div>
  );
};
export default index;
