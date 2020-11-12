import React, { Component } from 'react'
import axios from 'axios'

class Group extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : props.data
        }
    }
    render(){
        // var mygroups = this.state.mygroups;
        return (
                <div class="groups">
                {
                    <div>data</div>
                }
                </div>
        )
    }
}


export default class MyGroups extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNo:"",
            mygroups:[],
            show:false
        }
        this.phoneNoChange = this.phoneNoChange.bind(this);
        this.getGroup = this.getGroup.bind(this);
    }
    componentDidMount(){
        
    }
    phoneNoChange(e){
        console.log(e.target.value)
        this.setState({phoneNo : e.target.value})
    }
    getGroup(){
        axios.get('http://localhost:5000/users/mygroups',{params:{phoneNo:this.state.phoneNo}})
            .then(resp=>{
                console.log(resp.data)
                this.setState({mygroups:resp.data,show : true});
                console.log(this.state)
                // this.state.show = true;
            })
            .catch(err=>console.log(err))
    }
    componentWillMount(){
        // axios.get('http://localhost:3000/group')
    }
    render() {
        // if(this.state.show){
            return (
                <div>
                    <h1>My Groups</h1>
                    <input type="text" onChange={this.phoneNoChange}/>
                    <button onClick={this.getGroup}>Search</button>
                    {/* <Group mygroups={this.state.mygroups}/> */}
                    <div class="groups">
                        {
                            this.state.show && this.state.mygroups.length!==0
                             && this.state.mygroups.maps((group)=>{
                                <Group key = {group._id} data = {group}/>
                            })
                        }
                    </div>
                </div>
            )
        // }
    }
}
