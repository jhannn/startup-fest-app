import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#3299CC"
    },
    footer: {
        backgroundColor: "#38B0DE"
    },
    content: {
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '15%',
        paddingRight: '15%'
    },
    centerTitle: {
        alignItems: "center",
        justifyContent: "center"
    },
    centerElement: {
        flexDirection: "row",
        justifyContent: "center"
    },
    image: {
        height: 100,
        width: 100
    },
    imageRanking:{
        width: 50,
        height: 50
    },
    icon: {
        color: 'darkgrey'
    },
    buttonHomeScreen: {
        height: 70,
        width: 70,
        bottom: 20,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 35,
        backgroundColor: '#f5f5f5',
        justifyContent: "center"
    },
    spinnerOverlay:{
        color: '#FFF'
    },
    iconRight:{
        paddingLeft: 10
    },
    textStartup:{
        paddingRight: 10
    },
    hRanking:{
        marginTop:10,
        marginBottom:10
    }
});

export default styles;