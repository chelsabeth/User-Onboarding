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
}

return (
    <div className="user-form">
        <Form>
            <Field type="text" name="name" placeholder="Name" />

        </Form>
    </div> 
)

export default Form;