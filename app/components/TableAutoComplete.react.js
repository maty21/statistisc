import { Icon, Input, AutoComplete } from 'antd';
import { connect } from 'react-redux';

const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const dataSource = [
  {
    title: '话题',
    children: [
      {
        title: 'AntDesign',
        count: 10000
      },
      {
        title: 'AntDesign UI',
        count: 10600
      }
    ]
  },
  {
    title: '问题',
    children: [
      {
        title: 'AntDesign UI 有多好',
        count: 60100
      },
      {
        title: 'AntDesign 是啥',
        count: 30010
      }
    ]
  },
  {
    title: '文章',
    children: [
      {
        title: 'AntDesign 是一个设计语言',
        count: 100000
      }
    ]
  }
];

function renderTitle(title) {
  return (
    <span>
      {title}

    </span>
  );
}

const options = (data) => {
  const obj = data
    .map((group) => (
      <OptGroup key={group.title} label={renderTitle(group.title)}>
        {group.children.map((opt) => (
          <Option key={opt.title} value={opt.title}>
            {opt.title}
            <span
              style={{ color: 'rgb(52, 152, 219)' }}
              className="certain-search-item-count">
              ({opt.count})
            </span>
            
          </Option>
        ))}
      </OptGroup>
    ))
    .concat([
      <Option disabled key="all" className="show-all">
        <a
          href="https://www.google.com/search?q=antd"
          target="_blank"
          rel="noopener noreferrer"/>
      </Option>
    ]);
  return obj;
};
const TableAutoComplete = (dataSource) => (
  <div className="certain-category-search-wrapper" style={{ width: 250 }}>
    <AutoComplete
      className="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      size="large"
      style={{ width: '600px', outline: 'none' }}
      dataSource={options(dataSource.dataSource)}
      placeholder="input here"
      optionLabelProp="value">
      <Input
        suffix={<Icon type="search" className="certain-category-icon"/>}/>
    </AutoComplete>
  </div>
);

// const dataSource = [
//     { key: 1, podName: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
//     { key: 2, podName: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
//     { key: 3, podName: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
//   ];

const tableDataToAutoCompleteData = (data) => {
  const table = Object.keys(data[0]).map((obj) => ({
    title: obj,
    children: []
  }));
  table.forEach((obj) => {
    // data.filter(o => o[obj.title]).map(o => )
    let mapTypeToCountObj = data.map((o) => o[obj.title]).reduce((prev, item) => {
      if (item in prev) prev[item]++;
      else prev[item] = 1;
      return prev;
    }, {});
    obj.children = Object.keys(mapTypeToCountObj).map((key) => ({
      title: key,
      count: mapTypeToCountObj[key]
    }));
  });

  return table;
};

const mapStateToProps = (state) => ({
  // columns: state.containerTable.columns,
  dataSource: tableDataToAutoCompleteData(state.containerTable.dataSource)
});

export default connect(mapStateToProps, {})(TableAutoComplete);
