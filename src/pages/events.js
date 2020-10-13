import React, { Component } from 'react'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import 'react-widgets/dist/css/react-widgets.css';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import baseUrl from '../config'


class EventsPage extends Component {

    constructor() {

        Moment.locale();
        momentLocalizer();
        super();
        this.state = {
            isLoading: true,
            isFilterActive: false,
            isApprovalFilterActive: false,
            isDateFilterActive: false,
            events: null,
            error: null,
            empl: [

            ],

            sortingField: "approvalStatus",
            order: -1,

        };

    }

    async componentDidMount() {
        fetch('http://localhost:8080/Demo/getApprovals', {
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
    renderTableData() {
        console.log("printing from renderTableData  " + this.state.empl);
        return this.state.empl.map((em, index) => {
            const { id, name, status, requestId, escalate, manager } = em //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{status}</td>
                    <td>{requestId}</td>
                    <td>{escalate}</td>
                    <td>{manager}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div class="container">
                <div class="row">

                    <div class="col-md-12">
                        <div class="grid search">
                            <div class="grid-body">
                                <div class="row">


                                    <div class="col-md-3">




                                        <h4>By Status:</h4>

                                        <div class="checkbox">
                                            <label><input type="checkbox" class="icheck" onChange={() => {

                                               // this.handleFilter("Approved")
                                            }}
                                                disabled={this.state.isFilterActive ? "disable" : ""} defaultChecked /> Approved</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="icheck" onChange={() => {

                                             //   this.handleFilter("Declined")
                                            }}
                                                disabled={this.state.isFilterActive ? "disable" : ""} defaultChecked /> Declined</label>
                                        </div>
                                        <div class="checkbox">
                                            <label><input type="checkbox" class="icheck" onChange={() => {

                                                //this.handleFilter("Pending")
                                            }}
                                                disabled={this.state.isFilterActive ? "disable" : ""} defaultChecked /> Pending</label>
                                        </div>


                                        <div class="padding"></div>
                                        <div class="padding"></div>

                                        <h4 className="top-buffer">By Date:</h4>
                                        <div>
                                            <DateTimePicker className='form-group' placeholder="From"

                                                onSelect={value => this.fromDateFilterHandler(Moment.utc(value).toISOString())}
                                                disabled={this.state.isFilterActive ? "disable" : ""}
                                            />
                                        </div>

                                        <div>
                                            <DateTimePicker className='form-group' placeholder="To"

                                                onSelect={value => this.toDateFilterHandler(Moment.utc(value).toISOString())}
                                                disabled={this.state.isFilterActive ? "disable" : ""}
                                            />
                                        </div>

                                        <div class="padding"></div>

                                        <h4 className="top-buffer">By Request ID:</h4>



                                        <div>
                                            <input type="text" class="form-control" placeholder="Request Id" onChange={this.filterByIdHandler}
                                                disabled={this.state.isFilterActive ? "disable" : ""} />
                                        </div>

                                        <div class="form-group top-buffer">


                                            <button type="button" class={this.state.isFilterActive ? "btn btn-danger" : "btn btn-primary "} onClick={() => {
                                                this.state.isLoading = true
                                                this.applyFilter()
                                            }}>{this.state.isFilterActive ? "Reset" : "Apply"}</button>
                                        </div>




                                    </div>




                                    <div class="col-md-9">
                                        <h3 align='center'> Work Flow Summary</h3>

                                        <div class="padding"></div>

                                        <div class="row">

                                            <div class="col-sm-6">
                                                <div class="btn-group">
                                                    <div class="dropdown">

                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                            <button class="dropdown-item" type="button" onClick={() => {
                                                                this.state.isLoading = true
                                                                this.handleSorting("approvalStatus")
                                                            }}>Approval status</button>
                                                            <button class="dropdown-item" type="button" onClick={() => {
                                                                this.state.isLoading = true
                                                                this.handleSorting("employee.first_name")
                                                            }}>Employee name</button>
                                                            <button class="dropdown-item" type="button" onClick={() => {
                                                                this.state.isLoading = true
                                                                this.handleSorting("created_at")
                                                            }}>Creation date</button>
                                                            <button class="dropdown-item" type="button" onClick={() => {
                                                                this.state.isLoading = true
                                                                this.handleSorting("amount")
                                                            }}>Request Id</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>


                                            <div class="col-md-6 text-right">


                                                <h2 class="grid-title">

                                                    <div class="btn-group">
                                                        <div class="dropdown">

                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                                <button class="dropdown-item" type="button" onClick={() => {
                                                                    this.state.isLoading = true
                                                                    this.handleSortingOrder(1)
                                                                }}>Ascending</button>
                                                                <button class="dropdown-item" type="button" onClick={() => {
                                                                    this.state.isLoading = true
                                                                    this.handleSortingOrder(-1)
                                                                }}>Descending</button>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </h2>

                                            </div>
                                        </div>


                                        <div class="table-responsive">
                                            <table class="table table-hover">
                                                <tbody><tr>

                                                </tr>

                                                    <div >
                                                        {this.state.loading || !this.state.events ? (

                                                            <div className="d-flex justify-content-center align-items-center" >
                                                                <div >

                                                                    <table>
                                                                        <tr >
                                                                            <td ><strong>S.No</strong></td>
                                                                            <td ><strong>Name</strong></td>
                                                                            <td ><strong>Request Status</strong></td>
                                                                            <td ><strong>Request ID</strong></td>
                                                                            <td ><strong>Escalate</strong></td>
                                                                            <td ><strong>Manager</strong></td>

                                                                        </tr>
                                                                        {
                                                                            this.renderTableData()
                                                                        }
                                                                    </table>
                                                                </div>

                                                            </div>


                                                        ) :
                                                            this.state.events.map((item) =>

                                                                <div class="card text-center shadow-lg bg-white">
                                                                    <div class="card-header">
                                                                        Expence ID:  {item._id}
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <h5 class="card-title"> {item.employee.first_name}  {item.employee.last_name}</h5>

                                                                        <p class="card-text">Description : {item.description}</p>
                                                                        <p class="card-text">Amount : {item.amount}</p>
                                                                        <p class="card-text">Currency : {item.currency}</p>
                                                                        <p className="App-clock">
                                                                            Created at: {Moment(item.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}.
                      </p>
                                                                        <div>
                                                                            {item.approvalStatus === 'Pending' ?
                                                                                (<div>
                                                                                    <button class="btn btn-outline-success mr-3" type="button" data-toggle="modal" data-target="#approveModal" >Approve</button>

                                                                                    <div class="modal fade" id="approveModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                        <div class="modal-dialog" role="document">
                                                                                            <div class="modal-content">
                                                                                                <div class="modal-header">
                                                                                                    <h5 class="modal-title" id="approveModalLabel">Confirm your action!</h5>
                                                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                                        <span aria-hidden="true">&times;</span>
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div class="modal-body">
                                                                                                    Do you want to approve the Request?
                                    </div>
                                                                                                <div class="modal-footer">
                                                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => {
                                                                                                        this.state.isLoading = true
                                                                                                        this.updateData(item._id, "Approved")
                                                                                                    }}>Proceed</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <button class="btn btn-outline-danger mr-3" type="button" data-toggle="modal" data-target="#declineModal"  >Decline</button>
                                                                                    <div class="modal fade" id="declineModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                        <div class="modal-dialog" role="document">
                                                                                            <div class="modal-content">
                                                                                                <div class="modal-header">
                                                                                                    <h5 class="modal-title" id="declineModalLabel">Confirm your action!</h5>
                                                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                                        <span aria-hidden="true">&times;</span>
                                                                                                    </button>
                                                                                                </div>
                                                                                                <div class="modal-body">
                                                                                                    Do you want to decline the expense?
                                </div>
                                                                                                <div class="modal-footer">
                                                                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={() => {
                                                                                                        this.state.isLoading = true
                                                                                                        this.updateData(item._id, "Declined")
                                                                                                    }
                                                                                                    }>Proceed</button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                )
                                                                                :
                                                                                (<div class="float-right">
                                                                                    {item.approvalStatus === 'Approved' ?
                                                                                        <span class="stamp is-approved">Approved</span> :
                                                                                        <span class="stamp is-nope">Declined</span>
                                                                                    }

                                                                                </div>)
                                                                            }
                                                                        </div>




                                                                    </div>
                                                                </div>

                                                            )}
                                                    </div>
                                                    <div align="center"> <button type="button" class={this.state.isFilterActive ? "btn btn-danger" : "btn btn-primary "} onClick={() => {
                                                        this.state.isLoading = true

                                                    }}>{this.state.isFilterActive ? "Reset" : "Approve"}
                                                    </button></div>
                                                    <tr>



                                                    </tr>
                                                </tbody></table>
                                        </div>



                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
























        );

    }
}

export default EventsPage