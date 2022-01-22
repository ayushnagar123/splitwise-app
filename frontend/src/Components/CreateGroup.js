import axios from 'axios';
import React, { Component } from 'react'

export default class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNo:"",
            title:""
        }
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    onPhoneChange(e){
        this.setState({phoneNo:e.target.value})
    }
    onTitleChange(e){
        this.setState({title:e.target.value})
    }
    onSubmitForm(){
        axios.post('http://localhost:3001/groups',{list_of_people:[this.state.phoneNo],title:this.state.title})
            .then(resp=>{
                console.log(resp)
            })
            .catch(err=>{console.log(err)})
    }
    render() {
        return (
            <div>
                {/* <form method="POST" action="http://localhost:3001/groups"> */}
                    <input type="text" name="phoneNo" onChange={this.onPhoneChange}/>
                    <input type ="text" name="title" onChange={this.onTitleChange}/>
                    <button type="submit" onClick={this.onSubmitForm}>Create</button>
                {/* </form> */}
            </div>
        )
    }
}
