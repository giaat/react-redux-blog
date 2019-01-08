import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { readAllPosts, deletePost } from '../actions/index';
import PostListItem from '../components/post-list-item';
import { Link } from 'react-router';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = { dislayOnlyMines: false };
  }
  componentWillMount() {
    this.props.readAllPosts();
  }

  renderPost() {
    const { posts } = this.props;
    let arrayPosts;

    if (posts) {
      if (this.state.dislayOnlyMines) {
        arrayPosts = this.filterMyPosts(posts);
        console.log(arrayPosts);
      } else {
        arrayPosts = posts;
      }
      return arrayPosts.map(post => {
        return (
          <PostListItem
            key={post.id}
            post={post}
            deletePostCallBack={post => this.deletePostCallBack(post)}
          />
        );
      });
    }
  }

  deletePostCallBack(post) {
    this.props.deletePost(post.id);
  }

  filterMyPosts(postList) {
    return postList.filter(post => {
      if (post.author === 'GG') {
        return true;
      } else {
        return false;
      }
    });
  }
  render() {
    return (
      <div>
        <h1>Liste des posts</h1>
        <input
          type="checkbox"
          onChange={e => this.setState({ dislayOnlyMines: e.target.checked })}
        />
        Afficher uniquement mes posts
        <div className="button_add">
          <Link to={'create-post'}>
            <button className="btn btn-primary btn-circle btn-lg">+</button>
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Action</th>
            </tr>
          </thead>
          <ReactCSSTransitionGroup
            component="tbody"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionName="fade"
          >
            {this.renderPost()}
          </ReactCSSTransitionGroup>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ readAllPosts, deletePost }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
