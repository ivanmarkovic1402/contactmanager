import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

// import uuid from 'uuid';
import { v1 as uuidv1 } from 'uuid';

class EditContact extends Component {
    state = { 
        name: '',
        email: '',
        phone: '',
        errors: {}
     }

     componentDidMount(){
         const { id } = this.props.match.params;

         axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone
                });
            });
     }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

     onSubmit = (dispatch, e) => {
         e.preventDefault();
         const { name, email, phone } = this.state;

         //Check for errors
        if(name === ''){
            this.setState({errors: {name: 'Name is required'}});
            return;
        }
        if(email === ''){
            this.setState({errors: {email: 'Email is required'}});
            return;
        }
        if(phone === ''){
            this.setState({errors: {phone: 'Phone is required'}});
            return;
        }


        const updContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
             } 
        })
            .then(res => dispatch({type: 'UPDATE_CONTACT', payload: res.data}))
            .catch(err => console.log(err));

         //Clear the state (clear the form after subition)
         this.setState({
             name: '',
             email: '',
             phone: '',
             errors: {}
         });

         this.props.history.push('/');
     }

    render() { 
        const { name, email, phone, errors } = this.state;


        return (
            <Consumer>
                {value => {
                    const {dispatch} = value;
                    return(
                        <div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    Edit Contact
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                        <TextInputGroup
                                            label="Name"
                                            name="name"
                                            placeholder="Enter name..."
                                            value={name}
                                            onChange={this.onChange}
                                            error={errors.name}
                                        />
                                        <TextInputGroup
                                            label="Email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter email..."
                                            value={email}
                                            onChange={this.onChange}
                                            error={errors.email}
                                        />
                                        <TextInputGroup
                                            label="Phone"
                                            name="phone"
                                            placeholder="Enter phone..."
                                            value={phone}
                                            onChange={this.onChange}
                                            error={errors.phone}
                                        />
                                        
                                        <input type="submit" value="Update Contact" className="btn btn-light btn-block" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}
 
export default EditContact;