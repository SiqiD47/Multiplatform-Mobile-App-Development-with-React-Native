import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, AirbnbRating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})


function RenderComments(props) {
    const comments = props.comments;   
    const renderCommentItem = ({item, index}) => {
        return (
            <View key={index} style={{margin: 10, alignItems: 'left', justifyContent: 'left'}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating
                    imageSize={12}
                    readonly
                    startingValue={item.rating}
                />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>  
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

function RenderDish(props) {
    const dish = props.dish;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 ) // negative dir
            return true;
        else // positive dir
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );

            return true;
        }
    })

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            {...panResponder.panHandlers}>
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.formRow}>
                        <Icon
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                            style={styles.icon}
                        />
                        <Icon
                            raised
                            reverse
                            name={ 'pencil' }
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal()}
                            style={styles.icon}
                        />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            author: '',
            rating: 5,
            comment: ''
        }
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
    }

    resetForm() {
        this.setState({
            showModal: false
        });
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId',''); // second param is default value
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}                           
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()} 
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />

                {/* Modal */}
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => {this.toggleModal(); this.resetForm()} }
                    onRequestClose = {() => { this.toggleModal(); this.resetForm()} }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Add Comment</Text>
                        <Rating type='star' showRating startingValue={5} onFinishRating={(value) => {this.setState({ rating: value });}}/>
                        <Input
                            placeholder=' Author'
                            leftIcon={<Icon
                                name='user-o'
                                type='font-awesome'
                                size={18}
                              />}
                            onChangeText={(value) => this.setState({author: value})}
                        />
                        <Input
                            placeholder=' Comment'
                            leftIcon={<Icon
                                name='comment-o'
                                type='font-awesome'
                                size={18}
                              />}
                            onChangeText={(value) => this.setState({comment: value})}
                        />

                        <Button 
                            onPress = {(values) =>{this.toggleModal(); this.handleComment(dishId, this.state.rating, this.state.author, this.state.comment); this.resetForm();}}
                            color="#512DA8"
                            title="Submit" 
                            />
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color='#C0C0C0'
                            title="Cancel" 
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    icon: {
        flex: 1,
        textAlign: 'right',
        width: 25,
        height: 25
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);