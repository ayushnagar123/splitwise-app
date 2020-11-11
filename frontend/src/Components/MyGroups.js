import React, { Component } from 'react'
import axios from 'axios'
export default class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNo:"",
            mygroups:[]
        }
    }
    phoneNoChange(e){
        console.log(e.target.value)
        this.state.phoneNo = e.target.value
    }
    getGroup(){
        axios.get('http://localhost:3000/users/mygroup',{phoneNo:this.state.phoneNo})
            .then(resp=>{
                this.state.mygroups = resp;
            })
            .catch(err=>console.log(err))
    }
    componentWillMount(){
        // axios.get('http://localhost:3000/group')
    }
    render() {
        return (
            <div>
                <h1>My Groups</h1>
                <input type="text" onChange={this.phoneNoChange}/>
                <button onClick={this.getGroup}>Search</button>
            </div>
        )
    }
}
