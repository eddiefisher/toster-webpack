var React = require('react');
import httpFetch from './httpFetch.jsx';
var ReactBSTable = require("react-bootstrap-table");
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;
var TableDataSet = ReactBSTable.TableDataSet;
const mdnAPI = 'http://127.0.0.1:3000';

var selectRowProp = {
  mode: "checkbox",
  clickToSelect: true,
  bgColor: "rgb(238, 193, 213)",
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

function onRowSelect(row, isSelected){
  console.log(row);
  console.log("selected: " + isSelected)
}

function onSelectAll(isSelected){
  console.log("is select all: " + isSelected);
}

function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

function windowHeight() {

}

var callback = {
  success : function(data){
     console.log('success');
     React.render(
      <BootstrapTable data={JSON.parse(data)} height="calc(100% - 16em)" pagination={true} striped={true} hover={true} selectRow={selectRowProp} columnFilter={true}>
          <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField="user_color" dataSort={true}>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField="ip_address" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
      </BootstrapTable>,
      document.getElementById("basic")
    );
  },
  error : function(data){
     console.log(2, 'error', JSON.parse(data));
  }
};

httpFetch(mdnAPI)
  .get({})
  .then(callback.success)
  .catch(callback.error);
