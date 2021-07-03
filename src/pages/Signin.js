import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const Signin = () => {
  const signinWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success('Signed In!', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const onGoogleSignin = () => {
    signinWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat Together</h2>
                <p>Progressive chat platform</p>
              </div>

              <div className="mt-3">
                <Button block color="green" onClick={onGoogleSignin}>
                  <Icon icon="google" />
                  Continue wit Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
