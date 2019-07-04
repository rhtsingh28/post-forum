import React, {Component} from 'react';
import List from './list.js';
class Search extends Component {

    constructor () {
        super();
        this.state={searchedList:[]}
    }

    handleSearch = (e) => {
        if (e.target.value==="") {
            this.setState({seachedList:[]});
            this.props.setSelectedItem("");
        } else {
            let seachedList = this.props.list.filter (
                (item) => {
                    return item.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 
                }
            );
            this.setState({seachedList:seachedList});
        }
    }
    setSelectedItem = (val) => {
        this.props.setSelectedItem(val);

    }

    render () {
        return (
            <div>
                <input type="text" className="search" placeholder="search" onChange={this.handleSearch} /> 
                <List items = {this.state.seachedList} setSelectedItem={this.setSelectedItem}/>
            </div>
        );
    }
}

export default Search;