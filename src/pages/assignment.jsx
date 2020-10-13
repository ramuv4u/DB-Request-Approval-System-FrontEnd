import  React , { Component } from  "react";

class Assignment extends Component{
    constructor(props) {
        super(props);
        this.state = {
              empl:[],
              managers:[],
              selectedEmpl:'',
              selectedManager:'',
        };
    }

    async componentDidMount() {
        fetch('http://localhost:8080/Demo/getAllEmployee', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => res.json())
            .then((data) => {               
                this.setState({
                    empl: data
                })
                console.log("printing from mapping  " + this.state.empl);
              
            })    
            
           
    }

    loadMangers=()=>{
        fetch('http://localhost:8080/Demo/getAllManagers', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            }
        })
            .then(res => res.json())
            .then((data) => {               
                this.setState({
                    managers: data
                })
                console.log("printing from MAnagermapping  " + this.state.managers);
              
            })    
    }
    onClickSubmit=()=>{
        console.log("printing from onClickSubmit  " );

        fetch('http://localhost:8080/Demo/assignManger', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                name: 'empfromUI',
                manager: 'manageFromUI',
            })
            })



        this.props.history.push('/events');
    }

    render(){
        return(
            <div align='center'>
                <h4>Select Employee and Approver To Initiate the Flow</h4>
              <div align="left">
                <label>&nbsp;&nbsp;&nbsp;&nbsp;Employee &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select name="employee" value={this.state.empl} onChange={this.loadMangers}>
                    {this.state.empl.map((e, key) => {
                        return <option key={key} value={e.id}>{e.name}</option>;
                    })}
                </select>
                </div>

                <div align="left">
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Approver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select name="approver" value={this.state.managers}>
                    {this.state.managers.map((e, key) => {
                        return <option key={key} value={e.id}>{e.name}</option>;
                    })}
                </select>
                </div>


                <div >
               
                <div align="center"> <button type="button" class={this.state.isFilterActive ? "btn btn-danger" : "btn btn-primary "} onClick={this.onClickSubmit} onClickSubmit={() => {
                                                        this.state.isLoading = true

                                                    }}>{this.state.isFilterActive ? "Reset" : "Submit Request"}
                                                    </button>
                </div>
                </div>

            </div>

                

        
        )
    }
}
export default Assignment;