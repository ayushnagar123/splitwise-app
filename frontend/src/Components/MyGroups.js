import React, { Component } from 'react'
import axios from 'axios'
import { render } from '../../../backend/app';

export default class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNo:"",
            mygroups:[]
        }
        this.phoneNoChange = this.phoneNoChange.bind(this);
        this.getGroup = this.getGroup.bind(this);
    }
    phoneNoChange(e){
        console.log(e.target.value)
        this.state.phoneNo = e.target.value
    }
    getGroup(){
        axios.get('http://localhost:5000/users/mygroups',{params:{phoneNo:this.state.phoneNo}})
            .then(resp=>{
                this.state.mygroups = resp;
                console.log(this.state)
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
                <Group mygroups={this.state.mygroups}/>
            </div>
        )
    }
}
