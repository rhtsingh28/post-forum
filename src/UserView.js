import React, {Component} from 'react';

class UserView extends Component {
    render () {
        return (
            <div className = "userView"> 
            {/*<span> {this.props.user.name} </span>
            <span onClick={this.props.disableUserView}> close </span>*/}
                <div>user name: {this.props.user.username}</div>
                <div>full name: {this.props.user.name}</div>
                <div>email: {this.props.user.email}</div>
                <div>website: {this.props.user.website}</div>
                <div>company details Below:</div>
                {Object.entries(this.props.user.company).map((element, index) => {
                    return <div key={index}>{`${element[0]} : ${element[1]}`} </div>
                })}
                <button className="pointer close" onClick={this.props.disableUserView}>Close </button>
            </div>
        );
    }
}

export default UserView;