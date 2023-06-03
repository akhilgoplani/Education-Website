import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../../utils/paginate";
import { api } from "../../config";
import http from "../../services/httpService";
import Jumotron from "../common/jumbotron";
import image from "../../images/community.jpeg"

class Dashboard extends Component {
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
  };
  async componentDidMount() {
    const { data: allposts } = await http.get(api.postsEndPoint);
    const { data: tags } = await http.get(api.tagsEndPoint);

    this.setState({
      allposts: [...allposts],
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlePostDelete = (post) => {};
  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };
  getPosts() {
    const { allposts, selectedTag } = this.state;
    const filtered = [];
    for (let i in allposts) {
      const post = allposts[i];
      const { tags } = post;
      for (let j in tags) {
        if (tags[j].name === selectedTag.name) {
          filtered.push(post);
          break;
        }
      }
    }
    console.log(filtered);
    return filtered;
  }
  render() {
    const { user } = this.props;
    const { allposts, pageSize, currentPage, tags, selectedTag } = this.state;
    const filtered = selectedTag._id === "1" ? allposts : this.getPosts();
    const posts = paginate(filtered, currentPage, pageSize);
    if (allposts.length === 0)
      return (
        <>
      <p><b>There are no posts in the database!</b></p>
      <Link to="/discussions/new-post">
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{ marginBottom: 20,marginLeft:20 }}
                    >
                      New Post
                    </button>
                  </Link>
                  </>
      )
    return (
      <React.Fragment>
       
        <div className="container">
          <div className="row">
            <div className="col">
            <img className="rounded mx-auto d-block img-fluid abcdef my-3" src={image} alt=""/>
            <h2 className="my-3"><b>The aim of argument, or of discussion, should not be victory but</b></h2>
            <h2 className="text-center"><b>progress...</b></h2>
           
            <hr className="my-4"/>
              <div className="d-flex w-100 justify-content-between m-3">

                
                <h6><b>Showing {filtered.length} posts.</b></h6>
                {user && (
                  <Link to="/discussions/new-post">
                    <button
                      type="button"
                      className="btn btn-success"
                      style={{ marginBottom: 20 }}
                    >
                      New Post
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <Posts posts={posts} onDelete={this.handlePostDelete} />
            </div>
            <div className="col-3">
              <ListGroup
                items={tags}
                selectedTag={this.state.selectedTag}
                onTagSelect={this.handleTagSelect}
              />
            </div>
            <Pagination
              itemCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;