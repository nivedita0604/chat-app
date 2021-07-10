import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import PresenceDot from '../../PresenceDot';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import { useCurrentRoom } from '../../../context/current-room.context';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();
  const isAdmin = useCurrentRoom(v => {
    return v.isAdmin;
  });
  const admins = useCurrentRoom(v => {
    return v.admins;
  });
  const isMobile = useMediaQuery('(max-width: 992px)');
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;

  const canGrantAdmin = isAdmin && !isAuthor;
  const canShowIcons = isMobile || isHovered;
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button
              block
              onClick={() => {
                return handleAdmin(author.uid);
              }}
              color="blue"
            >
              {isMsgAuthorAdmin
                ? 'remove admin permissions'
                : 'Give admin permission in this Room '}
            </Button>
          )}
        </ProfileInfoBtnModal>

        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => {
            return handleLike(message.id);
          }}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete this message"
            onClick={() => {
              return handleDelete(message.id);
            }}
          />
        )}
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
