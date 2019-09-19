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
    <div className="user-form">  {/* here is where I create my form  */}
        <Form>
            <Field type="text" name="name" placeholder="Name" /> 
            {touched.name && errors.name && ( <p className="error">{errors.name}</p>)} {/* making error messages for the name field */}

            <Field type="text" name="email" placeholder="Email" />

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && ( <p className="error">{errors.password}</p>)} {/* making error messages for the password field */}

            <label>
                Terms Of Service
                <Field type="checkbox" name="terms" checked={values.terms}/>  {/* making sure that the terms of service is a checkbox */}
            </label>

                <button>Submit!</button>  {/* sumbit button to send data to the server */}
        </Form>
        {user.map(users => ( // here is where I map through the user array
            <ul key={users.id}>
                <li>Name: {users.name}</li>
                <li>Email: {users.email}</li>  {/* the list items make the name and email display on the screen, didn't display password because it is personal information */}
            </ul>
        ))}
    </div> 
)};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, terms}) {  // make the props for the form
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Name is a required field"), // set up a costum error message for my name and password fields
        password: Yup.string().required("password required")
    }),

    handleSubmit(values, {setStatus}) {
        axios                                              
            .post(" https://reqres.in/api/users", values) // here is my axios call and my post so that the users display on the screen after they press submit
            .then(res => {
                setStatus(res.data);
                console.log("Here is your response", res);
            })
            .catch(err => console.log("Sorry an error has occured", err.res))
    }

})(UserForm);
console.log("This is the higher order component", FormikUserForm); // console log my form
export default FormikUserForm; 