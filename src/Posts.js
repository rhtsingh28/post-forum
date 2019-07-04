import React, {Component} from 'react';

import PostPreview from './PostPreview.js';
import Search from './Search.js';
import { Promise } from 'q';

class Posts extends Component {

    constructor () {
        super();
        this.state = {
            posts: [], users:[], filteredPost:[], filteredUser:""
        }
    }

    fetchPostsAndUserOnRequirement () {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            let posts= [];
            let users = [];
            data.forEach (x => {
                let post = {
                    'userId': x.userId,
                    'id': x.id,
                    'title': x.title,
                    'body': x.body
                    };
                fetch ('https://jsonplaceholder.typicode.com/users/'+x.userId)
                .then (response => response.json())
                .then (data => {
                    let user = {'name': data.name, 'username': data.username, 'email': data.email, 'website': data.website, 'company': data.company};
                    post['user'] = user;
                    posts.push (post);
                    if (users.indexOf(data.username) < 0 )
                         users.push(data.username);
                    this.setState({posts : posts, users: users, filteredPost:posts});

                })    
            }) 
            
        }
        )
    }

    fetchPosts () {
        return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json());
    }

    fetchUsers () {
        return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
    }

    fetchUserAndPosts () {
        return Promise.all([this.fetchPosts(), this.fetchUsers()])

    }

    matchUserAndPosts() {
        let posts= [];
        let users = [];
        this.fetchUserAndPosts()
        .then (([postsRespose, usersResponse]) => {
            postsRespose.forEach (x => {
                let user = (usersResponse.filter (item => item.id===x.userId))[0]; 
                if (users.indexOf(user.username) < 0 )
                         users.push(user.username);
                let post = {
                    'userId': x.userId,
                    'id': x.id,
                    'title': x.title,
                    'body': x.body,
                    'user': user
                    };
                posts.push(post);    
                this.setState({posts : posts, users: users, filteredPost:posts});
            });
        } )
        
    }

    componentWillMount () {
         //this.fetchPostsAndUserOnRequirement();
         this.matchUserAndPosts();
    }

    filterPost = (val) => {

        let filteredPost = [];
        if (val === "") {
            filteredPost = this.state.posts;
        } else {
            this.state.posts.forEach((post)=> {
                if (post.user.username === val) {
                    filteredPost.push(post);
                }
            });
        }
        this.setState({filteredUser: val, filteredPost:filteredPost});
    }

    render (){
        return (
        <div>
        
        <div className="search">
            {this.state.users.length > 0 && <Search handleSearchChange={this.handleSearchChange} list={this.state.users} setSelectedItem={this.filterPost}/>}
        </div>

        <div className="filter">
        Filtered for : {this.state.filteredUser===""?'none':this.state.filteredUser}
        </div>

        <div className="posts">
        {this.state.filteredPost.length > 0 && 
            this.state.filteredPost.map (post => {
                return <PostPreview key = {post.id} title={post.title} user={post.user} postId={post.id}/>
            })
        }
        </div>
          
        </div>
      )
    }
    

}

export default Posts;
