import React, { useState, useEffect } from "react";
import "./style.css";

//  data  from Local Storage
const getLocalData = () => {
  const lists = localStorage.getItem("mylist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editedItems, setEditedItems] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  

  // add the items fucnction
  const addItem = () => {
    if (!inputData) {
      alert("please fill the data..");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElement) => {
          if (curElement.id === editedItems) {
            return { ...curElement, name: inputData };
          }
          return curElement;
        })
      );

      setInputData("");
      setEditedItems(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const item_to_be_edited = items.find((curElement) => {
      return curElement.id === index;
    });
    setInputData(item_to_be_edited.name);
    setEditedItems(index);
    setToggleButton(true);
  };

  // how to delete items section
  const deleteItem = (index) => {
    const newLists = items.filter((curElement) => {
      return curElement.id !== index;
    });
    setItems(newLists);
  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // adding LocalStorage
  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.png" alt="todologo" />
            <figcaption>Add Your Lists Here...🖋</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items...."
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
         
          <div className="showItems">
            {items.map((curElement) => {
              return (
                <div className="eachItem" key={curElement.id}>
                  <h3>{curElement.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElement.id)}></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElement.id)}></i>
                  </div>
                </div>
              );
            })}
          </div>

          
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> LIST ITEMS</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
