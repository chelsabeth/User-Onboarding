import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errros, touched, status }) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (status) {
            setUser([...user, status]);
        }
    }, [status]);


return (
    <div className="user-form">
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errros.name && ( <p className="error">{errros.name}</p>)}
            
            <Field type="text" name="email" placeholder="Email" />
            <Field type="text" name="password" placeholder="Password" />
            <Field type="checkbox" name="terms" checked={values.terms}/>
            <button>Submit!</button>
        </Form>
    </div> 
)}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || ""
        };
    }
})(UserForm);
console.log("This is the HOC", FormikUserForm);
export default Form;