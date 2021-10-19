import React from "react"
import {Field, reduxForm} from 'redux-form'
import {Form, FormGroup, Label, Input, Button } from "reactstrap"
import {alphaNumeric, maxLength, minLength, required} from "./validateFunc"

const minLength8 = minLength(8);
const minLength2 = minLength(2);
const maxLength15 = maxLength(15);

const renderField = ({
    input,
    label,
    type,
    meta: {touched, error, warning}
}) => {
    return (
        <FormGroup> 
            <Label className="col-2" htmlFor={label}>{label}</Label>
            <Input className="col-10" {...input} type={type} id={label} />
            {
                touched && (
                    (error && <span>{error}</span>) || 
                    (warning && <span>{warning}</span>)
                )
            }
        </FormGroup>
    );
}

const LoginForm = (props) => {
    return (
        <div className="container">
            <Form onSubmit={props.handleSubmit}>
                <Field 
                    name="username" 
                    type="text" 
                    component={renderField} 
                    label="Username"
                    validate={[required, maxLength15, minLength2]}
                    warn={alphaNumeric} />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label="Password"
                    validate={[required, minLength8]}
                    warn={alphaNumeric} />
                <Button color="primary" type="submit" name="submit" className="ms-auto m-1">Submit</Button>
                <Button color="danger" type="button" name="cancel">Cancel</Button>
            </Form>
        </div>
    );
}

export default reduxForm({
    form: 'login',
})(LoginForm);