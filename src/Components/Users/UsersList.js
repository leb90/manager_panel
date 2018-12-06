import React, { Component } from 'react';
import { deepOrange500, blue500, red500, greenA200 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Card, CardHeader } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import DataTables from 'material-ui-datatables';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import ModalFormUser from './ModalFormUser'
import Alert from '../Alert.js'
import { connect } from 'react-redux'
import { userGet, getUserForId, deleteUserForId, resetStore } from '../../Actions/LoginAction'
import { showModal, showAlert, closeAlert } from "../../Actions/helperAction"
import { DeviceWifiTethering } from 'material-ui/svg-icons';

const styles = {

  container: {
    textAlign: 'center',
  },
  component: {
    margin: '60px 20px',
    paddingTop: '20px',
  },
  titleStyle: {
    fontSize: 16,
    color: deepOrange500,
  },
  footerToolbarStyle: {
    padding: '0 100px',
  },
  footerToolbarStyleResponsive: {
    padding: '0',
    fontSize: 7,
  },
  tableStyle: {
    tableLayout: 'auto',
  },
  tableBodyStyle: {
    overflowX: 'auto',
  },
  tableWrapperStyle: {
    padding: 5,
    fontSize: 7,
  },
};



const tableStyle = [
  {
    key: 'id',
    label: 'ID',
  }, {
    key: 'nickname',
    label: 'Nick Name',
    sortable: true,
  }, {
    key: 'name',
    label: 'Name',
    sortable: true,
    style: {
      width: 250,
    }
  }, {
    key: 'surname',
    label: 'Surname',
    alignRight: true,
  }, {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'action',
    label: 'Action',
  },
];

var dataTable = [];

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function (chunkSize) {
    var array = this;
    return [].concat.apply([],
      array.map(function (elem, i) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
      })
    );
  }
});
Array.prototype.indexOfForArrays = function (search, flag) {
  var objAux;
  if (flag) {
    this[0].forEach((element, i) => {
      if (element !== search.data && i == search.page) {
        objAux = {
          data: element,
          page: ++i
        }
      }

    });
  } else {
    this[0].forEach((element, i) => {
      if (element !== search.data && i < search.page) {
        objAux = {
          data: element,
          page: ++i
        }
      }

    });
  }

  return objAux;
};

