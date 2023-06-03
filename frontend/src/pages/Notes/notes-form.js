import React from "react";
import { Field, Formik,setFieldValue } from "formik";
import { startPostNotes, startEditNotes } from "../../utils/notes-action";
import { connect } from "react-redux";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import EditIcon from "@material-ui/icons/Edit";
import { Checkbox } from "@material-ui/core";
function NotesForm(props) {

  
  return (
    <div>
      <h1>
        {props.status === "add" ? (
          <NoteAddIcon
            style={{ width: "50px", height: "50px" }}
            color="primary"
          />
        ) : (
          <EditIcon
            style={{ width: "50px", height: "50px" }}
            color="secondary"
          />
        )}
      </h1>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: props.title,
          body: props.body,
          category: props.category.name,
          isPublic: false, // Initialize isPublic as false
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values));
            if (props.status === "add") {
              props.dispatch(startPostNotes(values));
            } else {
              props.dispatch(startEditNotes(values, props.id));
            }
          }, 400);
        }}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue
         
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              size="50"
              className="form-control"
              placeholder="Title"
              onChange={handleChange}
              value={values.title}
            />

            <br />

            <textarea
              className="form-control"
              type="text"
              name="body"
              placeholder="body"
              onChange={handleChange}
              value={values.body}
            />
            <br />

            <select
              id="category"
              name="category"
              onFocus={props.handleBluring}
              onChange={handleChange}
              className="form-control"
            >
              {props.status === "add" ? (
                <option value="">CATEGORY</option>
              ) : (
                <option selected={props.category.name}></option>
              )}
              {props.category.map((ele) => {
                return (
                  <option key={ele._id} value={ele._id}>
                    {ele.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label style={{ display: 'flex', alignItems: 'center',justifyContent:'center' }}>
  <Checkbox
    type="checkbox"
    name="isPublic"
    checked={values.isPublic}
    onChange={handleChange}
    style={{
      marginRight: '8px',
      width: '16px',
      height: '16px',
      border: '1px solid #ccc',
      borderRadius: '3px',
      outline: 'none',
      cursor: 'pointer',
      position: 'relative',
    

    }}
  />
  <span style={{ fontSize: '14px', color: '#333' }}>Make it Public</span>
</label>

            <br />
            <button type="submit" className="btn btn-dark">
              Add Note
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
  };
};

export default connect(mapStateToProps)(NotesForm);