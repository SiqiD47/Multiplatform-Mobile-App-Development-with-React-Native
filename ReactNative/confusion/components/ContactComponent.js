import React, {Component} from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements'; 
import * as Animatable from 'react-native-animatable';

class Contact extends Component  {
 
    static navigationOptions = {
        title: 'Contact Us'
    };
    
    render() {
        const {navigate} = this.props.navigation;
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
                <Card title='Contact Information'>
                    <Text style={{margin: 10, fontSize:16}}>121, Clear Water Bay Road</Text>
                    <Text style={{margin: 10, fontSize:16}}>Clear Water Bay, Kowloon</Text>
                    <Text style={{margin: 10, fontSize:16}}>HONG KONG</Text>
                    <Text style={{margin: 10, fontSize:16}}>Tel: +852 1234 5678</Text>
                    <Text style={{margin: 10, fontSize:16}}>Fax: +852 8765 4321</Text>
                    <Text style={{margin: 10, fontSize:16}}>Email:confusion@food.net</Text>       
                </Card>
            </Animatable.View>
        );
    } 
}

export default Contact;