class UserList extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSortOrderChange = this.handleSortOrderChange.bind(this);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.handleCellDoubleClick = this.handleCellDoubleClick.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);

    this.handleInfoClick = this.handleInfoClick.bind(this);
    this.addUser = this.addUser.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUsers = this.handleUsers.bind(this);
    this.handleadduser = this.handleadduser.bind(this)
    this.returnUser = this.returnUser.bind(this)
    this.state = {
      data: dataTable,
      page: 1,
      totalUser: 0,
      deleteId: null,
      user: null,
      newUserId: null
    };
  }

  handleSortOrderChange(key, order) {
    console.log('key:' + key + ' order: ' + order);
  }

  handleFilterValueChange(value) {
    let searchData = []
    if (value !== '') {
      dataTable[0].forEach((i, index) => {
        i.map((e) => {
          if (e.id.toString().indexOf(value) >= 0 || e.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 || e.nickname.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
            searchData.push(e)
          }
        })
      })
      this.setState({
        data: searchData,
        totalUser: searchData.length
      });
    } else {
      this.handleUsers();
    }
  }

  handleCellClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleCellDoubleClick(rowIndex, columnIndex, row, column) {
    console.log('rowIndex: ' + rowIndex + ' columnIndex: ' + columnIndex);
  }

  handleRowSelection(selectedRows) {
    console.log('selectedRows: ' + selectedRows);
  }

  handlePreviousPageClick() {
    let data = dataTable.indexOfForArrays(this.state);
    if (data) {
      this.setState({
        data: data.data,
        page: data.page,
      });
    }
    console.log('handlePreviousPageClick');
  }

  handleNextPageClick() {
    let data = dataTable.indexOfForArrays(this.state, 1);
    if (data) {
      this.setState({
        data: data.data,
        page: data.page,
      });
    }
  }

  componentDidMount() {
    this.props.userGet();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.LoginReducer.allUsers.data !== this.props.LoginReducer.allUsers.data) {
      this.handleUsers();
    }  else if (prevProps.LoginReducer.newUser !== this.props.LoginReducer.newUser){
      this.addUser(this.props.LoginReducer.newUser.data)
		}
  } 
  
  returnUser( id , data ){
    console.log(id ,data , "DESDE EL RETURN USER ");
    dataTable[0].forEach(element => {
      element.forEach((e, i )=> {
        if(e.id === id){
          data.id = id;
          data.action = [<IconButton
            iconClassName="material-icons"
            tooltipPosition="top-center"
            tooltip="Edit"
            key={data.id}
            onClick={() => { 
              this.props.getUserForId(data.id);
              this.props.showModal();
            }}
          >
            mode_edit
                  </IconButton>, <IconButton
            iconClassName="material-icons"
            tooltipPosition="top-center"
            tooltip="Delete"
            onClick={() => this.handleAlert(data.id)}
          >
            delete
                  </IconButton>]
          element[i] = data;
        }
      })
    });
    
  }
  handleUsers(index) {
    const array = this.props.LoginReducer.allUsers.data;
    if (array) {
      array.map(i => {
        i.action = [<IconButton
          iconClassName="material-icons"
          tooltipPosition="top-center"
          tooltip="Edit"
          key={i.id}
          onClick={() => { 
            this.props.getUserForId(i.id);  
            this.props.showModal();
          }}
        >
          mode_edit
                </IconButton>, <IconButton
          iconClassName="material-icons"
          tooltipPosition="top-center"
          tooltip="Delete"
          onClick={() => this.handleAlert(i.id)}
        >
          delete
                </IconButton>]
      })
      if (index >= 0) {
        dataTable = []
        dataTable.push(array.chunk_inefficient(10))
        this.setState({
          data: dataTable[0][index],
          totalUser: array.length
        });
      } else {
        dataTable.push(array.chunk_inefficient(10))
        this.setState({
          data: dataTable[0][0],
          totalUser: array.length
        });
      }

    }
  }

  addUser(data, e) {
    if (e !== true) {
      data.action = [<IconButton
        iconClassName="material-icons"
        tooltipPosition="top-center"
        tooltip="Edit"
        key={data.id}
        onClick={() => {
          this.props.getUserForId(data.id) 
        }}
      >
        mode_edit
      </IconButton>, <IconButton
        iconClassName="material-icons"
        tooltipPosition="top-center"
        tooltip="Delete"
        onClick={() => this.handleAlert(data.id)}
      >
        delete
      </IconButton>]
      let pos = dataTable[0].length - 1

      if (dataTable[0][pos].length < 10) {

        dataTable[0][pos].push(data)
        this.setState({
          data: dataTable[0][pos],
          page: this.state.page,
          totalUser: this.state.totalUser + 1,
        });
      } else {

        dataTable[0].push([data])
        this.setState({
          data: dataTable[0][pos + 1],
          page: this.state.page + 1,
          totalUser: this.state.totalUser + 1,
        });
      }
    } else {
      dataTable[0].forEach((i, index) => {
        i.forEach((e) => {
          if (e.id == data) {
            this.handleUsers(index);
          }
        })
      })
    }
  }

  handleDelete(flag) {
    let id = this.state.deleteId;
    if (flag === true) {
      console.log(id , dataTable[0] , "DESDE EL HANDLE DELETE")
      this.props.deleteUserForId(id);

      dataTable[0].forEach((element) => {
        element.forEach((e,i) => {
          if (e.id == id) {
            element.splice( i , 1)
          }
        })
      })
      
    } 
    this.props.closeAlert();
  }

  handleAlert(id) {
    this.props.showAlert();
    this.setState({ deleteId: id })
  }
  handleInfoClick() {
    console.log('handleInfoClick');
  }
  footerToolbarStyle() {
    if (window.innerWidth > 500) {
      return styles.footerToolbarStyle
    } else {
      return styles.footerToolbarStyleResponsive
    }
  }
  handleadduser(data) {
    if (data !== null) {
      return data
    } else {
      return {}
    }
  }
  render() {
   
    console.log(this.props.LoginReducer.allUsers, "DESDE EL RENDER EL USER DEL STATE")
    return (

      <div style={styles.container}>
        <div className="user-list-content" style={styles.component}>
          <h2>User information</h2>
          <Card style={{ margin: 12 }}>

            <DataTables
              title={'User Table'}
              titleStyle={styles.titleStyle}
              height={'auto'}
              selectable={true}
              showRowHover={true}
              enableSelectAll={true}
              columns={tableStyle}
              data={this.state.data}
              page={this.state.page}
              showHeaderToolbar={true}
              onFilterValueChange={this.handleFilterValueChange}
              footerToolbarStyle={this.footerToolbarStyle}
              tableBodyStyle={styles.tableBodyStyle}
              tableStyle={styles.tableStyle}
              onNextPageClick={this.handleNextPageClick}
              onPreviousPageClick={this.handlePreviousPageClick}
              tableWrapperStyle={styles.tableWrapperStyle}
              count={this.state.totalUser}
              toolbarIconRight={[
                <IconButton onClick={() => this.props.showModal()} >
                  <PersonAdd />
                </IconButton>,
                <IconButton onClick={this.handleInfoClick} >
                  <InfoOutline />
                </IconButton>
              ]}
            />
          </Card>
        </div>

        {this.props.helperReducer.showModal && <ModalFormUser showModal={this.props.helperReducer.showModal} userData={this.addUser} returnUser={this.returnUser}/>}
        {this.props.helperReducer.showAlert && <Alert showAlert={this.handleDelete} info={'Desea eliminar al usuario?'} />}
      </div>
    ) /*else {
      return (<Redirect to={{
        pathname: '/login'
      }} />
      )
    }*/
  }

}

const mapToStateToProps = state => {
  return {
    LoginReducer: state.LoginReducer,
    helperReducer: state.helperReducer
  }
}

export default connect(mapToStateToProps, { userGet, getUserForId, deleteUserForId, resetStore, showModal, showAlert, closeAlert })(UserList);