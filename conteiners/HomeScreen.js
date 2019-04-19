import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Footer, FooterTab, Title, Button } from "native-base";
import { Grid, Row } from "react-native-easy-grid";
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
      return  this.props.navigation.navigate('Ranking', {allstartups: allstartups});
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
        <Grid style={{
          alignItems: "center"
        }}>
          <Row>
            <ScrollView>
              <Query query={ALLSTARTUPS_QUERY}>
                {({ data, error, loading }) => {
                  if (error || loading) {
                    return <ActivityIndicator size="large" color="#0000ff" />;
                  }
                  return data.allStartups.map(startup => (
                    <View key={startup.segment_id}>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate('Startup', { startup: startup })}>
                        <Image
                          source={{ uri: startup.imageUrl }}
                          style={{ width: 80, height: 80 }}
                        />
                        <Text>{startup.name}</Text>
                      </TouchableOpacity>
                    </View>
                  ))
                }}
              </Query>
            </ScrollView>
          </Row>
        </Grid>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.feedData()}>
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