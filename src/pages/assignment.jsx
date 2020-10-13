import  React , { Component } from  "react";

class Assignment extends Component{
    constructor(props) {
        super(props);
        this.state = {
              empl:[],
              managers:[],
              selectedEmpl:'',
              selectedManager:'',
              emplSelectValue: '',
              managerSelectValue: '',
        };
        this.handleEmplDropdownChange = this.handleEmplDropdownChange.bind(this);
        this.handleManagerDropdownChange = this.handleManagerDropdownChange.bind(this);
    }

    handleEmplDropdownChange(e) {
        this.setState({ emplSelectValue: e.target.value });
         this.loadMangers();
      }

      handleManagerDropdownChange(e) {
        this.setState({ managerSelectValue: e.target.value });
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
        console.log("On Change Dopdonw Value is  " + this.state.emplSelectValue);

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
        console.log("printing from onClickSubmit  Empl and Manager names are" + this.state.emplSelectValue + this.state.managerSelectValue  );

        fetch('http://localhost:8080/Demo/assignManger', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
                name: this.state.emplSelectValue,
                status:'in-progress',
                requestId :'Rq'+Math.random().toString(36).substr(2, 5),
                escalate:'No',
                manager: this.state.managerSelectValue,
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
                <select name="employee" defaultValue='' onChange={this.handleEmplDropdownChange }>
                    {this.state.empl.map((e, key) => {
                        return <option key={key} value={e.name}>{e.name}</option>;
                    })}
                </select>
                </div>

                <div align="left">
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Approver &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <select name="approver" defaultValue='' onChange={this.handleManagerDropdownChange}>
                    {this.state.managers.map((e, key) => {
                        return <option key={key} value={e.name}>{e.name}</option>;
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