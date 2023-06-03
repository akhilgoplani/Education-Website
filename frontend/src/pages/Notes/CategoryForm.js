import React from "react";
import { Formik } from "formik";
import {
  startPostCategory,
  startCategoryEdit,
} from "../../utils/category-action";
import { connect } from "react-redux";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
function CategoryForm(props) {
  return (
    <div>
      <div style={{ marginTop: 50, marginBottom: 50 }}>
        {props.status === "add" ? (
          <NoteAddIcon style={{ width: "50px", height: "50px" }} />
        ) : (
          <EditIcon style={{ width: "50px", height: "50px" }} />
        )}
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={{ name: props.category }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (props.status === "add") {
              props.dispatch(startPostCategory(values));
            } else {
              props.dispatch(startCategoryEdit(values, props.id));
            }
          }, 400);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3" style={{ width: 600 }}>
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleChange}
                value={values.name}
                className="form-control"
              />&nbsp;&nbsp;
              <div className="input-group-append">
                <button type="submit" className="btn btn-outline-secondary">
                  Add
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default connect()(CategoryForm);