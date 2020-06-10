import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

// import uuid from 'uuid';
import { v1 as uuidv1 } from 'uuid';

class AddContact extends Component {
    state = { 
        name: '',
        email: '',
        phone: '',
        errors: {}
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

         const newContact = {
            //  id: uuidv1(),           //zakomentarisano zbog POST request na jsonplaceholder...tammo ne treba id
             name,
             email,
             phone
         };

         axios.post('https://jsonplaceholder.typicode.com/users', newContact)
            .then(res => dispatch({ type: 'ADD_CONTACT', payload: res.data}));

        // const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
        // dispatch({type: 'ADD_CONTACT', payload: res.data});

        //  dispatch({type: 'ADD_CONTACT', payload: newContact});   //zakomentarisano zbog POST request na jsonplaceholder

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
                                    Add Contact
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
                                        
                                        <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
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
 
export default AddContact;