import React, { useState } from 'react';
import { Icon, Tag, Button, Alert } from 'rsuite';
import firebase from 'firebase';
import { auth } from '../../misc/firebase';

//  to manage multiple account and data of providers
const ProviderBlock = () => {
  const [isConnected, setIsConnect] = useState({
    'google.com': auth.currentUser.providerData,
    // eslint-disable-next-line spaced-comment
    /*.some(data => {
      data.providerId === 'google.com';
    }),
    others: auth.currentUser.providerData.some(data => {
      data.providerId === 'others';
    }),*/
  });

  // !isconnected(link to google ..) will display functionality when we have more than one socialmedia add added
  const updateIsConnected = (providerId, value) => {
    setIsConnect(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };
  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`you can not disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsConnected(providerId, false);
      Alert.info(`Disconnect from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const unlinkGoogle = () => {
    unlink('google.com');
  };
  // can add for account providers like facebook similar done as for google

  const link = async provider => {
    try {
      auth.currentUser.linkWithPopup(provider);
      Alert.info(`connected to ${provider.providerId}`, 4000);
      updateIsConnected(provider.providerId, true);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const linkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="blue" closable onClose={unlinkGoogle}>
          <Icon icon="google" />
          Connnected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linkGoogle}>
            <Icon icon="google" />
            Link to google
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
