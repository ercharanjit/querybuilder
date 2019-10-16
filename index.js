  var inOperators = ['in', 'notin'];
        var betweenOpertors = ['between'];

var dataSet = [{ id: '1', displayName: 'Cash' },
              { id: '2', displayName: 'Credit Card' },
              { id: '4', displayName: 'بطاقة ائتمان' },
              { id: '5', displayName: 'بطاقة اعتماد' },
              { id: '3', displayName: 'Debit Card' }];


var columnData = [
    { field: '{{id::1}}', label: 'Location', type: 'string', },
    { field: '{{id::2}}', label: 'Latitude', type: 'date' },
    { field: '{{id::3}}', label: 'Longitude', type: 'boolean', values: ['Mr.', 'Mrs.'] },
    { field: '{{id::4}}', label: 'Title', type: 'date',format: 'dd/MM/yyyy' },
    { field: '{{id::5}}', label: 'Date', type: 'date', 
      
      operators: [{ key: 'Equal', value: 'equal' }, { key: 'between', value: 'between' },{ key: 'Parameter', value: 'parameter' }],
      format: 'dd/MM/yyyy',
      template: {
            create: function () {
                elem = document.createElement('input');
                elem.setAttribute('type', 'text');
                return elem;
            },
            destroy: function (args) {
              console.log(args);                          
                var selectObj = ej.base.getComponent(document.getElementById(args.elementId), 'datepicker');
                if (selectObj) {
                    selectObj.destroy();
                }
                var dateRange = ej.base.getComponent(document.getElementById(args.elementId), 'daterangepicker');
                if (dateRange) {
                    dateRange.destroy();
                }
            },
            write: function (args) {   
              console.log(args);                          
                if (betweenOpertors.indexOf(args.operator) > -1) {
                    var dateRangeObj = new ej.calendars.DateRangePicker({
                        value: args.values,
                        change: function (e) {
                            qryBldrObj.notifyChange([e.startDate,e.endDate], e.element);
                        }
                    });
                    // Render initialized DateRangePicker.
                    dateRangeObj.appendTo('#' + args.elements.id);
                    
                }
                else {
                    var datepicker = new ej.calendars.DatePicker({
                        value: args.values,
                        change: function (e) {
                            qryBldrObj.notifyChange(e.value, e.element);
                        }
                    });
                    datepicker.appendTo('#' + args.elements.id);

                }
            }
        }
    },

    { field: '{{id::6}}', label: 'Country', type: 'string' },
    {
        field: '{{id::7}}', label: 'Transaction', type: 'number',
        operators: [{ key: 'In', value: 'in' }, { key: 'Not In', value: 'notin' }, { key: 'Equal', value: 'equal' }],
        template: {
            create: function () {
              elem = document.createElement('input');
              elem.setAttribute('type', 'text');
              return elem;
            },
            destroy: function (args) {
              var selectObj = ej.base.getComponent(document.getElementById(args.elementId), 'multiselect');
              if (selectObj) {
                  selectObj.destroy();
              }
              var dropdown = ej.base.getComponent(document.getElementById(args.elementId), 'dropdownlist');
              if (dropdown) {
                  dropdown.destroy();
              }
            },
            write: function (args) { 
              console.log(args);                          
              if (inOperators.indexOf(args.operator) > -1) {
                  var multiSelectObj = new ej.dropdowns.MultiSelect({
                      dataSource: dataSet,
                      value: args.values,
                      fields: { text: 'displayName', value: 'id' },
                      mode: 'CheckBox',
                      placeholder: 'Select Transaction',
                      change: function (e) {
                          qryBldrObj.notifyChange(e.value, e.element);
                      }
                  });
                  multiSelectObj.appendTo('#' + args.elements.id);
              }
              else {
                  var dropDownObj = new ej.dropdowns.DropDownList({
                      dataSource: dataSet,
                      // set the placeholder to filter search box input element
                      filterBarPlaceholder: 'Search',
                      // set true for enable the filtering support.
                      allowFiltering: true,
                      value: args.values ? args.values : dataSet[0],
                      fields: { text: 'displayName', value: 'id' },
                      change: function (e) {
                          qryBldrObj.notifyChange(e.value, e.element);
                      }
                  });
                  dropDownObj.appendTo('#' + args.elements.id);

              }
            }
        }
    }
];


var importRules = {
    'condition': 'and',
    'rules': [{
        'field': '{{id::7}}',
        'type': 'number',
        'operator': 'equal',
        'value': '1'
    },
    {
        'field': '{{id::7}}',
        'type': 'number',
        'operator': 'in',
        'value': [1,2]
    }]
};

var qryBldrObj = new ej.querybuilder.QueryBuilder({
    width: '70%',
    columns: columnData,
    summaryView: "true",
      rule: importRules,
      change:function(args){
              console.log(args);                          

      },
});

qryBldrObj.appendTo('#querybuilder');