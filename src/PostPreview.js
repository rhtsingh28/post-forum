import React, {Component} from 'react';
import PostView from './PostView.js';
import UserView from './UserView.js';

class PostPreview extends Component {

    constructor () {
        super();
        this.state = {enablePostView: false, enableUserView: false, comment:{}};
    }
    handleTitleClick = () => {
        if (this.state.enablePostView) {
            this.setState({enablePostView: false});
        } else {
            this.setState({enablePostView: true, enableUserView:false});
            fetch ('https://jsonplaceholder.typicode.com/comments/'+this.props.postId)
            .then (response => response.json())
            .then (data => {
                let comment = {'name': data.name, 'email': data.email, 'body': data.body};
                this.setState({comment: comment});
            }) 
        }
    }
    handleUserClick = () => {
        if (this.state.enableUserView) {
            this.setState({enableUserView: false});
        } else {
            this.setState({enableUserView: true, enablePostView:false});
            fetch ('https://jsonplaceholder.typicode.com/comments/'+this.props.postId)
            .then (response => response.json())
            .then (data => {

                let comment = {'name': data.name, 'email': data.email, 'body': data.body};
                this.setState({comment: comment});
            }) 
        }
    }
    disablePostView = () => {
        this.setState({enablePostView: false});
    }

    disableUserView = () => {
        this.setState({enableUserView: false});
    }

    render () {
        return (
            <div>
                <div className="postPreview">
                    <span className="title pointer" onClick={this.handleTitleClick}> {this.props.title} </span>
                    <span className="userName pointer" onClick={this.handleUserClick}> {this.props.user.username} </span>
                </div>
                    {this.state.enablePostView && <PostView disablePostView={this.disablePostView} comment={this.state.comment} />}
                    {this.state.enableUserView && <UserView disableUserView={this.disableUserView} user={this.props.user}/>}
            </div>
        );
    }
}

export default PostPreview;