import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Footer, Title, Button, Card, CardItem, Content, Icon, Spinner, H3 } from "native-base";
import { Constants } from "expo";
import { db } from './config';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALLSTARTUPS_QUERY = gql`
query GetAllStartups {
  allStartups {
    name
    teamCount
    description
    imageUrl
    annualReceipt
    segment_id
    Segment {
      name
      code
    }
  }
}
`;

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  static navigationOptions = {
    header: null
  }

  feedData() {
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
    if (this.state.loading) {
      return <Spinner color="blue" />;
    }
    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Header style={{backgroundColor:"#3299CC"}}>
          <Body style={{alignItems: "center", justifyContent: "center"}}>
            <Title>Escolha sua Startup!</Title>
          </Body>
        </Header>
        <Content padder contentContainerStyle={{ paddingTop: '5%', paddingBottom: '5%', paddingLeft: '15%', paddingRight: '15%' }}>
          <Query query={ALLSTARTUPS_QUERY}>
            {({ data, error, loading }) => {
              if (error || loading) {
                return <Spinner color="blue" />;
              }
              return data.allStartups.map(startup => (
                <Card key={startup.segment_id}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Startup', { startup: startup })}>
                    <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
                      <Image
                        source={{ uri: startup.imageUrl }}
                        style={{ height: 100, width: 100 }}
                      />
                    </CardItem>
                    <CardItem>
                      <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                        <H3>{startup.name}</H3>
                      </Body>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              ))
            }}
          </Query>
        </Content>
        <Footer style={{backgroundColor:"#38B0DE"}}>
            <Button onPress={() => this.feedData()} style={{ height: 70, width: 70, bottom: 20, borderWidth: 1, borderColor: 'lightgrey', borderRadius: 35, backgroundColor: '#f5f5f5', justifyContent: "center" }}>
              <Icon name='trophy' style={{ color: 'darkgrey'}} />
            </Button>
        </Footer>
      </Container>
    );
  }
}