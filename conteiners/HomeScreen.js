import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Footer, Title, Button, Card, CardItem, Content, Icon, Spinner, H3 } from "native-base";
import { Constants } from "expo";
import { Query } from 'react-apollo';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

import { db } from './config';
import styles from './styles';
import ALLSTARTUPS_QUERY from './queryApollo';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  static navigationOptions = {
    header: null
  }

  async feedData() {
    this.setState({ loading: true });
    db.ref('startup').on('value', (snapshot) => {
      let allstartups = [];
      snapshot.forEach((doc) => {
        let data = doc.val();
        allstartups.push(data);
      })
      this.setState({ loading: false })
      return this.props.navigation.navigate('Ranking', { allstartups: allstartups });
    })
  }

  render() {
    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <SpinnerOverlay
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerOverlay}
        />
        <Header style={styles.header}>
          <Body style={styles.centerTitle}>
            <Title>Escolha sua Startup!</Title>
          </Body>
        </Header>
        <Content padder contentContainerStyle={styles.content}>
          <Query query={ALLSTARTUPS_QUERY}>
            {({ data, error, loading }) => {
              if (error || loading) {
                return <Spinner color="blue" />;
              }
              return data.allStartups.map(startup => (
                <Card key={startup.segment_id}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Startup', { startup: startup })}>
                    <CardItem style={styles.centerElement}>
                      <Image
                        source={{ uri: startup.imageUrl }}
                        style={styles.image}
                      />
                    </CardItem>
                    <CardItem>
                      <Body style={styles.centerElement}>
                        <H3>{startup.name}</H3>
                      </Body>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              ))
            }}
          </Query>
        </Content>
        <Footer style={styles.footer}>
          <Button onPress={() => this.feedData()} style={styles.buttonHomeScreen}>
            <Icon name='trophy' style={styles.icon} />
          </Button>
        </Footer>
      </Container>
    );
  }
}