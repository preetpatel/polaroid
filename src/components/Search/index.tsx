import * as React from 'react'
import Downshift from 'downshift'

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]
class Search extends React.Component<{}, {}>{
 public render() {
     return (
        <Downshift
        onChange={(selection:any) => alert(`You selected ${selection.value}`)}
        itemToString={(item:any) => (item ? item.value : '')}
      >
        {(
          getInputProps: any,
          getItemProps: any,
          getLabelProps: any,
          getMenuProps: any,
          isOpen: any,
          inputValue: any,
          highlightedIndex:any,
          selectedItem:any,
        ) => (
          <div>
            <label {...getLabelProps()}>Enter a fruit</label>
            <input {...getInputProps()} />
            <ul {...getMenuProps()}>
              {isOpen
                ? items
                    .filter(item => !inputValue || item.value.includes(inputValue))
                    .map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.value,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? 'lightgray' : 'white',
                            fontWeight: selectedItem === item ? 'bold' : 'normal',
                          },
                        })}
                      >
                        {item.value}
                      </li>
                    ))
                : null}
            </ul>
          </div>
        )}
      </Downshift>
     )

 }
}
 export default Search