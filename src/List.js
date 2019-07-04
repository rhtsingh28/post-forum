import React, {Component} from 'react';

class List extends Component {
    render () {
        return (
            <div>
               { this.props.items  && this.props.items.map (
                   (item) =>  <div key={item} onClick={this.props.setSelectedItem.bind(this, item)}>{item}</div>
                )}
            </div>
        );
    }
}



export default List;