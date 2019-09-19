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
            {touched.password && errros.password && ( <p className="error">{errros.password}</p>)}

            <label>
                Terms Of Service
                <Field type="checkbox" name="terms" checked={values.terms}/>
            </label>

                <button>Submit!</button>
        </Form>
        {user.map(users => (
            <ul key={users.id}>
                <li>Name: {users.name}</li>
                <li>Email: {users.email}</li>
                <li>Password: {users.password}</li>
            </ul>
        ))}
    </div> 
)}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    }
})(UserForm);
console.log("This is the HOC", FormikUserForm);
export default Form;