import React from "react";
import { connect } from "react-redux";
import { startRemoveCategory } from "../../utils/category-action";
import CategoryForm from "./CategoryForm";
import MainAppBar from "../../components/AppBar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
function Category(props) {
  const [dataId, SetDataId] = React.useState("");
  const [status, SetStatus] = React.useState("add");
  const [category, SetCategory] = React.useState("");
  const handleEdit = (id, name) => {
    console.log(id, name);
    status === "add" ? SetStatus("edit") : SetStatus("add");
    status === "edit" ? SetStatus("add") : SetStatus("edit");
    SetCategory(name);
    SetDataId(id);
    console.log(dataId, status);
  };

  const handleRemove = (id) => {
    props.dispatch(startRemoveCategory(id));
  };
  return (
    <>
    <Navbar/>
      <MainAppBar />
      <div align="center" style={{ marginTop: 100 }}>
        <div>
          <h1>Category</h1>
          <table className="table " style={{ maxWidth: 700 }}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Details</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {props.category !== undefined &&
                props.category.map((ele) => {
                  return (
                    <tr key={ele._id + ele.name}>
                      <td>{ele.name}</td>
                      <td>
                        <button
                          onClick={() => handleEdit(ele._id, ele.name)}
                          className="btn btn-secondary"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(ele._id)}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <CategoryForm category={category} id={dataId} status={status} />
      </div>
      <Footer/>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    category: state.category
  };
};
export default connect(mapStateToProps)(Category);