import React, { useEffect, useState } from "react";
import './App.css';
import { Layout, Table, Input } from "antd"
import { fetchData } from "./domain";
import useDebounce from "./utils/useDebounce";

const {Content, Header} = Layout
const { Search } = Input;

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(input, 250)

 useEffect(
    () => {
      if (debouncedSearchTerm.length >= 3) {
        setIsSearching(true);
        fetchData(debouncedSearchTerm)
        .then((response) => { 
          response.map(e=> {
            if (e.results.length !== 0){
              setItems(e.results)
              setIsSearching(false);
            } 
          });
        })
        .catch((e) => {
          console.log(e);
        })
      } else {
        setItems([]);
      }
    },
    [debouncedSearchTerm]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: text => {
        if(text.toLowerCase().indexOf(input.toLowerCase()) > -1){ 
          return text.toLowerCase().replace(input.toLowerCase(), input.toUpperCase())
        }
      }, 
    },
    {
      title: "Type",
      dataIndex: "url",
      render: url => url.split("/")[4],
      key: "url"
    },
  ];

  return (
    <Layout>
      <Header className="header">
          <Search
            placeholder="Enter..."
            enterButton="Search"
            size="medium"
            className="search_input"
            onChange={e => setInput(e.target.value)}
            value={input}
          />
      </Header>
      <Content>
        <Table 
          rowKey="uid"
          columns={columns} 
          expandable={{
            expandedRowRender: (record) => <div key={record.name}>{Object.keys(record).map(e => <p>{e + ": " + record[e]}</p>)}</div>, 
          }}
          dataSource={items}
          bordered />
      </Content>
    </Layout>
  );
}

export default App;
