import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatTop from '../../components/chat-window/top';
import Messages from '../../components/chat-window/messages';
import ChatBottom from '../../components/chat-window/bottom';
import { useRooms } from '../../context/rooms.context';
import { CurrentRoomProvider } from '../../context/current-room.context';

const Chat = () => {
  const { chatId } = useParams();
  console.log('chatid by param', chatId);
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => {
    return room.name;
  });

  if (!currentRoom) {
    return <h6 className="text-center mt-page">chat {chatId} not found</h6>;
  }

  console.log('current', currentRoom);
  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
