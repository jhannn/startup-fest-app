import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Footer, FooterTab, Title, Button, Card, CardItem, Content, Icon, Spinner, H3 } from "native-base";
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
  }

  static navigationOptions = {
    header: null
  }

  feedData() {
    console.log("chegou");
    db.ref('startup').on('value', (snapshot) => {
      let allstartups = [];
      snapshot.forEach((doc) => {
        let data = doc.val();
        allstartups.push(data);
      })
      return this.props.navigation.navigate('Ranking', { allstartups: allstartups });
    })
  }

  render() {
    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Header>
          <Body style={{
            alignItems: "center",
            justifyContent: "center"
          }}>
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
                    <CardItem >
                      <Image
                        source={{ uri: startup.imageUrl }}
                        style={{ height: 100, width: 100 }}
                      />
                    </CardItem>
                    <CardItem>
                      <Body>
                        <H3>{startup.name}</H3>
                      </Body>
                    </CardItem>
                  </TouchableOpacity>
                </Card>
              ))
            }}
          </Query>
        </Content>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.feedData()}>
              <Icon name='trophy' />
              <Text>Ranking</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});