import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
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
            {touched.name && errors.name && ( <p className="error">{errors.name}</p>)}

            <Field type="text" name="email" placeholder="Email" />

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && ( <p className="error">{errors.password}</p>)}

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
)};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is a required field"),
        password: Yup.string().required("password required")
    }),

    handleSubmit(values, {setStatus}) {
        axios
            .post(" https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data);
                console.log("Here is your response", res.data);
            })
            .catch(err => console.log("Sorry an error has occured", err.res))
    }

})(UserForm);
console.log("This is the HOC", FormikUserForm);
export default FormikUserForm;